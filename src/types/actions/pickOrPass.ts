export enum PickOrPass {
    Pick,
    Pass
}

export type PickOrPassAction = { playerName: string, choice: PickOrPass };