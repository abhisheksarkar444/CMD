export enum MedicineCycleOption {
    Morning_Afternoon_Night = 1,
    Morning_Night,
    Moring_Afternoon,
    Afternoon_Night,
    Morning,
    Afternoon,
    Night
}

export namespace MedicineCycleOption {
    export function values() {
        return Object.keys(MedicineCycleOption).filter(
            (type) => isNaN(<any>type) && type !== 'values'
        );
    }
}