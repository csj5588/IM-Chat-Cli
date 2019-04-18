import React from 'react';
import { connect } from 'dva';
import styles from './voice.less';

class Voice extends React.Component {

  voiceIcon = () => {
    // 切换为语音输入模式
    const { dispatch, homeModel } = this.props;
    const { sendType } = homeModel;
    if (sendType === 'text') {
      // trigger 布局
      dispatch({ type: 'home/change/sendType', payload: 'voice' });
      dispatch({ type: 'home/change/operateMoreIO', payload: false });
      dispatch({ type: 'home/change/upHeight', payload: 0 });
    } else {
      dispatch({ type: 'home/change/sendType', payload: 'text' });
    }
  }

  render() {

    const { homeModel } = this.props;
    const { sendType } = homeModel;

    return (
      <div className={styles.voice}>
        <div
          className={styles.icon}
          onClick={this.voiceIcon}
        >
          {
            sendType === 'text' ? (
              <i className="iconfont">&#xe667;</i>
            ) : (
              <i className="iconfont">&#xe670;</i>
            )
          }
        </div>
      </div>
    )
  }
}

export default connect(({ home }) => ({
  homeModel: home
}))(Voice);
