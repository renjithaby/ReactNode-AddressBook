/**
 * Created by rabby on 26/09/2017.
 * The module which register the actions , that handles the required tasks and notify the reducers the result.
 */

import dataApi from '../Api/dataApi';


export const registrationSuccess = (data) => {
    return {
        type: "REGISTER_SUCCESS",
        data: data
    };
}

export const registrationFailed = (data) => {
    return {
        type: "REGISTER_FAILED",
        data:data
    };
}

export const loginSuccess = (data) => {
    return {
        type: "LOGIN_SUCCESS",
        data: data
    };
}

export const loginFailed = (data) => {
    return {
        type: "LOGIN_FAILED",
        data:data
    };
}

export const handleLogout = (data) => {
    sessionStorage.clear();
    return {
        type: "HANDLE_LOGOUT_SUCCESS",
        data: data
    };
}

export const loadUserFromTokenSuccess = (data) => {
    return {
        type: "LOAD_USER_TOKEN_SUCCESS",
        data: data
    };
}

export const addNewContactSuccess = (data) => {
    return {
        type: "ADD_CONTACT_SUCCESS",
        data: data
    };
}

export const addNewContactFailed = (data) => {
    return {
        type: "ADD_CONTACT_FAILED",
        data:data
    };
}

export const updateContactSuccess = (data) => {
    return {
        type: "UPDATE_CONTACT_SUCCESS",
        data: data
    };
}

export const updateContactFailed = (data) => {
    return {
        type: "UPDATE_CONTACT_FAILED",
        data:data
    };
}

export const deleteContactSuccess = (data) => {
    return {
        type: "DELETE_CONTACT_SUCCESS",
        data: data
    };
}

export const deleteContactFailed = (data) => {
    return {
        type: "DELETE_CONTACT_FAILED",
        data: data
    };
}




export function loginUser(usr) {
    return function(dispatch) {
        var resultData = {};
        return dataApi.login(usr).then(data => {

            if(data.result === "failed"){
                if(data.message === "EXPIRED_TOKEN"){
                    dispatch(handleLogout(data));
                }else {
                    dispatch(loginFailed(data));
                }

            }else {
                resultData.token = data.token;
                sessionStorage.setItem('jwt', resultData.token);
                resultData.user = data.user;
                dispatch(loginSuccess(resultData));

            }
        }).catch(error => {
            throw(error);
        });
    };
}


export function registerUser(usr) {
    return function(dispatch) {
        return dataApi.register(usr).then(data => {
            if(data.result ==="failed"){
                if(data.message === "EXPIRED_TOKEN"){
                    dispatch(handleLogout(data));
                }else {
                    dispatch(registrationFailed(data));
                }
            }else {
                dispatch(registrationSuccess());
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadUserFromToken(token) {
    return function(dispatch) {
        var resultData = {};
        return dataApi.loadUserFromToken(token).then(data => {
            if(data.result === "failed"){
                if(data.message === "EXPIRED_TOKEN"){
                    dispatch(handleLogout(data));
                }else {
                    dispatch(handleLogout());
                }
            }else {
                resultData.user = data.user;
                dispatch(loadUserFromTokenSuccess(resultData));

            }
        }).catch(error => {
            throw(error);
        });
    };
}


export function addNewContact(formData) {
    return function(dispatch) {
        return dataApi.addNewContact(formData).then(data => {
            if(data.result === "failed"){
                if(data.message === "EXPIRED_TOKEN"){
                    dispatch(handleLogout(data));
                }else {
                    dispatch(addNewContactFailed(data));
                }
            }else {
                dispatch(addNewContactSuccess({user:data}));

            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function updateContact(formData) {
    return function(dispatch) {
        return dataApi.updateContact(formData).then(data => {
            if(data.result === "failed"){
                if(data.message === "EXPIRED_TOKEN"){
                    dispatch(handleLogout(data));
                }else {
                    dispatch(updateContactFailed(data));
                }
            }else {
                dispatch(updateContactSuccess({user:data}));

            }
        }).catch(error => {
            throw(error);
        });
    };
}


export function deleteContact(contactId) {
    return function(dispatch) {
        return dataApi.deleteContact(contactId).then(data => {
            if(data.result === "failed"){
                if(data.message === "EXPIRED_TOKEN"){
                    dispatch(handleLogout(data));
                }else {
                    dispatch(deleteContactFailed(data));
                }
            }else {
                dispatch(deleteContactSuccess({user:data}));

            }
        }).catch(error => {
            throw(error);
        });
    };
}






