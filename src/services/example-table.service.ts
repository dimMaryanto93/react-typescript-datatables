import Axios from 'axios';
import {ExampleData} from "../models/example-data.model";
import {AjaxDataRequest, AjaxDataResponse} from "../commons/DataTables.interfaces";

const datatables = (data: ExampleData, request: AjaxDataRequest) => {
    const params = new URLSearchParams();
    params.append('start', String(request.start));
    params.append('length', String(request.length));
    params.append('draw', String(request.draw));
    params.append('order[0][column]', String(request.order[0]['column']));
    params.append('order[0][dir]', request.order[0]['dir']);

    return Axios.post<AjaxDataResponse<ExampleData>>(
        `/example/api/example/datatables`,
        data,
        {params: params})
}

export {datatables}

