/**
 * Created by rabby on 27/09/17.
 * Component that handles the adding a new contact form with a basic validator
 */
import React from 'react';
import './AddContact.css';
export const max_file_size = 2000;// bytes

class AddContactPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {name :"name", image :"", address:"address", email:"email", mobile:"mobile",
            file:"",imagePreviewUrl:"",fileUploadErrorMessage :"" , uploadedImage :"",
            nameValid :{message:"minimum 3 characters required",status:"default"},
            addressValid:{message:"minimum 6 characters required",status:"default"},
            emailValid :{message:"please enter a valid email",status:"default"},
            mobileValid:{message:"please enter a valid mobile number, min 6 digits",status:"default"},
            formValid:false};
    }

    componentWillReceiveProps(props){

    }

    /*
     *Function which handles teh basic validation of the form
     */
    validator(){
        let formValid = true;
        let mobileReg = new RegExp(/^\d+$/);
        let emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        //name
        //min 3 characters
        if(this.state.name.length<3){

            this.setState({nameValid:{...this.state.nameValid , status: false});
            formValid = false;
        }else{
            this.setState({nameValid:{...this.state.nameValid , status: true});
        }

        //address
        //min  6 characters
        if(this.state.address.length<6){

            this.setState({addressValid:{...this.state.addressValid , status: false});
            formValid = false;
        }else{
            this.setState({addressValid:{...this.state.addressValid , status: true});
        }

        //email
        if(!emailReg.test(this.state.email)){
            this.setState({emailValid:{...this.state.emailValid , status: false});
            formValid = false;
        }else{
            this.setState({emailValid:{...this.state.emailValid , status: true});
        }

        //mobile
        //min 6 characters
        if(this.state.mobile.length<6) {
            this.setState({mobileValid:{...this.state.mobileValid , status: false});
            formValid = false;
        }else if(!mobileReg.test(this.state.mobile)) {
            this.setState({mobileValid:{...this.state.mobileValid , status: false});
            formValid = false;
        }else{
            this.setState({mobileValid:{...this.state.mobileValid , status: true});
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

    /*
     * Function which calls the container prop function to add a new contact.
     */
    addNewContact(event) {
        event.preventDefault();
        let contact = {name :this.state.name, address :this.state.address, email :this.state.email, mobile :this.state.mobile};
        this.props.addNewContact({userId:this.props.user._id,profilePicFile:this.state.file,contact:contact});
    }

    /*
     * Function which handles the image upload, through file reader.
     */
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
        if(file && file.size>max_file_size){
            file = null;
            reader =null;
            this.setState({
                file: "",
                imagePreviewUrl:"",
                uploadedImage:"",
                fileUploadErrorMessage : " max file size limit is " + max_file_size+"bytes"
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
                    <div className={!this.state.nameValid.status?"form-group has-error":"form-group"}>
                        <label> name </label> {!this.state.nameValid.status?this.state.nameValid.message:""}
                        <input className="form-control"  value = {this.state.name} onChange = {this.handleNameChange.bind(this)}/>
                    </div>
                    <div className={!this.state.addressValid.status?"form-group has-error":"form-group"}>
                        <label> address </label> {!this.state.addressValid.status?this.state.addressValid.message:""}
                        <textarea className="form-control"  value = {this.state.address} onChange = {this.handleAddressChange.bind(this)}/>
                    </div>
                    <div className={!this.state.emailValid.status?"form-group has-error":"form-group"}>
                        <label> email </label>{!this.state.emailValid.status?this.state.emailValid.message:""}
                        <input className="form-control" type= "email" value = {this.state.email} onChange = {this.handleEmailChange.bind(this)}/>
                    </div>

                    <div className={!this.state.mobileValid.status?"form-group has-error":"form-group"}>
                        <label> mobile </label>{!this.state.mobilValid.status?this.state.mobileValid.message:""}
                        <input className="form-control"  value = {this.state.mobile} onChange = {this.handleMobileChange.bind(this)}/>
                    </div>



                    <input className="btn-green btn-submit"   type="submit" value="Add Contact" disabled ={!this.state.formValid} />
                </form>
            </div>
        );
    }
}


export default AddContactPage;
