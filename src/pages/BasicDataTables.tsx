import React, {Component, FormEvent} from "react";
import {Button, FormControl, InputGroup, Table} from "react-bootstrap";
import Axios from "axios";
import $ from 'jquery';
import {AjaxDataResponse} from "../commons/DataTables.interfaces";

require('datatables.net-bs4/css/dataTables.bootstrap4.min.css');
require('datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css');
require('datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css');
require('datatables.net-colreorder-bs4/css/colReorder.bootstrap4.min.css')
require('font-awesome/css/font-awesome.min.css')

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

interface ExampleData {
    "active": boolean | null,
    "counter": number | null,
    "createdDate": Date | null,
    "createdTime": Date | null,
    "currency": Number | null,
    "description": String | null,
    "floating": Number | null,
    "id": String | null,
    "name": String | null
}

class BasicDataTables extends Component {

    state = {
        formValue: {
            name: '',
            counter: 0,
            createdDate: null,
            createdTime: null,
            currency: null,
            floating: null,
            id: '',
            active: null,
            description: ''
        }
    }

    datatables: any;

    componentWillUnmount() {
        this.datatables.destroy();
        console.log('component destroy')
    }

    componentDidMount() {
        this.datatables = $(`#datatables`).DataTable({
            language: {
                lengthMenu: "Menampilkan _MENU_ data per halaman",
                info: "Halaman _PAGE_ dari _PAGES_",
                infoEmpty: ""
            },
            scrollX: true,
            responsive: true,
            paging: true,
            searching: false,
            pagingType: "full_numbers",
            ajax: (data: any, callback) => {
                const params = new URLSearchParams();
                params.append('start', data.start);
                params.append('length', data.length);
                params.append('draw', data.draw);
                params.append('order[0][column]', data.order[0]['column']);
                params.append('order[0][dir]', data.order[0]['dir']);

                Axios.post<AjaxDataResponse<ExampleData>>(`/example/api/example/datatables`,
                    this.state.formValue, {params: params})
                    .then(response => {
                        console.log('response http: ', response.data);
                        let body = response.data;
                        callback({
                            recordsTotal: body.recordsTotal,
                            recordsFiltered: body.recordsFiltered,
                            data: body.data
                        });
                    })
                    .catch(error => {
                        callback({
                            recordsTotal: 0,
                            recordsFiltered: 0,
                            data: []
                        });
                    });
            },
            jQueryUI: false,
            processing: true,
            serverSide: true,
            colReorder: false,
            info: true,
            dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6 text-right'fB>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            columns: [
                {
                    className: "text-center",
                    searchable: false,
                    orderable: false,
                    width: "20px",
                    title: "No",
                    data: null,
                    render: (data, type, row, meta) => {
                        return data.id;
                    }
                },
                {
                    data: "name",
                    width: "250px",
                    searchable: false,
                    orderable: true,
                    title: "Nama Lengkap"
                },
                {
                    title: "Keterangan",
                    data: "description",
                    searchable: false,
                    orderable: true,
                    width: "80px"
                },
                {
                    searchable: false,
                    orderable: true,
                    width: "100px",
                    title: "currency",
                    data: "currency"
                },
                {
                    searchable: false,
                    orderable: true,
                    title: "createdTime",
                    data: "createdTime",
                },
                {
                    searchable: false,
                    orderable: true,
                    title: "createdDate",
                    data: "createdDate",
                },
                {
                    searchable: false,
                    orderable: true,
                    title: "active",
                    data: "active",
                },
                {
                    searchable: false,
                    orderable: false,
                    width: "100px",
                    title: "Action",
                    data: null,
                    render: (data, type, row, meta) => {
                        return `<div id="columnAction" class="btn-group dt-column-action" role="group" aria-label="column-action">
                            <button class="btn btn-info" type="button" id="buttonDetail">
                                <i class="fa fa-binoculars"></i>
                            </button>  
                            <button class="btn btn-warning" type="button" id="buttonDetail">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger" type="button" id="buttonDetail">
                                <i class="fa fa-trash"></i>
                            </button>     
                        </div>`;
                    }
                }
            ],
            rowCallback: (row, data, index) => {
            },
            buttons: [
                /**
                 * button excel still not work
                 */
                'colvis', 'copy', 'excel', 'pdf', 'print'
            ]
        });
    }

    handleOnSubmit = (event: FormEvent) => {
        this.datatables.ajax.reload();
        event.preventDefault();
    }

    style = {
        width: "100%",
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type={"text"}
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={event => {
                                this.setState({formValue: {name: event.target.value}})
                            }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Button variant="primary" type={"submit"}>Search</Button>
                    </InputGroup>
                </form>
                <div>
                    <Table id={"datatables"}
                           borderless
                           striped
                           hover
                           responsive
                           className="container"
                           size={"md"}
                           style={this.style}>
                    </Table>
                </div>
            </div>
        )
    }
}


export default BasicDataTables;
