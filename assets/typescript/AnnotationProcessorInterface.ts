///<reference path="AnnotationReader"/>
///<reference path="Container"/>

interface AnnotationProcessorInterface {
    processBean(bean: {}, container: Container, reader: AnnotationReader)
    postProcess(beans: {}[], reader: AnnotationReader);
    getAnnotationNames(): string[];
}