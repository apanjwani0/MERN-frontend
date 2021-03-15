import React, { Component } from 'react'
import man from '../../../assets/images/dashboard/man.png'
import {userContext} from '../../auth/user-context'

export class User_panel extends Component {
    render() {
        return (
            <userContext.Consumer>
                {
                    ({profileData})=>(
                        <div>
                        <div className="sidebar-user text-center">
                            <div><img className="img-60 rounded-circle lazyloaded blur-up" src={man} alt="#" />
                            </div>
                            <h6 className="mt-3 f-14">{profileData.name.firstName+'-'+profileData.name.lastName}</h6>
                            <p>{profileData.email}</p>
                        </div>
                    </div>
                    )
                }
            </userContext.Consumer>
            
        )
    }
}

export default User_panel

