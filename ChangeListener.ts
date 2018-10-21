import Property from "./Property.js";

export default interface ChangeListener<T> {
    changed( observable:Property<T>, source?:Property<T> ):void
}

export class ChangeListenerLambdaAdapter implements ChangeListener<any> {
    constructor( private  method:( observable:Property<any>, source?:Property<any> ) => void ) {
    }

    changed( observable:Property<any>, source?:Property<any> ):void {
        this.method( observable, source );
    }
}