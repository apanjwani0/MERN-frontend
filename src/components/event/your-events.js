import { Component, Fragment } from "react";
import EvenTable from './event-table';
import axios from 'axios';
import Breadcrumb from '../common/breadcrumb'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, ToastType } from 'react-toastify';
const basicServerURL=process.env.REACT_APP_basicServerURL

export default class YourEvents extends Component{

    constructor(props){
    super(props);
    this.state={
        eventsData:null,
        loading:true
    }
  }

  getEvents(){
    const url=basicServerURL+"/api/events/viewAllUsersEvents"
        const jwtToken = localStorage.getItem("JWT");
        //console.log(jwtToken)
        if (jwtToken) {
            console.log(jwtToken)
            axios.get(
                url,
                {headers:{'Authorization':`Bearer ${jwtToken}`,}
            }).then((res)=>{
                console.log(res)
                if(res.data.success){
                    console.log('Events fetched')
                    this.setState({
                        loading:false,
                        eventsData:res.data.result
                    })
                    toast.success(res.data.message);
                }else{
                    console.err(res.data.message,res.data.error.message)
                }
            }).catch((err)=>{
                console.error(err.message)
            })
        }else{
            //Redirect to Login
        }
  }
    componentDidMount(){
        this.getEvents()
    }
    render(){
        return (
            <Fragment>
            <Breadcrumb title="All Your Events" parent="My Events" />
            <div  className="container-fluid">
                <div className="card">
                    {
                        this.state.loading?
                        <p>Loading...</p>:
                        <EvenTable data={this.state.eventsData}
                            refresh={this.getEvents.bind(this)}
                            showActions={true}
                        />
                    }
                </div>
            </div>
            <ToastContainer />
            </Fragment>
        )
    }
}