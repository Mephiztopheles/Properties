import Property                                  from "../Property.js";
import Interceptor                               from "../Interceptor.js";
import ReadOnlyBooleanProperty                   from "./BooleanProperty.js";
import BooleanProperty, { ToBooleanInterceptor } from "./BooleanProperty.js";
import RegExProperty                             from "./RegExProperty.js";
import ReadOnlyProperty                          from "../ReadOnlyProperty.js";

export default class ReadOnlyStringProperty extends ReadOnlyProperty<string> {

    public get value (): string {
        return this.$get();
    }

    public set value ( value: string ) {
        this.$set( value );
    }

    public concat ( suffix: Property<any> ): ReadOnlyStringProperty {
        return this.intercept( new ConcatenationInterceptor( suffix ), suffix );
    }

    public matches ( property: RegExProperty ): ReadOnlyBooleanProperty {
        return BooleanProperty.toBoolean( this, new MatchesInterceptor( this, property ), property );
    }

    public isEmpty (): ReadOnlyBooleanProperty {
        return BooleanProperty.toBoolean( this, new IsEmptyInterceptor( this, this ), null );
    }

    public isNotEmpty (): ReadOnlyBooleanProperty {
        return this.isEmpty().not();
    }
}

class ConcatenationInterceptor extends Interceptor<string> {

    intercept ( value: string ): string {
        return ( value == null ? "" : value ) + ( this.property.value == null ? "" : this.property.value );
    }
}

class MatchesInterceptor extends ToBooleanInterceptor<string> {

    intercept ( value: boolean ): boolean {
        return this.propertyToCheck.value.match( this.property.value ) != null;
    }
}

class IsEmptyInterceptor extends ToBooleanInterceptor<string> {

    intercept ( value: boolean ): boolean {
        return this.propertyToCheck.value == null || this.propertyToCheck.value == "";
    }
}