
const getIphoneUpHeight = () => {
  const screenHeight = parseInt(window.screen.height, 10);
  let upHeight = 0;
  let time = 0;
  let view = 0;
  if (screenHeight === 812) {
    // iphoneX
    upHeight = 343;
  } else if (screenHeight === 568) {
    // iphoneSE
    upHeight = 301;
    time = 250;
    view = 300;
  } else if (screenHeight === 667) {
    // iphone8
    upHeight = 300;
    time = 100;
    view = 500;
  } else if (screenHeight === 736) {
    // iphone8Plus
    upHeight = 313;
  }
  return { time, view, upHeight };
};

const saveStorage = (name, value) => {
  const storage = window.localStorage;
  if (storage && storage.getItem(name) === '0') {
    storage.setItem(name, value);
  }
};

const clearStorage = value => {
  const storage = window.localStorage;
  if (storage) {
    storage.setItem('upHeight', 0);
  }
};

export {
  getIphoneUpHeight,
  saveStorage,
  clearStorage
}