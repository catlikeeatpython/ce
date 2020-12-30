import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.css';


class progressChart extends Component{

  render(){
    const {status} = this.props;
    return(
      <div className="progressChart">
        <ul>
          <li>
            <samp className="less1 left"></samp>
            <div className={status===0?'block':status>0?'block1':'block2'}>需求评审</div>
            <span className={`${status===0?'less':status>0?"less2":"less3"} right`}></span>
          </li>
          <li>
            <samp className="less1 left"></samp>
            <div  className={status===1?'block':status>1?'block1':'block2'}>开发</div>   
            <span className={`${status===1?'less':status>1?"less2":"less3"} right`} ></span>
          </li>
          <li>
            <samp className="less1 left"></samp>
            <div className={status===2?'block':status>2?'block1':'block2'}>测试</div>   
            <span className={`${status===2?'less':status>2?"less2":"less3"} right`}></span>
          </li>
          <li>
            <samp className="less1 left"></samp>
            <div className={status===3?'block':status>3?'block1':'block2'}>产品验收</div>   
            <span className={`${status===3?'less':status>3?"less2":"less3"} right`}></span>
          </li>
          <li>
            <samp className="less1 left"></samp>
            <div className={status===4?'block':status>4?'block1':'block2'}>UAT</div>   
            <span className={`${status===4?'less':status>4?"less2":"less3"} right`}></span>
          </li>
          <li>
            <samp className="less1 left"></samp>
            <div className={status===5?'block':status>5?'block1':'block2'}>待上线</div>   
            <span className={`${status===5?'less':status>5?"less2":"less3"} right`}></span>
          </li>
          <li>
            <samp className="less1 left"></samp>
            <div className={status===6?'block':status>6?'block1':'block2'}>已上线</div>   
            <span className={`${status===6?'less':status>6?"less2":"less3"} right`}></span>
          </li>
          <div className="clearfix"></div>
        </ul> 
      </div>
    )
  }
}

//如果没有传递该属性时的默认值
progressChart.defaultProps = {
  status: null,
}
//如果传递该属性，该属性值必须。。。
progressChart.propTypes={
  status: PropTypes.number,
}

export default progressChart;