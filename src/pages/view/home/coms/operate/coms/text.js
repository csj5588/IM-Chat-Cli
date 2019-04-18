import React from 'react';
import { connect } from 'dva';
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
    const { dispatch } = this.props;
    dispatch({ type: 'home/change/operateMoreIO', payload: false });
  }

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

export default connect(({ home }) => ({
  homeModel: home
}))(Text);
