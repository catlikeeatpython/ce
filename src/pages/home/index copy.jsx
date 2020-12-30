import React,{Component} from 'react';
import {Table} from 'antd';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Button type="primary">button</Button>
//     </div>
//   );
// }
class App extends Component{
  render(){
    
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (value, row, index) => {
          console.log(index,value,row)
          const obj = {
            children: value,
            props: {},
          };
 
          if(index===0){
            obj.props.rowSpan = row.length;
          }
          if(index>0&&index<row.length){
            obj.props.colSpan = 0;
          }
          return obj;
        },
      },
      {
        title: 'Age',
        dataIndex: 'age',
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          };
 
          if(index===0){
            obj.props.rowSpan = row.length;
          }
          if(index>0&&index<row.length){
            obj.props.colSpan = 0;
          }
          return obj;
        },
      },
      {
        title: 'Home phone',
        // colSpan: 1,
        dataIndex: 'tel',
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          };
 
          if(index===0){
            obj.props.rowSpan = row.length;
          }
          if(index>0&&index<row.length){
            obj.props.colSpan = 0;
          }
          return obj;
        },
      },
      {
        title: 'tel',
        colSpan: 1,
        dataIndex: 'phone',
      },
      {
        title: 'Phone',
        colSpan: 1,
        dataIndex: 'phone',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          };
 
          if(index===0){
            obj.props.rowSpan = row.length;
          }
          if(index>0&&index<row.length){
            obj.props.colSpan = 0;
          }
          return obj;
        },
      },
    ];
    
    const data = [
      {
        key: '1',
        name: 'John',
        age: 32,
        length:3,
        tel: '0571-22098909',
        phone: 18889898989,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'John',
        tel: '0571-22098333',
        phone: 18889898888,
        length:3,
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '5',
        name: '业务类型',
        age: 18,
        length:3,
        tel: '业务子类型',
        phone: 18900010002,
        address: 'London No. 2 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        tel: '0575-22098909',
        length:1,
        phone: 18900010002,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 18,
        length:1,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'London No. 2 Lake Park',
      },
      
    ];
    return(
      <div>
        <Table columns={columns} dataSource={data} bordered />
      </div>
    )
  }
}

export default App;