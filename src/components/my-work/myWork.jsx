import React,{ Component } from "react";
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import classNames from 'classnames';
import {connect} from 'react-redux';

import LibraryItem from '../../containers/library-item.jsx';
import Modal from '../../containers/modal.jsx';
import Divider from '../divider/divider.jsx';
import Filter from '../filter/filter.jsx';
import TagButton from '../../containers/tag-button.jsx';
import Spinner from '../spinner/spinner.jsx';
import styles from "./myWork.css";
import { 
    closeMyWorkModal, 
} from '../../reducers/modals.js';
import {
  // requestWorkAct,
  setWorkLogueAct,
} from '../../reducers/workData/my-work.js';
import PopupBank from './popupBank/popupBank.jsx'
import Car from './my-car/my-car.jsx'

class MyWork extends Component{
  constructor (props) {
    super(props);
    this.state = {
      classifyStyle: 0,
      logueStyle: 0,
      mouseCarVisible: false,
      mouseCarText:[],
      twoLogue:[],
      logueWidth: false,
      myWork:[],
      isShowCurtain: false,
      types: "",
      xuanData:{},
      xuanTitle:'',
    };
  }
  componentDidMount(){
    this.newMouseRight = this.mouseRightClick();
    this.setState({
      twoLogue: this.props.initialLogue[0].logue,
      myWork: this.props.myWorkState,
    })
  }
  setButtonStyle( classname ,index ){
    switch (classname) {
      case "classifyStyle": 
        this.setState({
          [classname]: index,
          logueStyle: 0,
        })
        break; 
      case "logueStyle":
        this.setState({
          [classname]: index,
        })
        break;
      default:
        break;
    }
    this.setState({
      [classname]: index,
    })
  }
  setTwoLogue( logueData ){
    this.setState({
      twoLogue: logueData,
    })
  }
  setLogueStyle(bool){
    // 获取自身和子元素高度
    const contairHeight = this.logueRef.offsetHeight;
    const contairWidth = this.logueRef.offsetWidth;
    const childrenHeight = this.logueRef.children[0].offsetHeight;
    if(childrenHeight>contairHeight){
      if(bool){
        this.setState({
          logueWidth: true,
        })
      }else{
        this.setState({
          logueWidth: false,
        })
      }
    }else{
      this.setState({
        logueWidth: false,
      })
    }
  }

