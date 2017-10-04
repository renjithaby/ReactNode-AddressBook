
/**
 * Created by rabby on 26/09/2017.
 * The main container Component which takes data fro UserData reducer, and handles the routing of the application.
 */
import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import SignUpPage  from './Components/SignUp/SignUpPage';
import SignInPage from './Components/SignIn/SignInPage';
import HomePage from './Components/Home/HomePage';
import AddContactPage  from './Components/AddContact/AddContactPage';
import ContactDetailPage from './Components/ContactDetail/ContactDetailPage';
import EditContactPage from './Components/EditContact/EditContactPage';
import * as Actions from  "./Actions/Action";
import { connect } from 'react-redux';
import {Route ,Switch} from 'react-router-dom';

class App extends Component {

    componentWillMount(props){

       if(sessionStorage.jwt) {
            this.props.loadUserFromToken(sessionStorage.jwt);
       }
    }

    render() {
        return (
              <div>
                  <Header currentUser = {this.props.userData.user} appName= {"Thoughts!"} handleLogout = {this.props.handleLogout.bind(this)} {...this.props}/>
                  <Switch>
                      <Route path = "/signup"  component = {()=>  <SignUpPage  registerUser = {this.props.registerUser}   />} />
                      <Route path = "/signin"  component = {()=>  <SignInPage  loginUser = {this.props.loginUser} login ={this.props.userData.login}/>} />
                      <Route path = "/contact/:id"  component = {()=>  <ContactDetailPage  user = {this.props.userData.user} deleteContact = {this.props.deleteContact} {...this.props} />} />
                      <Route path = "/editcontact/:id"  component = {()=>  <EditContactPage  user = {this.props.userData.user} updateContact ={this.props.updateContact} {...this.props} />} />
                      <Route path = "/addcontact"  component = {()=>  <AddContactPage user= {this.props.userData.user}  addNewContact = {this.props.addNewContact}   />} />
                      <Route path ="/home" component ={()=> <HomePage  user= {this.props.userData.user}/>} />
                      <Route component={() => <HomePage user= {this.props.userData.user}/>}/>
                  </Switch>
              </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userData: state

    }
}


const mapDispatchToProps = dispatch => {
    return {
        registerUser: user => {
            dispatch(Actions.registerUser(user));
        },
        loginUser: user => {
            dispatch(Actions.loginUser(user));
        },
       loadUserFromToken : token =>{
            dispatch(Actions.loadUserFromToken(token));
        },
        handleLogout :()=>{
            dispatch(Actions.handleLogout());
        },
        addNewContact: formData =>{
            dispatch(Actions.addNewContact(formData));
        },
        updateContact: formData =>{
            dispatch(Actions.updateContact(formData));
        },
        deleteContact: contactId =>{
            dispatch(Actions.deleteContact(contactId));
        }


    }
}


export const  AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);