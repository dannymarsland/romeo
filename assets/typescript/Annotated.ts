///<reference path="Annotations"/>
///<reference path="Defined"/>

class Annotated extends Defined {

    private static __annotations:AnnotatedClass;
    private static __annotationJson:AnnotatedClassJson;

    public static getAnnotations():AnnotatedClass {
        if (!this.__annotations) {
            // @todo need to add in the annotations....
            var annotations:Annotation[] = [];
            this.map(this.__annotationJson.annotations, (key:string, json:AnnotatedTypeJson)=> {
                annotations = [].concat(annotations, this.getAnnotationsFromJson(json));
            });
            this.__annotations = new AnnotatedClass(this.getClassDefinition(), annotations);
        }
        return this.__annotations;
    }

    private static map(obj:{}, callback:(key:string, item:any)=>any):any[] {
        var arr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var ret = callback(key, obj[key]);
                arr.push(ret);
            }
        }
        return arr;
    }

    public static getMemberAnnotations(annotationName:string = null) {
        return this.getAnnotations().getAnnotations(annotationName);
    }

    public static getAnnotationsForMember(memberName:string, annotationName:string = null) {
        return this.getAnnotations().getAnnotationsFor(memberName, annotationName);
    }

    public getAnnotations():AnnotatedClass {
        return this['constructor']['getAnnotations']();
    }

    public getMemberAnnotations(annotationName:string = null) {
        return this.getAnnotations().getAnnotations(annotationName);
    }

    public getAnnotationsForMember(memberName:string, annotationName:string = null) {
        return this.getAnnotations().getAnnotationsFor(memberName, annotationName);
    }


    private static getAnnotationsFromJson(json:AnnotatedTypeJson):Annotation[] {

        var type = this.getTypeFromJson(json.type);
        var annotations = this.map(json.annotations, (key, json:AnnotationJson) => {
            var annotationClassName = json.annotation.charAt(0).toUpperCase() + json.annotation.slice(1) + 'Annotation';
            if (this.classExtendsClass(annotationClassName, 'Annotation')) {
                var annotationClass = Annotated.getConstructorFromClassName(annotationClassName);
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
    }

    private static getTypeFromJson(json:TypeJson):Type {
        // todo - implement properly
        if (typeof json['parent'] !== "undefined") {
            return this.getClassFromJson(<TypeClassJson> json);
        } else {
            return this.getVariableFromJson(<TypeVariableJson> json);
        }

    }

    private static getVariableFromJson(json:TypeVariableJson):TypeVariable {
        var className = json.type;
        var primitiveTypes = [
            'bool',
            'boolean',
            'string',
            'number',
            'any',
            'function'
        ];
        var classType;
        if (primitiveTypes.indexOf(className.toLowerCase()) === -1) {
            classType = this.__getClassDefinitionForClass(className);
        }
        return new TypeVariable(json.name, json.type, classType || null, false);
    }

    private static getClassFromJson(json:TypeClassJson):TypeClass {
        return this.__getClassDefinitionForClass(json.name);
    }

    private static getClassFromName(name:string) {
        return this.__getClassDefinitionForClass(name);
    }

    private static getConstructorFromClassName(name: string) {
        var parts = name.split('.');
        var scope = window;
        for (var i=0; i<parts.length-2; i++) {
            var part = parts[i];
            if (typeof scope[part] == "object" || typeof scope[part] == "function") {
                scope = scope[part];
            } else {
                //throw new Error("Class does not exist " + name);
                console.error("Class does not exist " + name);

            }
        }
        var className= parts[parts.length-1];
        if (typeof scope[className] == "function") {
            return scope[className];
        } else {
            var lowercaseClassName = className.toLowerCase();
            // search everything in the window....
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
            //throw new Error("Class does not exist " + name);
            console.error("Class does not exist " + name);
        }
    }

    private static classExtendsClass(child:string, parent: string) {
        // todo, follow dependency tree, not just first parent
        return this.getClassFromName(child).getParent() === parent;
    }


}

