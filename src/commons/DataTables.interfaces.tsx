import {
    FunctionAjax,
    FunctionAjaxData,
    FunctionColumnRender,
    FunctionHeaderCallback,
    FunctionRowCallback
} from "./DataTables.types";

export interface ColumnSettings<T> {
    id: string;
    columns: Array<ColumnSetting<T>>;
    rowCallback: FunctionRowCallback<T>;
    ajaxData: string | AjaxSettings | FunctionAjax;
}

export interface AjaxSettings extends JQueryAjaxSettings {
    /**
     * Add or modify data submitted to the server upon an Ajax request. Since: 1.10
     */
    data?: object | FunctionAjaxData;

    /**
     * Data property or manipulation method for table data. Since: 1.10
     */
    dataSrc?: string | ((data: any) => any[]);
}

export interface AjaxDataRequest {
    draw: number;
    start: number;
    length: number;
    order: Array<AjaxDataRequestOrder>;
}

export interface AjaxDataResponse<T> {
    draw: number;
    data: Array<T>;
    recordsFiltered: number;
    recordsTotal: number;
}

export interface AjaxDataRequestOrder {
    column: number;
    dir: string;
}

export interface ColumnSetting<T> {
    /**
     * Class to assign to each cell in the column. Since: 1.10
     */
    className?: string;

    /**
     * Add padding to the text content used when calculating the optimal with for a table. Since: 1.10
     */
    contentPadding?: string;

    /**
     * Cell created callback to allow DOM manipulation. Since: 1.10
     */
    createdCell?: any;

    /**
     * Class to assign to each cell in the column. Since: 1.10
     */
    data: string | null | undefined;

    /**
     * Enable or disable ordering on this column. Since: 1.10
     */
    orderable?: boolean;

    /**
     * Define multiple column ordering as the default order for a column. Since: 1.10
     */
    orderData?: number | number[];

    /**
     * Live DOM sorting type assignment. Since: 1.10
     */
    orderDataType?: string;

    /**
     * Ordering to always be applied to the table. Since 1.10
     *
     * Array type is prefix ordering only and is a two-element array:
     * 0: Column index to order upon.
     * 1: Direction so order to apply ("asc" for ascending order or "desc" for descending order).
     */
    orderFixed?: any[];

    /**
     * Load data for the table's content from an Ajax source. Since: 1.10
     */
    ajax?: string | AjaxSettings | FunctionAjax;

    /**
     * Render (process) the data for use in the table. Since: 1.10
     */
    render?: FunctionColumnRender<T>;

    /**
     * Enable or disable filtering on the data in this column. Since: 1.10
     */
    searchable?: boolean;

    /**
     * Set the column title. Since: 1.10
     */
    title: string;

    /**
     * Enable or disable the display of this column. Since: 1.10
     */
    visible?: boolean;

    /**
     * Column width assignment. Since: 1.10
     */
    width?: string;

    /**
     * Row draw callback.. Since: 1.10
     */
    rowCallback?: FunctionRowCallback<T>;

    /**
     * Header display callback function. Since: 1.10
     */
    headerCallback?: FunctionHeaderCallback<T>;
}
