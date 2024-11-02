import axios from 'axios';


export const BASE_URL = "http://localhost:8050";

export const clientServer = axios.create({
    baseURL : BASE_URL,
})

