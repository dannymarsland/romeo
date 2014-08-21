///<reference path="AnnotationsJson"/>
///<reference path="Types"/>
var Annotation = (function () {
    function Annotation(type, annotation, params) {
        if (typeof params === "undefined") { params = {}; }
        this.type = type;
        this.annotation = annotation;
        this.params = params;
    }
    Annotation.prototype.getType = function () {
        return this.type;
    };

    Annotation.prototype.getAnnotation = function () {
        return this.annotation;
    };

    Annotation.prototype.getParams = function (defaults) {
        if (typeof defaults === "undefined") { defaults = {}; }
        var params = {};
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                if (typeof this.params[key] !== "undefined") {
                    params[key] = this.params[key];
                } else {
                    params[key] = defaults[key];
                }
            }
        }
        return params;
    };

    Annotation.prototype.toJSON = function () {
        return {
            "annotation": this.annotation,
            "params": this.params
        };
    };
    return Annotation;
})();

function _map(obj, callback) {
    var arr = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var ret = callback(key, obj[key]);
            arr.push(ret);
        }
    }
    return arr;
}

var AnnotatedType = (function () {
    function AnnotatedType(type, annotations) {
        var _this = this;
        this.type = type;
        this.annotations = {};
        annotations.map(function (annotation) {
            _this.annotations[annotation.getAnnotation()] = annotation;
        });
    }
    AnnotatedType.prototype.getName = function () {
        return this.type.getName();
    };

    AnnotatedType.prototype.getType = function () {
        return this.type;
    };

    AnnotatedType.prototype.getAnnotations = function () {
        return this.annotations;
    };

    AnnotatedType.prototype.toJSON = function () {
        return {
            "type": this.type,
            "annotations": this.annotations
        };
    };

    AnnotatedType.prototype.getAnnotation = function (name) {
        if (this.annotations[name]) {
            return this.annotations[name];
        }
        return null;
    };
    return AnnotatedType;
})();

var AnnotatedClass = (function () {
    function AnnotatedClass(classType, annotations) {
        this.classType = classType;
        this.annotations = annotations;
    }
    AnnotatedClass.prototype.getType = function () {
        return this.classType;
    };

    AnnotatedClass.prototype.getConstructor = function () {
        return this.classType.getConstructor();
    };

    AnnotatedClass.prototype.getTypeAnnotations = function (name) {
        return this.annotations.filter(function (annotation) {
            if (annotation.getAnnotation(name) != null) {
                return true;
            }
            return false;
        });
    };

    AnnotatedClass.prototype.getAnnotations = function (name) {
        var annotations = [];
        this.annotations.forEach(function (annotatedType) {
            var annotation = annotatedType.getAnnotation(name);
            if (annotation) {
                annotations.push(annotation);
            }
        });
        return annotations;
    };

    AnnotatedClass.prototype.getClassAnnotation = function (name) {
        for (var i = 0; i < this.annotations.length; i++) {
            var type = this.annotations[i].getType();
            if (type.getType() == "constructor") {
                return this.annotations[i].getAnnotation(name);
            }
        }
        return null;
    };
    return AnnotatedClass;
})();

var AnnotationReader = (function () {
    function AnnotationReader(classAnnotations) {
        var _this = this;
        this.classAnnotations = classAnnotations;
        this.annotatedClasses = [];
        this.classTypes = {};
        var classAnnotationsArray = _map(classAnnotations, function (key, obj) {
            return obj;
        });
        classAnnotationsArray.forEach(function (classAnnotation) {
            var classType = _this.getClassFromJson(classAnnotation.type);
            var annotations;
            annotations = _map(classAnnotation.annotations, function (key, json) {
                return _this.getAnnotatedTypeFromJson(json);
            });
            _this.annotatedClasses.push(new AnnotatedClass(classType, annotations));
        });
    }
    AnnotationReader.prototype.getAnnotations = function (classConstructor) {
        for (var i = 0; i < this.annotatedClasses.length; i++) {
            if (this.annotatedClasses[i].getConstructor() === classConstructor) {
                return this.annotatedClasses[i];
            }
        }
        return null;
    };

    AnnotationReader.prototype.getAnnotationsForInstance = function (instance) {
        return this.getAnnotations(instance.constructor);
    };

    AnnotationReader.prototype.getClassesWithAnnotation = function (name) {
        return this.annotatedClasses.filter(function (annotatedClass) {
            if (annotatedClass.getTypeAnnotations(name).length >= 1) {
                return true;
            }
            return false;
        });
    };

    AnnotationReader.prototype.getConstructorFromClassName = function (name) {
        var parts = name.split('.');
        var scope = window;
        for (var i = 0; i < parts.length - 2; i++) {
            var part = parts[i];
            if (typeof scope[part] == "object" || typeof scope[part] == "function") {
                scope = scope[part];
            } else {
                throw new Error("Class does not exist " + name);
            }
        }
        var className = parts[parts.length - 1];
        if (typeof scope[className] == "function") {
            return scope[className];
        } else {
            var lowercaseClassName = className.toLowerCase();

            for (var key in scope) {
                if (scope.hasOwnProperty(key)) {
                    if (lowercaseClassName == key.toLowerCase()) {
                        if (typeof scope[key] == "function") {
                            return scope[key];
                        }
                    }
                }
            }
            throw new Error("Class does not exist " + name);
        }
    };

    AnnotationReader.prototype.getTypeFromJson = function (json) {
        if (typeof json['parent'] !== "undefined") {
            return this.getClassFromJson(json);
        } else {
            return this.getVariableFromJson(json);
        }
    };

    AnnotationReader.prototype.getVariableFromJson = function (json) {
        var className = json.type;
        var primitiveTypes = [
            'bool',
            'boolean',
            'string',
            'number',
            'any',
            'function'
        ];
        var classType = null;
        if (primitiveTypes.indexOf(className.toLowerCase()) === -1) {
            classType = this.getClassFromName(className);
        }
        return new TypeVariable(json.name, json.type, classType, false);
    };

    AnnotationReader.prototype.getClassFromJson = function (json) {
        if (!this.classTypes[json.name]) {
            this.classTypes[json.name] = new TypeClass(json.name, this.getConstructorFromClassName(json.name), json.parent);
        }
        return this.classTypes[json.name];
    };

    AnnotationReader.prototype.getClassFromName = function (name) {
        if (this.classTypes[name]) {
            return this.classTypes[name];
        } else {
            if (this.classAnnotations[name]) {
                var json = this.classAnnotations[name].type;
            } else {
                // fake json, must be a JS class
                var json = {
                    "name": name,
                    "type": name,
                    "parent": null
                };
            }
            return this.getClassFromJson(json);
        }
    };

    AnnotationReader.prototype.getAnnotatedTypeFromJson = function (json) {
        var type = this.getTypeFromJson(json.type);
        var annotations = _map(json.annotations, function (key, json) {
            return new Annotation(type, json.annotation, json.params);
        });
        return new AnnotatedType(type, annotations);
    };
    return AnnotationReader;
})();
//# sourceMappingURL=AnnotationReader.js.map
