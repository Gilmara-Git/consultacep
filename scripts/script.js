(function () {
  "use strict";

  function DOM(string) {
    this.element = document.querySelectorAll(string);
  }

  DOM.prototype.get = function get() {
    return this.element;
  };

  DOM.prototype.on = function (event, handleClick) {
    Array.prototype.forEach.call(this.element, function (element) {
      element.addEventListener(event, handleClick, false);
    });
  };

  let $cepInput = new DOM("#form form input");
  let $form = new DOM('#form');
  console.log($form)
  let $addressField = new DOM('[data-js="street"]');
  let $districtField = new DOM('[data-js="district"]');
  let $cityField = new DOM('[data-js="city"]');
  let $stateField = new DOM('[data-js="state"]');
  let $cepField = new DOM('[data-js="cep"]');
  let $textArea = new DOM('textArea');
  console.log($textArea)

  $form.on("submit", handleSubmitFormCep,false);
  
  function handleSubmitFormCep(event){
    event.preventDefault();

    $addressField.get()[0].value = "";
    $districtField.get()[0].value = "";
    $cityField.get()[0].value = "";
    $stateField.get()[0].value = "";
    $cepField.get()[0].value = "";
    $textArea.get()[0].value = "";

    let cleanCep = $cepInput.get()[0].value.replace(/\D+/g, "");
    console.log(cleanCep);
    let cleanCepWithDash = cleanCep.replace(/(\d{5})(\d{3})/g, "$1-$2");

    let ajax = new XMLHttpRequest();
    ajax.open("GET", `https://ws.apicep.com/cep/${cleanCep}.json`);
    ajax.send();
    ajax.addEventListener("readystatechange", getAjaxResponse, false);

    function getAjaxResponse(){
      
      if (isRequestOk()) {
        console.log(ajax.readyState, ajax.status);
        try {
          let response = JSON.parse(ajax.responseText);
          console.log(response);
          if (response.status === 200) {
            $addressField.get()[0].value = response.address;
            $districtField.get()[0].value = response.district;
            $cityField.get()[0].value = response.city;
            $stateField.get()[0].value = response.state;
            $cepField.get()[0].value = response.code;

            $textArea.get()[0].value = `Sucesso!\n\nEndereço referente ao CEP ${response.code}:\n${$addressField.get()[0].value} ${$districtField.get()[0].value} \n${$cityField.get()[0].value} ${$stateField.get()[0].value}, ${$cepField.get()[0].value}`;
          } else {
            $textArea.get()[0].value = ` Erro!\n"Não encontramos o endereço para o CEP ${cleanCepWithDash}"`;
          }
        } catch (error) {
          console.log(error);
        }
      }

      function isRequestOk() {
        console.log(ajax.readyState, ajax.status);
        return ajax.readyState === 4 && ajax.status === 200;
      }

      if (ajax.readyState === 2 || ajax.readyState === 3) {
        console.log(ajax.readyState)
        $textArea.get()[0].value = `Carregando...\n\n"Buscando informações para o CEP ${cleanCepWithDash}..."`;
      }
    }
  };
})();
