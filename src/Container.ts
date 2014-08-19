///<reference path="AnnotationProcessorInterface"/>
///<reference path="AnnotationReader"/>

class Container {

    private beans: {}[] = [];

    constructor(
        private annotationReader : AnnotationReader,
        private annotationProcessors: AnnotationProcessorInterface[]
        ) {
    }

    public addBean(bean: any) {
        if (this.beans.indexOf(bean) === -1) {
            this.beans.push(bean);
        } else {
            console.debug('Trying to add duplicate bean', bean);
        }
    }

    public process() {
        // ok to add new beans as this loops ?
        var beans = this.beans;
        var annotationReader = this.annotationReader;
        var processors = this.annotationProcessors;
        for (var i=0; i < beans.length; i++) {
            var bean = beans[i];
            for (var j=0; j < processors.length; j++) {
                var processor = processors[j];
                processor.processBean(bean, this, annotationReader);
            }
        }
    }

}
