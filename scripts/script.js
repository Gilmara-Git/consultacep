(function (DOM) {
  "use strict";

  function app() {
 
    let $form = new DOM("#form");
    let $cepInput = new DOM("#form form input");
    let $addressField = new DOM('[data-js="street"]');
    let $districtField = new DOM('[data-js="district"]');
    let $cityField = new DOM('[data-js="city"]');
    let $stateField = new DOM('[data-js="state"]');
    let $cepField = new DOM('[data-js="cep"]');
    let $textArea = new DOM("textArea");

    $form.on("submit", handleSubmitFormCep, false);
    let ajax = new XMLHttpRequest();

    function handleSubmitFormCep(event) {
      event.preventDefault();
      let url = getURL();

      ajax.open("GET", url);
      ajax.send();
      getMessage("loading");
      ajax.addEventListener("readystatechange", getAjaxResponse, false);
    }

    function getURL() {
      return replaceCep("https://ws.apicep.com/cep/[CEP].json");
    }

    function clearCep() {
      return $cepInput.get()[0].value.replace(/\D/g, "");
    }

    function getAjaxResponse() {
      if (isRequestOk()) {
        getMessage("success");
        fillCepFields();
      }
    }

    function isRequestOk() {
      return ajax.readyState === 4 && ajax.status === 200;
    }

    function fillCepFields() {
      let data = parseData();
      console.log(data);

      if (data.message === "Blocked by flood") {
        getMessage("tryAgain");
        data = clearFields();
      }

      if (data.status === 400 || data.ok === false) {
        getMessage("error");
        data = clearFields();
      }

      $addressField.get()[0].value = data.address;
      $districtField.get()[0].value = data.district;
      $cityField.get()[0].value = data.city;
      $stateField.get()[0].value = data.state;
      $cepField.get()[0].value = data.code;
    }

    function clearFields() {
      return {
        address: "-",
        district: "-",
        city: "-",
        state: "-",
        code: "-",
      };
    }

    function parseData() {
      let result;
      try {
        result = JSON.parse(ajax.responseText);
      } catch (e) {
        result;
      }
      return result;
    }

    function getMessage(type) {
      let message = {
        loading: replaceCep("Buscando informações para o CEP...[CEP]:"),
        success: replaceCep("Abaixo, endereço referente ao CEP [CEP]: "),
        error: replaceCep("Não encontramos o endereço para o CEP [CEP]"),
        tryAgain:
          "Não possível completar a busca no momento.\nTente novamente mais tarde!",
      };
      return ($textArea.get()[0].value = message[type]);
    }

    function replaceCep(message) {
      return message
        .replace("[CEP]", clearCep())
        .replace(/(\d{5})(\d+)/g, "$1-$2");
    }

    return {
      getMessage: getMessage,
      replaceCep: replaceCep,
    };
  }

  window.app = app(); // estamos executando aqui para retornar somente os metodos no 'return'
  app();
})(window.DOM, document);
