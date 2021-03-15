import { Component } from "react";
import {Table} from 'react-bootstrap';
import Datatable from '../common/datatable'
const basicServerURL=process.env.REACT_APP_basicServerURL
export default class YourEvents extends Component{
    componentDidMount(){
        console.log(this.props.data)
    }
    
    render(){
        return (
            <div>
                <Datatable
                    multiSelectOption={false}
                    myData={this.props.data} 
                    pageSize={10} 
                    pagination={true}
                    myClass="-striped -highlight" 
                    updateUrl={basicServerURL+"/api/events/"}
                    validUpdates={['address','startDate','description','title','endDate','startTime','endTime','isOpen','bookingLink','capacity']}
                    refresh={this.props.refresh.bind(this)}
                    topic={'events'}
                    showActions={this.props.showActions}
                />
            </div>
        )
    }
}