import ReadOnlyBooleanProperty from "./ReadOnlyBooleanProperty.js";
import Property                from "../Property.js";
import Interceptor             from "../Interceptor.js";
import ChangeListener          from "../ChangeListener.js";

export default class BooleanProperty extends ReadOnlyBooleanProperty {

    public get value () {
        return this.$get();
    }

    public set value ( value: boolean ) {
        this.$set( value );
    }

    public static toBoolean ( assignment: Property<any>, interceptor: Interceptor<boolean>, property: Property<any> ): ReadOnlyBooleanProperty {

        const instance = new BooleanProperty( null, interceptor );

        let toBooleanListener = new ToBooleanListener( <ReadOnlyBooleanProperty>instance );
        assignment.addListener( toBooleanListener );
        if ( property != null )
            property.addListener( toBooleanListener );

        return instance;
    }
}

class ToBooleanListener implements ChangeListener<any> {

    private value: boolean;

    constructor ( private instance: ReadOnlyBooleanProperty ) {
        this.value = instance.value;
    }

    changed ( observable: Property<any>, newValue: any, oldValue: any ) {

        let value = this.instance.value;
        if ( this.value !== value ) {

            this.value = value;
            this.instance.notify( newValue, oldValue );
        }
    }
}

export abstract class ToBooleanInterceptor<T> extends Interceptor<boolean> {

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor ( protected propertyToCheck: Property<T>, property: Property<any> ) {
        super( property );
    }
}