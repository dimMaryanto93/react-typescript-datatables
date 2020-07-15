import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css'
import {FunctionAjax, FunctionRowCallback} from "../commons/DataTables.types";
import {ColumnSetting} from "../commons/DataTables.interfaces";
import DataTablesComponent from "../commons/DataTables.component";

interface ExampleData {
    id: string,
    name: string,
    kota: string,
    provinsi: string,
    alamat: string
}

class Body extends Component {

    columns: ColumnSetting<ExampleData>[] = [
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

    rowCallback: FunctionRowCallback<ExampleData> = (row, data: ExampleData, index) => {
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

    ajaxConfig: FunctionAjax = (data, callback) => {
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

    render() {
        return (
            <div>
                <DataTablesComponent
                    key={"test01"}
                    id={'datatables-01'}
                    columns={this.columns}
                    ajaxData={this.ajaxConfig}
                    rowCallback={this.rowCallback}/>
            </div>
        );
    }
}

export default Body;
