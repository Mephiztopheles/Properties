import Property       from "../Property.js";
import Interceptor    from "../Interceptor.js";
import ChangeListener from "../ChangeListener.js";

export default class BooleanProperty extends Property<boolean> {

    static toBoolean ( assignment: Property<any>, interceptor: Interceptor<boolean>, property: Property<any> ) {

        const instance = new BooleanProperty( null, interceptor );

        let toBooleanListener = new ToBooleanListener( <BooleanProperty>instance );
        assignment.addListener( toBooleanListener );
        if ( property != null )
            property.addListener( toBooleanListener );

        return instance;
    }

    public and ( property: BooleanProperty ) {
        return this.intercept( new AndInterceptor( property ), property );
    }

    public or ( property: BooleanProperty ) {
        return this.intercept( new OrInterceptor( property ), property );
    }

    public not () {
        return this.intercept( new NotInterceptor( this ), this );
    }
}

export abstract class ToBooleanInterceptor<T> extends Interceptor<boolean> {

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor ( protected propertyToCheck: Property<T>, property: Property<any> ) {
        super( property );
    }
}

class AndInterceptor extends Interceptor<boolean> {

    intercept ( value: boolean ): boolean {
        return value && this.property.value;
    }
}

class OrInterceptor extends Interceptor<boolean> {

    intercept ( value: boolean ): boolean {
        return value || this.property.value;
    }
}

class NotInterceptor extends Interceptor<boolean> {

    intercept ( value: boolean ): boolean {
        return !this.property.value;
    }
}

class ToBooleanListener implements ChangeListener<any> {

    private value: boolean;

    constructor ( private instance: BooleanProperty ) {
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