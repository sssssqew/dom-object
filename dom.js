/*
param tag(string): html element
      attrs(object): properties of element
      values(array): child elements  
*/

var Dom = Dom || {};

(function(_this) {
  "use strict";

  // values가 비어있다거나 아예 인자에 없다는건 추가하거나 변경하고 싶지 않고 이전 상태 그대로 두고 싶다는 의미다.
  // values 값이 하나라도 있어야 추가하거나 변경하고 싶다는 의미이므로 이때 추가하거나 변경한다.
  function setAttributes(el, attrs) {
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

  function setValues(el, values) {
    if (values === undefined || values === null || values.length === 0) return;
    el.innerHTML = "";
    values.map(function(value) {
      el.append(value);
    });
  }

  _this.createDom = function(tag, attrs, values) {
    var el = document.createElement(tag);

    setAttributes(el, attrs);
    setValues(el, values);
    return el;
  };

  _this.updateDom = function(selector, attrs, values) {
    var targetEl = document.querySelector(selector);
    if (!targetEl) return;

    setAttributes(targetEl, attrs);
    setValues(targetEl, values);
    return targetEl;
  };
})(Dom);

window.onload = function() {
  console.log("load completed");
  var formDiv = Dom.createDom(
    "div",
    { class: "container", id: "list-wrapper" },
    [
      Dom.createDom("input", {
        class: "email",
        id: "email",
        type: "text",
        placeholder: "Type your email"
      }),
      Dom.createDom("input", {
        id: "submit",
        type: "submit",
        value: "send email",
        class: "btn"
      })
    ]
  );

  var mainDiv = Dom.createDom("div", { class: "main" }, [
    Dom.createDom("h1", { class: "title" }, ["main page"]),
    Dom.createDom("textarea", { class: "text-area" })
  ]);

  document.getElementById("root").append(formDiv);

  document.getElementById("submit").onclick = function(e) {
    console.log("clicked ");

    e.preventDefault();

    // id가 root인 요소객체에 mainDiv 컴포넌트를 삽입힌다.
    // {}, [] 또는 null 자유자재로 설정할 수 있다. 또는 인자없이도 함수가 정상 실행된다.
    var changedRoot = Dom.updateDom("#root", null, [mainDiv]);
    console.log(changedRoot);
  };
};
