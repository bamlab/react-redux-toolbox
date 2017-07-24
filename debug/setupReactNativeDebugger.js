if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  const xhr = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest;

  global.XMLHttpRequest = xhr;
}
