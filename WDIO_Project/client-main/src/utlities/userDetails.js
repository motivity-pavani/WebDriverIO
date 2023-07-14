
import CryptoJS from 'crypto-js';

const intial = {
    Email: "",
    Name: "",
    token: "",
    autid: null,
    autname: ""
}

export const getUser = () => {
    if (localStorage.getItem("userData")) {
        return JSON.parse(localStorage.getItem("userData"))
    }
    else {
        return intial
    }
}


export const decrypt = (chiperStr, key) => CryptoJS.AES.decrypt(chiperStr, key).toString(CryptoJS.enc.Utf8);





