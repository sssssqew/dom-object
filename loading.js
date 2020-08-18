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
        class: "btn",
        "data-main": ""
      }),
      Component.create("br"),
      Component.create("label", null, [
        "Counter: ",
        Component.create("div", { "data-counter": "0", class: "pretty" }, [0])
      ]),
      Component.create("br"),
      Component.create(
        "button",
        { "data-search": "google-search", style: "margin-right:10px" },
        ["search"]
      ),
      Component.create(
        "button",
        { "data-add": 7, style: "margin-right:10px" },
        ["add"]
      ),
      Component.create("input", {
        "data-change": "sylee",
        style: "margin-right:10px",
        type: "text",
        placeholder: "Type your name",
        id: "name"
      })
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

  // save previous handler
  // function(e) {
  //   var target = e.target;
  //   // console.log(target.className);
  //   // console.log(target.tagName); // 대문자 tag name
  //   // console.log(target.dataset);

  //   if (target.id === "submit") {
  //     console.log("clicked ");

  //     e.preventDefault();

  //     // id가 root인 요소객체에 mainDiv 컴포넌트를 삽입힌다.
  //     // {}, [] 또는 null 자유자재로 설정할 수 있다. 또는 인자없이도 함수가 정상 실행된다.
  //     var changedRoot = Component.update("#root", null, [mainDiv]);
  //     console.log(changedRoot);
  //   }
  //   if (target.dataset.counter !== undefined) {
  //     var updatedValue = parseInt(target.innerHTML) + 1;
  //     Component.update(".pretty", null, [updatedValue]);
  //     console.log(target.innerHTML);
  //   }

  //   // e.target의 클래스 이름이나 id 또는 tag name을 이용하여
  //   // 다양한 타깃 요소에 대해 이벤트를 추가할 수 있다
  //   //  위 if문을 아래 swtch case 문으로 변경할 수 있다

  //   // switch(e.target.className){
  //   //   case "INPUT":  handler1() break;
  //   //   case "IMG": handler2() break;
  //   //   case "FORM": handler3() break;
  //   // }

  //   // switch(e.target.tagName){
  //   //   case "INPUT":  handler1() break;
  //   //   case "IMG": handler2() break;
  //   //   case "FORM": handler3() break;
  //   // }

  //   // switch(e.target.id){
  //   //   case "INPUT":  handler1() break;
  //   //   case "IMG": handler2() break;
  //   //   case "FORM": handler3() break;
  //   // }
  // };

  Component.update("#root", null, [formDiv]);

  // 추후 모듈이나 헬퍼 함수로 따로 빼기
  function manageHandler(handlerList) {
    if (
      handlerList === undefined ||
      handlerList === null ||
      Object.keys(handlerList).length === 0
    ) {
      console.log("No handler to execute !");
      return;
    }

    // 엘러먼트에서 속성으로 설정한 data-[method name]="argument"에 의해서 해당 핸들러가 실행된다
    // 만약 data-search="sylee" 라고 하면 method="search", argument="sylee"가 되어 핸들러를 실행한다
    return function(e) {
      if (e.target && e.target.dataset) {
        var d = e.target.dataset; // cash e.target.dataset
        var method = Object.keys(d)[0];

        if (d[method] !== undefined) {
          console.log(d[method]);
          // 핸들러객체 handlerList에서 mehtod를 참조하여 실행
          // 이벤트 핸들러는 event 객체만 넘길수 있어서 handler 는 모두 클로저를 이용함
          // manageHandler함수도 클로저를 이용함
          handlerList[method](d[method])(e);
        }
      }
    };
  }

  // handler 객체는 실제로 MVC 패턴에서는 컨트롤러에서 넘겨준다

  var handlerList = {
    add: function(id) {
      return function(e) {
        console.log("add");
        console.log(e.target);
        console.log(id);
      };
    },
    search: function(keyword) {
      return function(e) {
        console.log("search");
        console.log(e.target);
        console.log(keyword);
      };
    },
    change: function(value) {
      return function(e) {
        console.log("input changed");
        console.log(e.target);
        console.log(e.target.value);
      };
    },
    counter: function(value) {
      return function(e) {
        console.log("counting");
        console.log(e.target);
        var updatedValue = parseInt(e.target.innerHTML) + 1;
        Component.update(".pretty", null, [updatedValue]);
      };
    },
    main: function() {
      return function(e) {
        console.log("change page");
        console.log(e.target);
        Component.update("#root", null, [mainDiv]);
      };
    }
  };

  // 이벤트 위임 (event delegation)
  document.addEventListener("click", manageHandler(handlerList));
  document.addEventListener("keyup", manageHandler(handlerList));

  // fetch 를 비동기에 사용하기 위한 래퍼함수를 하나 만들어서
  // 4가지 CRUD를 하나의 함수에서 처리할 수 있게 하자

  // 이벤트 객체를 만들어서 모델 뷰 컨토롤러간에 통신을 할 수 있게 하자
};
