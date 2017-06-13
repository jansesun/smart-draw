import 'babel-polyfill';
import { jsdom } from 'jsdom';
global.document = jsdom('<!document html><html><body></body></html>');
global.window = document.defaultView;
if(!global.localStorage) {
  global.localStorage = (function() {
    const store = {};
    return {
      getItem: function(key) {
        return store[key] || null;
      },
      setItem: function(key, value) {
        store[key] = value + '';
      }
    }
  }());
}
global.navigator = window.navigator;
global.alert = (msg) => {
};
global.confirm = (msg) => {
  return true;
};