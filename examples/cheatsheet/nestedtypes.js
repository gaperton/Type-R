const M = Model.extend({
    defaults : {
        a : 1,
        b : 'Hey!',
        c : true
    }
});

const m = new M();

m.a--;
m.b = m.a - 1;
m.c = m.a;

const Objects = Model.extend({
    defaults : {
        obj : {},
        arr : [],
        time : Date
    }
});

const o = new Objects();
o.time = "1-1-2016 17:55:22";

const A = Model.extend({
    defaults : {
        a : 1
    }
});

const B = A.extend({
    defaults : {
        b : 1
    }
});

const Smart = Model.extend({
    defaults : {
        a : Number.value( 1 ).has.watcher( 'inc' ),
        changedCount : 0
    },

    inc(){
        this.changedCount++;
    }
});

const Sum = Model.extend({
    defaults : {
        a : 1,
        b : 2,
        sum : 3
    },

    localEvents : {
        'change:a change:b' : 'calcSum',
        'change:sum' : ( self, sum ) => sum < 5 || ( self.sum = 0 ) 
    },

    calcSum(){
        this.sum = this.a + this.b;
    }
});

@define
class Sum2 extends Model {
    static attributes = {
        a : 1,
        b : 2,
        sum : 3
    }

    static localEvents = {
        'change:a change:b' : 'calcSum',
        'change:sum' : ( self, sum ) => sum < 5 || ( self.sum = 0 ) 
    }

    calcSum(){
        this.sum = this.a + this.b;
    }
}

@define({
    defaults : {
        a : 1,
        b : 2,
        sum : 3
    },

    localEvents : {
        'change:a change:b' : 'calcSum',
        'change:sum' : ( self, sum ) => sum < 5 || ( self.sum = 0 ) 
    }    
})
class Sum2 extends Model {
    calcSum(){
        this.sum = this.a + this.b;
    }
}