

    //Валидатор работает если инпуту добавлен параметр data-type.
    //Пока что все поля с этим аттрибутом считаются обязательными
    const Validator = (function ($) {

        this._fields = [];
        this._selector = null;
        this._isValidate = true;


        this.set_selector = function (selector) {
            this._selector = selector + ' input[data-valid-type]';
        };
        this.set_isValidate = function (isValidate) {
            this._isValidate = isValidate;
        };
        this.set_fields = function (fields) {
            delete fields.prevObject;
            this._fields = fields;
        };

        function Field(field) {

            this._regexp = null;
            this._valid = false;
            this._value = $(field).val();
            this._name = $(field).attr('name');
            this._type = $(field).attr('data-valid-type');

            this.setRegexp = function (type) {
                if (type === 'email') {
                    this._regexp = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$');
                }
                if (type === 'text') {
                    this._regexp = new RegExp('^[а-яА-ЯёЁa-zA-Z0-9]+$');
                }
                if (type === 'date') {
                    this._regexp = new RegExp('(\.{4})-(\.{2})-(\.{2})');
                }
                if (type === 'phone') {
                    this._regexp = new RegExp('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$');
                }
                if (type === 'file') {
                    this._regexp = new RegExp('.*\\.(png|jpg)$');
                }
            };

            this.validate = function () {
                this.setRegexp(this._type);
                console.log(this._regexp.test(this._value));
                
                if(this._regexp !== null && this._regexp.test(this._value)) {
                    this._valid = true;
                    if(this._type === 'file') {
                        $(field).parent().removeClass('field-not-valid');
                    } else {
                        $(field).removeClass('field-not-valid');
                    }
                    return this._valid;
                } else {
                    if(this._type === 'file') {
                        $(field).parent().addClass('field-not-valid');
                    } else {
                        $(field).addClass('field-not-valid');
                    }

                    console.log('Ошибка валидации для поля - ' + this._name)
                }
            };

        }

        return {
            validateForm: function (selector) {
                if (selector === undefined) {
                    return;
                } else {
                    this.set_selector(selector);
                    this.set_fields([]);
                    this.set_isValidate(true);
                }
                this.set_fields($(this._selector));
                console.log(this._fields);
                for (let i in this._fields) {
                    if(this._fields.hasOwnProperty(i)) {
                        if(typeof (this._fields[i]) === "object") {
                            let field = new Field(this._fields[i]);
                            if(!field.validate()) {
                                this.set_isValidate(false);
                            }
                        }
                    }
                }

                return this._isValidate;
            }.bind(this)
        }
    })(jQuery);


