import Interceptor    from "./Interceptor.js";
import ChangeListener from "./ChangeListener.js";

interface ChangeListenerLambda<T> {
    ( observable: PropertyBase<T>, newValue: T, oldValue: T ): void
}

let id          = 0;
const bindings  = new WeakMap();
const listeners = new WeakMap();


export default class PropertyBase<T> {

    protected id: number = id++;
    protected $value: T;
    protected interceptor: Interceptor<T>;

    constructor ( value?: T, interceptor?: Interceptor<T> ) {

        listeners.set( this, [] );
        this.$value      = value;
        this.interceptor = interceptor;
    }

    public get isBound (): boolean {
        return bindings.get( this ) != null;
    }

    public get value () {
        return this.$get();
    }

    public set value ( value: T ) {
        throw new Error( "Unsupported Operation" );
    }

    public bind ( property: PropertyBase<T> ): void {

        if ( this === property )
            return;

        this.unbind();

        bindings.set( this, property );
        this.value = property.value;
        property.addListener( this );
    }

    public unbind (): void {

        if ( !this.isBound )
            return;

        bindings.get( this ).removeListener( this );
        bindings.delete( this );
    }

    public addListener ( listener: ChangeListener<T> | ChangeListenerLambda<T> ): void {
        listeners.get( this ).push( listener );
    }

    public removeListener ( listener: ChangeListener<T> | ChangeListenerLambda<T> ): void {

        let l     = listeners.get( this );
        let index = l.indexOf( listener );
        if ( ~index )
            l.splice( index, 1 );
    }

    changed ( observable: PropertyBase<T> ) {
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

    protected $set ( value: T ) {

        if ( this.$value != value ) {

            const oldValue = this.$value;
            this.$value    = value;

            this.notify( value, oldValue );
        }
    }

    protected $get (): T {

        if ( this.interceptor == null )
            return this.$value;

        return this.interceptor.intercept( this.$value );
    }

    protected intercept<R extends PropertyBase<T>> ( interceptor: Interceptor<T>, property: PropertyBase<T> ): R {

        const instance: ( R ) = new ( <any>this.constructor )( this.$value, interceptor );

        instance.bind( this );

        property.addListener( new NotifyListener<T>( instance ) );

        return instance;
    }
}

export class NotifyListener<T> implements ChangeListener<T> {

    constructor ( private property: PropertyBase<T> ) {
    }

    changed ( observable: PropertyBase<T>, newValue: T, oldValue: T ) {
        this.property.notify( newValue, oldValue );
    }
}