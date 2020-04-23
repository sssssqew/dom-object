/*
param tag(string): html element
      attrs(object): properties of element
      values(array): child elements  
*/

var Component = (function() {
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

  var create = function(tag, attrs, values) {
    var el = document.createElement(tag);

    setAttributes(el, attrs);
    setValues(el, values);
    return el;
  };

  var update = function(selector, attrs, values) {
    var targetEl = document.querySelector(selector);
    if (!targetEl) return;

    setAttributes(targetEl, attrs);
    setValues(targetEl, values);
    return targetEl;
  };

  return {
    create,
    update
  };
})();

window.onload = function() {
  console.log("load completed");
  var formDiv = Component.create(
    "div",
    { class: "container", id: "list-wrapper" },
    [
      Component.create("input", {
        class: "email",
        id: "email",
        type: "text",
        placeholder: "Type your email"
      }),
      Component.create("input", {
        id: "submit",
        type: "submit",
        value: "send email",
        class: "btn"
      })
    ]
  );

  console.time("build dom with javascript");
  var mainDiv = Component.create("div", { class: "main" }, [
    Component.create("h1", { class: "title" }, ["main page"]),
    Component.create("textarea", { class: "text-area" })
  ]);
  console.timeEnd("build dom with javascript");

  // console.time("build dom with html");
  // var mainDiv = `<div class="main">
  // <h1 class="title">main page</h1>
  // <textarea class="text-area"/>
  // </div>`;
  // console.timeEnd("build dom with html");

  document.getElementById("root").append(formDiv);

  document.getElementById("submit").onclick = function(e) {
    console.log("clicked ");

    e.preventDefault();

    // id가 root인 요소객체에 mainDiv 컴포넌트를 삽입힌다.
    // {}, [] 또는 null 자유자재로 설정할 수 있다. 또는 인자없이도 함수가 정상 실행된다.
    var changedRoot = Component.update("#root", null, [mainDiv]);
    console.log(changedRoot);
  };
};
