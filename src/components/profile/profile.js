import React, { Component ,Fragment} from 'react'
import designer from '../../assets/images/dashboard/designer.jpg';
import Tabset_profile from './tabset-profile';
import Breadcrumb from '../common/breadcrumb';
import {userContext} from '../auth/user-context'
import {Redirect} from 'react-router-dom';
const basicServerURL=process.env.REACT_APP_basicServerURL

export class Profile extends Component {
    render() {
        return (
            <userContext.Consumer>
            {
                ({isLoggedIn,profileData})=>(
                    isLoggedIn ? 
                    (
                        <Fragment>
                        <Breadcrumb title="Profile" parent="Settings" />
                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="profile-details text-center">
                                            <img src={designer} alt="" className="img-fluid img-90 rounded-circle blur-up lazyloaded" />
                                            <h5 className="f-w-600 f-16 mb-0">{profileData.name.firstName +' '+ profileData.name.lastName}</h5>
                                            <span>{profileData.email}</span>
                                            <div className="social">
                                                <div className="form-group btn-showcase">
                                                    <button className="btn social-btn btn-fb d-inline-block"> <i className="fa fa-facebook"></i></button>
                                                    <button className="btn social-btn btn-twitter d-inline-block"><i className="fa fa-google"></i></button>
                                                    <button className="btn social-btn btn-google d-inline-block mr-0"><i className="fa fa-twitter"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="card profile-card">
                                    <div className="card-body">
                                        <Tabset_profile/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Fragment>
                    ):
                    (<Redirect to={`${process.env.PUBLIC_URL}`}/>)                )
            }
            
            </userContext.Consumer>
        )
    }
}

export default Profile
