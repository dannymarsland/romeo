///<reference path="../vendor/jquery.d"/>
///<reference path="../src/Annotations"/>
///<reference path="../src/AnnotationReader"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application = (function (_super) {
    __extends(Application, _super);
    function Application() {
        _super.apply(this, arguments);
    }
    Application.prototype.aTestFunction = function () {
        return '1234';
    };
    return Application;
})(Annotated);

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
    JsonProcessor.prototype.classToJson = function (obj) {
        debugger;
        if (obj instanceof Annotated) {
            var jsonAnnotations = obj.getMemberAnnotations('json');
            var json = {};
            for (var i = 0; i < jsonAnnotations.length; i++) {
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
    };
    return JsonProcessor;
})();

var JsonExample = (function (_super) {
    __extends(JsonExample, _super);
    function JsonExample() {
        _super.apply(this, arguments);
        /** @json({"ignore":true}) */
        this.ignored = 'this should be ignored';
        /** @json */
        this.id = 123;
        /** @json({"name":"newname"}) */
        this.renamed = 'renamed';
        this.notShown = 'notshown';
    }
    return JsonExample;
})(Annotated);
//# sourceMappingURL=Application.js.map
