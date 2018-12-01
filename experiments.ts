type NameOrNameArray = string | string[];

function createName(name: NameOrNameArray) {
    if (typeof name === "string") {
        return name;
    }
    else {
        return name.join(" ");
    }
}

var greetingMessage = `Greetings, ${ createName(["Sam", "Smith"]) }`;
alert(greetingMessage);



const attrs = {
    a: Number,
    b: type( String )
};


type X<A extends Def> = { [key in keyof A]: ReturnType2<A[key] extends new ( ...args ) => any ? A[key] : A[key] extends { type : new ( ...args ) => any } ? A[key]['type'] : new () => void>};

interface Def {
    [ name : string] : ( new ( ...args ) => any ) | { type : new ( ...args ) => any }
}

function type<T extends new (...args) => any>(Ctor: T  ): ChainSpec<T>{
    return null;
}

interface ChainSpec<T>{
    type : T
}

let m: X<typeof attrs>;

class Component<P extends Def>{
    props : X<P>
}

class F { }

class G extends Component<typeof G.props>{
    static props = {
        a: Number,
        b: type(String),
        c: type(F),
        h : attributes({ j : Boolean })
    }

    static state = {
        model : MyModel
    }

    @state(MyModel) model : MyModel
}

/*
    What to do with state?

    // TS:
    @state( MyModel ) model : MyModel // create accessor, put in in state

    // JS 
    static state = {
        model : MyModel
    }

    // Legacy???
    static model = {

    }


    
*/

let cc: G;

cc.props.h.j

type ReturnType2<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any

let jhjhj : ReturnType2<NumberConstructor>

class MyRecord {
    static attributes = {
        a: Number,
        b: type(String),
        c : type( F )
    }
}


const TTT = attributes({
    j: Boolean
});

let r = new TTT();
r.j + 5

function attributes<D extends Def>(d: D) : new (...args) => X<D>{
    return null;
}


let jk: MyR;

