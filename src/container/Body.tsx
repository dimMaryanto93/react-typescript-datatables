import React, {createRef, FormEvent, useState} from 'react';
import 'font-awesome/css/font-awesome.min.css'
import {FunctionAjax, FunctionRowCallback} from "../commons/DataTables.types";
import {AjaxDataResponse, ColumnSetting} from "../commons/DataTables.interfaces";
import DataTablesComponent from "../commons/DataTables.component";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import $ from 'jquery';
import Axios from 'axios';

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

const HalamanUtama = () => {

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
    })

    const datatablesRef = createRef<DataTablesComponent<ExampleData>>();

    const columns: ColumnSetting<ExampleData>[] = [
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
    ]

    const rowCallback: FunctionRowCallback<ExampleData> = (row, data: ExampleData, index) => {
        let buttonDetail = $('#buttonDetail');
        console.log(buttonDetail);
    }

    const ajaxConfig: FunctionAjax = (data, callback) => {
        const params = new URLSearchParams();
        params.append('start', data.start);
        params.append('length', data.length);
        params.append('draw', data.draw);
        params.append('order[0][column]', data.order[0]['column']);
        params.append('order[0][dir]', data.order[0]['dir']);

        Axios.post<AjaxDataResponse<ExampleData>>(`/example/api/example/datatables`,
            formValue,
            {params: params})
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

    function handleOnSubmit(event: FormEvent) {
        datatablesRef.current?.reloadData();
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
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
                            console.log(event.target.value);
                            setFormValue({...formValue, name: event.target.value})
                            console.log('value: ', formValue.name)
                        }}
                    />
                </InputGroup>
                <InputGroup>
                    <Button variant="primary" type={"submit"}>Search</Button>
                </InputGroup>
            </form>
            <div>
                <DataTablesComponent
                    key={"test01"}
                    id={'datatables-01'}
                    columns={columns}
                    ajaxData={ajaxConfig}
                    rowCallback={rowCallback}
                    ref={datatablesRef}/>
            </div>
        </div>
    );
}

export default HalamanUtama;
