interface AnnotatedClassJson {
    type: TypeClassJson;
    annotations: {[d:string]: AnnotatedTypeJson}
}

interface TypeJson {
    name: string;
    type: string;
}

interface AnnotatedTypeJson {
    type: TypeJson
    annotations: {[d:string ]: AnnotationJson}
}


interface TypeVariableJson extends TypeJson {
    isArray: boolean;
}

interface TypeClassJson extends TypeJson {
    parent: string;
}

interface AnnotationJson {
    annotation: string;
    params: {[d: string]: string}
}