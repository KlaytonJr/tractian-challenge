import axios from 'axios';

const api = axios.create({
    baseURL: "https://my-json-server.typicode.com/tractian/fake-api"
    // baseURL: "http://localhost:7000"
})

export default api;