export class FiniteAutomaton {
    private alphabet: string[];
    private initialState: string;
    private acceptingStates: string[];
    private transitions: { [key: string]: { [key: string]: string } };

    constructor() {
        this.alphabet = [];
        this.initialState = "";
        this.acceptingStates = [];
        this.transitions = {};
    }

    setStates(states: string[]) {
        this.transitions = {
            ...states.reduce((acc: any, state: string) => {
                acc[state] = {};
                return acc;
            }, {}),
        }
        //console.log(this.transitions)
    }

    setAlphabet(alphabet: string[]) {
        this.alphabet = alphabet;
    }

    setInitialState(initialState: string) {
        this.initialState = initialState;
    }

    setAcceptingStates(acceptingStates: string[]) {
        this.acceptingStates = acceptingStates;
    }

    addTransition(fromState: string, input: string, resultState: string) {
        if (!this.transitions[fromState]) {
            throw new Error(`Invalid fromState: ${fromState}, please make sure you set the states`);
        }
        this.transitions[fromState][input] = resultState;
        // console.log("current transitions: ", this.transitions);
    }

    processInput(value: string): number {
        let currentState = this.initialState;

        for (const input of value) {
            //input excludes from the alphabet list
            if (!this.alphabet.includes(input)) {
                throw new Error(`Invalid input: ${input}`);
            }
            //initialState undefined
            if (!this.transitions[currentState] || !this.transitions[currentState][input]) {
                throw new Error('InitialState is undefined, please call setInitialState() to set the InitialState');
            }
            if(!this.transitions[currentState][input]) {
                throw new Error(`Input value of the following state hasn't define: ${currentState}, input: ${input}`);
            }
            currentState = this.transitions[currentState][input];
        }

        if (!this.acceptingStates.includes(currentState)) {
            throw new Error(`Invalid final state: ${currentState}`);
        }

        return Number(currentState.slice(1));
    }
}
export function modThree(input: string): number {
    const fa = new FiniteAutomaton();
    //Q = (S0, S1, S2)
    fa.setStates(["S0", "S1", "S2"]);
    //Σ = (0, 1)
    fa.setAlphabet(["0", "1"]);
    //q0 ∈ Q is the initial state;
    fa.setInitialState("S0");
    // set of accepting/final states;
    fa.setAcceptingStates(["S0", "S1", "S2"]);

    // Add all combination to transition functions
    //NOTE this part is quite difficult to understand what is going on, I spent 30 mins to understand this part.  orz
    //δ(S0,0) = S0;
    fa.addTransition("S0", "0", "S0");
    //δ(S0,1) = S1;
    fa.addTransition("S0", "1", "S1");
    //δ(S1,0) = S2;
    fa.addTransition("S1", "0", "S2");
    //δ(S1,1) = S0;
    fa.addTransition("S1", "1", "S0");
    //δ(S2,0) = S1;
    fa.addTransition("S2", "0", "S1");
    // δ(S2,1) = S2;
    fa.addTransition("S2", "1", "S2");

    //console.log("final state: ", finalState);
    return fa.processInput(input);
}

// console.log(modThree('1101')); //1
// console.log(modThree('1110')); //2
// console.log(modThree('1111')); //0
