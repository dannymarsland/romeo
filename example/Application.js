///<reference path="../vendor/jquery.d"/>
///<reference path="../src/Annotations"/>
///<reference path="../src/AnnotationReader"/>
var Application = (function () {
    function Application() {
    }
    return Application;
})();

/** @bean({"scope":"prototype"}) */
var Gallery = (function () {
    function Gallery() {
    }
    return Gallery;
})();

/** @bean({"scope":"prototype"}) **/
var Slider = (function () {
    function Slider() {
    }
    return Slider;
})();

var JsonProcessor = (function () {
    function JsonProcessor(annotationReader) {
        this.annotationReader = annotationReader;
    }
    JsonProcessor.prototype.classToJson = function (instance) {
        var annotations = this.annotationReader.getAnnotationsForInstance(instance);
        var jsonAnnotations = annotations.getAnnotations('json');
        var json = {};
        for (var i = 0; i < jsonAnnotations.length; i++) {
            var annotation = jsonAnnotations[i];
            if (!annotation.ignore) {
                var oldName = annotation.getType().getName();
                var name = annotation.name ? annotation.name : oldName;
                json[name] = instance[oldName];
            }
        }
        return json;
    };
    return JsonProcessor;
})();

var JsonExample = (function () {
    function JsonExample() {
        /** @json({"ignore":true}) */
        this.ignored = 'this should be ignored';
        /** @json */
        this.id = 123;
        /** @json({"name":"newname"}) */
        this.renamed = 'renamed';
        this.notShown = 'notshown';
    }
    return JsonExample;
})();
//# sourceMappingURL=Application.js.map
