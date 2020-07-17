import Axios from 'axios';
import {ExampleData} from "../models/example-data.model";
import {AjaxDataRequest, AjaxDataResponse} from "../commons/DataTables.interfaces";

const datatables = (data: ExampleData, requestParams: AjaxDataRequest) => {
    const params = new URLSearchParams();
    params.append('start', String(requestParams.start));
    params.append('length', String(requestParams.length));
    params.append('draw', String(requestParams.draw));
    params.append('order[0][column]', String(requestParams.order[0]['column']));
    params.append('order[0][dir]', requestParams.order[0]['dir']);

    return Axios.post<AjaxDataResponse<ExampleData>>(
        `/example/api/example/datatables`,
        data,
        {params: params})
}

export {datatables}

