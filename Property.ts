import ChangeListener from "./ChangeListener.js";
import Interceptor    from "./Interceptor.js";

interface ChangeListenerLambda<T> {
    ( observable:Property<T>, newValue:T, oldValue:T ):void
}

export default class Property<T> implements ChangeListener<T> {

    protected bound:Property<T>;
    protected listener:Array<ChangeListener<T> | ChangeListenerLambda<T>> = [];
    protected $value:T;
    protected interceptor:Interceptor<T>;

    constructor( value?:T, interceptor?:Interceptor<T> ) {

        this.value = value;
        this.interceptor = interceptor;
    }

    public get value():T {

        if ( this.interceptor == null )
            return this.$value;

        return this.interceptor.intercept( this.$value );
    }

    public set value( value:T ) {

        if ( this.$value != value ) {

            const oldValue = this.$value;
            this.$value = value;

            this.notify( value, oldValue );
        }
    }

    public get isBound():boolean {
        return this.bound != null;
    }

    public bind( property:Property<T> ) {

        this.bound = property;
        this.value = this.bound.value;
        this.bound.addListener( this );
    }

    public unbind() {

        if ( !this.isBound )
            return;

        this.bound.removeListener( this );
        this.bound = null;
    }

    public addListener( listener:ChangeListener<T> | ChangeListenerLambda<T> ) {
        this.listener.push( listener );
    }

    public removeListener( listener:ChangeListener<T> | ChangeListenerLambda<T> ) {

        let index = this.listener.indexOf( listener );
        if ( ~index )
            this.listener.splice( index, 1 );
    }

    changed( observable:Property<T> ) {
        this.value = observable.value;
    }

    notify( newValue:T, oldValue:T ) {

        this.listener.forEach( listener => {

            if ( typeof listener === "function" )
                listener( this, newValue, oldValue );

            if ( listener.hasOwnProperty( "changed" ) )
                ( <ChangeListener<T>>listener ).changed( this, newValue, oldValue );
        } );
    }

    protected intercept( interceptor:Interceptor<T>, property:Property<T> ) {

        const instance:Property<T> = new ( <any>this.constructor )( this.$value, interceptor );

        instance.bind( this );

        property.addListener( new NotifyListener<T>( instance ) );

        return instance;
    }
}

export class NotifyListener<T> implements ChangeListener<T> {

    constructor( private property:Property<T> ) {
    }

    changed( observable:Property<T>, newValue:T, oldValue:T ) {
        this.property.notify( newValue, oldValue );
    }
}