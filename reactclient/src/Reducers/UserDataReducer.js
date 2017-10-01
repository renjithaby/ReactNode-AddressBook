/**
 * Created by rabby on 26/09/2017.
 */
import history from '../History';

const UserDataReducer = (state = { user:{}, login:{errorMessage:""}}, action = {}) => {

    switch (action.type){

        case "REGISTER_SUCCESS" :
            return registerSuccess(state,action);

        case "REGISTER_FAILED" :
            return registerFailed(state,action);

        case "LOGIN_SUCCESS" :
            return loginSuccess(state,action);

        case "LOGIN_FAILED" :
            return loginFailed(state,action);

        case "LOAD_USER_TOKEN_SUCCESS" :
            return loadUserFromTokenSuccess(state,action);

        case "LOAD_USER_TOKEN_FAILED" :
            return  loadUserFromTokenFailed(state,action);

        case "HANDLE_LOGOUT_SUCCESS" :
            return handleLogoutSuccess(state,action);

        case "ADD_CONTACT_SUCCESS" :
            return addContactSuccess(state,action);

        case "ADD_CONTACT_FAILED" :
            return addContactFailed(state,action);

        case "DELETE_CONTACT_SUCCESS" :
            return deleteContactSuccess(state,action);

        case "DELETE_CONTACT_FAILED" :
            return deleteContactFailed(state,action);

        case "UPDATE_CONTACT_SUCCESS":
            return updateContactSuccess(state,action);

        case "UPDATE_CONTACT_FAILED":
            return updateContactFailed(state,action);

        default:
            return state;
    }


    function registerSuccess(state, action){
        history.push('/signin');
        return {...state};
    }

     function registerFailed(state, action){
        return {...state};
    }

    function loginSuccess(state, action){
        history.push('/home');
        return {...state, user : action.data.user,login:{errorMessage:""}  };
    }

    function loginFailed(state, action){
        return {...state, login:{errorMessage:action.data.message} };
    }

    function loadUserFromTokenFailed(state,action){
        history.push('/signin');
        return state;
    }

    function loadUserFromTokenSuccess(state, action){
        return {...state, user : action.data.user  };
    }

    function handleLogoutSuccess(state,action){
        history.push('/signin');
        return {...state, user :{} };
    }

    function addContactSuccess(state,action){
        history.push('/home');
        return {...state, user : action.data.user  };
    }

    function addContactFailed(state,action){
        return state;
    }

    function deleteContactSuccess(state,action){
        history.push('/home');
        return {...state, user : action.data.user  };
    }

    function deleteContactFailed(state,action){
        return state;
    }

    function updateContactSuccess(state,action){
        history.push('/home');
        return {...state, user : action.data.user  };
    }

    function updateContactFailed(state,action){
        return state;
    }



}



export default UserDataReducer;
