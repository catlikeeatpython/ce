import React, { Component } from 'react';
import { Button, Form, Icon } from 'antd';
import Child from './component/index.js';


@Form.create()
class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      listview: [],
      id: 1,
    }
  }

  componentDidMount(){
    let list = [];
    list.push({username: "",id: this.state.id,phone:"",type:"w",num: list.length});
    this.setState({
      listview: list
    })
  }

  handleAdd=()=>{
    let list = this.state.listview;
    this.setState({
      id: this.state.id+1
    })
    list.push({username: "",id: this.state.id+1,phone:"",type:"q",num: list.length});
    this.setState({
      listview: list,
    })
  }

  handleRemove=(id)=>{
    let list = this.state.listview;
    let listv = list.filter((item,index)=>item.id!==id);
    this.setState({
      listview: listv
    })
  }


  handleSubmit=e=>{
    e.preventDefault();
    const {listview} = this.state;
    const {getFieldsValue,validateFields} = this.props.form;
    validateFields((err,value)=>{
      console.log(value)
    })
    let values = getFieldsValue();
    let arr = [];
    for(let i=0;i<listview.length;i++){
      let obj = {}
      for(let keys in values){
        if(String(listview[i].id)===keys.split('-')[1]){
          obj[keys.split('-')[0]]=values[keys]
        }
      }
      arr.push(obj)
    }
    console.log(arr)
  }

  render(){
    const { listview } = this.state;
    return(
      <div style={{width: "50%",margin: "50px auto",overflow: "hidden"}}>
        <div style={{width: "100%",overflow: "hidden"}}>
          <Button style={{float: "right"}} onClick={this.handleAdd}><Icon type="plus" />新增用户</Button>
        </div>
        <Child 
            listview={listview}
            remove={this.handleRemove}
            form={this.props.form}
          />
        <Button onClick={this.handleSubmit}>提交</Button>
      </div>
    )
  }
}

export default Home;