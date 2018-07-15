import axios from 'axios';
axios.defaults.baseURL = "https://api.github.com/gists";
axios.defaults.headers.common['Authorization'] = "token ed9cd01b452acbaf0203494964a7fbd5d11ecd77";

export class GistService {

    create(gist: Object): Promise<any> {
        return axios.post('/', gist).then(response => {
            gistId: response.data.id
        }).catch(error => {
            throw {
                message: 'Parameter value is invalid',
            }
        });
    }

    get(id: string): Promise<any> {
        return axios.get(`/${id}`).then(response =>
            response.data.files
        ).catch(error => {
            throw {
                message: 'Not Found',
            }
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