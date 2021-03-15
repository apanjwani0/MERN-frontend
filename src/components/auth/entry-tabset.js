import React, { Component, Fragment ,useContext} from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { withRouter } from 'react-router-dom';
//import {userContext} from './user-context'
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
const basicServerURL=process.env.REACT_APP_basicServerURL

//import { ToastContainer, toast } from 'react-toastify';
class EntryTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.handleLoginSubmit=this.handleLoginSubmit.bind(this)
        this.handleSignupSubmit=this.handleSignupSubmit.bind(this)
    }

    clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove('show');
        event.target.classList.add('show');
    }

    

    handleLoginSubmit(e){
        e.preventDefault();
        const loginURL=basicServerURL+'/api/accounts/login'
        var data={
            email:e.target.elements.email.value,
            password:e.target.elements.password.value
        }
        axios.post(
            loginURL,
            data,
        ).then(response=>{
            const loginResponse=response.data
            console.log(loginResponse)
                if(!loginResponse.success){
                    console.error(loginResponse.message)
                    e.target.elements.email.value=null
                    e.target.elements.password.value=null
                }
                else{
                    localStorage.setItem('JWT',loginResponse.token)
                    console.log('Login Successfull')
                    this.props.togglelogin(loginResponse.user)
                    this.routeChange()
                }
        }).catch(err=>{
            console.error(err)
        })
    }
    handleSignupSubmit(e){
        e.preventDefault();
        const signupURL=basicServerURL+'/api/accounts/signup'
        var data={
            name:{firstName:e.target.elements.firstName.value,
                middleName:e.target.elements.middleName.value,
            lastName:e.target.elements.lastName.value,},
            email:e.target.elements.email.value,
            mobileNo:e.target.elements.mobileNo.value,
            password:e.target.elements.password.value
        }
        axios.post(
            signupURL,
            data,
        ).then(response=>{
            const signupResponse=response.data
            console.log(signupResponse)
                if(!signupResponse.success){
                    console.error(signupResponse.message)
                    e.target.reset()
                }
                else{
                    localStorage.setItem('JWT',signupResponse.token)
                    console.log('Login Successfull')
                    this.props.togglelogin(signupResponse.user)
                    this.routeChange()
                }
        }).catch(err=>{
            console.error(err)
        })
    }

    routeChange = () => {
        //console.log(this.props)
        this.props.history.push(`${process.env.PUBLIC_URL}/events`);
      }
    render() {
        return (
            <div>
                <Fragment>
                    <Tabs>
                        <TabList className="nav nav-tabs tab-coupon" >
                            <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><User />Login</Tab>
                            <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><Unlock />Register</Tab>
                        </TabList>

                        <TabPanel>
                            <form className="form-horizontal auth-form" onSubmit={this.handleLoginSubmit}>
                                <div className="form-group">
                                    <input required={true} name="email" type="email" className="form-control" placeholder="Email" id="email" />
                                </div>
                                <div className="form-group">
                                    <input required={true} name="password" type="password" className="form-control" placeholder="Password" id="password"/>
                                </div>
                                <div className="form-terms">
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                        <label className="d-block">
                                                    <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                        Remember Me
                                                    {/* <span className="pull-right">
                                                        <a href="#" className="btn btn-default forgot-pass p-0">Forgot your password</a>
                                                    </span> */}
                                        </label>
                                    </div>
                                </div>
                                <div className="form-button">
                                    <button className="btn btn-primary" type="submit"  >Login</button>
                                </div>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form className="form-horizontal auth-form" onSubmit={this.handleSignupSubmit}>
                                <div className="form-group">
                                    <input required={true} name="firstName" type="text" className="form-control" placeholder="First Name" id="firstName" maxLength={16} />
                                </div>
                                <div className="form-group">
                                    <input required="" name="middleName" type="text" className="form-control" placeholder="Middle Name" id="middleName" maxLength={16} />
                                </div>
                                <div className="form-group">
                                    <input required={true} name="lastName" type="text" className="form-control" placeholder="Last Name" id="lastName" maxLength={16} />
                                </div>
                                <div className="form-group">
                                    <input required="" name="mobileNo" type="tel" className="form-control" placeholder="Mobile Number" id="mobileNo" minLength={10} maxLength={10} />
                                </div>
                                <div className="form-group">
                                    <input required={true} name="email" type="email" className="form-control" placeholder="Email" id="email" />
                                </div>
                                <div className="form-group">
                                    <input required={true} name="password" type="password" className="form-control" placeholder="Password" minLength={8} maxLength={16} id="password"/>
                                </div>
                                <div className="form-group">
                                    <input required={true} name="password" type="password" className="form-control" placeholder="Confirm Password" minLength={8} maxLength={16}/>
                                </div>
                                <div className="form-terms">
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                        <label className="d-block">
                                            <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                             I agree all statements in <span><a href=""> Terms &amp; Conditions</a></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-button">
                                    <button className="btn btn-primary" type="submit" >Register</button>
                                </div>
                            </form>
                        </TabPanel>
                    </Tabs>
                </Fragment>
            </div>
        )
    }
}

export default withRouter(EntryTabset)

