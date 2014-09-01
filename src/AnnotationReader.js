///<reference path="AnnotationsJson"/>
///<reference path="Types"/>
var Annotation = (function () {
    function Annotation(type, name) {
        this.type = type;
        this.name = name;
    }
    Annotation.prototype.getType = function () {
        return this.type;
    };

    Annotation.prototype.getName = function () {
        return this.name;
    };
    return Annotation;
})();

var AnnotatedType = (function () {
    function AnnotatedType(type, annotations) {
        var _this = this;
        this.type = type;
        this.annotations = {};
        annotations.map(function (annotation) {
            _this.annotations[annotation.getName()] = annotation;
        });
    }
    AnnotatedType.prototype.getType = function () {
        return this.type;
    };

    AnnotatedType.prototype.getAnnotations = function () {
        return this.annotations;
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

    AnnotatedClass.prototype.getClassConstructor = function () {
        return this.classType.getConstructor();
    };

    AnnotatedClass.prototype.getAnnotations = function (name) {
        return this.annotations.filter(function (annotation) {
            return annotation.getName() === name;
        });
    };

    AnnotatedClass.prototype.getClassAnnotation = function (name) {
        for (var i = 0; i < this.annotations.length; i++) {
            var type = this.annotations[i].getType();
            if (type.getType() == "constructor") {
                return this.annotations[i];
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
        var classAnnotationsArray = this.map(classAnnotations, function (key, obj) {
            return obj;
        });
        classAnnotationsArray.forEach(function (classAnnotation) {
            var classType = _this.getClassFromJson(classAnnotation.type);
            var annotations = [];
            _this.map(classAnnotation.annotations, function (key, json) {
                annotations = [].concat(annotations, _this.getAnnotationsFromJson(json));
            });
            _this.annotatedClasses.push(new AnnotatedClass(classType, annotations));
        });
    }
    AnnotationReader.prototype.getAnnotationsForClass = function (classConstructor) {
        for (var i = 0; i < this.annotatedClasses.length; i++) {
            if (this.annotatedClasses[i].getClassConstructor() === classConstructor) {
                return this.annotatedClasses[i];
            }
        }
        return null;
    };

    AnnotationReader.prototype.getAnnotationsForInstance = function (instance) {
        return this.getAnnotationsForClass(instance.constructor);
    };

    AnnotationReader.prototype.getClassesWithAnnotation = function (name) {
        return this.annotatedClasses.filter(function (annotatedClass) {
            if (annotatedClass.getAnnotations(name).length >= 1) {
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
                        // we have a match hopefully...
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
        // todo - implement properly
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
        // cache the class types
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

    AnnotationReader.prototype.getAnnotationsFromJson = function (json) {
        var _this = this;
        var type = this.getTypeFromJson(json.type);
        var annotations = this.map(json.annotations, function (key, json) {
            var annotationClassName = json.annotation.charAt(0).toUpperCase() + json.annotation.slice(1) + 'Annotation';
            if (_this.classExtendsClass(annotationClassName, 'Annotation')) {
                var annotationClass = _this.getConstructorFromClassName(annotationClassName);
                var annotation = new annotationClass(type, json.annotation);
                for (var param in json.params) {
                    if (json.params.hasOwnProperty(param)) {
                        if (typeof annotation[param] === 'undefined') {
                            throw new Error('Unsupported param ' + param + ' on annotation @' + json.annotation);
                        } else {
                            annotation[param] = json.params[param];
                        }
                    }
                }
                return annotation;
            } else {
                throw new Error('Annotation @' + json.annotation + ' (' + annotationClassName + ') must extend Annotation');
            }
        });
        return annotations;
    };

    AnnotationReader.prototype.classExtendsClass = function (child, parent) {
        // todo, follow dependency tree, not just first parent
        return this.getClassFromName(child).getParent() === parent;
    };

    AnnotationReader.prototype.map = function (obj, callback) {
        var arr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var ret = callback(key, obj[key]);
                arr.push(ret);
            }
        }
        return arr;
    };
    return AnnotationReader;
})();
//# sourceMappingURL=AnnotationReader.js.map
