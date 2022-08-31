import axios from "axios"

const apiUrl = "https://bn40758905.zicp.fun/monitoringapi/get"
// const apiUrl = "http://localhost:9090/monitoringapi/get"
function getData(str) {
     return axios.post(apiUrl + str).then(({ data }) => {
        return data[str]
    })
}

export { getData,apiUrl }