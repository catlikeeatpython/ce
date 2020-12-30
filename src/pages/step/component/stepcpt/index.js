import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Steps} from 'antd';
import './index.css';


const { Step } = Steps;

class StepCpt extends Component{

  render(){
    const { status } = this.props;

    return(
      <div className="step_cpt">
        <Steps current={status} progressDot>
          <Step title="变更申请" className="key1" />
          <Step title="运维人员审核" className="key1" />
          <Step title="主管审核" className="key1" />
          <Step title="分管审核" className="key1"  />
          <Step title="提交变更方案" className="key1"  />
          <Step title="运维人员审核" className="key1"  />
          <Step title="主管审核" className="key1"  />
          <Step title="启动变更" className="key1"  />
          <Step title="结束变更" className="key1" />
          <Step title="主管审核" className="key1"  />
        </Steps>
      </div>
    )
  }
}

//如果没有传递该属性时的默认值
StepCpt.defaultProps = {
  status: null, // 控制高亮位置 从0开始
}
//如果传递该属性，该属性值必须。。。
StepCpt.propTypes={
  status: PropTypes.number,
}

export default StepCpt;