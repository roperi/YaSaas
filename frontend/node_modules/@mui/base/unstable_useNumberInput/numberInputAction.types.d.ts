export declare const NumberInputActionTypes: {
    readonly clamp: "numberInput:clamp";
    readonly inputChange: "numberInput:inputChange";
    readonly increment: "numberInput:increment";
    readonly decrement: "numberInput:decrement";
    readonly decrementToMin: "numberInput:decrementToMin";
    readonly incrementToMax: "numberInput:incrementToMax";
};
interface NumberInputClampAction {
    type: typeof NumberInputActionTypes.clamp;
    inputValue: string;
}
interface NumberInputInputChangeAction {
    type: typeof NumberInputActionTypes.inputChange;
    inputValue: string;
}
interface NumberInputIncrementAction {
    type: typeof NumberInputActionTypes.increment;
    applyMultiplier: boolean;
}
interface NumberInputDecrementAction {
    type: typeof NumberInputActionTypes.decrement;
    applyMultiplier: boolean;
}
interface NumberInputIncrementToMaxAction {
    type: typeof NumberInputActionTypes.incrementToMax;
}
interface NumberInputDecrementToMinAction {
    type: typeof NumberInputActionTypes.decrementToMin;
}
export type NumberInputAction = NumberInputClampAction | NumberInputInputChangeAction | NumberInputIncrementAction | NumberInputDecrementAction | NumberInputIncrementToMaxAction | NumberInputDecrementToMinAction;
export {};
