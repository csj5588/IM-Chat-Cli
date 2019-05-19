import React, { Component } from "react";
import { connect } from 'dva';
import VConsole from 'vconsole';
import { Helmet } from "react-helmet";


/* 启用svg图标 */
import styles from "./index.less";

class Layouts extends Component {

  componentDidMount() {
    // 打开调试
    const vConsole = new VConsole({});
    // 检测当前机型
    this.testingPhone();
  }

  renderChildren = () => {
    const { children } = this.props;
    return children;
  };

  testingPhone = () => {
    const { dispatch } = this.props;
    const u = navigator.userAgent;
    const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    if (isAndroid) {
      dispatch({ type: "public/save/phoneModel", payload: "android" });
    }
    if (isIOS) {
      dispatch({ type: "public/save/phoneModel", payload: "iphone" });
    }
  };

  render() {
    const { location } = this.props;
    const { state } = location;

    let t = "IM-Chat-Cli";
    if (state && state.title) {
      t = state.title;
    }
    return (
      <div className={styles.root}>
        <Helmet>
          <title>{t}</title>
        </Helmet>
        {this.renderChildren()}
      </div>
    );
  }
}

export default connect(stores => ({
  publicModel: stores.public
}))(Layouts);
