import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppContainer} from './App';
import registerServiceWorker from './registerServiceWorker';
import userDataReducer from './Reducers/UserDataReducer';
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {Router,Route,Switch} from 'react-router-dom';
import history from './History';


let store = createStore( userDataReducer,applyMiddleware(thunk));
const app = document.getElementById("root");


ReactDOM.render(
		<Provider store={store}>

	        <Router  history={history}  >
                <Switch>
                    <Route path ="/editcontact/:id"  component = {AppContainer}/>
                    <Route path ="/contact/:id"  component = {AppContainer}/>
                    <Route  component = {AppContainer}/>
                </Switch>
	        </Router>
        </Provider>, app);
registerServiceWorker();
