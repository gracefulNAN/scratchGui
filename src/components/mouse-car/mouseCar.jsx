import React,{ Component } from "react";
import PropTypes from 'prop-types';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import classNames from 'classnames';
import {connect} from 'react-redux';
import bindAll from 'lodash.bindall';

import styles from "./mouseCar.css";
import PopupBank from './popupBank/popupBank.jsx'

const MouseCarHoc = function(WrappedComponent) {

  class MouseCarComponent extends Component{
    constructor (props) {
      super(props);
      bindAll(this, [
        'mouseVisibleFunc',
        'mouseCarListFunc',
        'mouseContextmenuFunc',

      ]);
      this.state = {
        mouseCarVisible: false,
        isShowCurtain: false,
        mouseCarText: [],
        popupTitle: "",
        types: "",
      };
    }

    mouseVisibleFunc(bool){
      this.setState({
        mouseCarVisible: bool,
      })
    }

    mouseCarListFunc(list){
      this.setState({
        mouseCarText: list,
      })
    }
    mouseCarEnterClick(){
      this.setState({
        mouseCarVisible: true,
      })
    }
    mouseCarLeaveClick(){
      this.setState({
        mouseCarVisible: false,
      })
    }
    mouseCarClickFunc(element, index){
      this.setState({
        isShowCurtain: true,
        mouseCarVisible: false,
      })
      switch (element) {
        case "分享":
          this.setState({
            isShowCurtain: true,
            mouseCarVisible: false,
            types: "fenXiang",
            popupTitle: element,
          })
          break;
        default:
          this.setState({
            isShowCurtain: false,
          })
          break;
      }
    }
    mouseContextmenuFunc(even) {
      even.preventDefault();
      even.stopPropagation();
      let carTop ;
      let carleft ;
      // 获取设备宽高  鼠标坐标 : even.clientY even.clientX
      let facilityWidth = document.body.offsetWidth ;
      let facilityHeight = document.body.offsetHeight ;
      // mouseCar 宽高
      let mouseCarWidth = this.mouseRoof.offsetWidth;
      let mouseCarHeight = this.mouseRoof.offsetHeight;
      // 计算设备宽高-mousecar宽高结果；
      let twoWidth = facilityWidth - 1.2*mouseCarWidth;
      let twoHeight = facilityHeight - 1.2*mouseCarHeight;
      // 判断鼠标坐标
      if((even.clientY>twoHeight)&&(even.clientX>twoWidth)){
        carTop = even.clientY - mouseCarHeight;
        carleft = even.clientX - mouseCarWidth;
      }else if((even.clientY>twoHeight)&&(even.clientX<twoWidth)){
        carTop = even.clientY - mouseCarHeight;
        carleft = even.clientX;
      }else if((even.clientY<twoHeight)&&(even.clientX>twoWidth)){
        carTop = even.clientY;
        carleft = even.clientX - mouseCarWidth;
      }else{
        carTop = even.clientY;
        carleft = even.clientX;
      }
      this.mouseRoof.style.top = `${carTop}px`;
      this.mouseRoof.style.left = `${carleft}px`;
    }

    // 遮罩
    setPopupFunc(){
      let that = this;
      return function (event, bool) {
        event.stopPropagation();
        event.preventDefault();
        that.setState({
          isShowCurtain: bool
        })
      }
    }

    render(){
      const popupApplyFunc = this.setPopupFunc();
      const {
        ...componentProps
      } = this.props;
      const {
        mouseCarVisible,
        mouseCarText,
        isShowCurtain,
        popupTitle,
        types,

      } = this.state;
      return (
        <div>
          <WrappedComponent
            {...componentProps}
            mouseVisibleFunc={this.mouseVisibleFunc}
            mouseCarListFunc={this.mouseCarListFunc}
            mouseContextmenuFunc={this.mouseContextmenuFunc}
          />
          {
            mouseCarVisible ? (
              <div 
                className={styles.mouseStyles}
                ref={(ref)=>{ this.mouseRoof = ref }}
                onMouseEnter={()=>{this.mouseCarEnterClick()}}
                onMouseLeave={()=>{this.mouseCarLeaveClick()}}
              >
                {
                  mouseCarText.map((mouseItem, index)=>{
                    return (
                      <div 
                        key={index}
                        className={styles.mouseItems}
                        onClick={(even)=>{this.mouseCarClickFunc(mouseItem,index)}}
                      >{mouseItem}</div>
                    )
                  })
                }
              </div>
            ) : null
          }
          {
            isShowCurtain ? (
            <div 
              className={styles.popupBank}
              onClick={(even)=>{popupApplyFunc(even, false)}}
            >
              <PopupBank 
                title={popupTitle}
                types={types}
                onVisilibleClick={popupApplyFunc}
              />
            </div>) : null
          }
        </div>
      )
    }
  }
  MouseCarComponent.propTypes = {
    
  };

  MouseCarComponent.defaultProps = {
    
  };

  const mapStateToProps = state => {
    return {
      
    };
  };

  const mapDispatchToProps = dispatch => ({
    // setWorkLogue: () => dispatch(setWorkLogueAct(value)),
  });

  return injectIntl(connect(mapStateToProps, mapDispatchToProps)(MouseCarComponent));

}

export default MouseCarHoc;