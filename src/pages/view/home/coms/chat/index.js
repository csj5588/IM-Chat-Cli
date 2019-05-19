import React from 'react';
import { connect } from 'dva';

import HistoryTime from './coms/historyTime';
import SendText from './coms/sendText';
import SendVoice from './coms/sendVoice';

import styles from './index.less';

class Chat extends React.Component {

  state = {};

  componentDidMount() {
    this.showView();
  }

  closeOperateMore = () => {
    const { keyBoardDown, homeModel } = this.props;
    const { upHeight } = homeModel;
    if (upHeight !== 0) {
      keyBoardDown();
      const text = document.querySelector("#text");
      text.blur();
    }
  }

  showView = () => {
    const { showView } = this.props;
    setTimeout(() => {
      showView();
    }, 200);
  }

  render() {
    const { homeModel, dispatch, showView } = this.props;
    const {
      operateMoreIO,
      upHeight,
      normalHeight,
      chatMsgList,
    } = homeModel;
    return (
      <div
        className={styles.chat}
        style={
          upHeight !== 0 ?
          { height: `${upHeight - 48}px` } :
          { height: `${normalHeight - 48}px` }
        }
        onClick={this.closeOperateMore}
        onTouchStart={this.closeOperateMore}
      >
        <div
          id="chat"
          className={styles.chatBox}
        > 
          <HistoryTime />
          {
            chatMsgList.map((item, index) => {
              if (item.send_format === 'TEXT') {
                return (
                  <SendText
                    key={index}
                    showView={showView}
                    data={[item]}
                  />
                )
              } else if (item.send_format === 'VOICE') {
                return (
                  <SendVoice
                    key={index}
                    showView={showView}
                    data={[item]}
                  />
                )
              }
            })
          }
          <div id="view">{}</div>
        </div>
      </div>
    )
  }
}

export default connect(({ home }) => ({
  homeModel: home,
}))(Chat);
