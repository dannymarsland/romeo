
///<reference path="AnnotationsJson"/>
///<reference path="Types"/>
///<reference path="Defined"/>


class Annotation extends Defined {
    constructor(private __type: Type, private __name: string) {
        super();
    }

    public getType(): Type {
        return this.__type;
    }

    public getName() {
        return this.__name;
    }
}



class AnnotatedType {

    private annotations: {[s: string]: Annotation};
    constructor (
        private type: Type,
        annotations: Annotation[]
        ){
        this.annotations = {};
        annotations.map((annotation: Annotation)=>{
            this.annotations[annotation.getName()] = annotation;
        });
    }

    public getType() {
        return this.type;
    }

    public getAnnotations() {
        return this.annotations;
    }

    public getAnnotation(name: string): Annotation {
        if (this.annotations[name]) {
            return this.annotations[name];
        }
        return null;
    }
}

class AnnotatedClass {

    constructor(private classType: TypeClass, private annotations: Annotation[]) {
    }

    public getType() {
        return this.classType;
    }

    public getClassConstructor() {
        return this.classType.getConstructor();
    }

    public getAnnotations(name: string): Annotation[] {
        return this.annotations.filter((annotation: Annotation)=>{
            return annotation.getName() === name && annotation.getType().getType() != "constructor";
        });
    }

    public getAnnotationsFor(member: string, annotationName: string = null): Annotation[] {
        return this.annotations.filter((annotation: Annotation)=>{
            return annotation.getType().getName() === member && ( annotationName == null || annotation.getName() === annotationName )
        });
    }

    public getClassAnnotation(name: string): Annotation {
        for (var i = 0; i<this.annotations.length; i++) {
            var type = this.annotations[i].getType();
            if (type.getType() == "constructor") {
                return this.annotations[i];
            }
        }
        return null;
    }
}

class AnnotationReader {

    private annotatedClasses: AnnotatedClass[] = [];
    private classTypes: {[d: string]: TypeClass} = {};

    constructor (private classAnnotations: {[d:string] :AnnotatedClassJson}) {
        var classAnnotationsArray = this.map(classAnnotations,(key, obj)=>{
            return obj;
        });
        classAnnotationsArray.forEach((classAnnotation: AnnotatedClassJson)=>{
            var classType = this.getClassFromJson(classAnnotation.type);
            var annotations: Annotation[] =[];
            this.map(classAnnotation.annotations, (key: string, json: AnnotatedTypeJson)=>{
                annotations = [].concat(annotations, this.getAnnotationsFromJson(json));
            });

            var annotatedClass = new AnnotatedClass(classType, annotations);
            // add the annotations to class prototype
            
            //classType.getConstructor()['__annotations'] = annotatedClass;
            //classType.getConstructor()['__classDefinition'] = classType;
            classType.getConstructor()['__classDefinitionJson'] = classAnnotation.type;

            this.annotatedClasses.push(annotatedClass);
        });

    }

    public getAnnotationsForClass(classConstructor) {
        // cache these ?
        for (var i=0; i<this.annotatedClasses.length; i++) {
            if (this.annotatedClasses[i].getClassConstructor() === classConstructor) {
                return this.annotatedClasses[i];
            }
        }
        return null;
    }

    public getAnnotationsForInstance(instance) {
        return this.getAnnotationsForClass(instance.constructor);
    }

    public getClassesWithAnnotation(name: string): AnnotatedClass[] {
        return this.annotatedClasses.filter((annotatedClass: AnnotatedClass)=>{
            if (annotatedClass.getAnnotations(name).length >= 1) {
                return true;
            }
            return false;
        });
    }


    private getConstructorFromClassName(name: string) {
        var parts = name.split('.');
        var scope = window;
        for (var i=0; i<parts.length-2; i++) {
            var part = parts[i];
            if (typeof scope[part] == "object" || typeof scope[part] == "function") {
                scope = scope[part];
            } else {
                //throw new Error("Class does not exist " + name);
                console.warn("Class could not be found " + name);

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
            console.warn("Class could not be found " + name);
        }
    }

    private getTypeFromJson(json: TypeJson): Type {
        // todo - implement properly
        if( typeof json['parent'] !== "undefined") {
            return this.getClassFromJson(<TypeClassJson> json);
        } else {
            return this.getVariableFromJson(<TypeVariableJson> json);
        }

    }

    private getVariableFromJson(json: TypeVariableJson): TypeVariable {
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
    }

    private getClassFromJson(json: TypeClassJson): TypeClass {
        // cache the class types
        if (!this.classTypes[json.name]) {
            this.classTypes[json.name] = new TypeClass(json.name, this.getConstructorFromClassName(json.name), json.parent);
        }
        return this.classTypes[json.name];
    }

    private getClassFromName(name: string) {
        if (this.classTypes[name]) {
            return this.classTypes[name];
        } else {
            if (this.classAnnotations[name]) {
                var json = this.classAnnotations[name].type;
            } else {
                // fake json, must be a JS class
                var json = <TypeClassJson> {
                    "name": name,
                    "type": name,
                    "parent": null
                }
            }
            return this.getClassFromJson(json);
        }
    }

    private getAnnotationsFromJson(json: AnnotatedTypeJson): Annotation[] {
        var type = this.getTypeFromJson(json.type);
        var annotations = this.map(json.annotations, (key, json: AnnotationJson) => {
            var annotationClassName = json.annotation.charAt(0).toUpperCase() + json.annotation.slice(1) + 'Annotation';
            if (this.classExtendsClass(annotationClassName, 'Annotation')) {
                var annotationClass = this.getConstructorFromClassName(annotationClassName);
                var annotation = new annotationClass(type, json.annotation);
                for (var param in json.params) {
                    if (json.params.hasOwnProperty(param)){
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

    private classExtendsClass(child:string, parent: string) {
        // todo, follow dependency tree, not just first parent
        return this.getClassFromName(child).getParent() === parent;
    }

    private map(obj: {}, callback: (key: string, item: any)=>any) : any[] {
        var arr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var ret = callback(key, obj[key]);
                arr.push(ret);
            }
        }
        return arr;
    }
}
