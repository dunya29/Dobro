$("#fund-form").validate({
    errorElement: "div",
    rules: {
      pagetitle: {
        required: true
      },
      introtext: {
        required: true,
        maxlength: 60
      },
      content: {
        required: true
      },
      reg_file: {
        required: true
      },
      fund_aim: {
        required: true
      },
      fund_city: {
        required: true
      },
      fund_address: {
        required: true
      },
      col_filter: {
        required: true
      },
      fund_FIO: {
        required: true
      },
      fund_tel: {
        required: true
      },
      fund_org: {
        required: true,
        email: true
      },
      fund_INN: {
        required: true
      },
      fund_ur_address: {
        required: true
      },
      enter_checkbox1: {
        required: true
      },
      enter_checkbox2: {
        required: true
      }
    },
    errorPlacement: function(error, element) {
      if(element.attr("name") == "reg_file") {
        error.insertAfter( element.parent(".file-form__top") )
      } else if (element.attr("name") == "enter_checkbox1" || element.attr("name") == "enter_checkbox2") {
          error.insertAfter( element.parent(".item-checkbox") );
      } else {
        error.insertAfter(element);
      }
    },
    messages: {
      email: "Пожалуйста, введите корректный почтовый адрес.",
      reg_file: "Выберите файл",
      enter_checkbox1: {
        required: "Вы должны подтвердить"
      },
      enter_checkbox2: {
        required: "Вы должны подтвердить"
      }
    },
    submitHandler: function (form) {
      formSuccess(form)
    }
  });