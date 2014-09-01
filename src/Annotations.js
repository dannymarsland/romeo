///<reference path="AnnotationReader"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BeanAnnotation = (function (_super) {
    __extends(BeanAnnotation, _super);
    function BeanAnnotation() {
        _super.apply(this, arguments);
        this.scope = 'singleton';
    }
    return BeanAnnotation;
})(Annotation);

var $elementAnnotation = (function (_super) {
    __extends($elementAnnotation, _super);
    function $elementAnnotation() {
        _super.apply(this, arguments);
        this.qs = null;
        this.root = 'this';
    }
    return $elementAnnotation;
})(Annotation);

var InjectAnnotation = (function (_super) {
    __extends(InjectAnnotation, _super);
    function InjectAnnotation() {
        _super.apply(this, arguments);
    }
    return InjectAnnotation;
})(Annotation);
//# sourceMappingURL=Annotations.js.map
