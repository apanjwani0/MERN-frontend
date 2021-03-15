import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import axios from "axios";
import { BrowserRouter, Route, Switch ,Redirect} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {userContext} from './components/auth/user-context.js';
import { ScrollContext } from 'react-router-scroll-4';
import Entry from './components/auth/entry';
import Profile from './components/profile/profile';
import Events from './components/event/events';
import Error404 from './components/Error404';
import YourEvents from './components/event/your-events';
import AddEvent from './components/event/add-event';


const basicServerURL=process.env.REACT_APP_basicServerURL

class Root extends Component{

  constructor(props){
    super(props);
    this.state={
      isLoggedIn:false,
      profileData:{},
      loading:true,
      togglelogin:this.togglelogin
    }
    this.handleLogout = this.handleLogout.bind(this)
    //this.handleLoginSubmit=this.handleLoginSubmit.bind(this)
  }

  togglelogin(profileData){
    console.log(profileData)
    if(profileData){
        console.log('Logging In User')
        this.setState({
            isLoggedIn:true,
            profileData:profileData,
            loading:false,
        })

    }else{
        console.log('Logging out User')
        this.setState({
            isLoggedIn:false,
            profileData:{},
            loading:false
        })
        
    }
}

  async fetchProfile(token){
    this.setState({
      loading:true
    })
    const response = await axios.get(
      basicServerURL+'/api/accounts/profile',{
        headers:{
          'Authorization':`Bearer ${token}`,
        }
      }
    );
    return response.data
  }

  

  componentDidMount(){
    const jwtToken = localStorage.getItem("JWT");
    //console.log(jwtToken)
    if (jwtToken) {
      this.fetchProfile(jwtToken).then((response=>{
        console.log(response)
        if(response.success){
          this.togglelogin(response.result)
        }else{
          localStorage.clear();
          this.state.togglelogin()
        }
      })).catch(err=>{
        console.error(err)
      })
      
    }
  }

  handleLogout() {
    localStorage.clear();
    this.setState({
      isLoggedIn:false,
      profileData:null
    })
  };

  render(){
    return (
      <userContext.Provider value={this.state}>
      <BrowserRouter basename={'/'}>
      <ScrollContext>
        <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
                    return (
                      this.state.loading?
                      (<div><h2>Loading...</h2></div>)
                      :(
                      this.state.isLoggedIn ?
                      <Redirect to={`${process.env.PUBLIC_URL}/events`} /> :
                      <Redirect to={`${process.env.PUBLIC_URL}/login`} /> )
                    )
                }}
              />
        <Route exact path={`${process.env.PUBLIC_URL}/login`} render={()=>(<Entry togglelogin={this.togglelogin.bind(this)} />)}/>
        <App logout={this.handleLogout.bind(this)}>
          <Route path={`${process.env.PUBLIC_URL}/events`} render={()=>(<Events/>)}/>
          <Route path={`${process.env.PUBLIC_URL}/yourEvents/events`} render={()=>(<YourEvents/>)}/>
          <Route path={`${process.env.PUBLIC_URL}/yourEvents/addEvent`} render={()=>(<AddEvent/>)}/>
          <Route path={`${process.env.PUBLIC_URL}/profile`} render={()=>(<Profile/>)}/>
        </App>
        <Route path={`${process.env.PUBLIC_URL}/`} component={Error404} />
        
        </Switch>
        </ScrollContext>
      </BrowserRouter>
      </userContext.Provider>
    )
  }
}

ReactDOM.render(<Root/>,
  document.getElementById('root')
);

