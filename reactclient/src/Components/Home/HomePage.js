/**
 * Created by rabby on 26/09/2017.
 * Component that displays the home Page to show the user contact lists,
 * with a search feature based on contacts name
 */

import React from 'react';
import ContactItem  from '../ContactItem/ContactItem';
import './Home.css';
class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = { search :"", contacts: [] };
    }


    componentDidMount(props) {
        this.filterContacts();
    }

    /**
     * Handles the filtering of the contacts based on the contact name.
     */
    filterContacts(){
        let expression = "^"+this.state.search+".*$";
        let searchReg = new RegExp(expression);
        if(this.state.search !== ""){
            let contacts = this.props.user.contacts.filter(o => searchReg.test(o.name));
            this.setState({contacts: contacts});
        }else{
            this.setState({contacts: this.props.user.contacts});
        }
    }

    handleSearchChange(event){
        this.setState({search: event.target.value},this.filterContacts);
    }

    render() {
        return (
	            <div className="home-page container">
                    <form>
                        <div className="form-group search">
                           <span>Search Contact</span>
                            <input className="form-control"  value={this.state.search} onChange={this.handleSearchChange.bind(this)}/>
                        </div>
                    </form>

                    <hr/>

                    <div className="contact-list">
                    <span className= "message">{!this.props.user._id?"Please sigin to view your contacts.":null}</span>
                    <span className= "message">{this.props.user._id && this.props.user.contacts.length < 1 ?"You dont have any contacts, please Add Contact.":null} </span>
                        {this.state.contacts ?
                            <ul className="row">
                                {this.state.contacts.map((item) =>
                                    <li key={item.id} >
                                        <ContactItem  item ={item}/>
                                    </li>
                                )}
                            </ul> :null}
                     </div>
                </div>
         );
    }
}


export default HomePage;
