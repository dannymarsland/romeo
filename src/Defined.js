///<reference path="Annotations"/>
var Defined = (function () {
    function Defined() {
    }
    Defined.getClassDefinition = function () {
        if (!this.__classDefinition) {
            var definition = this.__classDefinitionJson;
            if (typeof definition !== 'object' || definition === null) {
                console.error('Class must have static property __classDefinitionJson', this);
                throw new Error('Class must have static property __classDefinitionJson');
            }
            var name = definition.name;
            if (typeof name !== 'string' || name.length < 1) {
                console.error('Invalid class name in __classDefinitionJson: "' + name + '"', this);
                throw new Error('Invalid class name in __classDefinitionJson: "' + name + '"');
            }
            var parent = definition.parent;
            this.__classDefinition = new TypeClass(name, this, parent);
        }
        return this.__classDefinition;
    };

    Defined.prototype.getClassDefinition = function () {
        return this['constructor']['getClassDefinition']();
    };

    Defined.__getClassDefinitionForClass = function (className) {
        var constructorFn = this.__getConstructorFromClassName(className);
        if (constructorFn == null) {
            var correctClassName = this.__findCorrectClassName(className);
            if (correctClassName !== null) {
                className = correctClassName;
                constructorFn = this.__getConstructorFromClassName(className);
            }
        }

        if (constructorFn === null) {
            throw new Error('Could not find class ' + className);
        }

        if (typeof constructorFn['getClassDefinition'] === 'function') {
            return constructorFn.getClassDefinition();
        }

        // should cache these
        return new TypeClass(className, constructorFn);
    };

    Defined.__getConstructorFromClassName = function (name) {
        var parts = name.split('.');
        var scope = window;
        for (var i = 0; i < parts.length - 2; i++) {
            var part = parts[i];
            if (typeof scope[part] == "object" || typeof scope[part] == "function") {
                scope = scope[part];
            } else {
                return null;
            }
        }
        var className = parts[parts.length - 1];
        if (typeof scope[className] == "function") {
            return scope[className];
        } else {
            return null;
        }
    };

    Defined.__findCorrectClassName = function (name) {
        if (name.indexOf('.') > -1) {
            throw new Error('Cannot try find correct class name for a namespaced class: ' + name);
        }
        var scope = window;
        var lowercaseClassName = name.toLowerCase();

        for (var key in scope) {
            if (scope.hasOwnProperty(key)) {
                if (lowercaseClassName == key.toLowerCase()) {
                    // we have a match hopefully...
                    if (typeof scope[key] == "function") {
                        return key;
                    }
                }
            }
        }
        return null;
    };
    return Defined;
})();
//# sourceMappingURL=Defined.js.map
