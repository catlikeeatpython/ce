import React, {Component} from 'react';
import { Divider } from 'antd';
import {$get} from '../../utils/config';
import './index.css';
import img from './../../assets/img/redFlag.png';
import ProgressChart from './../component/progressChart/index';
import StepCpt from './../component/stepcpt/index';




class Date extends Component{
  constructor(props){
    super(props);
    this.state={
      status: null,
    }
  }

  componentDidMount(){
    $get('/getInfo').then(res=>{
      console.log(res)
      
    })
    this.setState({status:7},()=>{
      this.process()
    })
  }

  // 修改status后调用改变小旗位置
  // process = () => {
  //   let name = document.getElementsByClassName('key1');
  //   for(let i=0;i<name.length;i++){
  //     if(name[i].className.indexOf('ant-steps-item-active')>-1){
  //       let closeImg=document.createElement("img");
  //       closeImg.src=img;
  //       name[i].appendChild(closeImg);
  //       console.log(name[i].childNodes[0].childNodes[2])
  //       name[i].childNodes[0].childNodes[2].childNodes[0].style.color="#B72731";
  //       if(i===0){
  //         closeImg.style.left="70px";
  //       }
  //     }
  //   }
  // }

  process = () => {
    let name = document.getElementsByClassName('key1');
    for(let i=0;i<name.length;i++){
      if(name[i].className.indexOf('ant-steps-item-active')>-1){
        let closeImg=document.createElement("img");
        closeImg.src=img;
        name[i].appendChild(closeImg)
        let query = name[i].querySelector('.ant-steps-item-active .ant-steps-item-content .ant-steps-item-title');
        if(i===0){
          closeImg.style.left="70px"
        }
        if(i%2!==0){
          query.style.top="-60px";
        }
        query.style.top="-60px";
      }
    }
  }

  submit=(e)=>{
    e.preventDefault()
    console.log("this.input:",this.input.value)
    console.log(e.target)
  }

  render(){
    const {status} = this.state;
    const time = new Date();
    console.log(time)
    return(
      <div>
        <StepCpt status={status} />
        <Divider />
        <ProgressChart status={status} />
      </div>
    )
  }
}

export default Date;