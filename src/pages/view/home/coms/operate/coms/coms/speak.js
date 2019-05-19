import React from 'react';
import { connect } from 'dva';
import styles from './speak.less';

class Speak extends React.Component {

  state = {
    isActive: false,
    isCancel: false,
    descript: '按住说话',
    currentRecordTimer: 0, // 当前录入语音时长
    pointY: 0, // 初始手指Y坐标
  };

  onTouchStart = e => {
    const pointY = e.touches[0].pageY;
    // 改变状态
    this.setState({
      isActive: true,
      descript: '松开结束',
      pointY,
    });
    // 计算时间
    this.setState({
      currentRecordTimer: new Date().getTime()
    });

    // 开始录音sdk
  }

  onTouchMove = e => {
    const { pointY, isCancel } = this.state;
    const moveY = e.touches[0].pageY;
    if (pointY - moveY > 150 && !isCancel) {
      this.setState({ isCancel: true });
    }
    if (pointY - moveY < 150 && isCancel) {
      this.setState({ isCancel: false });
    }
  }

  onTouchEnd = e => {
    const { currentRecordTimer, isCancel } = this.state;
    // 重置状态
    this.setState({
      isActive: false,
      isCancel: false,
      descript: '按住说话',
    });
    // 取消驳回
    if (isCancel) {
      // 停止录音
      return false;
    }
    // 计算时长
    const endRecordTimer = new Date().getTime();
    const voiceLength = Math.ceil((endRecordTimer - currentRecordTimer) / 1000);

    // 应改为调sdk 请自行更改
    this.sendVoice({ localId: '001', voiceLength });
  }

  // 上传语音
  sendVoice = res => {
    const { homeModel, dispatch, showView } = this.props;
    const { chatMsgList } = homeModel;

    const uuid = chatMsgList.length;
    const localId = res.localId;
    const voiceLength = res.voiceLength;

    // 整理列表-自定义规则
    chatMsgList.push({
      send_format: 'VOICE',
      voiceid: localId,
      voiceLength,
      send_time: (new Date()).getTime(),
      send_user_type : '0',
      // send_user_type : Math.round(Math.random()),
      uuid: uuid,
      isNew: '1'
    });
    dispatch({ type: 'home/save/chatMsgList', payload: chatMsgList });
    // 可视区域调整
    showView();

    // 上传至服务端
  }

  render() {
    const { isActive, descript, isCancel } = this.state;
    return (
      <div
        className={`${styles.sendVoiceBox} ${isActive ? styles.active : ''}`}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        <span>{descript}</span>
        <div
          className={`${styles.sendVoiceModal} ${isActive && !isCancel ? styles.show : ''}`}
        >
          <img src='/image/recording.gif' alt="" />
          <p>手指上滑, 取消发送</p>
        </div>
        <div
          className={`
            ${styles.sendVoiceModal} 
            ${isCancel ? styles.cancelShow : ''}
          `}
        >
          <i className="iconfont">&#xe614;</i>
          <p>松开手指, 取消发送</p>
        </div>
      </div>
    )
  }
}

export default connect(({ home }) => ({
  homeModel: home
}))(Speak);