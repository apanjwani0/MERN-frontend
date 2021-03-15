import { Component, Fragment } from "react";
import EvenTable from './event-table';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../common/breadcrumb';
import { ToastContainer, toast, ToastType } from 'react-toastify';

const basicServerURL = process.env.REACT_APP_basicServerURL

export default class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventsData: null,
            loading: true
        }
    }
    getEvents(){
        const url = basicServerURL + "/api/events/viewAllEvents"
        axios.get(
            url
        ).then((res) => {
            console.log(res)
            if (res.data.success) {
                console.log('All Events fetched')
                this.setState({
                    loading: false,
                    eventsData: res.data.result
                })
                toast.success(res.data.message);
            } else {
                console.err(res.data.message, res.data.error.message)
            }
        }).catch((err) => {
            console.error(err.message)
        })
    }
    componentDidMount() {
        this.getEvents()
    }

    render() {
        return (
            <Fragment>
            <Breadcrumb title="All Events" parent="" />
                <div className="container-fluid">
                    <div className="card">
                        {
                            this.state.loading ?
                                <p>Loading...</p> :
                                <EvenTable data={this.state.eventsData} 
                                    refresh={this.getEvents.bind(this)}
                                    showActions={false}
                                />
                        }
                    </div>
                </div>
                <ToastContainer />
            </Fragment>
        )
    }
}