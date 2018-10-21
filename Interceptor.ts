import Property from "./Property.js";

export default abstract class Interceptor<T> {

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor( protected property:Property<any> ) {

        if ( this.property == null )
            throw new Error( "Cannot divide with null" );
    }

    abstract intercept( value:any ):any
}