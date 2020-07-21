import React from 'react';
import BasicDataTablesPages from "../pages/BasicDataTables.pages";
import FunctionServerSideDataTablesPages from "../pages/ServerSideDataTablesFunction.pages";
import ServerSideDataTablesPages from "../pages/ServerSideDataTables.pages";

const HalamanUtama = () => {

    return (
        <div>
            <hr/>
            <div>
                <h3>Basic Datatables</h3>
                <BasicDataTablesPages/>
            </div>
            <hr/>
            <div>
                <h3>Datatables Parent Child - Class based</h3>
                <ServerSideDataTablesPages/>
            </div>
            <hr/>
            <div>
                <h3>Datatables Parent Child - Function based</h3>
                <FunctionServerSideDataTablesPages/>
            </div>
        </div>
    );
}

export default HalamanUtama;
