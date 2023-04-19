import axios from "axios";

export const axiosCall = (method,path,headers,body) =>
{
let axiosHeaders = headers ? headers :{};
return axios({
    mathod:method,
    url:path,
    data: body,
    headers:axiosHeaders
}).then(response => {
    return response
});
}