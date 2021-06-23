import axios from "axios";

const API_URL = "http://localhost:8080/api";
const API_AUTH = API_URL + "/auth";
const API_PARENT = API_URL + "/parent";

function makeHeader(token){
    const header = {
        headers:{
        'Authorization': 'Bearer '+token
        }
    }
    return header;
}

const getChildren = (token) => {
    return axios.get(API_PARENT + "/children", makeHeader(token));
}

const addDuty = (token, data) => {
    return axios.post(API_PARENT + "/addDuty", data, makeHeader(token));
}

const deleteDuty = (token, childId, dutyId) => {
    return axios.delete(API_PARENT + "/deleteDuty?dutyId=" + dutyId + "&childId=" + childId, makeHeader(token));
}

const registerChild = (token, data) => {
    return axios.post(API_PARENT + "/makeChildAccount", data, makeHeader(token));
}

const updateChildAccount = (token, data, childId) => {
    return axios.put(API_PARENT + "/updateChildInfo?childId="+childId, data, makeHeader(token));
}

const login = (username, password) => {
    return axios.post(API_AUTH + "/signIn", {
        username,
        password,
    });
};

const register = (realName, username, password) => {
    return axios.post(API_AUTH + "/signUp", {
      realName,
      username,
      password,
    });
};

const addTokenChild = (token, childToken) => {
    return axios.post(API_PARENT + "/addTokenChild?token="+childToken, null, makeHeader(token));
}

const deleteChildFromParent = (token, childId) => {
    return axios.delete(API_PARENT + "/deleteChild?childId="+childId, makeHeader(token))
}

export default{
    getChildren,
    addDuty,
    deleteDuty,
    registerChild,
    updateChildAccount,
    login,
    register,
    addTokenChild,
    deleteChildFromParent
}