///<reference path="Annotations"/>

class Defined {

    private static __classDefinition: TypeClass;
    private static __classDefinitionJson: TypeClassJson;

    public static getClassDefinition() : TypeClass
    {
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
            this.__classDefinition = new TypeClass(name, this, parent)
        }
        return this.__classDefinition;
    }

    public getClassDefinition() : TypeClass
    {
        return this['constructor']['getClassDefinition']();
    }

    private static __getClassDefinitionForClass(className: string)
    {
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
            return (<Defined>constructorFn).getClassDefinition();
        }
        // should cache these
        return new TypeClass(className, constructorFn);
    }

    private static __getConstructorFromClassName(name: string) {
        var parts = name.split('.');
        var scope = window;
        for (var i=0; i<parts.length-2; i++) {
            var part = parts[i];
            if (typeof scope[part] == "object" || typeof scope[part] == "function") {
                scope = scope[part];
            } else {
                return null;
            }
        }
        var className= parts[parts.length-1];
        if (typeof scope[className] == "function") {
            return scope[className];
        } else {
            return null;
        }
    }

    private static __findCorrectClassName(name: string) : string {
        if (name.indexOf('.') > -1) {
            throw new Error('Cannot try find correct class name for a namespaced class: ' + name);
        }
        var scope = window;
        var lowercaseClassName = name.toLowerCase();
        // search everything in the window....
        // @todo optimise this - this is called quite often so keep a cache!
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
    }

}