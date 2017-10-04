/**
 * Created by rabby on 28/09/17.
 * Component that handles the editing a contact form with a basic validator, and
 * checks to findout whether the form is dirty( means any new chnages)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './EditContact.css';
export const apiHost = "https://desolate-waters-54209.herokuapp.com/";
export const max_file_size = 2000; //bytes

class EditContactPage extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            contact: {_id: "", name: "", address: "", email: "", mobile: "", profilePicUrl: ""},
            file: "",
            imagePreviewUrl: "",
            fileUploadErrorMessage: "",
            uploadedImage: "",
            nameValid: "default",
            addressValid: "default",
            emailValid: "default",
            mobileValid: "default",
            formValid: false,
            isDirty:false
        };


    }


    componentWillMount(){
        if(this.props.user.contacts) {
            let contact = this.props.user.contacts.find(o => o.id == this.props.match.params.id);
            this.setState({contact: contact});
        }
    }

    isShallowEqual(v, o) {
            for(var key in v) {
                if (!(key in o) || v[key] !== o[key])
                    return false

                for (var key in o)
                    if (!(key in v) || v[key] !== o[key])
                        return false

                return true
            }
    }

    isDirty(){
        let isDirty = false;
        let contact = this.props.user.contacts.find(o => o.id == this.props.match.params.id);
        isDirty = !this.isShallowEqual(contact, this.state.contact);
        if(isDirty ){
            this.setState({isDirty:isDirty});
            return;
        }

        isDirty = (this.state.file !=="");
        this.setState({isDirty:isDirty});
        return;

    }

     validator(){
        let formValid = true;
        let mobileReg = new RegExp(/^\d+$/);
        let emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        //name
        //min 6 characters
        if(this.state.contact.name.length<6){

            this.setState({nameValid: false});
            formValid = false;
        }else{
            this.setState({nameValid: true});
        }

        //address
        //min  6 characters
        if(this.state.contact.address.length<6){

            this.setState({addressValid: false});
            formValid = false;
        }else{
            this.setState({addressValid: true});
        }

        //email
        if(!emailReg.test(this.state.contact.email)){
            this.setState({emailValid: false});
            formValid = false;
        }else{
            this.setState({emailValid: true});
        }

        //mobile
        //min 6 characters
        if(this.state.contact.mobile.length<6) {
            this.setState({mobileValid: false});
            formValid = false;
        }else if(!mobileReg.test(this.state.contact.mobile)) {
            this.setState({mobileValid: false});
            formValid = false;
        }else{
            this.setState({mobileValid: true});
        }

        this.setState({formValid :formValid},this.isDirty);

    }



    handleNameChange(event) {
        let obj =  {...this.state.contact, name : event.target.value};
        this.setState({contact: obj}, this.validator);
    }

    handleAddressChange(event) {
        let obj =  {...this.state.contact, address : event.target.value};
        this.setState({contact : obj},this.validator);
    }

    handleEmailChange(event) {
        let obj =  {...this.state.contact, email : event.target.value};
        this.setState({contact : obj},this.validator);
    }

    handleMobileChange(event) {
        let obj =  {...this.state.contact, mobile : event.target.value};
        this.setState({contact : obj},this.validator);
    }

    updateContact(event) {
        event.preventDefault();
        const form = document.getElementById("add-contact");
        let contact = {id :this.state.contact.id,name :this.state.contact.name, address :this.state.contact.address, email :this.state.contact.email, mobile :this.state.contact.mobile ,profilePicUrl :this.state.contact.profilePicUrl};
        this.props.updateContact({userId:this.props.user._id,profilePicFile:this.state.file,contact:contact});
    }

    handleImageChange(e){

         e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                uploadedImage:file.name
            },this.validator);
        }
        if(file && file.size>max_file_size){
            file = null;
            reader =null;
            this.setState({
                file: "",
                imagePreviewUrl:"",
                uploadedImage:"",
                fileUploadErrorMessage : " max file size limit is " + max_file_size+"bytes"
            },this.validator);
        }
        if(file) {
            reader.readAsDataURL(file)
        }

    }



    render() {

        return (
           <div  className ="edit-contact form-block ">

                <div className = "form-group profile-image">
                    <label> Image </label>
                    <div>
                        {this.state.imagePreviewUrl ? <img src= {this.state.imagePreviewUrl} alt="profile pic" />:<img  src = {apiHost + this.state.contact.profilePicUrl} />}
                    </div>
                    <div>
                        <span> {this.state.uploadedImage} </span>
                    </div>
                    <div>
                        <span className="error-message"> {this.state.fileUploadErrorMessage} </span>
                    </div>
                    <label className="fileContainer">
                        upload File!
                        <input type="file" onChange={this.handleImageChange.bind(this)}/>
                    </label>
                </div>
                <form  onSubmit = {this.updateContact.bind(this)} >
                    <div className={!this.state.nameValid?"form-group has-error":"form-group"}>
                        <label> name </label>
                        <input className="form-control"  value = {this.state.contact.name} onChange = {this.handleNameChange.bind(this)}/>
                    </div>
                    <div className={!this.state.addressValid?"form-group has-error":"form-group"}>
                        <label> address </label>
                        <textarea className="form-control"  value = {this.state.contact.address} onChange = {this.handleAddressChange.bind(this)}/>
                    </div>
                    <div className={!this.state.emailValid?"form-group has-error":"form-group"}>
                        <label> email </label>
                        <input className="form-control" type= "email" value = {this.state.contact.email} onChange = {this.handleEmailChange.bind(this)}/>
                    </div>

                    <div className={!this.state.mobileValid?"form-group has-error":"form-group"}>
                        <label> mobile </label>
                        <input className="form-control"  value = {this.state.contact.mobile} onChange = {this.handleMobileChange.bind(this)}/>
                    </div>



                    <input className="btn-green btn-submit"   type="submit" value="Update Contact" disabled ={!this.state.formValid || !this.state.isDirty} />
                </form>
            </div>
        );
    }
}


export default EditContactPage;
