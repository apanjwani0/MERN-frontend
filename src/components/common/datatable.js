import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import axios from 'axios';
import { ToastContainer, toast, ToastType } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const basicServerURL=process.env.REACT_APP_basicServerURL

export class Datatable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValues: [],
            tableData: this.props.myData,
            update:{success:false,message:null},
            delete:{success:false,message:null}
        }
    }
    componentWillReceiveProps(props){
        this.setState({tableData:props.myData})
    }
    componentDidMount(){
        //this.props.refresh()
    }

    updateAndSave(url,updatedData,index,_callback){
        console.log(url,updatedData,index)
        const jwtToken = localStorage.getItem("JWT");
        axios.patch(url,updatedData,
            {headers:{'Authorization':`Bearer ${jwtToken}`,
        }}).then((res)=>{
            res=res.data
            console.log(res)
            this.setState({
                update:{success:res.success,message:res.message}
            })
            if(!res.success){
                console.error(res.error,res.message)
                console.log(this.state)
                toast.error(res.message)
            }else{
                console.log(res)
                console.log(res.result)
                var newData=this.state.tableData
                newData[index]=res.result
                this.setState({
                    tableData:newData
                })
            }
            _callback();
        }).catch(err=>{
            console.error(err)
            _callback();
        })
    }

    deleteAndSave=(url,index,_callback)=>{
        console.log(url,index)
        const jwtToken = localStorage.getItem("JWT");
        axios.delete(url,
            {headers:{'Authorization':`Bearer ${jwtToken}`,
        }}).then((res)=>{
            res=res.data
            console.log(res)
            if(!res.success){
                console.error(res.error,res.message)
                this.setState({
                    delete:{success:res.success,message:res.message}
                })
                toast.error(res.message)
            }else{
                console.log(res)
                console.log(res.result)
                this.setState({
                    delete:{success:res.success,message:res.message}
                })
            }
            _callback();
        }).catch(err=>{
            console.error(err.message)
            _callback();
        })
    }

    // selectRow = (e, i) => {
    //     if (!e.target.checked) {
    //         this.setState({
    //             checkedValues: this.state.checkedValues.filter((item, j) => i !== item)
    //         });
    //     } else {
    //         this.state.checkedValues.push(i);
    //         this.setState({
    //             checkedValues: this.state.checkedValues
    //         })
    //     }
    // }

    handleRemoveRow = () => {
        const selectedValues = this.state.checkedValues;
        const updatedData = this.state.myData.filter(function (el) {
            return selectedValues.indexOf(el.id) < 0;
        });
        this.setState({
            tableData: updatedData
        })
        toast.success("Successfully Deleted !")
    };

    renderEditable = (cellInfo) => {
        //console.log(this.state)
        //console.log(cellInfo)
        
        //console.log(cellInfo.column.id)
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.tableData];
                    var cellData=e.target.innerHTML
                    if(Object.prototype.toString.call(data[cellInfo.index][cellInfo.column.id]) === '[object Array]'){
                        if(typeof(data[cellInfo.index][cellInfo.column.id][0])!== 'object' ){
                            var array = cellData.split(',');
                            data[cellInfo.index][cellInfo.column.id] = array;
                        }
                    }else{
                        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    }
                    this.setState({ tableData: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.tableData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        const { pageSize, myClass, multiSelectOption, pagination ,updateUrl,validUpdates,showActions} = this.props;
        const { tableData } = this.state
        console.log(tableData)

        const columns = [];
        for (var key in tableData[0]) {
            //console.log(key)
            let show=true
            let editable = null
            var accessor=key
            if(validUpdates.includes(key)){
                editable=this.renderEditable
            }
            if(key === "__v" || key === "updatedAt" || key==="createdAt" ||key==="_id"){
                show=false;
            }
            // if(key ==="image"){
            //     //show=false
            //     accessor='image.path'
            // }

            
            // if(typeof(tableData[0][key])==='object'){
            //     console.log('here')
            //     accessor= key.title
            // }

            columns.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: accessor,
                    Cell: editable,
                    style: {
                        textAlign: 'center'
                    },
                    show:show,
                    
                    //render:render
                });
                
        }

        if (multiSelectOption === true) {
            columns.push(
                {
                    Header: <button className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
                        onClick={
                            (e) => {
                                if (window.confirm('Are you sure you wish to delete this item?'))
                                    this.handleRemoveRow()
                            }}>Delete</button>,
                    id: 'delete',
                    // accessor: str => "delete",
                    sortable: false,
                    
                    Cell: (row) => (
                        <div>
                            <span >
                                <input type="checkbox" name={row.original.id} defaultChecked={this.state.checkedValues.includes(row.original.id)}
                                    onChange={e => this.selectRow(e, row.original.id)} />
                            </span>
                        </div>
                    ),
                    accessor: key,
                    style: {
                        textAlign: 'center'
                    }
                }
            )
        } else if(showActions){
            columns.push(
                {
                    Header: <b>Action</b>,
                    id: 'actions',
                    accessor: str => "actions",
                    //expander:true,
                    //pivot:true,
                    Cell: (row) => (

                        <div><span>
                            <button onClick={() => {
                                if (window.confirm('Are you sure you wish to delete this item?')) {
                                    let data = tableData;
                                    this.deleteAndSave(`${updateUrl}delete/${data[row.index]._id}`,   
                                        row.index,
                                    ()=>{
                                        if(this.state.delete.success){
                                            //toast.success("Successfully Deleted !")
                                            data.splice(row.index, 1);
                                            //this.setState({ tableData: data });
                                            toast.success(this.state.delete.message)
                                            this.setState({delete:{success:false,message:null},tableData:data})
                                        }else{
                                            //toast.error("Error Occured !")
                                            toast.error(this.state.delete.message)
                                        }
                                    })
                                    //toast.success("Successfully Deleted !")
                                }
                            }}>
                                <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}
                                ></i></button></span>

                            <span><button onClick={()=>{
                                console.log(this.state)
                                if (window.confirm('Are you sure you wish to Edit this item?')) {
                                    let data = tableData;
                                    var updateURL
                                    var newData={} //to get Edited Row Data 
                                    validUpdates.forEach((update)=>{
                                        //console.log(update)
                                        newData[update]=row.row[update]
                                    })
                                    //console.log('newData- ',newData)
                                    if(this.props.topic==='events'){
                                        //this is for products
                                        //updateURL=updateUrl+`${data[row.index].category._id}/`+`${data[row.index]._id}`
                                        updateURL=updateUrl+`update/${data[row.index]._id}`

                                    }
                                    console.log('Update URL- ',updateURL)
                                    //console.log()
                                    console.log(row)
                                    this.updateAndSave(updateURL,
                                        newData,row.index,
                                        ()=>{
                                        console.log(this.state)
                                        if(this.state.update.success){
                                            
                                            //toast.success("Successfully Updated !")
                                            toast.success(this.state.update.message)
                                            this.setState({update:{success:false,message:null}})
                                            
                                            this.props.refresh()
                                        }else{
                                            //toast.error("Error Occured !")
                                            toast.error(this.state.update.message)
                                            //console.log(this.state)
                                            //this.setState({tableData:this.state.originalData})
                                            //console.log(this.state)
                                            this.props.refresh()
                                        }
                                    })
                                    
                                }
                            }}>
                                <i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}
                            ></i></button></span>
                    </div>
                ),
                style: {
                    textAlign: 'center'
                },
                sortable: false
            }
            
        )
        }
        console.log(tableData,columns)
        return (
            <Fragment>
                <ReactTable
                    data={tableData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showPagination={pagination}
                    //useColumnOrder={columnOrder}
                    //expanded={{1:true,6:true}}
                />
                <ToastContainer />
            </Fragment>
        )
    }
}

export default Datatable
