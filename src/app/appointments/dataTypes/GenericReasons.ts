export enum GenericReasons {
  Headache = 1,
  HandInjury,
  LegInjury
}

export namespace GenericReasons {

  export function values() {
    return Object.keys(GenericReasons).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }

}