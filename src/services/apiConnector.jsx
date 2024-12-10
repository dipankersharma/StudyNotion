import axios from "axios";

export const axiosinstance = axios.create({});
export const apiconnector = (method, url, body, headers, params) => {
  return axiosinstance({
    method: `${method}`,
    url: `${url}`,
    data: body ? body : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
