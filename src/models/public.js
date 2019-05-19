// import { getInfo } from "../services/publicApi";

export default {
  namespace: "public",
  state: {
    phoneModel: '', // 机型
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     // ...
  //   }
  // },
  effects: {
    // *getInfo({ payload }, { call, put }) {},
  },
  reducers: {
    "save/phoneModel": (state, { payload }) => ({
      ...state,
      phoneModel: payload,
    }),
  },
};
