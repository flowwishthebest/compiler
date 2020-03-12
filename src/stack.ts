export class Stack<T = any> {
   protected readonly _items: Array<T> = [];

    public push(item: T): this {
        this._items.push(item);
        return this;
    }
        

    public pop(): T {
        return this._items.pop();
    }
        

    public peek(): T {
        return this._items[this._items.length - 1];
    }
}
