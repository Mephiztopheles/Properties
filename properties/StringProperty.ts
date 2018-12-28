import Property                                  from "../Property.js";
import Interceptor                               from "../Interceptor.js";
import BooleanProperty, { ToBooleanInterceptor } from "./BooleanProperty.js";
import RegExProperty                             from "./RegExProperty.js";

export default class StringProperty extends Property<string> {

    public concat ( suffix: StringProperty ): StringProperty {
        return this.intercept( new ConcatenationInterceptor( suffix ), suffix );
    }

    public matches ( property: RegExProperty ):BooleanProperty {
        return BooleanProperty.toBoolean( this, new MatchesInterceptor( this, property ), property );
    }

    public isEmpty (): BooleanProperty {
        return BooleanProperty.toBoolean( this, new IsEmptyInterceptor( this, this ), null );
    }

    public isNotEmpty (): BooleanProperty {
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