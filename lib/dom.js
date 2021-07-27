(function () {
    "use strict";
  
    function initiate() {
      let $a = new DOM('[data-js="link"]');
  
      function DOM(string) {
        this.element = document.querySelectorAll(string);
      }
  
      function initEvents() {
        DOM.prototype.on = function on(event, handleClick) {
          Array.prototype.forEach.call(this.element, function (item) {
            console.log("Evento de click adicionado");
            item.addEventListener(event, handleClick, false);
          });
        };
  
        DOM.prototype.off = function off(event, handleClick) {
          Array.prototype.forEach.call(this.element, function (item) {
            console.log(event, "evento de click sendo removido");
            item.removeEventListener(event, handleClick, false);
          });
        };
      }
  
      function handleClick(e) {
        console.log(e);
        e.preventDefault();
        console.log("Clicou no link");
      }
  
      initEvents();
  
      DOM.prototype.get = function get() {
        return this.element;
      };
  
      function DOMArrayMethods() {
        DOM.prototype.forEach = function forEach() {
          console.log(arguments); // function
          return Array.prototype.forEach.apply(this.element, arguments);
        };
  
        DOM.prototype.map = function map() {
          return Array.prototype.map.apply(this.element, arguments);
        };
  
        DOM.prototype.filter = function filter() {
          return Array.prototype.filter.apply(this.element, arguments);
        };
  
        DOM.prototype.reduce = function reduce() {
          return Array.prototype.reduce.apply(this.element, arguments);
        };
  
        DOM.prototype.reduceRight = function reduceRight() {
          return Array.prototype.reduceRight.apply(this.element, arguments);
        };
  
        DOM.prototype.every = function every() {
          return Array.prototype.every.apply(this.element, arguments);
        };
  
        DOM.prototype.some = function some() {
          return Array.prototype.some.apply(this.element, arguments);
        };
      }
  
      DOMArrayMethods();
  
      function DOMStaticMethods() {
        function isObjectType(obj) {
          return Object.prototype.toString.call(obj);
        }
  
        DOM.isArray = function isArray(obj) {
          return isObjectType(obj) === "[object Array]";
        };
  
        DOM.isObject = function isObject(obj) {
          return isObjectType(obj) === "[object Object]";
        };
  
        DOM.isFunction = function isFunction(obj) {
          return isObjectType(obj) === "[object Function]";
        };
  
        DOM.isNumber = function isNumber(obj) {
          return isObjectType(obj) === "[object Number]";
        };
  
        DOM.isString = function isString(obj) {
          return isObjectType(obj) === "[object String]";
        };
  
        DOM.isBoolean = function isBoolean(obj) {
          return isObjectType(obj) === "[object Boolean]";
        };
  
        DOM.isNull = function isNull(obj) {
          return (
            isObjectType(obj) === "[object Null]" ||
            isObjectType(obj) === "[object Undefined]"
          );
        };
      }
  
      DOMStaticMethods();
  
      $a.on("click", handleClick);
      $a.off("click", handleClick);
      console.log("Elementos selecionados:", $a.get());
      console.log(
        "$a é filho de body?",
        $a.get()[0].parentNode === document.body
      );
  
      $a.forEach(function (link) {
        console.log(link.firstChild.nodeValue);
      });
  
      let dataJs = $a.map(function (element) {
        return element.getAttribute("data-js");
      });
      console.log(dataJs);
  
      let filtered = $a.filter(function (element) {
        return element.firstChild.nodeValue !== "Link 1";
      });
      console.log(filtered);
  
      let reduce = $a.reduce(function (acum, item, index) {
        return acum + " " + item.getAttribute("data-js") + ' ' + 'index:' + index;
      }, "");
      console.log(reduce);
  
  
      let reduceRight = $a.reduceRight(function (acum, item, index){
        return acum + " " + item.getAttribute('data-js') + ' ' + 'index:' + index;
      }, "");
      console.log(reduceRight);
  
      let every = $a.every(function (element) {
        return element.innerHTML === "Link 2";
      });
      console.log(every);
  
      let some = $a.some(function (element) {
        return element.innerHTML === "Link 1";
      });
      console.log(some);
  
      console.log(DOM.isArray([]));
      console.log(DOM.isObject({}));
      console.log(DOM.isFunction(function () {}));
      console.log(DOM.isNumber(NaN)); //true - numero que representa Nao e numero
      console.log(DOM.isString("Oi"));
      console.log(DOM.isBoolean(true));
      console.log(DOM.isNull()); // valor vazio retornara undefined tb
      console.log(DOM.isNull(null));
      console.log(DOM.isNull(undefined));
    }
  
    initiate();

  })();