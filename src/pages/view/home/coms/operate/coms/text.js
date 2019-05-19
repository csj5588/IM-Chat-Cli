import React from 'react';
import { connect } from 'dva';
import { getIphoneUpHeight, saveStorage } from 'utils';
import Speak from './coms/speak';
import styles from './text.less';

class Text extends React.Component {

  componentDidMount() {
  }

  sendText = e => {
    const { dispatch } = this.props;
    dispatch({ type: 'home/save/sendText', payload: e.target.value });
  }

  onFocus = () => {
    const { dispatch, publicModel, homeModel, showView } = this.props;
    const { phoneModel } = publicModel;
    const { normalHeight, operateMoreIO, upHeight } = homeModel;
    dispatch({ type: "home/change/operateMoreIO", payload: false });
    // 处理ios焦点兼容性问题
    if (phoneModel === "iphone") {
      const objs = getIphoneUpHeight();
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, objs.time);
      setTimeout(() => {
        showView();
      }, objs.view);
      const nextUpHeight = normalHeight - objs.upHeight;
      dispatch({ type: "home/change/upHeight", payload: nextUpHeight });
      // 存储
      saveStorage("upHeight", nextUpHeight);
    }
  };

  render() {

    const { homeModel, showView } = this.props;
    const { sendText, sendType } = homeModel;

    return (
      <div className={styles.text}>
        {
          sendType === 'text' ? (
            <input
              id="text"
              type="text"
              value={sendText}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.sendText}
            />
          ) : (
            <Speak
              showView={showView}
            />
          )
        }
      </div>
    )
  }
}

export default connect(stores => ({
  homeModel: stores.home,
  publicModel: stores.public
}))(Text);
