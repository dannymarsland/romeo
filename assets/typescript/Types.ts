
interface Type {
    getName(): string;
    getType(): string;
    getConstructor(): any;
}

class TypeVariable implements Type {
    constructor(
        private name: string,
        private type: string,
        private classType: TypeClass,
        private isArray: boolean
        ) {
    }

    public getName() {
        return this.name;
    }

    public getType() {
        return this.type;
    }

    public getIsArray() {
        return this.isArray;
    }

    public getClass() {
        return this.classType;
    }

    public getConstructor() {
        if (this.classType) {
            return this.classType.getConstructor();
        }
        return null;
    }

    public toJSON() {
        return {
            "name": this.name,
            "type": this.type,
            "isArray": this.isArray
        }
    }
}

class TypeFunction implements Type {

    private type: string = "function";

    constructor(
        private name: string,
        private returns: TypeVariable
        ) {
    }

    public getName() {
        return this.name;
    }

    public getType() {
        return this.type;
    }

    public getReturns() {
        return this.returns;
    }

    public getConstructor() {
        return null;
    }

    public toJSON() {
        return {
            "name": this.name,
            "type": this.type,
            "returns": this.returns
        }
    }
}


class TypeClass implements Type {

    private type: string = 'constructor';

    constructor(private className: string, private constructorFn: any, private parent: string = null) {
    }

    public getName() {
        return this.className;
    }

    public getParent() {
        return this.parent;
    }

    public getType() {
        return this.type
    }

    public getConstructor() {
        return this.constructorFn;
    }

    public toJSON() {
        return {
            "name": this.className,
            "parent": this.parent,
            "type": this.type
        }
    }
}
