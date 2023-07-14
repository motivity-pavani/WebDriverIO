
import axios from 'axios';

export const APIKIT = {
    get: (url) => {
        return new Promise((resolve) => {
            axios.get(url,
                { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getJWT()}` } })
                .then(res => {
                    resolve(res.data)
                }).catch(function (error) {
                    resolve({
                        status: 400,
                        message: "Server not running or api not found"
                    })
                })
        })
    },
    post: (url, payload) => {
        return new Promise((resolve) => {
            axios.post(url, payload,
                { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getJWT()}` } })
                .then(res => {
                    resolve(res.data)
                }).catch(function (error) {
                    resolve({
                        status: 400,
                        message: "Server not running or api not found"
                    })
                })
        })
    }
}


export function getJWT() {
    var jwt = "";
    if (localStorage && localStorage.userData) {
        try {
            jwt = JSON.parse(localStorage.userData).token;
        } catch (err) {

        }

    }
    return jwt;
}
