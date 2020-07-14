export type FunctionColumnRender<T> =
    (data: T, type: any, row: any, meta: any) => any;
export type FunctionAjaxData =
    (data: any, settings: any) => string | object;
export type FunctionAjax =
    (data: any, callback: ((data: any) => void), settings: any) => void;
export type FunctionRowCallback<T> =
    (row: Node, data: Array<T> | T | any, index: number) => void;
export type FunctionHeaderCallback<T> =
    (thead: Node, data: Array<T>[], start: number, end: number, display: any[]) => void;
