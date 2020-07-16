import React, {createRef, FormEvent} from 'react';
import 'font-awesome/css/font-awesome.min.css'
import {FunctionAjax, FunctionRowCallback} from "../commons/DataTables.types";
import {ColumnSetting} from "../commons/DataTables.interfaces";
import DataTablesComponent from "../commons/DataTables.component";
import {Button, FormControl, InputGroup} from "react-bootstrap";

interface ExampleData {
    id: string,
    name: string,
    kota: string,
    provinsi: string,
    alamat: string
}

const HalamanUtama = () => {

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
            data: "kota",
            searchable: false,
            orderable: true,
            width: "80px",
            title: "Kota"
        },
        {
            data: "provinsi",
            searchable: false,
            orderable: true,
            width: "100px",
            title: "Provinsi"
        },
        {
            data: "alamat",
            searchable: false,
            orderable: true,
            title: "Alamat Lengkap"
        },
        {
            searchable: false,
            orderable: false,
            width: "100px",
            title: "Action",
            data: null,
            render: (data, type, row, meta) => {
                return `<div id="columnAction" class="btn-group dt-column-action" role="group" aria-label="column-action">
                            <button class="btn btn-info" type="button" id="detail">
                                <i class="fa fa-binoculars"></i>
                            </button>  
                            <button class="btn btn-warning" type="button" id="edit">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger" type="button" id="remove">
                                <i class="fa fa-trash"></i>
                            </button>     
                        </div>`;
            }
        }
    ]

    const rowCallback: FunctionRowCallback<ExampleData> = (row, data: ExampleData, index) => {
        let divButtonGroup = row.lastChild;
        let buttonGroups = divButtonGroup?.firstChild?.childNodes;

        let buttonDetail = buttonGroups?.item(1);
        buttonDetail?.addEventListener('click', () => {
            console.log('button click', 'button detail', data);
        }, false);

        let buttonEdit = buttonGroups?.item(3);
        buttonEdit?.addEventListener('click', () => {
            console.log('button click', 'button edit', data);
        }, false);

        let buttonRemove = buttonGroups?.item(5);
        buttonRemove?.addEventListener('click', () => {
            console.log('button click', 'button remove', data);
        }, false);
    }

    const ajaxConfig: FunctionAjax = (data, callback) => {
        console.log('data: ', data);
        callback({
            recordsTotal: 10,
            recordsFiltered: 10,
            data: [
                {
                    id: "001",
                    alamat: "JL. Buki indah",
                    kota: "Kab.Bandung",
                    name: "Dimas Maryanto",
                    provinsi: "Jawa Barat"
                },
                {
                    id: "002",
                    alamat: "Jl. Cigruik",
                    kota: "Kab.Bandung",
                    name: "Muhamad Purwadi",
                    provinsi: "Jawa Barat"
                },
                {
                    id: "003",
                    alamat: "JL. Ujung Berung",
                    kota: "Kab.Bandung",
                    name: "Muhamad Yusuf",
                    provinsi: "Jawa Barat"
                },

            ]
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
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
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
