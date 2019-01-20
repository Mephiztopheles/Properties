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

    public constructor ( value?: T[], interceptor?: Interceptor<T[]> ) {

        if ( !Array.isArray( value ) )
            value = [];

        super( value, interceptor );
    }

    public get value (): T[] {
        return this.$get();
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

    public get length (): number {
        return this.$value.length;
    }

    public get ( index: number ): T | undefined {
        return this.$value[ index ];
    }

    public push ( ...items: T[] ): number {

        if ( items.length == 0 )
            return this.$value.length;

        const oldValue = this.$value.slice();

        let length = this.$value.push.apply( this.$value, items );
        this.notify( this.$value, oldValue );
        return length;
    }

    public splice ( start: number, deleteCount?: number, ...items: T[] ): T[] {

        const oldValue = this.$value.slice();
        let deleted    = this.$value.splice.apply( this.$value, arguments );

        if ( deleted.length !== 0 || items.length !== 0 )
            this.notify( this.$value, oldValue );

        return deleted;
    }

    public slice ( start?: number, end?: number ): T[] {
        return this.$value.slice( start, end );
    }

    public sort ( compareFn?: ( a: T, b: T ) => number ): this {

        const oldValue = this.$value.slice();
        this.$value.sort( compareFn );
        if ( this.$value.length != oldValue.length )
            this.notify( this.$value, oldValue );
        return this;
    }

    public indexOf ( searchElement: T, fromIndex?: number ): number {
        return this.$value.indexOf( searchElement, fromIndex );
    }

    public forEach ( callbackfn: ( value: T, index: number, array: T[] ) => void, thisArg?: any ): void {
        this.$value.forEach( callbackfn, thisArg );
    }

    public filter ( callback: ( value: T, index: number, array: T[] ) => any, thisArg?: any ): T[] {
        return this.$value.filter( callback, thisArg );
    }

    public find ( callback: ( value: T, index: number, array: T[] ) => boolean, thisArg?: any ): T {

        for ( let index = 0; index < this.$value.length; index++ )
            if ( callback.call( thisArg, this.$value[ index ], index, this.$value ) )
                return this.$value[ index ];

        return null;
    }

    public pop (): T | undefined {

        const oldValue = this.$value.slice();
        let element    = this.$value.pop();
        if ( this.$value.length != oldValue.length )
            this.notify( this.$value, oldValue );

        return element;
    }
}