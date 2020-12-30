import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Steps} from 'antd';
import './index.css';


const { Step } = Steps;

class StepCpt extends Component{

  render(){
    const { status } = this.props;

    return(
      <div className="steps_cpt">
        <Steps current={status} progressDot>
          <Step title="初录入" className="key" />
          <Step title="主管审核" className="key"  />
          <Step title="产品经理" className="key" />
          <Step title="产品主管" className="key" />
          <Step title="需求统筹" className="key" />
          <Step title="技术经理" className="key" />
          <Step title="技术主管" className="key" />
          <Step title="产品负责人" className="key" />
          <Step title="开发测试" className="key" />
          <Step title="产品验收" className="key" />
          <Step title="需求方UAT" className="key" />
          <Step title="待上线" className="key" />
          <Step title="完成" className="key" />
        </Steps>
      </div>
    )
  }
}

//如果没有传递该属性时的默认值
StepCpt.defaultProps = {
  status: null,
}
//如果传递该属性，该属性值必须。。。
StepCpt.propTypes={
  status: PropTypes.number,
}

export default StepCpt;