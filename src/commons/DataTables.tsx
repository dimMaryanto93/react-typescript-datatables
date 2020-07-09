import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';

const $ = require('jquery');
const dt = require('datatables.net'); // eslint-disable-line no-unused-vars
const buttons = require('datatables.net-buttons'); // eslint-disable-line no-unused-vars
const responsive = require('datatables.net-responsive'); // eslint-disable-line no-unused-vars
const responsiveBs = require('datatables.net-responsive'); // eslint-disable-line no-unused-vars

type FunctionColumnRender = (data: any, type: any, row: any, meta: any) => any;

interface ColumnSettings {
    columns: ColumnSetting[];
    data: any[];
    isServerSide?: boolean;
}

export interface ColumnSetting {
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
    data?: string | null | undefined;

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
     * Render (process) the data for use in the table. Since: 1.10
     */
    render?: FunctionColumnRender;

    /**
     * Enable or disable filtering on the data in this column. Since: 1.10
     */
    searchable?: boolean;

    /**
     * Set the column title. Since: 1.10
     */
    title?: string;

    /**
     * Enable or disable the display of this column. Since: 1.10
     */
    visible?: boolean;

    /**
     * Column width assignment. Since: 1.10
     */
    width?: string;
}

export class DataTables extends Component<ColumnSettings, {}> {

    componentDidMount() {
        $('#datatable').DataTable({
            language: {
                lengthMenu: "Menampilkan _MENU_ data per halaman",
                info: "Halaman _PAGE_ dari _PAGES_",
                infoEmpty: ""
            },
            responsive: true,
            bPaginate: true,
            searching: false,
            pagingType: "full_numbers",
            bJQueryUI: false,
            bSort: true,
            data: this.props.data,
            bProcessing: true,
            bServerSide: this.props.isServerSide,
            bInfo: true,
            sDom: '<"top"i>rt<"bottom"flp><"clear">',
            bFilter: false,
            columns: this.props.columns
        });
    }

    style = {
        width: "100%",
    }

    render() {
        return (
            <table id="datatable"
                   className="display table-hover table-responsive table-striped"
                   style={this.style}>
            </table>
        );
    }
}
