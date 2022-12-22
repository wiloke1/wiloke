// eslint-disable-next-line
type TrimLeft<T extends string> = T extends '' ? T : (T extends ` ${infer U}` ? TrimLeft<U> : T);
type Trim<T extends string> = T extends '' ? T : (TrimLeft<T> extends `${infer U} ` ? Trim<U> : TrimLeft<T>);
declare type Push<T extends any[], E> = ((head: E, ...args: T) => any) extends (head: infer Element, ...args: infer Array) => any ? [...Array, Element] : T;

type OptionKeys<T extends string, Result extends string[] = []> =
    T extends `${any}{{${infer U}}}${infer C}`
    ?  OptionKeys<C, Push<Result, Trim<U>>>
    : Result;


export type CustomComponentProps<Html extends string> = Record<OptionKeys<Html>[number], string>
