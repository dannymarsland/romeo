var TypeVariable = (function () {
    function TypeVariable(name, type, classType, isArray) {
        this.name = name;
        this.type = type;
        this.classType = classType;
        this.isArray = isArray;
    }
    TypeVariable.prototype.getName = function () {
        return this.name;
    };

    TypeVariable.prototype.getType = function () {
        return this.type;
    };

    TypeVariable.prototype.getIsArray = function () {
        return this.isArray;
    };

    TypeVariable.prototype.getClass = function () {
        return this.classType;
    };

    TypeVariable.prototype.getConstructor = function () {
        if (this.classType) {
            return this.classType.getConstructor();
        }
        return null;
    };

    TypeVariable.prototype.toJSON = function () {
        return {
            "name": this.name,
            "type": this.type,
            "isArray": this.isArray
        };
    };
    return TypeVariable;
})();

var TypeFunction = (function () {
    function TypeFunction(name, returns) {
        this.name = name;
        this.returns = returns;
        this.type = "function";
    }
    TypeFunction.prototype.getName = function () {
        return this.name;
    };

    TypeFunction.prototype.getType = function () {
        return this.type;
    };

    TypeFunction.prototype.getReturns = function () {
        return this.returns;
    };

    TypeFunction.prototype.getConstructor = function () {
        return null;
    };

    TypeFunction.prototype.toJSON = function () {
        return {
            "name": this.name,
            "type": this.type,
            "returns": this.returns
        };
    };
    return TypeFunction;
})();

var TypeClass = (function () {
    function TypeClass(className, constructorFn, parent) {
        if (typeof parent === "undefined") { parent = null; }
        this.className = className;
        this.constructorFn = constructorFn;
        this.parent = parent;
        this.type = 'constructor';
    }
    TypeClass.prototype.getName = function () {
        return this.className;
    };

    TypeClass.prototype.getParent = function () {
        return this.parent;
    };

    TypeClass.prototype.getType = function () {
        return this.type;
    };

    TypeClass.prototype.getConstructor = function () {
        return this.constructorFn;
    };

    TypeClass.prototype.toJSON = function () {
        return {
            "name": this.className,
            "parent": this.parent,
            "type": this.type
        };
    };
    return TypeClass;
})();
//# sourceMappingURL=Types.js.map
