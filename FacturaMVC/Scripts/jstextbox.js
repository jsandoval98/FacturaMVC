
function isTextSelected(input) {
    if (typeof input.selectionStart == "number") {
        return input.selectionStart == 0 && input.selectionEnd == input.value.length;
    } else if (typeof document.selection != "undefined") {
        input.focus();
        return document.selection.createRange().text == input.value;
    }
}


(function ($) {

    $.fn.jsTextBox = function (idelem, options) {

        var settings = $.extend({            
        }, options);

        var elem;
        var value;
        var format;
        var regexp= null;

        Init();

        function Init() {

            elem = $("#" + idelem);

            value = elem.val();

            if (settings.name)
                elem.attr("name", settings.name);
            else
                elem.attr("name", idelem);

            elem.attr("type", "text");

            if (settings.width)
                elem.css("width", settings.width);

            if (settings.maxLength)
                elem.attr("maxlength", settings.maxLength);

            if (settings.cssClass)
                elem.addClass(settings.cssClass);

            if (settings.format) {
                format = settings.format;
                regexp = CalculateRegularExpresion();
            }
            


            if (settings.type == "number") {

                elem.bind("keydown", function (e) {


                    console.log(e.keyCode);

                    //if (e.keyCode == 8) {
                    //    elem.removeClass("error");
                    //    return true;
                    //}

                    if (e.keyCode == 190 || e.keyCode == 188) {
                        elem.removeClass("error");
                        return true;
                    }


                    if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 8) {

                        elem.removeClass("error");
                        elem.attr("title", "");

                        value = elem.val();

                        //console.log(isTextSelected(elem.get(0)));

                        if (isTextSelected(elem.get(0))) {
                            value = "";
                        }

                        //console.log(e.keyCode);
                        var newvalue="";

                        if (e.keyCode == 8) {

                            if (value.length > 0)
                                newvalue = value.substr(0, value.length - 1);
                        }
                        else {
                            var digit = String.fromCharCode(e.keyCode);
                            console.log("v=" + digit);
                            newvalue = value + digit;
                            console.log("newvalue=" + newvalue);
                        }

                        if (regexp) {

                            var match = newvalue.match(regexp);

                            if (!match) {
                                elem.addClass("error");
                                elem.attr("title", "No coincide con el formato: " + settings.format);
                                console.log("No Match!");
                                //return false;
                            }
                            else {
                                console.log("Match!");
                            }
                        }

                        var i = parseInt(newvalue);

                        //console.log("i=" + i);
                        //console.log("settings.min=" + settings.min);
                        //console.log("settings.max=" + settings.max);

                        if (settings.min && i < settings.min) {
                            elem.attr("title", "el valor es menor a " + settings.min);
                            elem.addClass("error");
                        }

                        if (settings.max && i > settings.max) {
                            elem.attr("title", "el valor es mayor a " + settings.max);
                            elem.addClass("error");
                        }

                        //elem.val(i);
                        value = newvalue;

                        e.stopPropagation();

                        return true;

                    }
                   

                    return false;

                });
            }

        }

        function CalculateRegularExpresion() {

            var decimalSeparator = ".";

            var index = format.indexOf(decimalSeparator);

            console.log("index= " + index);

            var s = "^(\\d{1})*(\\.";

            for (var i = index + 1; i < format.length; i++) {

                var char = format.charAt(i);

                console.log(char);

                if (char == '0') {

                    console.log("entro");
                    s+= "\\d";
                }                                
            }

            s+= ")?$";

            console.log("regexpr= " + s);

            return RegExp(s, "gi");
        }
    }
}(jQuery))