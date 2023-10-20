console.clear();


class Car extends ToJson {
    x = null;
    #y = null;
    
    constructor(x, y){
        super();
        this.x = x;
        this.#y = y;
    }

    get y() {
        return this.#y;
    }

    toJSON() {
        return super.toJSON('x', 'y');
    }
}

var c = new Car(56, 78);

console.log(c, JSON.stringify(c));