///<reference path="AnnotationProcessorInterface"/>
///<reference path="../vendor/jquery.d"/>

class JQueryProcessor implements AnnotationProcessorInterface {

    constructor() {

    }

    processBean(bean:{}, container:Container, reader:AnnotationReader) {
        var defaultParams = {
            "qs": null,
            "root": "this"
        };
        var classAnnotations = reader.getAnnotationsForInstance(bean);
        if (classAnnotations) {
            var typeAnnotations = classAnnotations.getTypeAnnotations('$element');
            for (var i=0 ; i <typeAnnotations.length; i++) {
                var type = <TypeVariable>typeAnnotations[i].getType();
                var annotation = typeAnnotations[i].getAnnotation('$element');
                var params = annotation.getParams(defaultParams);
                var qs = params['qs'];
                if (qs) {
                    var root = params['root'];
                    if (root === "this") {
                        var query = '' + qs;
                        if (bean['el']) {
                            console.log('Setting: ' + type.getName() + " as results of $(this.el).find('" + query + "') ");
                            var $result = $(bean['el']).find(query);
                        } else {
                            throw new Error('Cannot get $element for member ' + type.getName() + ' of class ' + classAnnotations.getType().getName() + ' using root "' + root + '" as class does not have required member "el" defined');
                        }
                        console.log('Setting: ' + type.getName() + " as results of $('" + query + "') ");
                    } else {
                        var query = root + ' ' + qs;
                        console.log('Setting: ' + type.getName() + " as results of $('" + query + "') ");
                        var $result = $(query);
                    }

                    if ($result.length >= 1) {
                        bean[type.getName()] = $result;
                    } else {
                        throw new Error("No elements match '" + query + "'");
                    }

                } else {
                    throw new Error("$element annotation must have 'qs' param");
                }
            }
        }
    }

    postProcess(beans:{}[], reader:AnnotationReader) {
    }

    getAnnotationNames(): string[] {
        return ['$element'];
    }

}
