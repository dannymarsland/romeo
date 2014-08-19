///<reference path="AnnotationProcessorInterface"/>
///<reference path="AnnotationReader"/>
var Container = (function () {
    function Container(annotationReader, annotationProcessors) {
        this.annotationReader = annotationReader;
        this.annotationProcessors = annotationProcessors;
        this.beans = [];
    }
    Container.prototype.addBean = function (bean) {
        if (this.beans.indexOf(bean) === -1) {
            this.beans.push(bean);
        } else {
            console.debug('Trying to add duplicate bean', bean);
        }
    };

    Container.prototype.process = function () {
        // ok to add new beans as this loops ?
        var beans = this.beans;
        var annotationReader = this.annotationReader;
        var processors = this.annotationProcessors;
        for (var i = 0; i < beans.length; i++) {
            var bean = beans[i];
            for (var j = 0; j < processors.length; j++) {
                var processor = processors[j];
                processor.processBean(bean, this, annotationReader);
            }
        }
    };
    return Container;
})();
//# sourceMappingURL=Container.js.map
