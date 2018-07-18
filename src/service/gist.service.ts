import axios from 'axios';
axios.defaults.baseURL = "https://api.github.com/gists";
axios.defaults.headers.common['Authorization'] = "token 06a04a641972f90e51465909883d31691bbffdf6";

export class GistService {

    create(gist: Object): Promise<any> {
        return axios.post('', gist).then(response =>
            response.data.id
        ).catch(error => {
            throw error.response.data
        });
    }

    get(id: string): Promise<any> {
        return axios.get(`${id}`).then(response =>
            response.data.files
        ).catch(error => {
            throw error.response.data
        });
    }

    // star(id: string): Promise<any> {
    //     return axios.put(`/${id}/star`, {
    //         "Content-Length": 0,
    //     }).then(response => {
    //         if (response.status == 204) {
    //             return 'Starred';
    //         }
    //     }).catch(error => 'Not Found');
    // }

}