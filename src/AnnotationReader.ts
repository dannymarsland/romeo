
///<reference path="AnnotationsJson"/>
///<reference path="Types"/>


class Annotation {

    constructor(private annotation: string, private params: {} = {}) {}

    public getAnnotation() {
        return this.annotation;
    }

    public getParams() {
        return this.params;
    }

    public toJSON() {
        return {
            "annotation": this.annotation,
            "params": this.params
        }
    }
}


function _map(obj: {}, callback: (key: string, item: any)=>any) : any[] {
    var arr = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
           var ret = callback(key, obj[key]);
            arr.push(ret);
        }
    }
    return arr;
}

class AnnotatedType {

    private annotations: {[s: string]: Annotation};
    constructor (
        private type: Type,
        annotations: Annotation[]
        ){
        this.annotations = {};
        annotations.map((annotation: Annotation)=>{
            this.annotations[annotation.getAnnotation()] = annotation;
        });
    }

    public getName() {
        return this.type.getName();
    }

    public getType() {
        return this.type;
    }

    public getAnnotations() {
        return this.annotations;
    }

    public toJSON() {
        return {
            "type": this.type,
            "annotations": this.annotations
        }
    }

    public getAnnotation(name: string): Annotation {
        if (this.annotations[name]) {
            return this.annotations[name];
        }
        return null;
    }
}



class AnnotatedClass {

    constructor(private classType: TypeClass, private annotations: AnnotatedType[]) {

    }

    public getType() {
        return this.classType;
    }

    public getConstructor() {
        return this.classType.getConstructor();
    }

    public getTypeAnnotations(name: string): AnnotatedType[] {
        return this.annotations.filter((annotation: AnnotatedType) => {
            if (annotation.getAnnotation(name) != null) {
                return true;
            }
            return false;
        });
    }
}

class AnnotationReader {

    private annotatedClasses: AnnotatedClass[] = [];
    private classTypes: {[d: string]: TypeClass} = {};

    constructor (private classAnnotations: {[d:string] :AnnotatedClassJson}) {
        var classAnnotationsArray = _map(classAnnotations,(key, obj)=>{
            return obj;
        })
        classAnnotationsArray.forEach((classAnnotation: AnnotatedClassJson)=>{
            var classType = this.getClassFromJson(classAnnotation.type);
            var annotations: AnnotatedType[];
            annotations = _map(classAnnotation.annotations, (key: string, json: AnnotatedTypeJson)=>{
                return this.getAnnotatedTypeFromJson(json);
            });
            this.annotatedClasses.push(new AnnotatedClass(classType, annotations))
        })
    }

    public getAnnotations(classConstructor) {
        // cache these ?
        for (var i=0; i<this.annotatedClasses.length; i++) {
            if (this.annotatedClasses[i].getConstructor() === classConstructor) {
                return this.annotatedClasses[i];
            }
        }
        return null;
    }

    public getAnnotationsFromInstance(instance) {
        return this.getAnnotations(instance.constructor);
    }

    public getClassesWithAnnotation(name: string): AnnotatedClass[] {
        return this.annotatedClasses.filter((annotatedClass: AnnotatedClass)=>{
            if (annotatedClass.getTypeAnnotations(name).length >= 1) {
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
                throw new Error("Class does not exist " + name);
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
            throw new Error("Class does not exist " + name);
        }
    }

    private getTypeFromJson(json: TypeJson): Type {
        // todo - implment properly
        return this.getVariableFromJson(<TypeVariableJson> json);
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

    private getAnnotatedTypeFromJson(json: AnnotatedTypeJson): AnnotatedType {
        var type = this.getTypeFromJson(json.type);
        var annotations = _map(json.annotations, (key, json: AnnotationJson) => {
            return new Annotation(json.annotation, json.params);
        });
        return new AnnotatedType(type, annotations);
    }

}

