import React,{ Component } from "react";
import classNames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import styles from './conserve-release.css'

class ConserveRelease extends Component{
  componentDidMount(){

    if(this.props.type === "release" ){
      this.props.getSBWorkClick()
    }
  }
  closeModleClick(event){
    event.stopPropagation();
    event.preventDefault();
    this.props.closeClick();
  }
  accomplishClick(event){
    event.stopPropagation();
    event.preventDefault();

    switch (this.props.type) {
      case "conserve":
        this.conserveClick()
        break;
      case "release":
          this.releaseClick()
        break;
      default:
        break;
    }
  }
  // 保存
  conserveClick(){
    this.props.closeClick();
    alert("保存成功")
  }
  // 发布
  releaseClick(){
    this.props.SBToThmlClick()
    this.props.closeClick();
    alert("跳转成功")
  }
  render(){
    const {
      title,
      conserve,
      isTextarea,
      closeClick,

    } = this.props;
    return (
      <div className={styles.maskLayer}
        onClick={(event)=>{this.closeModleClick(event)}}
      >
        <div className={styles.warper}>
          <div className={styles.workHead}>
            <p>{title}</p>
            <p
              onClick={(event)=>{this.closeModleClick(event)}}
            >X</p>
          </div>
          <div className={styles.workContair}>
            <div className={styles.worksShow}>
              作品
            </div>
            <div className={styles.worksTitleInput}>
              <div>
                标题:
                <input 
                  type="text" 
                  placeholder="0~12个字"
                />
              </div>
              {
                isTextarea ? (
                  <div className={styles.releaseText}>
                    描述:
                    <textarea
                      rows="3" 
                      cols="20"
                      placeholder="0~100个字"
                    ></textarea>
                  </div>
                ):null
              }
            </div>
          </div>
          <div className={styles.workFooter}>
            <button type="text"
              onClick={(event)=>{this.closeModleClick(event)}}
            >取消</button>
            <button type="text"
              onClick={(event)=>{this.accomplishClick(event)}}
            >确认</button>
          </div>
        </div>
      </div>
    )
  }
}
ConserveRelease.propTypes = {
  // accountMenuOpen: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
  isTextarea: PropTypes.bool,
  closeClick: PropTypes.func,
  SBToThmlClick: PropTypes.func,
  getSBWorkClick: PropTypes.func,
};

ConserveRelease.defaultProps = {
  onClick: ()=>{}
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     fileState: state.scratchGui.fileState.htmlfile,
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   autoUpdateProject: () => dispatch(autoUpdateProject()),

// });

// connect(mapStateToProps,mapDispatchToProps)(MenuBar);
export default ConserveRelease;