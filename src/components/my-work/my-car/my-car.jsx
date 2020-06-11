import React,{ Component } from "react";
import PropTypes from 'prop-types';

import styles from './my-car.css'

class Car extends Component{
  render(){
    const { data } = this.props;
    return (
      <div 
        className={styles.wapItems} key={data.id}
        onMouseDown={this.props.onMouseDown}
        onMouseLeave={this.props.onMouseLeave}
      >
        <div className={styles.wapPhon}>
          <img src={data.imgUrl} alt="加载..." />
        </div>
        <div className={styles.wapTitle}>
          <span>{data.title}</span>
          <span>{data.time}</span>
        </div>
      </div>
    )
  }
}
Car.propTypes = {
  data: PropTypes.object,
  onMouseDown:PropTypes.func,
  onMouseLeave:PropTypes.func,
};

Car.defaultProps = {
  data: {},
  onMouseDown:()=>{},
  onMouseLeave:()=>{},
};


export default Car;