import { FiniteAutomaton } from "../index";

describe("modThree", () => {
    let fa: FiniteAutomaton;
    interface MethodParams {
        setStates?: string[];
        setAlphabet?: string[];
        setInitialState?: string;
        setAcceptingStates?: string[];
    }

    const methodWithParam: MethodParams = {
        setStates: ["S0", "S1", "S2"],
        setAlphabet: ['0', '1'],
        setInitialState: 'S0',
        setAcceptingStates: ['S0', 'S1', 'S2'],
    };

    const initFa = (exceptMethod: keyof MethodParams) => {
        for (const method in methodWithParam) {
            if (method !== exceptMethod) {
                (fa as any)[method]();
            }
        }
    };

    beforeEach(() => {
        fa = new FiniteAutomaton();
    });

    describe('Test the errors handling', () => {
        test("throws error if invalid input types", () => {
            expect(() => fa.processInput({} as string)).toThrow();
        });

        test.each(['setStates', 'setAlphabet', 'setInitialState', 'setInitialState', 'setAcceptingStates'])('throws error when fa."%s"() hasn\'t initialed', (exceptMethod: string) => {
            expect(() => {
                initFa('setStates');
                fa.addTransition('S0', '0', 'S0');
                fa.addTransition('S0', '1', 'S1');
                fa.addTransition('S1', '0', 'S2');
                fa.addTransition('S1', '1', 'S0');
                fa.addTransition('S2', '0', 'S1');
                fa.addTransition('S2', '1', 'S2');
                fa.processInput('1101');
            }).toThrow();
        });

    })

    describe('returns correct result for 5 sets of input', () => {
        test("Input & expected result from assignment examples", () => {
            fa.setStates(["S0", "S1", "S2"]);
            fa.setAlphabet(["0", "1"]);
            fa.setInitialState("S0");
            fa.setAcceptingStates(["S0", "S1", "S2"]);
            fa.addTransition("S0", "0", "S0");
            fa.addTransition("S0", "1", "S1");
            fa.addTransition("S1", "0", "S2");
            fa.addTransition("S1", "1", "S0");
            fa.addTransition("S2", "0", "S1");
            fa.addTransition("S2", "1", "S2");

            expect(fa.processInput("1101")).toBe(1);
            expect(fa.processInput("1110")).toBe(2);
            expect(fa.processInput("1111")).toBe(0);
            expect(fa.processInput("110")).toBe(0);
            expect(fa.processInput("1010")).toBe(1);
        });
    })
});