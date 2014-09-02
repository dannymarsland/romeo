///<reference path="Annotations"/>
///<reference path="Defined"/>

class Annotated extends Defined {

    private static __annotations: AnnotatedClass;
    private static __annotationJson: AnnotatedClassJson;

    public static getAnnotations() : AnnotatedClass
    {
        if (!this.__annotations) {
            this.__annotations = new AnnotatedClass(this.getClassDefinition(),[]);
        }
        return this.__annotations;
    }

    public static getMemberAnnotations(annotationName: string = null)
    {
        return this.getAnnotations().getAnnotations(annotationName);
    }

    public static getAnnotationsForMember(memberName: string, annotationName: string = null)
    {
        return this.getAnnotations().getAnnotationsFor(memberName, annotationName);
    }

    public getAnnotations() : AnnotatedClass
    {
        return this['constructor']['getAnnotations']();
    }

    public getMemberAnnotations(annotationName: string = null)
    {
        return this.getAnnotations().getAnnotations(annotationName);
    }

    public getAnnotationsForMember(memberName: string, annotationName: string = null)
    {
        return this.getAnnotations().getAnnotationsFor(memberName, annotationName);
    }
}

