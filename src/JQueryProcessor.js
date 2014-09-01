///<reference path="AnnotationProcessorInterface"/>
///<reference path="Annotations"/>
///<reference path="../vendor/jquery.d"/>
var JQueryProcessor = (function () {
    function JQueryProcessor() {
    }
    JQueryProcessor.prototype.processBean = function (bean, container, reader) {
        var defaultParams = {
            "qs": null,
            "root": "this"
        };
        var classAnnotations = reader.getAnnotationsForInstance(bean);
        if (classAnnotations) {
            var annotations = classAnnotations.getAnnotations('$element');
            for (var i = 0; i < annotations.length; i++) {
                var type = annotations[i].getType();
                var annotation = annotations[i];
                var qs = annotation.qs;
                if (qs) {
                    var root = annotation.root;
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
    };

    JQueryProcessor.prototype.postProcess = function (beans, reader) {
    };

    JQueryProcessor.prototype.getAnnotationNames = function () {
        return ['$element'];
    };
    return JQueryProcessor;
})();
//# sourceMappingURL=JQueryProcessor.js.map