  setMouseDown( value ){
    document.addEventListener("contextmenu",this.newMouseRight)
    this.setState({
      mouseCarText: value,
    })
  }
  setMouseLeave(){
    document.removeEventListener("contextmenu",this.newMouseRight)
    this.setState({
      mouseCarVisible: false,
    })
  }
  mouseRightClick() {
    return ( even, ...ags )=>{
      even.preventDefault();
      even.stopPropagation();
      this.setState({
        mouseCarVisible: true,
      })
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
      case "移到":
        this.setState({
          isShowCurtain: true,
          mouseCarVisible: false,
          types: "yiDong",
          xuanTitle: element,
        })
        break;
      case "删除":
        this.setState({
          isShowCurtain: true,
          mouseCarVisible: false,
          types: "",
          xuanTitle: element,
        })
        break;
      case "分享":
        this.setState({
          isShowCurtain: true,
          mouseCarVisible: false,
          types: "fenXiang",
          xuanTitle: element,
        })
        break;
      default:
        this.setState({
          isShowCurtain: false,
        })
        break;
    }
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
    const { 
      classifyStyle, 
      logueStyle, 
      mouseCarVisible, 
      mouseCarText, 
      twoLogue, 
      logueWidth,
      myWork,
      isShowCurtain,
      types,
      xuanTitle
    } = this.state;
    const popupApplyFunc = this.setPopupFunc()
    const twoLogues = twoLogue.length ? twoLogue : [];
    // const logueMouseCar = ["重命名","删除"];
    // const workMouseCar = ["移到","分享","下载","重命名","删除",];
    const workMouseCar = ["分享","编辑"];
    return (
      <Modal
        fullScreen
        contentLabel="我的作品"
        id="1111111"
        onRequestClose={()=>{
          this.props.onCloseMyWork()
        }}
      >
        <div className={styles.workWarpper}>
          <div className={styles.workFeachClass}>
            <Filter
              className={classNames(
                  styles.filterBarItem,
                  styles.filter
              )}
              filterQuery=""
              inputClassName={styles.filterInput}
              placeholderText="搜索"
              onChange={()=>{}}
              onClear={()=>{}}
            />
            <Divider className={classNames(styles.filterBarItem, styles.divider)} />
            <div 
              className={styles.classify}
            >
              {this.props.initialLogue.map((firstLogue, index)=>{
                return (
                  <button
                    key={ firstLogue.id }
                    className={classNames(
                      styles.classButton,
                      classifyStyle === index ? styles.defClassButton : null,
                    )}
                    onClick={ ()=> { 
                      this.setButtonStyle( "classifyStyle",index ) 
                      this.setTwoLogue(firstLogue.logue)
                    } }
                    // onMouseDown={()=>{this.setMouseDown(logueMouseCar)}}
                    // onMouseLeave={()=>{this.setMouseLeave()}}
                  >
                    {firstLogue.first_title}
                  </button>)
                })}
              {/* <button className={styles.classAddButton} >+</button> */}
            </div>
          </div>
          <div className={styles.workArea}>
            <div className={styles.catalogue}>
              {/* <div className={styles.logueHead}>
                <p className={styles.logueAdd}>+</p>
                添加目录  
              </div> */}
              <div 
                ref={(ref)=>{this.logueRef = ref}}
                className={classNames(
                  styles.logueContair,
                  logueWidth ? styles.logueContairTwo : null,
                )}
                // logue-contair-two
                onMouseEnter={()=>{this.setLogueStyle(true)}}
                onMouseLeave={()=>{this.setLogueStyle(false)}}
              >
                <div className={styles.logueWarper} >
                  {
                    twoLogues.map((logues, index)=>{
                      return(
                        <p
                          key={ logues.id }
                          className={classNames(
                            logueStyle === index ? styles.logueButton : null,
                          )}
                          onClick={()=>{ this.setButtonStyle( "logueStyle",index ) }}
                          // onMouseDown={()=>{this.setMouseDown(logueMouseCar)}}
                          // onMouseLeave={()=>{this.setMouseLeave()}}
                        > { logues.two_title } </p>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className={styles.contairs}>
              {/* <div className={styles.cataloguePath}>
                全部<b>\</b>全部
              </div> */}
              <div className={styles.contentIncludes}>
                <div className={styles.contentCenter}>
                  {
                    myWork.length ? (
                      myWork.map((workItems, index)=>{
                        return(
                          <Car 
                            data={ workItems }
                            key={ workItems.id }
                            onMouseDown={()=>{this.setMouseDown(workMouseCar)}}
                            onMouseLeave={()=>{this.setMouseLeave()}}
                          />
                        )
                    })) : (
                      <div className={styles.spinnerWrapper}>
                          <Spinner
                              large
                              level="primary"
                          />
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
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
                title={xuanTitle}
                types={types}
                onVisilibleClick={popupApplyFunc}
              />
            </div>) : null
        }
      </Modal>
    )
  }
}

MyWork.propTypes = {
  onCloseMyWork: PropTypes.func,
  requestWork: PropTypes.func,
  setWorkLogue: PropTypes.func,
  initialLogue: PropTypes.array,
  myWorkState: PropTypes.array,
};

MyWork.defaultProps = {
  itemData:[
    {
      id: "item_0001",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "入门",
      time: "2020.06.01",
    },
    {
      id: "item_0002",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "初级",
      time: "2020.06.01",
    },
    {
      id: "item_0003",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_0004",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_0005",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_0006",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_0007",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_0008",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_0009",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_00010",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_00031",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_00032",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_00033",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_00034",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_00035",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_00036",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_00037",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_00038",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    {
      id: "item_00039",
      imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157690787,1022781887&fm=26&gp=0.jpg",
      title: "高级",
      time: "2020.06.01",
    },
    
    
  ],
};

const mapStateToProps = state => {
  return {
      initialLogue: state.scratchGui.myWorkState.initialLogue,
      myWorkState: state.scratchGui.myWorkState.myWorkState,
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseMyWork: () => dispatch(closeMyWorkModal()),
  // requestWork: () => dispatch(requestWorkAct()),
  setWorkLogue: () => dispatch(setWorkLogueAct(value)),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(MyWork));
