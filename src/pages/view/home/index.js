import React, { Component } from "react";
import { connect } from "dva";

import Operate from './coms/operate';
import OperateMore from './coms/operateMore';
import Chat from './coms/chat';

import styles from "./index.less";

@connect(stores => ({ homeModel: stores.home }))
class Home extends Component {

  componentDidMount() {
    // 聊天布局
    this.init();
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({ type: "home/clear" });
    // 清除localstorage
    this.clearStorage();
  }

  init = () => {
    const { dispatch } = this.props;
    // 获取屏幕高度
    const normalHeight = document.querySelector('html').clientHeight;
  
    dispatch({ type: 'home/change/normalHeight', payload: normalHeight });

    // 获取resize高度
    let count = 0;
    window.onresize = (e) => {
      count++;
      const { homeModel } = this.props; 
      const { normalHeight, operateMoreIO } = homeModel;
      const nextUpHeight = document.querySelector('html').clientHeight;

      setTimeout(() => {
        this.showView();
      }, 300);

      if (nextUpHeight < normalHeight && count % 2 === 1) {
        // 打开
        dispatch({ type: 'home/change/upHeight', payload: nextUpHeight });
        // 存储
        this.saveStorage(nextUpHeight);
      } else if (nextUpHeight === normalHeight && !operateMoreIO) {
        // 收起
        dispatch({ type: 'home/change/upHeight', payload: 0 });
      }
    }
  }

  saveStorage = value => {
    // 一次性存储
    const storage = window.localStorage;
    if (storage && storage.getItem('upHeight') === '0') {
      storage.setItem('upHeight', value);
    }
  };

  clearStorage = value => {
    // 一次性存储
    const storage = window.localStorage;
    if (storage) {
      storage.setItem('upHeight', 0);
    }
  };

  // 键盘关闭 chat拉伸
  keyBoardDown = () => {
    const { dispatch } = this.props;
    // 高度收缩
    dispatch({ type: 'home/change/upHeight', payload: 0 });
    // 变量重置
    dispatch({ type: 'home/change/operateMoreIO', payload: false });
  }

  // 底边显示内容
  showView = () => {
    const view = document.querySelector('#view');
    if (view) view.scrollIntoView();
  }

  render() {
    const { homeModel } = this.props;
    const { normalHeight, upHeight } = homeModel;
    return (
      <div
        className={styles.root}
        style={{ height: `${normalHeight}px` }}
      >
        <Chat
          showView={this.showView}
          keyBoardDown={this.keyBoardDown}
        />
        <Operate
          showView={this.showView}
        />
        <OperateMore
          showView={this.showView}
        />
      </div>
    );
  }
}

export default Home
