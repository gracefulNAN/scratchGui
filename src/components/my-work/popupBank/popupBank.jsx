import React,{ Component } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';

import styles from './popupBank.css';

class PopupBank extends Component{
  changeFromFunc(){

  }
  switchPopupFunc(types){
    switch (types) {
      case "yiDong":
        return(
          <div>
            <form className={styles.popupFrom}>
              <select name="first">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="fiat">Fiat</option>
                <option value="audi">Audi</option>
              </select>
              <select name="socend">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="fiat">Fiat</option>
                <option value="audi">Audi</option>
              </select>
            </form>
          </div>
        )
        break;
      case "fenXiang":
        return(
          <div>
            <div className={styles.popupImg}>
              {/* <img src="./vx02.jpg" alt="加载..." /> */}
              <div>
                tu
              </div>
            </div>
          </div>
        )
        break;
      default:
        break;
    }
  }
  render(){
    const {
      types,
      title
    } =this.props;
    return (
      <div 
        onMouseDown={()=>{}}
        className={styles.popupBanks}
        onClick={(event)=>{
          event.stopPropagation();
          event.preventDefault();
        }}
      >
        <div className={styles.popupTitle}>
          <p>{title}</p>
          <p 
            onClick={(even)=>{this.props.onVisilibleClick(even, false)}}
          >×</p>
        </div>
        <div className={styles.popupContair}>
          <div className={styles.popupSingle}>
            <div className={styles.singleImg}>
              <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg" alt="加载..."/>
            </div>
            <div className={styles.singleText}>
              <p>入门</p>
              <p>2020.06.04</p>
            </div>
          </div>
        </div>
        <div className={styles.popupFooter}>
          {
            types ? (
              <div className={styles.popupCommon}>
                {this.switchPopupFunc(types)}
              </div>
            ) : null
          }
          <div className={styles.popupButton}>
            <button
              onClick={(even)=>{this.props.onVisilibleClick(even, false)}}            
            >取消</button>
            <button
              onClick={(even)=>{this.props.onVisilibleClick(even, true)}}            
            >确认</button>
          </div>
        </div>
      </div>
    )
  }
}
PopupBank.propTypes = {
  types: PropTypes.string,
  onVisilibleClick: PropTypes.func,
  title: PropTypes.string,
};

PopupBank.defaultProps = {
  
};
export default PopupBank;