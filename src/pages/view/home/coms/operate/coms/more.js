import React from 'react';
import { connect } from 'dva';
import styles from './more.less';

class More extends React.Component {

  sendText = () => {
    const { dispatch } = this.props;
    const onFocus = () => {
      const inputDom = document.getElementById('text');
      inputDom.focus();
    }
    // 1、发送信息
    dispatch({ type: 'home/sendText' });
    this.showView();
    // 2、保持焦点
    onFocus();
    // 3、假回应
    setTimeout(() => {
      dispatch({ type: 'home/save/sendText', payload: '终于有人回复了。' });
      dispatch({ type: 'home/sendText', person: 'other' });
      this.showView();
    }, 1000);
  }

  showOperateMore = () => {
    const { dispatch, onBlur, homeModel } = this.props;
    const { operateMoreIO, upHeight, normalHeight } = homeModel;

    const onFocus = () => {
      const dom = document.querySelector('#text');
      dom.focus();
    }
    
    // 1、trigger键盘-核心
    if (!operateMoreIO) {
      dispatch({ type: 'home/change/operateMoreIO', payload: true });
      if (upHeight === 0) {
        // 初始化适配原理
        const storageHeight = window.localStorage.getItem('upHeight');
        if (storageHeight !== '0') {
          dispatch({ type: 'home/change/upHeight', payload: storageHeight });
        } else {
          const defalutHeight = normalHeight * 0.58;
          dispatch({ type: 'home/change/upHeight', payload: defalutHeight });
        }
        // 内容进入视野
        this.showView();
        dispatch({ type: 'home/change/sendType', payload: 'text' });
      }
    } else {
      dispatch({ type: 'home/change/operateMoreIO', payload: false });
      onFocus();
    }
  }

  showView = () => {
    const { showView } = this.props;
    // 等待动画响应
    setTimeout(() => {
      showView();
    }, 200);
  }

  render() {

    const { homeModel } = this.props;
    const { sendText, operateMoreIO } = homeModel;

    return (
      <div className={styles.more}>
        <div className={styles.half}>
          <div className={styles.icon}>
            <i className="iconfont">&#xe702;</i>
          </div>
        </div>
        <div className={styles.half}>
          {
            !sendText ? (
              <div
                className={styles.icon}
                onClick={this.showOperateMore}
              >
                <i className="iconfont">&#xe613;</i>
              </div>
            ) : (
              <div className={styles.send}>
                <span
                  onClick={this.sendText}
                >
                  发送
                </span>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default connect(({ home }) => ({
  homeModel: home
}))(More);
