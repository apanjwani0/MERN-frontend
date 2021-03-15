import { Component ,Fragment} from "react";
import EntryTabset from "./entry-tabset";
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {userContext} from './user-context.js'

class Entry extends Component{
    static contextType =userContext
    render(){
        if (this.context.isLoggedIn) {
            console.log('ready to redirect')
            return (<Redirect to={`${process.env.PUBLIC_URL}/events`}/>)
        }
        return (
            <Fragment>
                <div className="page-wrapper">
                    <div className="authentication-box">
                        
                                    <div className="card tab2-card">
                                        <div className="card-body">
                                             <EntryTabset togglelogin={this.props.togglelogin.bind(this)}/> 
                                        </div>
                                    </div>
                               
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(Entry)