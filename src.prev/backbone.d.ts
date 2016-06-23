// Based on
// Type definitions for Backbone 1.0.0
// Project: http://backbonejs.org/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>, Natan Vivo <https://github.com/nvivo/>

declare namespace Backbone {
    interface AddOptions extends Silenceable {
        at?: number;
        merge?: boolean;
    }

    interface Silenceable {
        silent?: boolean;
    }

    interface Validable {
        validate?: boolean;
    }

    interface Waitable {
        wait?: boolean;
    }

    interface Parseable {
        parse?: any;
    }

    interface PersistenceOptions {
        url?: string;
        data?: any;
        beforeSend?: (jqxhr: JQueryXHR) => void;
        success?: (modelOrCollection?: any, response?: any, options?: any) => void;
        error?: (modelOrCollection?: any, jqxhr?: JQueryXHR, options?: any) => void;
    }

    interface ModelSetOptions extends Silenceable, Validable {}

    interface ModelFetchOptions extends PersistenceOptions, ModelSetOptions, Parseable {}

    interface ModelSaveOptions extends Silenceable, Waitable, Validable, Parseable, PersistenceOptions {
        patch?: boolean;
    }

    interface ModelDestroyOptions extends Waitable, PersistenceOptions {
    }

    interface CollectionFetchOptions extends PersistenceOptions, Parseable {
        reset?: boolean;
    }

    interface ObjectHash {
        [key: string]: any;
    }

    interface EventsHash {
        [selector: string]: string | {(eventObject: JQueryEventObject): void};
    }

    class Events {
        on(eventName: string, callback?: Function, context?: any): any;
        on(eventMap: EventsHash): any;
        off(eventName?: string, callback?: Function, context?: any): any;
        trigger(eventName: string, ...args: any[]): any;
        bind(eventName: string, callback: Function, context?: any): any;
        unbind(eventName?: string, callback?: Function, context?: any): any;

        once(events: string, callback: Function, context?: any): any;
        listenTo(object: any, events: string, callback: Function): any;
        listenToOnce(object: any, events: string, callback: Function): any;
        stopListening(object?: any, events?: string, callback?: Function): any;
    }

    class ModelBase extends Events {
        parse(response: any, options?: any): any;
        toJSON(options?: any): any;
    }

    class Model extends ModelBase {
        static extend(properties: any, classProperties?: any): any;

        attributes: {};
        changed: {};

        cid: string;
        collection: Collection<any>;

        defaults( attrs? : {} ): ObjectHash;

        id: string | number;
        idAttribute: string;

        constructor(attributes?: any, options?: any);
        initialize(attributes?: any, options?: any): void;

        set(obj: any, options?: ModelSetOptions): Model;

        changedAttributes(attributes?: any): any[];

        clone(): Model;

        hasChanged(attribute?: string): boolean;

        previous(attribute: string): any;
        previousAttributes(): any[];
    }

    class Collection<TModel extends Model> extends ModelBase {

        /**
        * Do not use, prefer TypeScript's extend functionality.
        **/
        private static extend(properties: any, classProperties?: any): any;

        model: new (...args:any[]) => TModel;
        models: TModel[];
        length: number;

        constructor(models?: TModel[] | Object[], options?: any);
        initialize(models?: TModel[] | Object[], options?: any): void;

        fetch(options?: CollectionFetchOptions): JQueryXHR;

        /**
         * Specify a model attribute name (string) or function that will be used to sort the collection.
         */
        comparator: string | ((element: TModel) => number | string) | ((compare: TModel, to?: TModel) => number);

