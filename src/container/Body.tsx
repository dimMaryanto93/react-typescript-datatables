import React from 'react';
import BasicDataTablesPages from "../pages/BasicDataTables.pages";
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
                <h3>Datatables Parent Child</h3>
                <ServerSideDataTablesPages/>
            </div>

        </div>
    );
}

export default HalamanUtama;
