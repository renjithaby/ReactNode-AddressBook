/**
 * Created by rabby on 26/09/2017.
 */

export const apiHost = "http://localhost:3000/";
class dataApi {
    constructor() {

    }


    static login(usr) {

        const request = new Request(apiHost+'authenticate',{
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ username: usr.username, password : usr.password})
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });

    }


    static register(usr) {

        const request = new Request(apiHost+'adduser',{
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({username: usr.username, password : usr.password,email: usr.email})
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }


    static loadUserFromToken(token) {

        const request = new Request(apiHost+'user/loadUserFromToken',{
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.jwt
            }),
            body: JSON.stringify({token:token})
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });

    }

    static addNewContact(data) {

        let formData = new FormData();
        formData.append('profilePic',data.profilePicFile?data.profilePicFile:null);
        formData.append('userid',data.userId);
        formData.append('name',data.contact.name);
        formData.append('address',data.contact.address);
        formData.append('email',data.contact.email);
        formData.append('mobile',data.contact.mobile);
        const request = new Request(apiHost+'user/addcontact',{
            method: 'POST',
            headers: new Headers({
                'x-access-token': sessionStorage.jwt
            }),
            body: formData
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });

    }

    static updateContact(data) {

        let formData = new FormData();
        formData.append('profilePic',data.profilePicFile?data.profilePicFile:null);
        formData.append('profilePicUrl',data.contact.profilePicUrl);
        formData.append('userid',data.userId);
        formData.append('contactId',data.contact.id);
        formData.append('name',data.contact.name);
        formData.append('address',data.contact.address);
        formData.append('email',data.contact.email);
        formData.append('mobile',data.contact.mobile);
        const request = new Request(apiHost+'user/updatecontact',{
            method: 'POST',
            headers: new Headers({
                'x-access-token': sessionStorage.jwt
            }),
            body: formData
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });

    }

    static deleteContact(data) {


        const request = new Request(apiHost+'user/deletecontact',{
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.jwt
            }),
            body: JSON.stringify({userid: data.userId, contactid:data.contactId})
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });

    }






}

export default dataApi;


