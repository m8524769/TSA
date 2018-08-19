import axios from 'axios';
axios.defaults.baseURL = "https://api.github.com/gists";
axios.defaults.headers.common['Authorization'] = "token c1a02f69ab5254fdc8f2c9aaba1643543c681ec1";

export class GistService {

    create(gist: Object): Promise<any> {
        return axios.post('', gist).then(response =>
            response.data.id
        ).catch(error => {
            throw error.response.data
        });
    }

    modify(id: string, description: string, files: Object): Promise<any> {
        return axios.patch(`${id}`, {
            description: description,
            files: files
        }).catch(error => {
            throw error.response.data
        });
    }

    getPage(id: string): Promise<any> {
        return axios.get(`https://gist.github.com/psnote/${id}`).then(response =>
            response.data
        ).catch(error => {
            throw error;
        });
    }

    getContent(id: string): Promise<any> {
        return axios.get(`${id}`).then(response =>
            response.data.files['note.md']
        ).catch(error => {
            throw error;
        });
    }

    delete(id: string): Promise<any> {
        return axios.delete(`${id}`).catch(error => {
            throw error;
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