import { DataProvider, fetchUtils,  CreateParams, UpdateParams, } from "react-admin";
import { stringify } from "query-string";

const httpClient = fetchUtils.fetchJson;

type PostParams = {
    id: number;
    name: string;
    username: string;
    password: string;
    age: number;
    sex: string;
    address: number[];
    email: string;
    avatar: {
        rawFile: File;
        src?: string;
        title?: string;
    };
};

const createPostFormData = (
    params: CreateParams<PostParams> | UpdateParams<PostParams>
) => {
    const formData = new FormData();
    params.data.avatar?.rawFile && formData.append("file", params.data.avatar.rawFile);
    params.data.name && formData.append("name", params.data.name);
    params.data.username && formData.append("username", params.data.username);
    params.data.password && formData.append("password", params.data.password);
    params.data.age && formData.append("age", JSON.stringify(params.data.age));
    params.data.sex && formData.append("sex", params.data.sex);
    params.data.address && formData.append("address", JSON.stringify(params.data.address));
    params.data.email && formData.append("email", params.data.email);
    return formData;
};

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const { id } = JSON.parse(localStorage.getItem('token') ?? '')
        const query = {
            id: JSON.stringify(id),
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `http://localhost:3000/${resource}/all?${stringify(query)}`;
        const { json } = await httpClient(url);
        return {
            data: json.data,
            total: json.total,
        };
    },
    getOne: async (resource, params) => {
        const url = `http://localhost:3000/${resource}/${params.id}`
        const { json } = await httpClient(url);
        return { data: json };
    },
    create: async (resource, params) => {
        const { id } = JSON.parse(localStorage.getItem('token') ?? '')
        const query = {
            id: JSON.stringify(id),
        };
        return httpClient(`http://localhost:3000/${resource}/create?${stringify(query)}`, {
            method: "POST",
            body: JSON.stringify(params.data),
        })
            .then(authInfo => {
                const { json } = authInfo;
                return Promise.resolve({
                    data: json,
                });
            })
    },
    update: async (resource, params) => {
        const { id } = params;
        const formData = createPostFormData(params);
        formData.append("id", id);
        return httpClient(`http://localhost:3000/${resource}/${id}`, {
                method: "POST",
                body: formData,
            })
            .then(authInfo => {
                const { json } = authInfo;
                return Promise.resolve({
                    data: json,
                });
            })
    },
    delete: async (resource, params) => {
        const url = `http://localhost:3000/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'DELETE',
        });
        return { data: json };
    },
};
