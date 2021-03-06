import React from 'react';
import styles from './index.less';

class sendVoice extends React.Component {
  state = {
    isPlaying: false,
  };

  // 播放语音
  playVoice = (voiceId, file_url) => {
    // 节流阀
    const { isPlaying } = this.state;
    if (isPlaying) {
      return false;
    }
    // 播放语音
  }

  // 动态计算语音宽度
  calcLength = item => {
    const vLength = parseInt(item, 10);
    let contentLength = 'normal';
    if (vLength > 4) {
      contentLength = (vLength - 4) * 2 + 19;
    }
    return contentLength;
  }

  render() {
    const { isPlaying } = this.state;
    const { data } = this.props;
    return (
      data.map((item, index) => {
        const contentLength = this.calcLength(item.voiceLength);
        return (
          <div key={index} className={styles.chatLine}>
            {
              item.send_user_type === '0' && item.send_format === 'VOICE' ? (
                <div className={styles.rightSide}>
                  <div
                    className={`${styles.content} ${isPlaying ? styles.playing : ''}`}
                    style={contentLength === 'normal' ? {} : { width: `${contentLength}vw` }}
                    onClick={() => this.playVoice(item.voiceid, item.file_url)}
                  >
                    <span>{item.voiceLength || 1}"</span>
                    <i className={`iconfont ${styles.icon}`}>&#xe667;</i>
                  </div>
                  <div className={styles.headImg}>
                    <img 
                      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555605114359&di=5edf8c6972c387fb0bfaae526ac63fd4&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F23%2F45%2F59225f4be9929_610.jpg"
                      alt=""
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.leftSide}>
                  <div className={styles.headImg}>
                    <img 
                      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=731678002,3273940834&fm=26&gp=0.jpg"
                      alt=""
                    />
                  </div>
                  <div
                    className={`${styles.content} ${isPlaying ? styles.playing : ''}`}
                    style={contentLength === 'normal' ? {} : { width: `${contentLength}vw` }}
                    onClick={() => this.playVoice(item.voiceid)}
                  >
                    <i className={`iconfont ${styles.icon}`}>&#xe667;</i>
                    <span>{item.voiceLength || 1}"</span>
                  </div>
                </div>
              )
            }
          </div>
        )
      })
    )
  }
}

export default sendVoice;
