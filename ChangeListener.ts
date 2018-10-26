import Property from "./Property.js";

export default interface ChangeListener<T> {
    changed( observable:Property<T>, newValue:T, oldValue:T ):void
}

export class ChangeListenerLambdaAdapter implements ChangeListener<any> {

    constructor( private method:( observable:Property<any>, newValue:any, oldValue:any ) => void ) {
    }

    changed( observable:Property<any>, newValue:any, oldValue:any ):void {
        this.method( observable, newValue, oldValue );
    }
}