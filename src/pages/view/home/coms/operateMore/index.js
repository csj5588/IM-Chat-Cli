import React from 'react';
import { connect } from 'dva';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'

import styles from './index.less';

class OperateMore extends React.Component {

  componentDidMount() {
    new Swiper('.swiper-container', {
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,    // 允许点击跳转
      },
    });
  }

  render() {
    const { homeModel } = this.props;
    const { normalHeight, upHeight } = homeModel;
    return (
      <div
        className={`${styles.operateMore}`}
        style={{ height:  `${normalHeight - upHeight}px` }}
      >
        <div style={{ height: '100%' }} className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className={styles.smallBlock}>
                <div className={styles.mark}>
                  <div
                    className={styles.icon}
                    onClick={this.choiceImg}
                  >
                    <i className="iconfont">&#xe625;</i>
                  </div>
                  <p>照片</p>
                </div>
                <div className={styles.mark}>
                  <div
                    className={styles.icon}
                    onClick={this.choiceImg}
                  >
                    <i className="iconfont">&#xe61a;</i>
                  </div>
                  <p>拍摄</p>
                </div>
                <div className={styles.mark}>
                  <div className={styles.icon}>
                    <i className="iconfont">&#xe632;</i>
                  </div>
                  <p>语音通话</p>
                </div>
                <div className={styles.mark}>
                  <div className={styles.icon}>
                    <i className="iconfont">&#xe606;</i>
                  </div>
                  <p>位置</p>
                </div>
                <div className={styles.mark}>
                  <div className={styles.icon}>
                    <i className="iconfont">&#xe661;</i>
                  </div>
                  <p>投诉与意见</p>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className={styles.smallBlock}>
                <div className={styles.mark}>
                  <div
                    className={styles.icon}
                    onClick={this.choiceImg}
                  >
                    <i className="iconfont">&#xe625;</i>
                  </div>
                  <p>照片</p>
                </div>
                <div className={styles.mark}>
                  <div
                    className={styles.icon}
                    onClick={this.choiceImg}
                  >
                    <i className="iconfont">&#xe61a;</i>
                  </div>
                  <p>拍摄</p>
                </div>
                <div className={styles.mark}>
                  <div className={styles.icon}>
                    <i className="iconfont">&#xe632;</i>
                  </div>
                  <p>语音通话</p>
                </div>
                <div className={styles.mark}>
                  <div className={styles.icon}>
                    <i className="iconfont">&#xe606;</i>
                  </div>
                  <p>位置</p>
                </div>
                <div className={styles.mark}>
                  <div className={styles.icon}>
                    <i className="iconfont">&#xe661;</i>
                  </div>
                  <p>投诉与意见</p>
                </div>
              </div>
            </div>
          </div>
          <div className='swiper-pagination'></div>
        </div>
      </div>
    )
  }
}

export default connect(({ home }) => ({
  homeModel: home
}))(OperateMore);
