import Property    from "../Property.js";
import Interceptor from "Interceptor.js";


function toJSON ( object ) {

    const cache = [];
    return JSON.stringify( object, function ( key, value ) {
        if ( typeof value === 'object' && value !== null ) {
            if ( cache.indexOf( value ) !== -1 ) {
                // Duplicate reference found
                try {
                    // If this value does not reference a parent it can be deduped
                    return JSON.parse( JSON.stringify( value ) );
                } catch ( error ) {
                    // discard key if value cannot be deduped
                    return;
                }
            }
            // Store value in our collection
            cache.push( value );
        }
        return value;
    } );
}

export default class ArrayProperty<T> extends Property<T[]> {

    constructor ( value?: T[], interceptor?: Interceptor<T> ) {

        if ( !Array.isArray( value ) )
            value = [];

        super( value, interceptor );
    }

    get ( index: number ): T | undefined {
        return this.$value[ index ];
    }

    public get value (): T[] {

        if ( this.interceptor == null )
            return this.$value;

        return this.interceptor.intercept( this.$value );
    }

    public get length () {
        return this.$value.length;
    }

    public set value ( value: T[] ) {

        if ( value == null )
            value = [];

        if ( toJSON( this.$value ) != toJSON( value ) ) {

            const oldValue = this.$value.slice();
            this.$value    = value.slice();

            this.notify( value, oldValue );
        }
    }

    push ( ...items: T[] ): number {

        if ( items.length == 0 )
            return this.$value.length;

        const oldValue = this.$value.slice();

        let length = this.$value.push.apply( this.$value, items );
        this.notify( this.$value, oldValue );
        return length;
    }

    splice ( start: number, deleteCount?: number, ...items: T[] ): T[] {

        const oldValue = this.$value.slice();
        let deleted    = this.$value.splice.apply( this.$value, arguments );

        if ( deleted.length !== 0 || items.length !== 0 )
            this.notify( this.$value, oldValue );

        return deleted;
    }

    slice ( start?: number, end?: number ): T[] {
        return this.$value.slice( start, end );
    }

    sort ( compareFn?: ( a: T, b: T ) => number ): this {

        const oldValue = this.$value.slice();
        this.$value.sort( compareFn );
        if ( this.$value.length != oldValue.length )
            this.notify( this.$value, oldValue );
        return this;
    }

    indexOf ( searchElement: T, fromIndex?: number ): number {
        return this.$value.indexOf( searchElement, fromIndex );
    }

    forEach ( callbackfn: ( value: T, index: number, array: T[] ) => void, thisArg?: any ): void {
        this.$value.forEach( callbackfn, thisArg );
    }

    pop (): T | undefined {

        const oldValue = this.$value.slice();
        let element    = this.$value.pop();
        if ( this.$value.length != oldValue.length )
            this.notify( this.$value, oldValue );

        return element;
    }
}