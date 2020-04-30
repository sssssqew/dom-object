/*
param tag(string): html element
      attrs(object): properties of element
      values(array): child elements  
*/

//  _ 접두사 : Private 프로퍼티
var Component = (function() {
  "use strict";

  var _name = "";

  // values가 비어있다거나 아예 인자에 없다는건 추가하거나 변경하고 싶지 않고 이전 상태 그대로 두고 싶다는 의미다.
  // values 값이 하나라도 있어야 추가하거나 변경하고 싶다는 의미이므로 이때 추가하거나 변경한다.
  function _setAttributes(el, attrs) {
    if (
      attrs === undefined ||
      attrs === null ||
      Object.keys(attrs).length === 0
    )
      return;
    for (var prop in attrs) {
      el.setAttribute(prop, attrs[prop]);
    }
  }

  function _setValues(el, values) {
    if (values === undefined || values === null || values.length === 0) return;
    el.innerHTML = "";
    values.map(function(value) {
      el.append(value);
    });
  }

  var create = function(tag, attrs, values) {
    var el = document.createElement(tag);

    _setAttributes(el, attrs);
    _setValues(el, values);
    return el;
  };

  var update = function(selector, attrs, values) {
    var targetEl = document.querySelector(selector);
    if (!targetEl) return;

    _setAttributes(targetEl, attrs);
    _setValues(targetEl, values);
    return targetEl;
  };

  return {
    create,
    update,
    get name() {
      // 접근자 프로퍼티 (클로저)
      return _name;
    },
    set name(value) {
      // 접근자 프로퍼티 (클로저)
      _name = value;
    }
  };
})();
