export default {
  namespace: "home",
  state: {
    title: "...",
    chatMsgList: [], // 用户聊天队列
    sendText: '', // 实时文字存储
    sendType: 'text', // 输入模式 text 文本 voice 语音
    normalHeight: 0, // 页面原始高度
    upHeight: 0, // 键盘弹出高度
    operateMoreIO: false, // 是否显示更多操作开关
  },
  effects: {
    *sendText({ person }, { call, put, select }) {
      const state = yield select(x => x.home);
      const { chatMsgList, sendText } = state;
      const uuid = chatMsgList.length;
      // 约定文字类型字段对象
      const textAttr = {
        send_format : 'TEXT',
        send_content : sendText,
        send_time : (new Date()).getTime(),
        send_user_type : person ? '1' : '0',
        uuid: uuid,
      };
      chatMsgList.push(textAttr);
      yield put({ type: 'save/chatMsgList', payload: chatMsgList });
      // 置空当前信息
      yield put({ type: 'save/sendText', payload: '' });
    },
  },
  reducers: {
    "save/title": (state, { payload: title }) => ({
      ...state,
      title,
    }),
    "save/chatMsgList": (state, { payload }) => ({
      ...state,
      chatMsgList: payload,
    }),
    "save/sendText": (state, { payload }) => ({
      ...state,
      sendText: payload,
    }),
    "change/normalHeight": (state, { payload }) => ({
      ...state,
      normalHeight: payload,
    }),
    "change/upHeight": (state, { payload }) => ({
      ...state,
      upHeight: payload,
    }),
    "change/sendType": (state, { payload }) => ({
      ...state,
      sendType: payload,
    }),
    "change/operateMoreIO": (state, { payload }) => ({
      ...state,
      operateMoreIO: payload,
    }),
    clear: () => ({ title: "" }),
  },
};
