///<reference path="AnnotationProcessorInterface"/>
var InjectionProcessor = (function () {
    function InjectionProcessor() {
    }
    InjectionProcessor.prototype.processBean = function (bean, container, reader) {
        var classAnnotations = reader.getAnnotationsFromInstance(bean);
        if (classAnnotations) {
            var typeAnnotations = classAnnotations.getTypeAnnotations('inject');
            for (var i = 0; i < typeAnnotations.length; i++) {
                var type = typeAnnotations[i].getType();
                var annotation = typeAnnotations[i].getAnnotation('inject');
                var constructorFn = type.getConstructor();
                if (constructorFn) {
                    console.log('Setting: ' + type.getName() + ' as new ' + type.getType());
                    var itemToInject = new constructorFn();
                    bean[type.getName()] = itemToInject;
                    container.addBean(itemToInject);
                } else {
                    throw new Error('Could not get constructor for type:' + type.getType());
                }
            }
        }
    };

    InjectionProcessor.prototype.postProcess = function (beans, reader) {
    };

    InjectionProcessor.prototype.getAnnotationNames = function () {
        return ['inject'];
    };
    return InjectionProcessor;
})();
//# sourceMappingURL=InjectionProcessor.js.map
