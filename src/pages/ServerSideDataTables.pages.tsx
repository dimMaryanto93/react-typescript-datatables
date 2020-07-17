import React, {Component, createRef, FormEvent} from "react";
import DataTablesComponent from "../components/DataTables.component";
import {ColumnSetting} from "../commons/DataTables.interfaces";
import {ExampleData} from "../models/example-data.model";
import {datatables as datatablesService} from "../services/example-table.service";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {FunctionRowCallback} from "../commons/DataTables.types";
import 'font-awesome/css/font-awesome.min.css'
import $ from 'jquery'

class ServerSideDataTablesPages extends Component {

    datatables = createRef<DataTablesComponent<ExampleData>>()

    columns: Array<ColumnSetting<ExampleData>> = [
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
                            <button class="btn btn-warning" type="button" id="buttonEdit">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger" type="button" id="buttonRemove">
                                <i class="fa fa-trash"></i>
                            </button>     
                        </div>`;
            }
        }
    ]

    ajaxConfig = (data: any, callback: any) => {
        console.log('info data', this.state.formValue, data)
        datatablesService(this.state.formValue, data)
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
    }


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

    rowCallback: FunctionRowCallback<ExampleData> = (row, data, index) => {
        let numberOfRows = this.datatables.current?.getNumberOfRow(index);
        // TODO set first column as number of rows
        $('td:eq(0)', row).html(String(numberOfRows));

        $('#buttonDetail', row).on('click', () => {
            console.log('info button detail click', data);
        });

        $('#buttonEdit', row).on('click', () => {
            console.log('info button edit click', data);
        });

        $('#buttonRemove', row).on('click', () => {
            console.log('info button remove click', data);
        });
    }

    handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        this.datatables.current?.reloadData();
    }

    handleOnReset = (event: FormEvent) => {
        event.preventDefault();
        this.setState({
            formValue: {
                name: ""
            }
        });
        this.datatables.current?.reloadData();
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleOnSubmit} onReset={this.handleOnReset}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type={"text"}
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={this.state.formValue.name}
                                onChange={event => {
                                    this.setState({formValue: {name: event.target.value}})
                                }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Button variant="primary" type={"submit"}>Search</Button>
                            <Button variant="secondary" type={"reset"}>Reset</Button>
                        </InputGroup>
                    </form>
                </div>
                <div>
                    <DataTablesComponent
                        ref={this.datatables}
                        id={'example-table-001'}
                        columns={this.columns}
                        rowCallback={this.rowCallback}
                        ajaxData={this.ajaxConfig}/>
                </div>
            </div>
        );
    }
}

export default ServerSideDataTablesPages;
