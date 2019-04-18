import React from 'react';
import dayjs from 'dayjs'
import styles from './index.less';

class HistoryTime extends React.Component {
  render() {
    const source = dayjs().format('YYYY年MM月DD日 A hh:mm');
    const date = source.replace('AM', '上午').replace('PM', '下午');
    return (
      <div className={styles.dateLine}>
        <span>
          {date}
        </span>
      </div>
    )
  }
}

export default HistoryTime;
