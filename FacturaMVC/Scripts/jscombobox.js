(function ($) {

    $.fn.jsComboBox = function (idelem, options) {

        var settings = $.extend({
            HttpType: "GET",
            color: "#556b2f",
            backgroundColor: "white"
        }, options);

        var elem;
        var data;

        Init();

        function Init() {

            elem = $("#" + idelem);

            if (settings.width)
                elem.css("width", settings.width);

            if (settings.cssClass)
                elem.addClass(settings.cssClass);

            LoadComboBox();
        }

        function LoadComboBox() {

            var params = {};

            $.ajax({
                url: settings.url,
                type: settings.HttpType,
                data: params,
                cache: false,
                success: function (result) {

                    data = result;

                    if (data) {

                        if (settings.initialItem) {
                            var item = settings.initialItem;
                            elem.append($("<option>").attr('value', item.value).text(item.text));
                        }

                        $(data).each(function (index, item) {

                            var value = this[settings.selectedValue];
                            var text = this[settings.selectedText];

                            elem.append($("<option>").attr('value', value).text(text));
                        });
                    }
                },
                error: function (j, t, e) {
                    if (typeof settings.error === 'function') 
                        settings.error(j, t, e);                                                        
                }
            });
        }
    }
}(jQuery));