        add(model: {}|TModel, options?: AddOptions): TModel;
        add(models: ({}|TModel)[], options?: AddOptions): TModel[];
        at(index: number): TModel;
        /**
         * Get a model from a collection, specified by an id, a cid, or by passing in a model.
         **/
        get(id: number|string|Model): TModel;
        create(attributes: any, options?: ModelSaveOptions): TModel;
        pluck(attribute: string): any[];
        push(model: TModel, options?: AddOptions): TModel;
        pop(options?: Silenceable): TModel;
        remove(model: TModel, options?: Silenceable): TModel;
        remove(models: TModel[], options?: Silenceable): TModel[];
        reset(models?: TModel[], options?: Silenceable): TModel[];
        set(models?: TModel[], options?: Silenceable): TModel[];
        shift(options?: Silenceable): TModel;
        sort(options?: Silenceable): Collection<TModel>;
        unshift(model: TModel, options?: AddOptions): TModel;
        where(properties: any): TModel[];
        findWhere(properties: any): TModel;

        private _prepareModel(attributes?: any, options?: any): any;
        private _removeReference(model: TModel): void;
        private _onModelEvent(event: string, model: TModel, collection: Collection<TModel>, options: any): void;

        // mixins from underscore

        all(iterator: (element: TModel, index: number) => boolean, context?: any): boolean;
        any(iterator: (element: TModel, index: number) => boolean, context?: any): boolean;
        collect(iterator: (element: TModel, index: number, context?: any) => any[], context?: any): any[];
        chain(): any;
        contains(value: any): boolean;
        countBy(iterator: (element: TModel, index: number) => any): _.Dictionary<number>;
        countBy(attribute: string): _.Dictionary<number>;
        detect(iterator: (item: any) => boolean, context?: any): any; // ???
        drop(): TModel;
        drop(n: number): TModel[];
        each(iterator: (element: TModel, index: number, list?: any) => void, context?: any): any;
        every(iterator: (element: TModel, index: number) => boolean, context?: any): boolean;
        filter(iterator: (element: TModel, index: number) => boolean, context?: any): TModel[];
        find(iterator: (element: TModel, index: number) => boolean, context?: any): TModel;
        first(): TModel;
        first(n: number): TModel[];
        foldl(iterator: (memo: any, element: TModel, index: number) => any, initialMemo: any, context?: any): any;
        forEach(iterator: (element: TModel, index: number, list?: any) => void, context?: any): any;
        groupBy(iterator: (element: TModel, index: number) => string, context?: any): _.Dictionary<TModel[]>;
        groupBy(attribute: string, context?: any): _.Dictionary<TModel[]>;
        include(value: any): boolean;
        indexOf(element: TModel, isSorted?: boolean): number;
        initial(): TModel;
        initial(n: number): TModel[];
        inject(iterator: (memo: any, element: TModel, index: number) => any, initialMemo: any, context?: any): any;
        isEmpty(object: any): boolean;
        invoke(methodName: string, args?: any[]): any;
        last(): TModel;
        last(n: number): TModel[];
        lastIndexOf(element: TModel, fromIndex?: number): number;
        map(iterator: (element: TModel, index: number, context?: any) => any, context?: any): any[];
        max(iterator?: (element: TModel, index: number) => any, context?: any): TModel;
        min(iterator?: (element: TModel, index: number) => any, context?: any): TModel;
        reduce(iterator: (memo: any, element: TModel, index: number) => any, initialMemo: any, context?: any): any;
        select(iterator: any, context?: any): any[];
        size(): number;
        shuffle(): any[];
        slice(min: number, max?: number): TModel[];
        some(iterator: (element: TModel, index: number) => boolean, context?: any): boolean;
        sortBy(iterator: (element: TModel, index: number) => number, context?: any): TModel[];
        sortBy(attribute: string, context?: any): TModel[];
        sortedIndex(element: TModel, iterator?: (element: TModel, index: number) => number): number;
        reduceRight(iterator: (memo: any, element: TModel, index: number) => any, initialMemo: any, context?: any): any[];
        reject(iterator: (element: TModel, index: number) => boolean, context?: any): TModel[];
        rest(): TModel;
        rest(n: number): TModel[];
        tail(): TModel;
        tail(n: number): TModel[];
        toArray(): any[];
        without(...values: any[]): TModel[];
    }
}
