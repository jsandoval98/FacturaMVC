(function ($) {

    $.fn.jsWindow = function (idelem, options) {

        var settings = $.extend({
            width: "400px",
            height: "400px",
            modal: false,
            showLoadMask: true
        }, options);

        var elem;
        var capa;
        var data;
        var width;
        var height;
        var header;
        var footer;
        var content;
        var modal;
        var headerHeight;

        Init();

        function Init() {

            var w = $("body").outerWidth();
            var h = $("body").outerHeight();

            modal = settings.modal;

            header = $("<div>")
                .addClass("js-window-header")
                .append($("<span>")
                    .addClass("js-window-title")
                    .text(settings.title))                    
                .append($("<div>")
                    .addClass("js-window-box-btns")
                    .append($("<span>").addClass("js-window-btn").addClass("js-window-btn-close"))
                    .append($("<span>").addClass("js-window-btn").addClass("js-window-btn-collapse-up"))
            );

            footer = $("<div>")
                .addClass("js-window-footer")
                .css({
                    "position": "absolute",
                    "bottom": "0px"})
                .append($("<div>")
                    .addClass("js-window-footer-btn-box")
                    .append($("<button>").addClass("js-window-btn-cancel").text("Cancelar"))
                    .append($("<button>").addClass("js-window-btn-accept").text("Aceptar"))
                );


            content = $("<div>")
                .addClass("js-window-content")

            elem = $("<div>")
                .attr("id", idelem)
                .addClass("js-window")
                .css({
                    "display": "none",
                    "width": settings.width,
                    "height": settings.height,
                    "position": "absolute"
                })
                .append(header)
                .append(content)
                .append(footer);

            if (settings.cssClass)
                elem.addClass(settings.cssClass);


            if (modal) {

                capa = $("<div>")
                    .css("display", "none")
                    .css('width', w + "px")
                    .css('height', h + "px")
                    .css('background-color', "rgba(208,208,208,0.5)")
                    .css('position', "absolute")
                    .css('left', "0px")
                    .css('top', "0px")
                    .css('z-index', "1000")
                    .append(elem)
                    .appendTo("body");

                width = elem.width();
                height = elem.height();

                var x = (w / 2) - (width / 2);
                var y = (h / 2) - (height / 2);

                elem.css('left', x + "px").css('top', y + "px");
            }
            else {
                elem.appendTo("body");

                width = elem.width();
                height = elem.height();

                var x = (w / 2) - (width / 2);
                var y = (h / 2) - (height / 2);

                elem.css('left', x + "px").css('top', y + "px");

            }

            headerHeight = header.height();

            elem.find(" span.js-window-btn-close").bind("click", function (e) {

                Close();
                e.stopPropagation();
            });

            elem.find(" span.js-window-btn-collapse-up").bind("click", function (e) {

                CollapseUp();
                e.stopPropagation();
            });                      
        }

        function LoadWindow() {

            var params = {};

            $.ajax({
                url: settings.url,
                type: "POST",
                data: params,
                cache: false,
                success: function (result) {

                    data = result;

                    //console.log("modal");
                    //console.log(result);

                    if (data) {
                        content.html(data);
                    }
                },
                error: function (j, t, e) {
                    if (j.status == 404)
                        alert("Url no encontrada!");
                    else
                        alert("Fallo la conexión!");
                }
            });
        }

        function Show() {

            LoadWindow();

            if (modal) {
                elem.css("display", "block");
                capa.css("display", "block");
            }
            else
                elem.css("display", "block");
        }

        function Hide() {

            if (modal) {
                elem.css("display", "none");
                capa.css("display", "none");
            }
            else
                elem.css("display", "none");
        }

        function Close() {

            if (modal) {
                elem.css("display", "none");
                capa.css("display", "none");
            }
            else
                elem.css("display", "none");
        }

        function CollapseUp() {

            elem.find(" span.js-window-btn-collapse-up").unbind();

            elem.find(" span.js-window-btn-collapse-up").removeClass("js-window-btn-collapse-up").addClass("js-window-btn-collapse-down");
            elem.css("height", headerHeight + "px");
            footer.css("display", "none");

            elem.find(" span.js-window-btn-collapse-down").bind("click", function (e) {

                CollapseDown();
                e.stopPropagation();
            });
        }

        function CollapseDown() {

            elem.find(" span.js-window-btn-collapse-down").unbind();

            elem.find(" span.js-window-btn-collapse-down").removeClass("js-window-btn-collapse-down").addClass("js-window-btn-collapse-up");
            elem.css("height", settings.height);
            footer.css("display", "block");

            elem.find(" span.js-window-btn-collapse-up").bind("click", function (e) {
                CollapseUp();
                e.stopPropagation();
            });
        }

        return {
            Show: Show,
            Hide: Hide,
            Close: Close
        }
    }
}(jQuery));