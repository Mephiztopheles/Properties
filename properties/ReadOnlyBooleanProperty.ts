import Interceptor      from "../Interceptor.js";
import ReadOnlyProperty from "../ReadOnlyProperty.js";

export default class ReadOnlyBooleanProperty extends ReadOnlyProperty<boolean> {

    public get value (): boolean {
        return this.$get();
    }

    public set value ( value: boolean ) {
        this.$set( value );
    }

    public and ( property: ReadOnlyBooleanProperty ): ReadOnlyBooleanProperty {
        return this.intercept( new AndInterceptor( property ), property );
    }

    public or ( property: ReadOnlyBooleanProperty ): ReadOnlyBooleanProperty {
        return this.intercept( new OrInterceptor( property ), property );
    }

    public not (): ReadOnlyBooleanProperty {
        return this.intercept( new NotInterceptor( this ), this );
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