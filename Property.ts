import ChangeListener from "./ChangeListener.js";
import Interceptor    from "./Interceptor.js";

interface ChangeListenerLambda<T> {
    ( observable: Property<T>, newValue: T, oldValue: T ): void
}

let id          = 0;
const bindings  = new WeakMap();
const listeners = new WeakMap();

export default class Property<T> implements ChangeListener<T> {

    protected id: number = id++;
    protected $value: T;
    protected interceptor: Interceptor<T>;

    constructor ( value?: T, interceptor?: Interceptor<T> ) {

        listeners.set( this, [] );
        this.$value      = value;
        this.interceptor = interceptor;
    }

    public get value (): T {

        if ( this.interceptor == null )
            return this.$value;

        return this.interceptor.intercept( this.$value );
    }

    public set value ( value: T ) {

        if ( this.$value != value ) {

            const oldValue = this.$value;
            this.$value    = value;

            this.notify( value, oldValue );
        }
    }

    public toString () {

        const value = this.value;
        return value == null ? value : value.toString();
    }

    public get isBound (): boolean {
        return bindings.get( this ) != null;
    }

    public bind ( property: Property<T> ) {

        if ( this === property )
            return;

        this.unbind();

        bindings.set( this, property );
        this.value = property.value;
        property.addListener( this );
    }

    public unbind () {

        if ( !this.isBound )
            return;

        bindings.get( this ).removeListener( this );
        bindings.delete( this );
    }

    public addListener ( listener: ChangeListener<T> | ChangeListenerLambda<T> ) {
        listeners.get( this ).push( listener );
    }

    public removeListener ( listener: ChangeListener<T> | ChangeListenerLambda<T> ) {

        let l     = listeners.get( this );
        let index = l.indexOf( listener );
        if ( ~index )
            l.splice( index, 1 );
    }

    changed ( observable: Property<T> ) {
        this.value = observable.value;
    }

    notify ( newValue: T, oldValue: T ) {

        listeners.get( this ).forEach( listener => {

            if ( typeof listener === "function" )
                listener( this, newValue, oldValue );
            else
                ( <ChangeListener<T>>listener ).changed( this, newValue, oldValue );
        } );
    }

    protected intercept<R extends Property<T>> ( interceptor: Interceptor<T>, property: Property<T> ): R {

        const instance: ( R ) = new ( <any>this.constructor )( this.$value, interceptor );

        instance.bind( this );

        property.addListener( new NotifyListener<T>( instance ) );

        return instance;
    }
}

export class NotifyListener<T> implements ChangeListener<T> {

    constructor ( private property: Property<T> ) {
    }

    changed ( observable: Property<T>, newValue: T, oldValue: T ) {
        this.property.notify( newValue, oldValue );
    }
}