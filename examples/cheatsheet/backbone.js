/** Basic types */

const Primitives = Model.extend({
    defaults : {
        a : 1,
        b : 'Hey!',
        c : true
    }
});

const m = new Primitives();

m.set( 'a', m.get( 'a' ) - 1 );
m.set( 'b', '' + m.get( 'a' ) - 1 );
m.set( 'c', !!m.get( 'a' ) );

const Objects = Model.extend({
    defaults(){
        return {
            obj : {},
            arr : [],
            time : new Date()
        }
    },

    parse( data ){
        const parsed = {};
        if( data.time ){
            parsed.time = new Data( data.time );
        } 
        
        return _.defaults( parsed, data );
    }
});

const o = new Objects();
o.time = new Date( "1-1-2016 17:55:22" );

const A = Model.extend({
    defaults : {
        a : 1
    }
});

const B = A.extend({
    defaults : _.defaults({
        b : 1
    }, A.prototype.defaults )
});

const Smart = Model.extend({
    defaults : {
        a : 1,
        changedCount : 0
    },

    inc(){
        this.set( 'changedCount', this.get( 'changedCount') + 1 );
    },

    initialize(){
        this.listenTo( this, 'change:changedCount', this.inc );
    }
});

const Sum = Model.extend({
    defaults : {
        a : 1,
        b : 2,
        sum : 3
    },

    initialize(){
        this.listenTo( this, 'change:a change:b', this.calcSum );
        this.listenTo( this, 'change:sum', ( self, sum ) => sum < 5 || ( self.sum = 0 ) );
    },

    calcSum(){
        this.set( 'sum', this.get( 'a' ) + this.get( 'b' ) );
    }
});