///<reference path="../vendor/jquery.d"/>
///<reference path="../src/Annotations"/>
///<reference path="../src/AnnotationReader"/>

class Application  {

    /** @inject */
    private gallery: Gallery;

    constructor() {
    }
}

/** @bean({"scope":"prototype"}) */
class Gallery {

    /** @$element({"qs":"#gallery", "root": "body"}) */
    private el: JQuery;

    /** @$element({"qs":"*"}) */
    private $el: JQuery;

    /** @inject */
    private slider: Slider;
}

/** @bean({"scope":"prototype"}) **/
class Slider {
    /** @$element({"qs":".slider", "root":"body"})*/
    private $el: JQuery;
}


class JsonProcessor {
    constructor(private annotationReader: AnnotationReader) {

    }

    public classToJson(instance) {
        var annotations = this.annotationReader.getAnnotationsForInstance(instance);
        var jsonAnnotations = <JsonAnnotation[]>annotations.getAnnotations('json');
        var json = {};
        for (var i=0; i<jsonAnnotations.length; i++) {
            var annotation = jsonAnnotations[i];
            if (!annotation.ignore) {
                var oldName = annotation.getType().getName();
                var name = annotation.name ? annotation.name : oldName;
                json[name] = instance[oldName];
            }
        }
        return json;
    }
}


class JsonExample {
    /** @json({"ignore":true}) */
    private ignored : string = 'this should be ignored';
    /** @json */
    private id = 123;
    /** @json({"name":"newname"}) */
    private renamed: string = 'renamed';
    private notShown = 'notshown';
}