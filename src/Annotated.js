///<reference path="Annotations"/>
///<reference path="Defined"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Annotated = (function (_super) {
    __extends(Annotated, _super);
    function Annotated() {
        _super.apply(this, arguments);
    }
    Annotated.getAnnotations = function () {
        if (!this.__annotations) {
            this.__annotations = new AnnotatedClass(this.getClassDefinition(), []);
        }
        return this.__annotations;
    };

    Annotated.getMemberAnnotations = function (annotationName) {
        if (typeof annotationName === "undefined") { annotationName = null; }
        return this.getAnnotations().getAnnotations(annotationName);
    };

    Annotated.getAnnotationsForMember = function (memberName, annotationName) {
        if (typeof annotationName === "undefined") { annotationName = null; }
        return this.getAnnotations().getAnnotationsFor(memberName, annotationName);
    };

    Annotated.prototype.getAnnotations = function () {
        return this['constructor']['getAnnotations']();
    };

    Annotated.prototype.getMemberAnnotations = function (annotationName) {
        if (typeof annotationName === "undefined") { annotationName = null; }
        return this.getAnnotations().getAnnotations(annotationName);
    };

    Annotated.prototype.getAnnotationsForMember = function (memberName, annotationName) {
        if (typeof annotationName === "undefined") { annotationName = null; }
        return this.getAnnotations().getAnnotationsFor(memberName, annotationName);
    };
    return Annotated;
})(Defined);
//# sourceMappingURL=Annotated.js.map
