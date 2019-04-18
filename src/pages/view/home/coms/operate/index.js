import React from 'react';
import { connect } from 'dva';

import Text from './coms/text';
import More from './coms/more';
import Voice from './coms/voice';
import OperateMore from '../operateMore/index';

import styles from './index.less';

class Operate extends React.Component {

  onBlur = () => {
    const dom = document.querySelector('#text');
    dom.blur();
  }

  render() {
    const { homeModel, showView } = this.props;
    const { operateMoreIO } = homeModel;
    return (
      <div
        className={`${styles.operate}`}
      >
        <Voice />
        <Text showView={showView} />
        <More onBlur={this.onBlur} showView={showView} />
      </div>
    )
  }
}

export default connect(({ home }) => ({
  homeModel: home
}))(Operate);
