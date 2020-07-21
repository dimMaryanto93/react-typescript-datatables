import React, {FormEvent, useRef, useState} from "react";
import {ColumnSetting} from "../commons/DataTables.interfaces";
import {ExampleData} from "../models/example-data.model";
import {datatables as datatablesService} from "../services/example-table.service";
import {Button, ButtonGroup, FormControl, InputGroup} from "react-bootstrap";
import {FunctionRowCallback} from "../commons/DataTables.types";
import 'font-awesome/css/font-awesome.min.css'
import $ from 'jquery'
import DataTablesFunctionComponent from "../components/DataTables.function";

const FunctionServerSideDataTablesPages = () => {

    const [formValue, setFormValue] = useState({
        name: '',
        counter: 0,
        createdDate: null,
        createdTime: null,
        currency: null,
        floating: null,
        id: '',
        active: null,
        description: ''
    });

    const columns: Array<ColumnSetting<ExampleData>> = [
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

    const ajaxConfig = (data: any, callback: any) => {
        console.log('info data', formValue, data)
        datatablesService(formValue, data)
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

    const rowCallback: FunctionRowCallback<ExampleData> = (row, data, index) => {
        // let numberOfRows = datatables.current?.getNumberOfRow(index);
        // TODO set first column as number of rows
        // $('td:eq(0)', row).html(String(numberOfRows));

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

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        // dtRef.current?.reloadData();
    }

    const handleOnReset = (event: FormEvent) => {
        event.preventDefault();
        setFormValue({
            id: '',
            name: '',
            counter: 0,
            createdDate: null,
            createdTime: null,
            currency: null,
            floating: null,
            active: null,
            description: ''
        })
        // datatables.current?.reloadData();
    }

    let datatableRef = useRef();

    return (
        <div>
            <div>
                <form onSubmit={handleOnSubmit} onReset={handleOnReset}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type={"text"}
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={formValue.name}
                            onChange={event => {
                                setFormValue({
                                        ...formValue,
                                        name: event.target.value
                                    }
                                )
                            }}
                        />
                    </InputGroup>
                    <ButtonGroup aria-label="Datatables Handler">
                        <Button variant="primary" type={"submit"}>Search</Button>
                        <Button variant="secondary" type={"reset"}>Reset</Button>
                    </ButtonGroup>
                </form>
            </div>
            <br/>
            <div>
                <DataTablesFunctionComponent
                    // ref={datatableRef}
                    id={'datatables-function-base'}
                    columns={columns}
                    rowCallback={rowCallback}
                    ajaxData={ajaxConfig}/>
            </div>
        </div>
    )

}

export default FunctionServerSideDataTablesPages;
