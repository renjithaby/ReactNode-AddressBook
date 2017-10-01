/**
 * Created by rabby on 27/09/17.
 */
import React from 'react';
import './AddContact.css';

export const MAX_FILE_SIZE = 2000;// bytes
class AddContactPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {name :"name", image :"", address:"address", email:"email", mobile:"mobile",
            file:"",imagePreviewUrl:"",fileUploadErrorMessage :"" , uploadedImage :"",
            nameValid:"default", addressValid:"default", emailValid:"default", mobileValid:"default", formValid:false};
    }

    componentWillReceiveProps(props){

    }

    validator(){
        let formValid = true;
        let mobileReg = new RegExp(/^\d+$/);
        let emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        //name
        //min 6 characters
        if(this.state.name.length<6){

            this.setState({nameValid: false});
            formValid = false;
        }else{
            this.setState({nameValid: true});
        }

        //address
        //min  6 characters
        if(this.state.address.length<6){

            this.setState({addressValid: false});
            formValid = false;
        }else{
            this.setState({addressValid: true});
        }

        //email
        if(!emailReg.test(this.state.email)){
            this.setState({emailValid: false});
            formValid = false;
        }else{
            this.setState({emailValid: true});
        }

        //mobile
        //min 6 characters
        if(this.state.mobile.length<6) {
            this.setState({mobileValid: false});
            formValid = false;
        }else if(!mobileReg.test(this.state.mobile)) {
            this.setState({mobileValid: false});
            formValid = false;
        }else{
            this.setState({mobileValid: true});
        }

        this.setState({formValid :formValid});
    }


    handleNameChange(event) {

        this.setState({name : event.target.value},this.validator);

    }

    handleAddressChange(event) {
        this.setState({address : event.target.value},this.validator);
    }

    handleEmailChange(event) {
        this.setState({email : event.target.value},this.validator);
    }

    handleMobileChange(event) {
        this.setState({mobile : event.target.value},this.validator);
    }

    addNewContact(event) {
        event.preventDefault();
        let contact = {name :this.state.name, address :this.state.address, email :this.state.email, mobile :this.state.mobile};
        this.props.addNewContact({userId:this.props.user._id,profilePicFile:this.state.file,contact:contact});
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
            });
        }
        if(file && file.size>MAX_FILE_SIZE){
            file = null;
            reader =null;
            this.setState({
                file: "",
                imagePreviewUrl:"",
                uploadedImage:"",
                fileUploadErrorMessage : " max file size limit is " + MAX_FILE_SIZE+"bytes"
            });
        }
        if(file) {
            reader.readAsDataURL(file)
        }

    }



    render() {

        return (
            <div  className ="add-contact form-block ">

                <div className = "form-group profile-image">
                    <label> Image </label>
                    <div>
                        <img src={this.state.imagePreviewUrl} alt="image" />
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
                <form  onSubmit = {this.addNewContact.bind(this)} >
                    <div className={!this.state.nameValid?"form-group has-error":"form-group"}>
                        <label> name </label>
                        <input className="form-control"  value = {this.state.name} onChange = {this.handleNameChange.bind(this)}/>
                    </div>
                    <div className={!this.state.addressValid?"form-group has-error":"form-group"}>
                        <label> address </label>
                        <textarea className="form-control"  value = {this.state.address} onChange = {this.handleAddressChange.bind(this)}/>
                    </div>
                    <div className={!this.state.emailValid?"form-group has-error":"form-group"}>
                        <label> email </label>
                        <input className="form-control" type= "email" value = {this.state.email} onChange = {this.handleEmailChange.bind(this)}/>
                    </div>

                    <div className={!this.state.mobileValid?"form-group has-error":"form-group"}>
                        <label> mobile </label>
                        <input className="form-control"  value = {this.state.mobile} onChange = {this.handleMobileChange.bind(this)}/>
                    </div>



                    <input className="btn-green btn-submit"   type="submit" value="Add Contact" disabled ={!this.state.formValid} />
                </form>
            </div>
        );
    }
}


export default AddContactPage;
