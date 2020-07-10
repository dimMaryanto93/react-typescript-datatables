import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css'
import {FunctionRowCallback} from "../commons/DataTables.types";
import {AjaxSettings, ColumnSetting} from "../commons/DataTables.interfaces";
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
        let rootNode = row.lastChild;
        let buttons = rootNode?.firstChild?.childNodes;

        let detailButton = buttons?.item(1);
        detailButton?.addEventListener('click', () => {
            console.log('detail button', data.id);
        });

        let editButton = buttons?.item(3);
        editButton?.addEventListener('click', () => {
            console.log('edit button', data.id);
        });

        let removeButton = buttons?.item(5);
        removeButton?.addEventListener('click', () => {
            console.log('remove button', data.id);
        });
    }

    ajaxConfig: AjaxSettings = {

    }

    data = [
        {
            id: "001",
            name: "Dimas Maryanto",
            kota: "Kab. Bandung",
            provinsi: "Jawa Barat",
            alamat: "Jl. Bukit indah no B8"
        },
        {
            id: "002",
            name: "Muhamad Yusuf",
            kota: "Kab. Bandung",
            provinsi: "Jawa Barat",
            alamat: "Jl. Cijambe"
        }
    ]

    render() {
        return (
            <div>
                <DataTablesComponent columns={this.columns}
                                     isServerSide={false}
                                     data={this.data}
                                     rowCallback={this.rowCallback}/>
            </div>
        );
    }
}

export default Body;
