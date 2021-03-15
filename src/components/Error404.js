import { Component } from "react";
import {withRouter} from 'react-router-dom'
class Error404 extends Component{
    render(){
        return (
            <div>
                <h1>404 ERROR OCCURED</h1>
            </div>
        )
    }
}

export default withRouter(Error404)