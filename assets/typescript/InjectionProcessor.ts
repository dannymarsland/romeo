///<reference path="AnnotationProcessorInterface"/>

class InjectionProcessor implements AnnotationProcessorInterface {

    constructor() {

    }

    processBean(bean:{}, container: Container, reader:AnnotationReader) {
        console.log('Proccessing injections');
        var classAnnotations = reader.getAnnotationsForInstance(bean);
        if (classAnnotations) {
            var annotations : Annotation[] = classAnnotations.getAnnotations('inject');
            for (var i=0 ; i < annotations.length; i++) {
                var type = annotations[i].getType();
                var name = type.getName();
                if (typeof bean[name] !== "undefined") {
                    throw new Error('Could not inject "' + name + '" for type ' + type.getType() + ' as it is already defined')
                }
                var constructorFn = type.getConstructor();
                if (constructorFn) {
                    console.log('Setting: ' + type.getName() + ' as new ' + type.getType());
                    var itemToInject = container.getBean(constructorFn);
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
        return ['inject', 'bean'];
    }

}
