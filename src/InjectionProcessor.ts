///<reference path="AnnotationProcessorInterface"/>

class InjectionProcessor implements AnnotationProcessorInterface {

    constructor() {

    }

    processBean(bean:{}, container:Container, reader:AnnotationReader) {
        var classAnnotations = reader.getAnnotationsFromInstance(bean);
        if (classAnnotations) {
            var typeAnnotations = classAnnotations.getTypeAnnotations('inject');
            for (var i=0 ; i <typeAnnotations.length; i++) {
                var type = <TypeVariable>typeAnnotations[i].getType();
                var annotation = typeAnnotations[i].getAnnotation('inject');
                var constructorFn = type.getConstructor();
                if (constructorFn) {
                    console.log('Setting: ' + type.getName() + ' as new ' + type.getType());
                    var itemToInject = new constructorFn();
                    bean[type.getName()] = itemToInject;
                    container.addBean(itemToInject);
                } else {
                    throw new Error('Could not get constructor for type:' + type.getType())
                }

            }
        }
    }

    postProcess(beans:{}[], reader:AnnotationReader) {
    }

    getAnnotationNames(): string[] {
        return ['inject'];
    }

}
