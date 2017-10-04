/**
 * Created by rabby on 27/09/17.
 * Component that handles the display of a Contact Detail
 */

import './ContactDetail.css';
import React from 'react';
import history from '../../History';
export const apiHost =  "https://desolate-waters-54209.herokuapp.com/";

class ContactDetailPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {contact:{name:"", address:"", email:"",mobile:"", profilePicUrl:""}};
    }

    componentWillMount(props){
        //get the contact from the list and set the state
        if(this.props.user.contacts) {
            let contact = this.props.user.contacts.find(o => o.id == this.props.match.params.id);
            this.setState({contact: contact});
        }
    }

    componentWillReceiveProps(nextProps){

    }

    /*
     * Functions directs the user to the editcontact page with contact id as parameter
     */
    handleEditContact(e){
        history.push('/editContact/'+ this.state.contact.id );
    }

    /*
     * Function which calls the container prop deleteContact to delete a contact.
     */
    handleDeleteContact(e){
        this.props.deleteContact({userId: this.props.user._id, contactId: this.state.contact.id});
    }


    render() {
        return (
            <div className="contact-detail container">

                <div className="panel-body image-block">
                    <img  src = {apiHost + this.state.contact.profilePicUrl} alt="profile pic" />
                </div>

                <div className="field">
                    <span className="title"> name </span>
                    <hr/>
                    <span> {this.state.contact.name} </span>
                </div>

                <div className="field">
                    <span className="title"> address </span>
                    <hr/>
                    <span> {this.state.contact.address} </span>
                </div>

                <div className="field">
                    <span className="title"> email </span>
                    <hr/>
                    <p> {this.state.contact.email} </p>
                </div>

                <div className="field">
                    <span className="title"> mobile </span>
                    <hr/>
                    <p> {this.state.contact.mobile} </p>
                </div>
                <div className = "btns">
                    <button className="btn-green btn-edit" onClick = {this.handleEditContact.bind(this)}> edit </button>
                    <button className="btn-green btn-delete" onClick = {this.handleDeleteContact.bind(this)}> delete </button>
                </div>
            </div>
        );
    }
}


export default ContactDetailPage;
