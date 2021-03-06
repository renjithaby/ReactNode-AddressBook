/**
 * Created by rabby on 27/09/17.
 * View component for the single contact Item
 */

import React from 'react';
import history from '../../History';
import './ContactItem.css';
export const apiHost = "http://localhost:3000/";// "https://desolate-waters-54209.herokuapp.com/";


class ContactItem extends React.Component {

    constructor(props){
        super(props);
    }
    componentWillMount(props){

    }

    showContact(e){
        history.push('/contact/'+this.props.item.id);
    }

    render() {
        return (
                <div onClick = {this.showContact.bind(this)} className="contact-item col-xs-12 col-sm-6 ">
                    <div className="panel panel-default" >
                        <div className="panel-body image-block">
                            <img  src = {apiHost + this.props.item.profilePicUrl} alt="profile pic" />
                            <span className="name"> {this.props.item.name} </span>
                        </div>
                    </div>
                </div>
        );
    }
}


export default ContactItem;
