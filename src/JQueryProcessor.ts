///<reference path="AnnotationProcessorInterface"/>
///<reference path="../vendor/jquery.d"/>

class JQueryProcessor implements AnnotationProcessorInterface {

    constructor() {

    }

    processBean(bean:{}, container:Container, reader:AnnotationReader) {
        var classAnnotations = reader.getAnnotationsFromInstance(bean);
        if (classAnnotations) {
            var typeAnnotations = classAnnotations.getTypeAnnotations('$element');
            for (var i=0 ; i <typeAnnotations.length; i++) {
                var type = <TypeVariable>typeAnnotations[i].getType();
                var annotation = typeAnnotations[i].getAnnotation('$element');
                var params = annotation.getParams();
                var qs = params['qs'];
                if (qs) {
                    console.log('Setting: ' + type.getName() + " as results of $('" + qs + "') ");
                    var $result = $(qs);
                    if ($result.length >= 1) {
                        bean[type.getName()] = $result;
                    } else {
                        throw new Error("No elements match '" + qs + "'");
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
