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

    Container.prototype.getExistingBean = function (classConstructor) {
        for (var i = 0; i < this.beans.length; i++) {
            if (this.beans[i].constructor === classConstructor) {
                return this.beans[i];
            }
        }
        return null;
    };

    Container.prototype.getBean = function (classConstructor) {
        var classAnnotations = this.annotationReader.getAnnotations(classConstructor);
        if (classAnnotations) {
            var beanAnnotation = classAnnotations.getClassAnnotation('bean');
            if (beanAnnotation) {
                var params = beanAnnotation.getParams({
                    'scope': 'singleton'
                });
                var type = beanAnnotation.getType();
                var constructorFn = type.getConstructor();
                var scope = params['scope'];
                if (scope == 'singleton') {
                    var bean = this.getExistingBean(classConstructor);
                    if (bean) {
                        return bean;
                    } else {
                        throw new Error('Cannot find bean of type ' + type.getName() + ' in container. ');
                    }
                } else if (scope == 'prototype') {
                    if (constructorFn) {
                        var bean = new constructorFn();
                        this.addBean(bean);
                        return bean;
                    } else {
                        throw new Error('Could not get constructor for type:' + type.getName() + ' and so cannot create bean of this type');
                    }
                }
            } else {
                throw new Error('Cannot get bean of class ' + classAnnotations.getType().getName() + ' as it does not have @bean annotation');
            }
        } else {
            throw new Error('Could not get annotations for class: ' + classConstructor);
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
