import Property                                  from "../Property.js";
import Interceptor                               from "../Interceptor.js";
import BooleanProperty, { ToBooleanInterceptor } from "./BooleanProperty.js";


export default class NumberProperty extends Property<number> {

    public divide( property:NumberProperty ) {
        return this.intercept( new DivideInterceptor( property ), property );
    }

    public subtract( property:NumberProperty ) {
        return this.intercept( new SubtractInterceptor( property ), property );
    }

    public add( property:NumberProperty ) {
        return this.intercept( new AddInterceptor( property ), property );
    }

    public multiply( property:NumberProperty ) {
        return this.intercept( new MultiplyInterceptor( property ), property );
    }

    public greaterThan( property:NumberProperty ):BooleanProperty {
        return BooleanProperty.toBoolean( this, new GreaterThanInterceptor( this, property ), property );
    }

    public lowerThan( property:NumberProperty ):BooleanProperty {
        return BooleanProperty.toBoolean( this, new LowerThanInterceptor( this, property ), property );
    }
}

class AddInterceptor extends Interceptor<number> {

    intercept( value:number ):number {

        if ( value == null || this.property.value == null )
            return null;

        return value + this.property.value;
    }
}

class SubtractInterceptor extends Interceptor<number> {

    intercept( value:number ):number {

        if ( value == null || this.property.value == null )
            return null;

        return value - this.property.value;
    }
}

class MultiplyInterceptor extends Interceptor<number> {

    intercept( value:number ):number {

        if ( value == null || this.property.value == null )
            return null;

        return value * this.property.value;
    }
}

class DivideInterceptor extends Interceptor<number> {

    intercept( value:number ):number {

        if ( value == null || this.property.value == null )
            return null;

        return value / this.property.value;
    }
}

class GreaterThanInterceptor extends ToBooleanInterceptor<number> {

    intercept( value:boolean ):boolean {
        return this.propertyToCheck.value > this.property.value;
    }
}

class LowerThanInterceptor extends ToBooleanInterceptor<number> {

    intercept( value:boolean ):boolean {
        return this.propertyToCheck.value < this.property.value;
    }
}