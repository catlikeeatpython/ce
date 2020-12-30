import React, {Component} from 'react';
// import { Divider } from 'antd';
import './index.css';
import img from './../../assets/img/redFlag.png';
// import ProgressChart from './../component/progressChart/index';
import StepCpt from './../component/stepcpt/index';

class Date extends Component{
  constructor(props){
    super(props);
    this.state={
      status: null,
    }
  }

  componentDidMount(){
    this.setState({status:7},()=>{
      this.process()
    })
  }

  process = () => {
    let name = document.getElementsByClassName('key');
    for(let i=0;i<name.length;i++){
      if(name[i].className.indexOf('ant-steps-item-active')>-1){
        let closeImg=document.createElement("img");
        closeImg.src=img;
        name[i].appendChild(closeImg)
        let query = name[i].querySelector('.steps_cpt .ant-steps-item-process.ant-steps-item-active .ant-steps-item-content .ant-steps-item-title');
        if(i===0){
          closeImg.style.left="70px"
        }
        if(i%2!==0){
          query.style.top="-60px";
        }
      }
    }
  }


  render(){
    const {status} = this.state;
    return(
      <div>
        <StepCpt status={status} />
      </div>
    )
  }
}

export default Date;