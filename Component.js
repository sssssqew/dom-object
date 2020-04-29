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
      }),
      Component.create("br"),
      Component.create("label", null, [
        "Counter: ",
        Component.create("div", { "data-counter": "", class: "pretty" }, [0])
      ])
    ]
  );

  console.time("build dom with javascript");
  var mainDiv = Component.create("div", { class: "main" }, [
    Component.create("h1", { class: "title" }, ["main page"]),
    Component.create("textarea", { class: "text-area" })
  ]);
  console.timeEnd("build dom with javascript");

  Component.name = "main pgae"; // 접근자 프로퍼티 쓰기 (데이터 캡슐화: 접근자 메서드를 통해서만 읽기, 쓰기 가능)
  console.log(Component.name); // 접근자 프로퍼티 읽기

  // console.time("build dom with html");
  // var mainDiv = `<div class="main">
  // <h1 class="title">main page</h1>
  // <textarea class="text-area"/>
  // </div>`;
  // console.timeEnd("build dom with html");

  Component.update("#root", null, [formDiv]);

  // 이벤트 위임
  document.addEventListener("click", function(e) {
    var target = e.target;
    // console.log(target.className);
    // console.log(target.tagName); // 대문자 tag name
    // console.log(target.dataset);

    if (target.id === "submit") {
      console.log("clicked ");

      e.preventDefault();

      // id가 root인 요소객체에 mainDiv 컴포넌트를 삽입힌다.
      // {}, [] 또는 null 자유자재로 설정할 수 있다. 또는 인자없이도 함수가 정상 실행된다.
      var changedRoot = Component.update("#root", null, [mainDiv]);
      console.log(changedRoot);
    }
    if (target.dataset.counter !== undefined) {
      var updatedValue = parseInt(target.innerHTML) + 1;
      Component.update(".pretty", null, [updatedValue]);
      console.log(target.innerHTML);
    }

    // e.target의 클래스 이름이나 id 또는 tag name을 이용하여
    // 다양한 타깃 요소에 대해 이벤트를 추가할 수 있다
    //  위 if문을 아래 swtch case 문으로 변경할 수 있다

    // switch(e.target.className){
    //   case "INPUT":  handler1() break;
    //   case "IMG": handler2() break;
    //   case "FORM": handler3() break;
    // }

    // switch(e.target.tagName){
    //   case "INPUT":  handler1() break;
    //   case "IMG": handler2() break;
    //   case "FORM": handler3() break;
    // }

    // switch(e.target.id){
    //   case "INPUT":  handler1() break;
    //   case "IMG": handler2() break;
    //   case "FORM": handler3() break;
    // }
  });
};
