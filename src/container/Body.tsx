import React, {Component} from 'react';
import {ColumnSetting, DataTables} from '../commons/DataTables';

class Body extends Component {

    handleOnClick = (id: number) => {
        console.log('button click', id);
    }

    columns: ColumnSetting[] = [
        {
            className: "text-center",
            searchable: false,
            orderable: false,
            width: "20px",
            title: "No",
            data: null,
            render: (data, type, row, meta) => {
                return data.name;
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
                return `<button class="btn btn-warning" type="button" id="${data.id}">
                        <i class=""></i>
                        Edit
                        </button>`;
            }
        }
    ]

    data = [
        {
            id: "001",
            name: "Dimas Maryanto",
            kota: "Kab. Bandung",
            provinsi: "Jawa Barat",
            alamat: "Jl. Bukit indah no B8"
        }
    ]

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <DataTables columns={this.columns} isServerSide={false} data={this.data}/>
            </div>
        );
    }
}

export default Body;
