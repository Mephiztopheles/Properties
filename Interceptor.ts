import PropertyBase from "./PropertyBase.js";

export default abstract class Interceptor<T> {

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor ( protected property: PropertyBase<any> ) {

        if ( this.property == null )
            throw new Error( "Cannot intercept with null" );
    }

    abstract intercept ( value: T ): any
}