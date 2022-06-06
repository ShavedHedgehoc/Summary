import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:5000/'
    // baseURL: 'http://0.0.0.0:5000/'
    // baseURL: 'http://192.168.0.106:5000/'
})

export {
    $host,
}