@define
class M extends Model {
    static attributes = {
        a : 1,
        b : 'Hey!',
        c : true
    }
}

const m = new M();

m.a--;
m.b = m.a - 1;
m.c = m.a;

@define
class Objects extends Model {
    static attributes =  {
        obj : {},
        arr : [],
        time : Date
    }
}

const o = new Objects();
o.time = "1-1-2016 17:55:22";

@define
class A extends Model {
    static attributes = {
        a : 1
    }
}

@define
class B extends A {
    static attributes = {
        b : 1
    }
}

@define
class Smart extends Model {
    static attributes =  {
        a : Number.value( 1 ).has.watcher( 'inc' ),
        changedCount : 0
    }

    inc(){
        this.changedCount++;
    }
}


@define
class Sum extends Model {
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