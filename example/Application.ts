///<reference path="../vendor/jquery.d"/>
///<reference path="../src/Annotations"/>
///<reference path="../src/AnnotationReader"/>
///<reference path="../src/Annotated"/>

class Application extends Annotated {

    /** @inject */
    private gallery: Gallery;


    public aTestFunction() {
        return '1234';
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

    public classToJson(obj : Annotated) {
        if (obj instanceof Annotated) {
            var jsonAnnotations = <JsonAnnotation[]>obj.getMemberAnnotations('json');
            var json = {};
            for (var i=0; i<jsonAnnotations.length; i++) {
                var annotation = jsonAnnotations[i];
                if (!annotation.ignore) {
                    var oldName = annotation.getType().getName();
                    var name = annotation.name ? annotation.name : oldName;
                    json[name] = obj[oldName];
                }
            }
            return json;
        } else {
            throw new Error('Object must extend Annotated class :' + obj);
        }
    }
}


class JsonExample extends Annotated  {
    /** @json({"ignore":true}) */
    private ignored : string = 'this should be ignored';
    /** @json */
    private id = 123;
    /** @json({"name":"newname"}) */
    private renamed: string = 'renamed';
    private notShown = 'notshown';
}


