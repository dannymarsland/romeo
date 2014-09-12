///<reference path="AnnotationReader"/>

class BeanAnnotation extends Annotation {
    scope: string = 'singleton';
}

class $elementAnnotation extends Annotation {
    qs: string = null;
    root: string = 'this';
}

class InjectAnnotation extends Annotation {

}


class JsonAnnotation extends Annotation {
    name: string = null;
    ignore: boolean = false;
}

