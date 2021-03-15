import React, { Component} from "react";
import { withRouter, Redirect } from 'react-router-dom';
import {userContext} from './components/auth/user-context.js';
import Header from './components/common/header_components/header';
import Sidebar from './components/common/sidebar_components/sidebar';
import Footer from './components/common/footer';

export class App extends Component{


  render(){
    return (
      <userContext.Consumer>
        {({isLoggedIn})=>(isLoggedIn? 
            (<div>
                <div className="page-wrapper" >
                    <Header logout={this.props.logout.bind(this)}/>
                    <div className="page-body-wrapper">
                        <Sidebar logout={this.props.logout.bind(this)}/>
                        <div className="page-body">
                            {this.props.children}
                        </div>
                            <Footer/>
                    </div>
                </div>
            </div>):
            (<Redirect to={`${process.env.PUBLIC_URL}/login`} />)
        )}            
        </userContext.Consumer>
    );
  }
};

export default withRouter(App);
