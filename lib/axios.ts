import axios from "axios"

const AxiosInstance = axios.create({
    baseURL: "https://test-fe.mysellerpintar.com/api"
})

export default AxiosInstance;