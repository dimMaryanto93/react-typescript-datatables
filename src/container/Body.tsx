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
        let buttonDetail = document.getElementById('detail');
        buttonDetail?.addEventListener('click', () => {
            console.log('detail button', data.id);
        });

        let buttonEdit = document.getElementById('edit');
        buttonEdit?.addEventListener('click', () => {
            console.log('detail edit', data.id);
        });

        let buttonRemove = document.getElementById('remove');
        buttonRemove?.addEventListener('click', () => {
            console.log('detail remove', data.id);
        });
    }

    ajaxConfig: FunctionAjax = (data, callback, settings) => {
        callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
        });
    }

    data: Array<ExampleData> = [{
        id: "001",
        alamat: "JL. Buki indah",
        kota: "Kab.Bandung",
        name: "Dimas Maryanto",
        provinsi: "Jawa Barat"
    }];

    render() {
        return (
            <div>
                <DataTablesComponent
                    id="example-table"
                    columns={this.columns}
                    isServerSide={false}
                    ajaxData={this.ajaxConfig}
                    data={this.data}
                    rowCallback={this.rowCallback}/>
            </div>
        );
    }
}

export default Body;
