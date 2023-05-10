import jQuery from "jquery"

(function ($) {
    $.fn.GetValue = function (options) {
        var value = $(this).val();
        if (value == '') {
            value = null;
        }
        return value;
    };
    $.fn.SetText = function (value) {
        if (isEmpty(value)) {
            value = '';
        }
        var name = $(this).attr("name");
        //console.log(name + ': ' + value);
        $(this).val(value);
        document.getElementsByName(name)
            .forEach((input) => {
                input.dispatchEvent(new Event('change'));
            });
        return $(this).val();
    };
    $.fn.SetValue = function (value) {
        if (isEmpty(value)) {
            value = '';
        }
        var name = $(this).attr("name");
        $(this).val(value);
        document.getElementsByName(name)
            .forEach((input) => {
                input.dispatchEvent(new Event('change'));
            });
        return $(this).val();
    };
    $.fn.GetDate = function (options) {
        var value = $(this).val();
        //var format = $(this).parents(".dxbs-dropdown-edit.dxbs-date-edit").data("format").toUpperCase();
        var format = $(this).parents(".dxbs-dropdown-edit").data("format").toUpperCase();
        var newDate = moment(value, format).toDate();
        return newDate;
    };
    $.fn.Get = function (options) {
        var value = $(this).val();
        return value;
    };
    $.fn.SetDate = function (value) {
        if (isEmpty(value)) {
            value = '';
        }
        var name = $(this).attr("name");
        //var format = $(this).parents(".dxbs-dropdown-edit.dxbs-date-edit").data("format").toUpperCase();
        var format = $(this).parents(".dxbs-dropdown-edit").data("format").toUpperCase();
        $(this).val(moment(value).format(format));
        document.getElementsByName(name)
            .forEach((input) => {
                input.dispatchEvent(new Event('change'));
            });
        return $(this).val();
    };
    $.fn.SetEnabled = function (value) {
        var tr = $(this);
        if (!isEmpty(value + '')) {
            $(this).attr("readonly", !value);
            $(this).prop("disabled", !value);
            if (value) {
                $(this).parents(".dxbs-dropdown-edit.dxbs-combobox").removeClass('dx-blazor-disabled-editor')
            }
            else {
                $(this).parents(".dxbs-dropdown-edit.dxbs-combobox").addClass('dx-blazor-disabled-editor')
            }
        }
        return $(this).val();
    };
    $.fn.PerformCallback = function (value) {
        return $(this).val();
    };
    $.fn.UpdateEdit = function (value) {
        var name = $(this).attr("name");
        $('.' + name + ' .gridUpdateButtonNewRow').click();
        //setTimeout(function () {
        //    $('.' + name + ' .gridNewButton').click();
        //}, 500);
    };
}(jQuery));