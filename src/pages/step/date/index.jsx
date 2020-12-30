import React, {Component} from 'react';
import './index.css';
import img from './../../assets/img/redFlag.png';
import StepCpt from './../component/stepcpt';

class Date extends Component{
  constructor(props){
    super(props);
    this.state={
      status: null,
    }
  }

  componentDidMount(){
    // 修改status
    this.setState({status:8},()=>{
      this.process(); // 修改小旗位置
    })
  }

  // 修改status后调用改变小旗位置
  process = () => {
    let name = document.getElementsByClassName('key1');
    for(let i=0;i<name.length;i++){
      if(name[i].className.indexOf('ant-steps-item-active')>-1){
        let closeImg=document.createElement("img");
        closeImg.src=img;
        name[i].appendChild(closeImg);
        console.log(name[i].childNodes[0].childNodes[2])
        name[i].childNodes[0].childNodes[2].childNodes[0].style.color="#B72731";
        if(i===0){
          closeImg.style.left="70px";
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