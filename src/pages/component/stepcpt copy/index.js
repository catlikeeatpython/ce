import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Steps} from 'antd';
import './index.css';


const { Step } = Steps;

class StepCpt extends Component{

  render(){
    const { status,type } = this.props;

    return(
      <div>
        {
          type==='bottom'?
          <div className="step_cpt_bottom">
            <Steps current={status} progressDot>
              <Step title="初录入" />
              <Step title="主管审核" />
              <Step title="产品经理" />
              <Step title="产品主管"  />
              <Step title="需求统筹"  />
              <Step title="技术经理"  />
              <Step title="技术主管"  />
              <Step title="产品负责人"  />
              <Step title="开发测试"  />
              <Step title="产品验收"  />
              <Step title="需求方UAT"  />
              <Step title="待上线" />
              <Step title="完成"  />
            </Steps>
          </div>:
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
        }
      </div>
    )
  }
}

//如果没有传递该属性时的默认值
StepCpt.defaultProps = {
  status: null,
  type: 'bottom',
}
//如果传递该属性，该属性值必须。。。
StepCpt.propTypes={
  status: PropTypes.number,
  type: PropTypes.string, // overlapping交叉 bottom下对齐
}

export default StepCpt;