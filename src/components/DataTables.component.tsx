import React from "react";
import $ from 'jquery';
import {ColumnSettings} from "../commons/DataTables.interfaces";
import {Table} from "react-bootstrap";

require('datatables.net-bs4/css/dataTables.bootstrap4.min.css');
require('datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css');
require('datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css');
require('datatables.net-colreorder-bs4/css/colReorder.bootstrap4.min.css')

require('datatables.net'); // eslint-disable-line no-unused-vars
require('jszip/dist/jszip.min.js')
require('datatables.net-responsive'); // eslint-disable-line no-unused-vars
require('datatables.net-bs4/js/dataTables.bootstrap4.min.js')
require('datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js')
require('datatables.net-colreorder/js/dataTables.colReorder.min.js')
require('datatables.net-colreorder-bs4/js/colReorder.bootstrap4.min.js')
require('datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js'); // Column visibility
require('datatables.net-buttons/js/buttons.colVis.min.js'); // Column visibility
require('datatables.net-buttons/js/buttons.flash.min.js');  // Flash file export
require('datatables.net-buttons/js/buttons.html5.min.js');  // HTML 5 file export
require('datatables.net-buttons/js/buttons.print.min.js');  // Print view button

class DataTablesComponent<T> extends React.Component<ColumnSettings<T>, {}> {

    private datatable: any;

    componentDidMount() {
        this.datatable = $(`#${this.props.id}`).DataTable({
            language: {
                lengthMenu: "Menampilkan _MENU_ data per halaman",
                info: "Halaman _PAGE_ dari _PAGES_",
                infoEmpty: "",
                paginate: {
                    previous: "<",
                    next: ">",
                    first: "<<",
                    last: ">>"
                }
            },
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            scrollX: true,
            order: [1, 'asc'],
            responsive: true,
            paging: true,
            searching: false,
            pagingType: "full_numbers",
            ajax: this.props.ajaxData,
            jQueryUI: false,
            processing: true,
            serverSide: true,
            colReorder: false,
            info: true,
            dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6 text-right'fB>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            columns: this.props.columns,
            rowCallback: this.props.rowCallback,
            buttons: [
                'colvis', 'copy', 'excel', 'pdf', 'print'
            ]
        });


        this.datatable.on('order.dt', function () {
        });

        this.datatable.on('page.dt', function () {
        });

        this.datatable.on('length.dt', function (e: any, settings: any, len: number) {
        });
    }

    componentWillUnmount() {
        this.datatable.destroy();
    }

    reloadData = () => {
        this.datatable.ajax.reload();
    }

    getNumberOfRow = (numberPageIndex: number) => {
        const info = this.datatable.page.info();
        const page = info.page;
        const length = info.length;
        const index = (page * length + (numberPageIndex + 1));
        return index;
    }

    style = {
        width: "100%",
    }

    render() {
        return (
            <Table id={this.props.id}
                   borderless
                   striped
                   hover
                   responsive
                   className="container"
                   size={"md"}
                   style={this.style}>
            </Table>
        );
    }
}

export default DataTablesComponent;
