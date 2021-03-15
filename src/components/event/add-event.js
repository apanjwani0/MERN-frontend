import React, { Component,Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, ToastType } from 'react-toastify';
import axios from 'axios';
const basicServerURL=process.env.REACT_APP_basicServerURL
export class AddEvent extends Component {
    constructor(props) {
        super(props)
        this.state={
            EventData:null,
        }
        this.discard = this.discard.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ quantity: event.target.value });
    }
    discard(){
        this.form && this.form.reset();
    }

    _handleSubmit(e) {
        e.preventDefault();
    }
    handleValidSubmit(e,values){
        console.log('Valid Submit')
        values.isOpen= values.isOpen ==='True' ? true : false
        values.startTime= Date(values.startDate+values.startTime)
        values.endTime=Date(values.endDate+values.endTime)
        console.log(values)
        const url=basicServerURL+"/api/events/add"
        const jwtToken = localStorage.getItem("JWT");
        //console.log(jwtToken)
        if (jwtToken) {
            console.log(jwtToken)
            axios.post(
                url,values,
                {headers:{'Authorization':`Bearer ${jwtToken}`,}
            }).then((res)=>{
                console.log(res)
                if(res.data.success){
                    console.log('Event added')
                    toast.success(res.data.message);
                    this.form && this.form.reset();
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
    handleInvalidSubmit(e,values){
        console.log('InvalidSubmit')
    }

    render() {
        return (
            <Fragment>
                <Breadcrumb title="Add New Event" parent="My Events" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Enter the details</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row product-adding">
                                        <div className="col-xl-7">
                                            <AvForm className="needs-validation add-product-form" onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit} ref={c => (this.form = c)}>
                                                <div className="form form-label-center">
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Event title: </label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" name="title" id="validationCustom01" type="text"
                                                                validate={{
                                                                    required:{value:true,errorMessage:'Please enter a title'},
                                                                    maxLength:{value:20,errorMessage:'Title too long!'},
                                                                    minLength:{value:4,errorMessage:'Title too Short!'},
                                                                    pattern: {value: '[a-zA-Z][a-zA-Z0-9\s]*', errorMessage: 'Title must be composed of letters'},
                                                                }} />
                                                        </div>
                                                        <div className="valid-feedback">Available !</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Event Description: </label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" name="description" id="validationCustom02" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Address :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" name="address" id="validationCustom03" type="text" required placeholder="Address of venue"/>
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Open :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                        <AvField type="select" name="isOpen" helpMessage="Open to all or not ?" >
                                                            <option selected>True</option>
                                                            <option>False</option>
                                                        </AvField>
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Booking Link :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" name="bookingLink" id="validationCustom03" type="url" placeholder=""/>
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Capacity :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" name="capacity" id="validationCustom03" type="number" placeholder="Number of people"/>
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Start Date :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                        <AvField name="startDate" type="date" validate={{dateRange: {start: {value: 3, units: 'days',} ,end: {value: 2, units: 'years',}}}} required/>
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">End Date :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                        <AvField name="endDate"  type="date" validate={{dateRange: {start: {value: 3, units: 'days',} ,end: {value: 2, units: 'years',}}}} />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Start Time :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                        <AvField name="starTime" type="time" />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">End Time :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                        <AvField name="endTime"  type="time"  />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                
                                                </div>
                                                
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <button type="submit" className="btn btn-primary">Add Event</button>
                                                    <button type="button" className="btn btn-light" onClick={this.discard}>Discard</button>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </Fragment>
        )
    }
}

export default AddEvent
