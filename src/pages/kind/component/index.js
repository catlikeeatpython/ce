import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import './index.css'

// @Form.create()
class Child extends Component{


  handleRemove=(record)=>{
    const {remove} = this.props;
    remove(record.id)
  }

  submit=()=>{
    // const {listview,submit} = this.props;
    // const {getFieldsValue} = this.props.form;
    // let values = getFieldsValue();
    // // console.log(listview);
    // // console.log(values);
    // // console.log(Object.values(values));
    // let arr = [];
    // for(let i=0;i<listview.length;i++){
    //   let obj = {}
    //   for(let keys in values){
    //     if(String(listview[i].id)===keys.split('-')[1]){
    //       obj[keys.split('-')[0]]=values[keys]
    //     }
    //   }
    //   arr.push(obj)
    //   console.log(arr)
    //   submit(arr)
    // }
  }

  render(){
    const { listview } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 }
    };
    return(
      <div style={{width: "100%",overflow: "hidden"}}>
        <Form {...formItemLayout}>
          {
            listview.map((item,index)=>{
              return <div key={index} style={{width: "50%",margin: "0 auto"}}>
                <Form.Item label="用户名" >
                  {getFieldDecorator(`username-${item.id}`,{
                    initialValue: item.username
                  })(<Input />)
                  }
                </Form.Item>
                <Form.Item label="手机号">
                  {getFieldDecorator(`phone-${item.id}`,{
                    initialValue: item.phone
                  })(<Input />)
                  }
                </Form.Item>
                <Form.Item label="类型">
                  {getFieldDecorator(`type-${item.id}`,{
                    initialValue: item.type
                  })(<Input />)
                  }
                </Form.Item>
                <Form.Item label="活动id">
                  {getFieldDecorator(`id-${item.id}`,{
                    initialValue: item.id
                  })(<Input />)
                  }
                </Form.Item>
                <div style={{overflow: "hidden"}}><Button style={{float: 'right'}} onClick={()=>this.handleRemove(item)}>删除</Button></div>
              </div>
            })
          }
          {/* <Button onClick={this.submit}>完成</Button> */}
        </Form>
      </div>
    )
  }
}

Child.defaultProps = {
  listview: [],
  remove: ()=>{},
  submit:()=>{},
}

Child.prototypes = {
  listview: PropTypes.array,
  remove: PropTypes.func,
  submit: PropTypes.func,
}

export default Child;