
(function ($) {

    $.fn.Ext = function () {

        var cmps = [];

        function RegisterCmp(id, cmp) {
            var cmp = { id: id, cmp: cmp };
            cmps.push(cmp);
        }

        function GetCmp(id) {

            var cmp = null;

            for (var i = 0; i < cmps.length; i++) {
                var obj = cmps[i];

                if (obj.id == id) {
                    cmp = obj.cmp;
                    break;
                }
            }

            return cmp;
        }

        return {
            RegisterCmp: RegisterCmp,
            GetCmp: GetCmp
        };
    };

}(jQuery));




(function ($) {

    $.fn.loadMask = function (idelem, options) {

        //var settings = $.extend({
        //    color: "#556b2f",
        //    backgroundColor: "white"
        //}, options);

        var elem;
        var oldposition= null;
        var lod;
        var width;
        var height;

        init();

        function init() {

            elem = $("" + idelem);

            height = elem.height();
            width = elem.width();

            oldposition = elem.css('position');
            elem.css('position', "relative");           
        }

        function show() {
            var lista = elem.find("div.loader");
            var x = elem.scrollLeft();
            var y = 0;

            if (lista.length == 0) {

                var contdiv = $("<div>")
                    .css('padding', "10px")
                    .css('background-color', "#d0d0d0")
                    .css('position', "absolute")
                    .css('top', "0px")
                    .css('left', "0px");

                var loaddiv = $("<div>")
                    .css('padding', "25px 0 0")
                    .css('font-size', "12px")
                    .css('border', "0px solid blue")
                    .css('background-position', "center 0")
                    .css('background-repeat', "no-repeat")
                    .css('background-image', "url('/Content/img/ext.gif')")
                    .html('Loading Data...');


                lod = $("<div>")
                    .addClass("loader")
                    .css('width', width + "px")
                    .css('height', height + "px")
                    .css('background-color', "rgba(208,208,208,0.5)")
                    .css('position', "absolute")
                    .css('left', x + "px")
                    .css('top', y + "px")
                    .css('z-index', "1000")
                    .append(contdiv.append(loaddiv))
                    .appendTo(elem);

                var w = $(contdiv).outerWidth();
                var h = $(contdiv).outerHeight();

                var x = (width / 2) - (w / 2);
                var y = (height / 2) - (h / 2);

                contdiv.css('left', x + "px").css('top', y + "px");
            }
            else {
                lod = $(lista.get(0));
                lod.css('left', x + "px")
                lod.css('display', "block");
            }
        };

        function hide() {
            //elem.css('position', "");
            if (oldposition == "relative" || oldposition == "absolute") 
                elem.css('position', oldposition);
            

            lod.css('display', "none");
        };

        return {
            show: show,
            hide: hide
        };
    };

}(jQuery));

$.fn.focusWithoutScrolling = function () {
    var x = window.scrollX, y = window.scrollY;
    this.focus();
    window.scrollTo(x, y);
};


(function ($) {

    $.fn.JsGrid = function (idelem, options) {

        var settings = $.extend({
            method: "POST",
            width: "900px",
            height: "450px",
            selectionModel: {
                type: "row"
            },
            paging: false,
            sorting: false,
            pagingOptions: {
                server: false,
                pageSize: 20,
                pagingMsg: "Displaying {0} - {1} of {2}",
            }, 
            editTrigger: "dblclick",
            rowSelectedClass: "x-selected-row",
            cellSelectedClass: "x-selected-cell"
        }, options);

        //var _this = $.fn.this;

        var elem;
        var tableWrapper;
        var table;

        var page = 1;
        var lastPage;
        var pageSize;
        var pagingServer;
        var inc;
        var data;
        var totalRecords;
        var selectedIndex = -1;
        var selectedIndexes = [];
        var selectedItem;
        var selectedItems= [];
        var sortCommand = "";
        var sortOrder = "";
        var editCtrl;
        var aditionalColumn= 0;
        var column;
        var html;
        var selectionColumnType= null;
        var selectionColumnMode= null;
        var hasSelectionColumn = false;
        var selectionModelType;
        var rowSelectedCell;
        var colSelectedCell;
        var editTrigger;

        var index;
        var rowHeight;
        var tableHeight;
        var tableHeaderHeight;

        var offset;
        var height;
        var width;
        var isMouseDown = false;
        var isMouseMove = false;
        var xft;
        var offsetcolumn;
        var column;
        var minlimit;
        var columnposx;
        var handlermaxposx;

        Init();
        
        function Init() {

            //var grid = Ext.GetCmp(idelem);

            //if (grid) {

            //    console.log("destruyendo control " + idelem + "!");
            //    console.log(grid)
            //    grid.Destroy();
            //}

            elem = $("#" + idelem);

            if (elem.length == 0) {

                console.log("creando element!");

                elem = $("<div>")
                    .attr("id", idelem)
                    .css("margin", "10px auto");;
                    //.appendTo("div.main-body");
            }

            table = $("<table>")
                .addClass("js-grid-table-fixed")
                .append("<thead>")
                .append("<tbody>");

            tableWrapper = $("<div>")
                .addClass("js-grid-wrapper-table")
                .append(table)
                .appendTo(elem);


            //$('#' + idelem).css("position", "relative");

            if (settings.width)
                elem.css("width", settings.width);

            if (settings.height)
                elem.css("height", settings.height);


            offset = tableWrapper.offset();

            //console.log(offset.);
            //console.log("offset top");
            //console.log(offset.top);

            height = tableWrapper.height();
            width = tableWrapper.width();

            pageSize = settings.pagingOptions.pageSize;
            pagingServer = settings.pagingOptions.server;

            //evita que chrome no capte eventos teclado
            $("#" + idelem + " table").attr("tabindex", "1");

            selectionModelType = settings.selectionModel.type;
            editTrigger = settings.editTrigger;

            if (settings.selectionColumn) {
                if (settings.selectionColumn.type == "checkbox" || settings.selectionColumn.type == "radiobutton") {
                    hasSelectionColumn = true;
                    aditionalColumn++;
                    selectionColumnType = settings.selectionColumn.type;

                    if (settings.selectionColumn.Mode)
                        selectionColumnMode = selectionColumn.mode;
                }
            }

            BuildTableHead();

            BuildPagingBar();

            UpdateTableWidth();

            $(document).on('click', '#' + idelem + ' table tbody tr', function (e) {

                if (selectionModelType == "row") {

                    var i = parseInt($(this).attr("row"));

                    ChangeSelectedIndex(i);

                    if (selectionColumnType == "checkbox") {

                        $('#' + idelem + ' table tbody td:nth-child(1)').each(function (i, ele) {
                            $(ele).find("input").prop("checked", false);
                        });

                        $(this).find("td:first input").prop("checked", true);
                    }
                }                
            });

            $(document).on('click', '#' + idelem + ' table tbody td', function (e) {

                if (selectionModelType == "cell") {                    

                    var row = $(this).closest('tr').index();
                    var col = $(this).index();

                    console.log(row);
                    console.log(col);

                    //if (rowSelectedCell && colSelectedCell)
                    $('#' + idelem + ' table tbody').find("tr:eq(" + rowSelectedCell + ")").find("td:eq(" + colSelectedCell + ")").removeClass(settings.cellSelectedClass);

                    $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").addClass(settings.cellSelectedClass);
                    $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").focus();

                    rowSelectedCell = row;
                    colSelectedCell = col;
                }               
            });

            $(document).on('click', '#' + idelem + ' table tbody td:nth-child(1)', function (e) {

                e.stopPropagation();

            });

            if (hasSelectionColumn) {

                $(document).on('click', "#" + idelem + ' table tbody td:nth-child(1) input', function (e) {

                    var i = parseInt($(this).parent().parent().attr("row"));

                    var checked= $(this).prop("checked");

                    if (checked) {
                        if (settings.selectionColumn.multiple) {

                            AddSelectedRow(i);
                        }
                        else {
                            ChangeSelectedIndex(i);
                        }
                    }
                    else {
                        if (settings.selectionColumn.multiple) {
                            RemoveSelectedRow(i);
                        }
                        else {
                            ChangeSelectedIndex(-1);
                        }
                    }
                    
                });
            }

            if (selectionModelType == "row") {

                $(document).on('keydown', '#' + idelem + ' table', function (e) {

                    //Tab
                    if (event.which == 9) {

                        e.preventDefault();
                        e.stopPropagation();
                    }

                    //key down
                    if (event.which == 40) {
                        var max;

                        if (page < lastPage)
                            max = (page - 1) * pageSize + pageSize;
                        else
                            max = totalRecords;

                        //alert(max);

                        //console.log(selectedIndex);

                        var posscroll = $('#' + idelem + " div:first").scrollTop();

                        if (selectedIndex < max - 1) {
                            ChangeSelectedIndex(selectedIndex + 1);
                            //$('#' + idelem + ' table').focus();

                            //var index = (selectedIndex + 1) - (page - 1) * pageSize;

                            //$('#' + idelem + ' table').focus();
                            //$('#CodigoArticulo').focus();
                            //$('#' + idelem + ' table tbody').find('tr').eq(index).attr("tabindex", 0).focus();

                            var posrow = ((index + 1) * rowHeight) + tableHeaderHeight;
                            var upperlimit = posscroll + tableHeight;

                            //console.log("posrow=" + posrow);
                            //console.log("upperlimit=" + upperlimit);

                            if (posrow > upperlimit) {

                                console.log(posrow - upperlimit);
                                $('#' + idelem + " div:first").scrollTop(posscroll + inc);
                            }
                        }
                        else {
                            $('#' + idelem + " div:first").scrollTop(posscroll + 100);
                        }

                        e.preventDefault();
                    }

                    //key up
                    if (event.which == 38) {
                        var min = (page - 1) * pageSize;

                        if (selectedIndex > min) {
                            ChangeSelectedIndex(selectedIndex - 1);

                            var posrow = ((index + 1) * rowHeight) + tableHeaderHeight;
                            var posscroll = $('#' + idelem + " div:first").scrollTop();
                            var lowerlimit = posscroll;

                            if (posrow < lowerlimit) {
                                $('#' + idelem + " div:first").scrollTop(posscroll - inc);
                            }
                        }
                        else {
                            $('#' + idelem + " div:first").scrollTop(0);
                        }

                        e.preventDefault();
                    }

                });
            }
            else if (selectionModelType == "cell"){

                $(document).on('keydown', '#' + idelem + ' table tbody td', function (e) {

                    //Tab
                    if (e.which == 9) {

                        var row = $(this).closest('tr').index();
                        var col = $(this).index() + 1;
                        var end = false;

                        console.log("rowSelectedCell= " + rowSelectedCell);
                        console.log("colSelectedCell= " + colSelectedCell);

                        console.log("row= " + row);
                        console.log("col= " + col);

                        var limit = settings.columnModel.length + aditionalColumn - 1

                        if (col > limit && row < pageSize-1) {
                            row++;
                            col = 1;
                        }

                        if (col > limit && row == pageSize-1) {

                            console.log("fin")
                            end = true;
                        }

                        //console.log("col: " + col);
                        //console.log("row: " + row);

                        if (!end) {

                            $('#' + idelem + ' table tbody').find("tr:eq(" + rowSelectedCell + ")").find("td:eq(" + colSelectedCell + ")").removeClass(settings.cellSelectedClass);
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").addClass(settings.cellSelectedClass);

                            var type = settings.columnModel[col - aditionalColumn].typeEditCtrl;

                            if (type == "textbox" || type == "combobox" || type == "datepicker" || type == "checkbox") {

                                $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").focus();
                                $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").trigger("click");
                            }
                            else {
                                $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").focus();
                            }
                        }

                        rowSelectedCell = row;
                        colSelectedCell = col;

                        e.stopPropagation();
                        e.preventDefault();

                    }

                    //key down
                    if (e.which == 40) {

                        var row = $(this).closest('tr').index() + 1;
                        var col = $(this).index();
                        var end = false;


                        if (row == pageSize) {
                            end = true;
                            row = pageSize - 1;
                        }

                        if (!end) {
                            $('#' + idelem + ' table tbody').find("tr:eq(" + (row-1) + ")").find("td:eq(" + col + ")").removeClass(settings.cellSelectedClass);
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").addClass(settings.cellSelectedClass);
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").focus();
                        }

                        rowSelectedCell = row;
                        colSelectedCell = col;

                        e.stopPropagation();
                        e.preventDefault();
                    }

                    //key up
                    if (e.which == 38) {

                        var row = $(this).closest('tr').index() - 1;
                        var col = $(this).index();
                        var end = false;

                        console.log("keydown up");

                        if (row < 0) {
                            end = true;
                            row = 0;
                        }

                        if (!end) {
                            $('#' + idelem + ' table tbody').find("tr:eq(" + (row + 1) + ")").find("td:eq(" + col + ")").removeClass(settings.cellSelectedClass);
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").addClass(settings.cellSelectedClass);
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").focus();
                        }
                        else {
                            $('#' + idelem + " div:first").scrollTop(0);
                        }

                        rowSelectedCell = row;
                        colSelectedCell = col;

                        e.stopPropagation();
                        e.preventDefault();
                    }

                    //key right
                    if (e.which == 39) {

                        var row = $(this).closest('tr').index();
                        var col = $(this).index() + 1;
                        var end = false;


                        if (col > settings.columnModel.length + aditionalColumn - 1) {
                            end = true;
                            col = settings.columnModel.length + aditionalColumn - 1;
                        }

                        if (!end) {
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + (col - 1) + ")").removeClass(settings.cellSelectedClass);
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").addClass(settings.cellSelectedClass);
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").focus();
                        }

                        rowSelectedCell = row;
                        colSelectedCell = col;

                        e.stopPropagation();
                        e.preventDefault();
                    }

                    //key left
                    if (e.which == 37) {

                        var row = $(this).closest('tr').index();
                        var col = $(this).index() - 1;
                        var end = false;


                        if (col < aditionalColumn) {
                            end = true;
                            col = aditionalColumn;
                        }

                        if (!end) {
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + (col + 1) + ")").removeClass(settings.cellSelectedClass);
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").addClass(settings.cellSelectedClass);
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").focus();
                        }
                        else {
                            $('#' + idelem + " div:first").scrollLeft(0);
                        }

                        rowSelectedCell = row;
                        colSelectedCell = col;

                        e.stopPropagation();
                        e.preventDefault();
                    }

                });

            }


            var c = 0 + aditionalColumn;

            //controles
            settings.columnModel.forEach(function (e) {

                if (editTrigger == "enter") {

                    $(document).on('keydown', '#' + idelem + ' table tbody td:nth-child(' + c + ')', function (e) {

                        if (e.which == 13) {
                            var that = this;
                            ConfigureControls(that);

                            e.stopPropagation();
                            e.preventDefault();
                        }
                    })
                }
                else if (editTrigger == "click") {

                    $(document).on('click', '#' + idelem + ' table tbody td:nth-child(' + c + ')', function (e) {

                        var that = this;
                        ConfigureControls(that);

                        e.stopPropagation();
                        e.preventDefault();
                    })
                }
                else if (editTrigger == "dblclick") {

                    $(document).on('dblclick', '#' + idelem + ' table tbody td:nth-child(' + c + ')', function (e) {

                        console.log("dblclicked!");

                        var that = this;
                        ConfigureControls(that);

                        e.stopPropagation();
                        e.preventDefault();
                    })
                }

                c++;
            });
          

            tableHeaderHeight = $('#' + idelem + " table thead tr:first").height();
            tableHeight = $('#' + idelem + " div:first").height();
            inc = Math.round(tableHeight, 0) - 50;


            //console.log("Registrando control " + idelem + "!");
            //Ext.RegisterCmp(idelem, _this);
        }

        function ConfigureControls(that) {

            console.log("enter");
            console.log("focus antes");
            console.log($(':focus'));


            var col = $(that).index();

            col -= aditionalColumn;

            console.log("col=" + col);

            var type = settings.columnModel[col].typeEditCtrl;
            var w = $(that).outerWidth();
            var h = $(that).outerHeight();


            //alert(type);

            if (type == "textbox") {

                editCtrl = $("<input/>")
                    .attr("type", "text")
                    .css({
                        "position": "absolute",
                        "top": 0,
                        "left": 0,
                        "width": w + "px",
                        "height": h + "px"
                    });



                var value = $(that).html();
                $(that).css("padding", "0px");
                $(that).css("position", "relative");
                $(that).html("");


                $(that).append(editCtrl);
                editCtrl.val(value);
                editCtrl.select();
                editCtrl.focus();

                console.log("focus despues");
                console.log($(':focus'));

            }

            if (type == "combobox") {


                //alert("combobox");

                var arr = [
                    { val: 1, text: 'One' },
                    { val: 2, text: 'Two' },
                    { val: 3, text: 'Three' },
                    { val: 4, text: 'Cuatro' },
                    { val: 5, text: 'Cinco' },
                    { val: 6, text: 'Seis' }
                ];

                editCtrl = $("<select>")
                    .css("position", "absolute")
                    .css("top", 0)
                    .css("left", 0)
                    .css("width", w + "px")
                    .css("height", h + "px");


                var value = $(that).attr("selectedvalue");

                $(that).css("padding", "0px");
                $(that).css("position", "relative");
                $(that).html("");

                $(that).append(editCtrl);

                $(arr).each(function () {
                    editCtrl.append($("<option>").attr('value', this.val).text(this.text));
                });

                editCtrl.val(value);
                editCtrl.focus();
                editCtrl.select();



                editCtrl.bind("change", function (e) {

                    $(this).parent().focus();
                });

            }

            if (type == "datepicker") {

                editCtrl = $("<input/>")
                    .attr("id", "datepicker")
                    .attr("type", "text")
                    .css({
                        "position": "absolute",
                        "top": 0,
                        "left": 0,
                        "width": w + "px",
                        "height": h + "px"
                    });

                //editCtrl.datepicker('setDate', new Date());

                var value = $(that).html();

                //console.log(value);
                var date = new Date();

                var matches = value.match(/(\d+)/gi);

                if (matches) {
                    var day = matches[0];
                    var month = matches[1] - 1;
                    var year = matches[2];
                    date = new Date(year, month, day);
                }

                editCtrl.datepicker({
                    dateFormat: 'dd/mm/yy',
                    onSelect: function (date, e) {

                        //teclado
                        if (e._keyEvent) {
                            $(this).datepicker("hide");
                        }
                        else {
                            console.log("onSelect");
                            console.log(e);

                            $(this).parent().css("padding", "");
                            $(this).parent().css("position", "");

                            //$(that).datepicker("destroy");
                            $(this).datepicker("hide");
                            //$(that).removeClass("hasDatepicker").removeAttr('id');

                            $(this).parent().focus();
                            $(this).parent().html(date);

                            //$(that).unbind();
                            //$(that).remove();

                            //$(that).parent().css("padding", "");
                            //$(that).parent().css("position", "");


                            //$(that).parent().html(date);
                            //$(that).remove();
                        }
                    }
                });

                editCtrl.datepicker("setDate", date);



                $(that).css("padding", "0px");
                $(that).css("position", "relative");
                $(that).html("");

                $(that).append(editCtrl);


                //editCtrl.datepicker('setDate', new Date());
                //editCtrl.val(value);
                editCtrl.focus();
                //editCtrl.select();

                //editCtrl.on("changeDate", function (e) {

                //e.stopPropagation();
                //e.preventDefault();

                //    $(that).parent().focus();
                //});
            }

            if (editCtrl) {

                editCtrl.bind("click", function (e) {

                    e.stopPropagation();
                });

                editCtrl.bind("dblclick", function (e) {

                    e.stopPropagation();
                });

                editCtrl.bind("keydown", function (e) {

                    //console.log("keydown: "  + e.which);

                    //key right
                    if (e.which == 39) {

                        e.stopPropagation();
                    }

                    //key left
                    if (e.which == 37) {

                        e.stopPropagation();
                    }

                    //key up
                    if (e.which == 38) {

                        var row = $(this).closest('tr').index();
                        var col = $(this).parent().index();


                        if (row > 0) {
                            row--;

                            if (editTrigger == "enter") {
                                var eve = jQuery.Event("keydown");
                                eve.which = 13;

                                $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").trigger(eve);
                            }
                            else if (editTrigger == "click") {
                                $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").trigger("click");
                            }
                            else if (editTrigger == "dblclick") {
                                $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").trigger("dblclick");
                            }
                        }
                        else {
                            $('#' + idelem + " div:first").scrollTop(0);
                        }
                        //$('#' + idelem + ' table').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").focus();

                        if (selectionModelType == "cell") {

                            $('#' + idelem + ' table tbody').find("tr:eq(" + (row + 1) + ")").find("td:eq(" + col + ")").removeClass(settings.cellSelectedClass);
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").addClass(settings.cellSelectedClass);

                            rowSelectedCell = row;
                            colSelectedCell = col;
                        }

                        e.stopPropagation();
                        e.preventDefault();
                    }

                    //key down 
                    if (e.which == 40) {

                        var col = $(this).parent().index();
                        var row = $(this).closest('tr').index() + 1;

                        if (row < pageSize) {

                            if (editTrigger == "enter") {
                                var eve = jQuery.Event("keydown");
                                eve.which = 13;

                                $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").trigger(eve);
                            }
                            else if (editTrigger == "click") {
                                $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").trigger("click");
                            }
                            else if (editTrigger == "dblclick") {
                                $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").trigger("dblclick");
                            }
                        }


                        if (selectionModelType == "cell") {

                            $('#' + idelem + ' table tbody').find("tr:eq(" + (row - 1) + ")").find("td:eq(" + col + ")").removeClass(settings.cellSelectedClass);
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").addClass(settings.cellSelectedClass);

                            rowSelectedCell = row;
                            colSelectedCell = col;
                        }


                        e.stopPropagation();
                        e.preventDefault();
                    }



                    //enter
                    if (e.which == 13) {


                        console.log("enter");

                        var value = $(this).val();

                        //console.log("focusout");
                        //console.log($(this).parent().html());

                        //$(this).parent().css("padding", "");
                        //$(this).parent().css("position", "");
                        //$(this).parent().html(value);

                        var row = $(this).closest('tr').index();
                        var col = $(this).parent().index();

                        console.log(row);
                        console.log(col);

                        $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").focus();


                        e.preventDefault();
                        e.stopPropagation();
                    }

                    //tab
                    if (e.which == 9) {

                        var value = $(this).val();
                        var row = $(this).closest('tr').index();
                        var col = $(this).parent().index() + 1;
                        var end = false;


                        if (col > settings.columnModel.length && row < pageSize) {

                            console.log("entro!!!");

                            row++;
                            col = 0;
                        }

                        if (col == settings.columnModel.length && row == pageSize) {
                            end = true;
                            col--;
                        }

                        //console.log("col: " + col);
                        //console.log("row: " + row);

                        var type = settings.columnModel[col - aditionalColumn].typeEditCtrl;

                        if (!end) {
                            if (type == "textbox" || type == "combobox" || type == "datepicker" || type == "checkbox") {

                                if (editTrigger == "enter") {
                                    var eve = jQuery.Event("keydown");
                                    eve.which = 13;

                                    $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").trigger(eve);
                                }
                                else if (editTrigger == "click") {
                                    $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").trigger("click");
                                }
                                else if (editTrigger == "dblclick") {
                                    $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").trigger("dblclick");
                                }
                            }
                            else {
                                $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").focus();
                            }
                        } else {
                            $('#' + idelem + ' table tbody').find("tr:eq(" + row + ")").find("td:eq(" + col + ")").focus();
                        }


                        e.stopPropagation();
                        e.preventDefault();
                    }


                });

                editCtrl.bind("focusout", function (e) {

                    console.log("focusout");

                    console.log(this);

                    var col = $(this).parent().index();

                    if (hasSelectionColumn)
                        col--;

                    var type = settings.columnModel[col].typeEditCtrl;
                    var text;

                    if (type == "textbox") {
                        text = $(this).val();

                        console.log("focus blur");
                        console.log($(':focus'));

                        $(this).parent().css("padding", "");
                        $(this).parent().css("position", "");
                        $(this).parent().html(text);
                        $(this).remove();

                        console.log("focus blur");
                        console.log($(':focus'));
                    }

                    if (type == "combobox") {
                        text = $(this).find("option:selected").text();
                        var value = $(this).find("option:selected").val();

                        console.log("focus blur");
                        console.log($(':focus'));

                        console.log(text);
                        console.log(value);
                        $(this).parent().attr("selectedvalue", value);

                        $(this).parent().css("padding", "");
                        $(this).parent().css("position", "");
                        $(this).parent().html(text);
                        $(this).remove();

                        console.log("focus blur");
                        console.log($(':focus'));

                    }

                    if (type == "datepicker") {
                        text = $(this).val();

                        var ele = $(":focus");
                        var id = $(":focus").closest("div#ui-datepicker-div").attr("id");

                        console.log("id= " + id);

                        if (id != "ui-datepicker-div") {
                            //$(this).datepicker("hide");

                            console.log("entra");

                            $(this).parent().css("padding", "");
                            $(this).parent().css("position", "");
                            //$(this).parent().focus();
                            $(this).parent().html(text);
                            $(this).remove();

                        }

                    }

                    //console.log("focusout");
                    //console.log($(this));


                    //$(this).parent().css("padding", "");
                    //$(this).parent().css("position", "");
                    //$(this).parent().html(text);
                    //$(this).remove();

                    e.stopPropagation();
                    e.preventDefault();
                });
            }
        
        }

        function UpdateTableWidth() {

            var tw = 0;
            $("#" + idelem + ' table th').each(function () {
                //var w = $(this).css("width");

                var w = $(this).get(0).style.width;

                w = parseInt(w);

                //console.log("w= " + w);

                if (!w)
                    w = $(this).width();

                tw += w;
            });

            //console.log("width= " + tw);

            $("#" + idelem + ' table').width(tw + "px");
        };

        function UpdateCtrlWidth() {

            if (editCtrl) {

                var newwidth = editCtrl.parent().width();
                editCtrl.css("width", newwidth + "px");
            }
        }

        function ChangeSelectedIndex(i) {

            var j = (page - 1) * pageSize;

            if (index != -1) {

                if (settings.selectionColumn.multiple) {                    

                    selectedIndexes.forEach(function (e) {
                        var si = e - j;

                        if (si >= 0 && si < pageSize) {
                            $('#' + idelem + ' table tbody').find('tr').eq(si).removeClass(settings.rowSelectedClass);
                            $('#' + idelem + ' table tbody').find('tr').eq(si).find("td:first input").prop("checked", false);
                        }
                    });
                }
                else {
                    if (index >= 0 && index < pageSize) {
                        $('#' + idelem + ' table tbody').find('tr').eq(index).removeClass(settings.rowSelectedClass);
                        $('#' + idelem + ' table tbody').find('tr').eq(index).find("td:first input").prop("checked", false);
                    }
                }

                selectedIndex = i;
                index = selectedIndex - j;

                $('#' + idelem + ' table tbody').find('tr').eq(index).addClass(settings.rowSelectedClass);
                $('#' + idelem + ' table tbody').find('tr').eq(index).find("td:first input").prop("checked", true);
                $('#' + idelem + ' table thead th:first input').prop("checked", false);

                settings.rowSelect(selectedIndex, data[index]);
            }
            else {
                selectedIndex = i;
                index = selectedIndex - j;

                $('#' + idelem + ' table tbody').find('tr').eq(index).addClass(settings.rowSelectedClass);
                $('#' + idelem + ' table tbody').find('tr').eq(index).find("td:first input").prop("checked", true);

                settings.rowSelect(selectedIndex, data[index]);
            }

            var item = data[index];
            selectedItem = item;                       


            if (settings.selectionColumn.multiple) {
                selectedIndexes = [];
                selectedIndexes.push(selectedIndex);

                selectedItems = [];
                var item = data[index];
                selectedItems.push(item);

               // console.log(selectedItems);
            }
        }

        function AddSelectedRow(i) {

            var index = i - (page - 1) * pageSize;

            $('#' + idelem + ' table tbody').find('tr').eq(index).addClass(settings.rowSelectedClass);

            selectedIndexes.push(i);

            var item = data[index];
            selectedItems.push(item);

            //console.log(selectedItems);

            var allchecked = true;
            $('#' + idelem + " table tbody td:nth-child(1) input").each(function (e, i) {
                var checked = $(this).prop("checked");
                if (!checked)
                    allchecked = false;
            });

            $('#' + idelem + ' table thead th:first input').prop("checked", allchecked);

        }

        function RemoveSelectedRow(i) {

            var index = i - (page - 1) * pageSize;

            $('#' + idelem + ' table tbody').find('tr').eq(index).removeClass(settings.rowSelectedClass);

            var j = selectedIndexes.indexOf(i);

            if (j > -1) {
                selectedIndexes.splice(j, 1);
                selectedItems.splice(j, 1);

                //console.log(j);
                //console.log(selectedIndexes);
                //console.log(selectedItems);
            }

            var allchecked = true;
            $('#' + idelem + " table tbody td:nth-child(1) input").each(function (e, i) {
                var checked = $(this).prop("checked");
                if (!checked)
                    allchecked = false;
            });

            $('#' + idelem + ' table thead th:first input').prop("checked", allchecked);

        }

        function SetPage(p) {
            if (p >= 0 && p < lastPage)
                page = p;
        }

        function GetSelectedRow() {

            return data[selectedIndex];
        }

        function Reload() {
            $("#" + idelem + " input.jq-cp").val(page);
            LoadGrid(page);

            //alert("ss");

            console.log(selectedIndexes);

        }

        function CleanGrid() { 
            
            $("#" + idelem + " tbody").html("");
        }

        function UpdateBody(html) {
           
            table.find("tbody").html("");
            table.find("tbody").html(html);

            html = "";

            var j = (page - 1) * pageSize;

            if (settings.selectionColumn.multiple) {               
                selectedIndexes.forEach(function (e) {
                    var i = e - j;

                    if (i >= 0 && i < pageSize) {
                        $('#' + idelem + ' table tbody').find('tr').eq(i).addClass(settings.rowSelectedClass);
                        $('#' + idelem + ' table tbody').find('tr').eq(i).find("td:first input").prop("checked", true);
                    }
                });
            }
            else {
                var i = selectedIndex - j;

                if (i >= 0 && i < pageSize) {
                    $('#' + idelem + ' table tbody').find('tr').eq(i).addClass(settings.rowSelectedClass);
                    $('#' + idelem + ' table tbody').find('tr').eq(i).find("td:first input").prop("checked", true);
                }
            }

            $("#" + idelem + ' table thead th:first input').prop("checked", false);

            rowHeight = $('#' + idelem + " table tbody tr:first").height();

            if (settings.rowClass) {
                $("#" + idelem + " table tbody tr:even").addClass(settings.rowClass);
            }

            if (settings.alternatingrowClass) {
                $("#" + idelem + " table tbody tr:odd").addClass(settings.alternatingrowClass);
            }

            var i = 23;
            $("#" + idelem + " table tbody td").each(function (e) {
                $(this).attr("tabindex", "" + i++);
            });
        
        }

        function UpdatePagingBar() {

            var i = (page - 1) * pageSize + 1;
            var j = (page - 1) * pageSize + pageSize;

            lastPage = Math.ceil(totalRecords / pageSize);

            if (totalRecords == 0) {
                i = 0;
            }

            if (pageSize > totalRecords) {
                j = totalRecords;
            }

            if (page == lastPage) {
                j = totalRecords;
            }
           

            var msg = settings.pagingOptions.pagingMsg;
            msg = msg.replace("{0}", i).replace("{1}", j).replace("{2}", totalRecords);

            $("#" + idelem + " input.jg-cp").val(page);
            $("#" + idelem + " span.jg-tp").html(lastPage);
            $("#" + idelem + " span.jg-bar-paging-msg").html(msg);

            EnableButton("#" + idelem + " span.jg-pf", true);
            EnableButton("#" + idelem + " span.jg-pp", true);
            EnableButton("#" + idelem + " span.jg-pn", true);
            EnableButton("#" + idelem + " span.jg-pl", true);


            if (page == 1) {
                EnableButton("#" + idelem + " span.jg-pf", false);
                EnableButton("#" + idelem + " span.jg-pp", false);
            }

            if (page >= lastPage) {
                EnableButton("#" + idelem + " span.jg-pn", false);
                EnableButton("#" + idelem + " span.jg-pl", false);
            }
        }

        function BuildTableHead() {

            //var head = '<thead><tr style="position: relative; background-color: #f6f6f6; height: 40px"';
            var html = '<tr ';

            if (settings.headerClass) {
                html += " class='" + settings.headerClass + "'";
            }

            html += ">";

            if (settings.selectionColumn.type == "checkbox") {
                html += '<th class="x-chk-ele"><input type="checkbox" value="check"/></th>';
            }

            settings.columnModel.forEach(function (e) {
                
                html+= '<th';

                if (e.width) {
                    html += ' width="' + e.width;   
                }

                if (e.textAlign) {
                    html += '" align="' + e.textAlign;          
                }

                if (settings.sorting) {
                    if (e.sortCommand)
                        html += '" sortcommand="' + e.sortCommand
                }

                html += '"><span>' + e.text + '</span></th>';
            });

            html += "</tr>";

            table.find("thead").html("");
            table.find("thead").append(html);


            var c = 1;

            $("#" + idelem + ' table th').each(function () {

                var w = $(this).width();
                $(this).width(w + "px");

                if (!hasSelectionColumn || c != 1) {
                    var handler = $("<div>")
                        .addClass("handler")
                        .attr("unselectable", "on")
                        .attr("column", c)
                        .appendTo($(this));
                }
                c++;
            });

            $(document).on('click', "#" + idelem + ' table th .handler', function (e) {
                e.stopPropagation();
            });

            $(document).on('dblclick', '#' + idelem + ' table th .handler', function (e) {

                var c = $(this).attr("column");

                var widthMax = 0;

                $('#' + idelem + " tbody td:nth-child(" + c + ")").each(function () {
                    var text = this.innerHTML;
                    var s = window.getComputedStyle(this);

                    //w = el.clientWidth;
                    //w= this.getBoundingClientRect().width;
                    //w = this.offsetWidth;
                    //console.log(w);
                    var w = text.width(s.fontFamily, s.fontSize);

                    if (w > widthMax)
                        widthMax = w;
                });

                //console.log("widthMax " + widthMax);

                if (widthMax > 0) {
                    $('#' + idelem + " thead th:nth-child(" + c + ")").width(widthMax + "px");
                    UpdateTableWidth();
                    UpdateCtrlWidth();
                }

                isMouseDown = false;
                isMouseMove = false;

                e.stopPropagation();
            });

            $(document).on('mousedown', "#" + idelem + ' table th .handler', function (e) {
                isMouseDown = true;
                isMouseMove = false;
                column = $(this).parent();
                offsetcolumn = $(column).offset();
                minlimit = Math.round((offsetcolumn.left), 0) + 20;
                handlermaxposx = offset.left + width;
            });

            $(window).on('mousemove', function (e) {

                if (isMouseDown) {

                    //console.log("mousemove");

                    isMouseMove = true;
                    columnposx = e.pageX;

                    if (columnposx < minlimit)
                        columnposx = minlimit;

                    if (columnposx < handlermaxposx) {
                        var x = columnposx - offset.left;

                        xft.css('display', "block")
                            .css('left', x + "px");
                    }
                    else
                        xft.css('display', "none");

                    //$('#prueba').css('cursor', 'col-resize');
                }
            });

            $(window).on('mouseup', function (e) {

                if (isMouseMove) {

                    console.log("mouseup");

                    $('#prueba').css('cursor', 'default');
                    xft.css('display', "none")

                    if (e.pageX > minlimit)
                        columnposx = e.pageX;

                    var w = (columnposx - offsetcolumn.left);
                    $(column).css('width', w + 'px');
                    UpdateTableWidth();
                    UpdateCtrlWidth();
                }

                isMouseDown = false;
                isMouseMove = false;
                $("#" + idelem + ' table').css('cursor', 'default');

            });


            if (settings.sorting) {

                $(document).on('click', "#" + idelem + ' table th', function (e) {

                    var command = $(this).attr("sortcommand");
                 
                    if (command) {
                        column = $(this).index();
                        sortCommand = command;
                        sortOrder = $(this).attr("sortorder") ? $(this).attr("sortorder") : "desc";

                        console.log("sortCommand=" + sortCommand);
                        console.log("sortOrder=" + sortOrder);

                        $("#" + idelem + ' table th').each(function () {
                            $(this).find("span").removeClass("x-column-sort-asc").removeClass("x-column-sort-desc");
                            $(this).attr("sortorder", "");
                        });

                        if (sortOrder == "asc") {
                            $(this).attr("sortorder", "desc");
                            $(this).find("span").removeClass("x-column-sort-desc").addClass("x-column-sort-asc");
                        }
                        else {
                            $(this).attr("sortorder", "asc");
                            $(this).find("span").removeClass("x-column-sort-asc").addClass("x-column-sort-desc");
                        }
                        //LoadGrid();

                        if (settings.pagingOptions.server)
                            LoadGridServer();
                        else {
                            if (data) {
                                SortData();
                                LoadPage();
                            }
                        }
                    }
                });
            }

            if (hasSelectionColumn) {

                if (settings.selectionColumn.multiple) {

                    $(document).on('click', "#" + idelem + ' table thead th:first input', function (e) {

                        var checked = $(this).prop("checked");

                        //selectedIndexes = [];

                        if (checked) {                            
                            $('#' + idelem + ' table tbody td:nth-child(1)').each(function (i, ele) {

                                var chk = $(ele).find("input").prop("checked");

                                if (!chk) {
                                    $(ele).find("input").prop("checked", checked);
                                    var i = parseInt($(ele).parent().attr("row"));
                                    AddSelectedRow(i);
                                }
                            });
                        }
                        else {
                            $('#' + idelem + ' table tbody td:nth-child(1)').each(function (i, ele) {

                                var chk = $(ele).find("input").prop("checked");

                                if (chk) {
                                    $(ele).find("input").prop("checked", checked);
                                    var i = parseInt($(ele).parent().attr("row"));
                                    RemoveSelectedRow(i);
                                }
                            });
                        }

                    });
                }
                else if (settings.selectionColumn.mode == "single") {
                    $("#" + idelem + ' table thead th:first input').prop("disabled", true);
                }
                else {
                    $("#" + idelem + ' table thead th:first input').prop("disabled", true);
                }
            }
        }

        function BuildPagingBar() {

            var h = $('#' + idelem).height();

            if (settings.paging) {

                var pagingbar = '<div class="jg-bar-paging"><span class="jg-bar-paging-btn jg-pf" ></span > <span class="jg-bar-paging-btn jg-pp"></span> <div class="jq-lb-page"><span>Page</span><input class="jg-cp" style="width:30px; height:21px" maxlength="8" /><span> of </span><span class="jg-tp"></span></div> <span class="jg-bar-paging-btn jg-pn"></span> <span class="jg-bar-paging-btn jg-pl"></span> <span class="jg-bar-paging-btn jg-ref"></span> <span class="jg-bar-paging-msg"></span></div >';

                $(pagingbar).insertAfter($("#" + idelem + ' div:first'));

                $(document).on('click', "#" + idelem + " span.jg-pf", function (e) {

                    page = 1;
                    $("#" + idelem + " input.jg-cp").val(page);

                    EnableButton("#" + idelem + " span.jg-pf", false);
                    EnableButton("#" + idelem + " span.jg-pp", false);

                    if (lastPage > 1) {

                        EnableButton("#" + idelem + " span.jg-pn", true);
                        EnableButton("#" + idelem + " span.jg-pl", true);
                    }


                    if (pagingServer)
                        LoadGrid();                    
                    else 
                        LoadPage();
                    
                });

                $(document).on('click', "#" + idelem + " span.jg-pp", function (e) {

                    if (page > 1) {
                        page -= 1;
                        $("#" + idelem + " input.jg-cp").val(page);

                        if (page == 1) {

                            EnableButton("#" + idelem + " span.jg-pf", false);
                            EnableButton("#" + idelem + " span.jg-pp", false);
                        }

                        if (lastPage > 1) {

                            EnableButton("#" + idelem + " span.jg-pn", true);
                            EnableButton("#" + idelem + " span.jg-pl", true);
                        }


                        if (pagingServer)
                            LoadGrid();
                        else
                            LoadPage();

                    }
                    
                });

                $(document).on('keydown', "#" + idelem + " input.jg-cp", function (e) {

                    if (e.which == 13) {

                        var value = $(this).val();

                        if (value) {
                            var i = parseInt(value);

                            if (i > 0 && i <= lastPage)
                                page = i;
                            
                        }
                       
                        $("#" + idelem + " input.jg-cp").val(page);

                        if (pagingServer)
                            LoadGrid();
                        else
                            LoadPage();
                    }
                });

                $(document).on('click', "#" + idelem + " span.jg-pn", function (e) {

                    if (page < lastPage) {
                        page += 1;

                        $("#" + idelem + " input.jg-cp").val(page);

                        if (page == lastPage) {

                            EnableButton("#" + idelem + " span.jg-pn", false);
                            EnableButton("#" + idelem + " span.jg-pl", false);
                        }

                        if (lastPage > 1) {

                            EnableButton("#" + idelem + " span.jg-pf", true);
                            EnableButton("#" + idelem + " span.jg-pp", true);
                        }

                        if (pagingServer)
                            LoadGrid();
                        else
                            LoadPage();
                    }

                });

                $(document).on('click', "#" + idelem + " span.jg-pl", function (e) {
                    page = lastPage;
                    $("#" + idelem + " input.jg-cp").val(page);

                    EnableButton("#" + idelem + " span.jg-pn", false);
                    EnableButton("#" + idelem + " span.jg-pl", false);

                    if (lastPage > 1) {

                        EnableButton("#" + idelem + " span.jg-pf", true);
                        EnableButton("#" + idelem + " span.jg-pp", true);
                    }

                    if (pagingServer)
                        LoadGrid();
                    else
                        LoadPage();
                });

                $(document).on('click', "#" + idelem + " span.jg-ref", function (e) {

                    if (pagingServer)
                        Reload();
                    else
                        LoadPage();
                    
                });

                h-= $('#' + idelem + " div.jg-bar-paging").height() + 5;

                $('#' + idelem + " div:first").css("height", h);
            }

            xft = $("<div>")
                .addClass("x-guide-bar")
                .css({
                    'height': h + "px",
                    'top': "0px"
                    //'top': offset.top + 1 + "px"
                })
                .insertAfter("#" + idelem + " div:first");            
        }

        function EnableButton(ref, state) {

            var elem = $(ref);

            if (state) {
                elem.prop("disabled", false);
                elem.removeClass("jg-bar-paging-btn-disabled").addClass("jg-bar-paging-btn");
            }
            else {
                elem.prop("disabled", true);
                elem.removeClass("jg-bar-paging-btn ").addClass("jg-bar-paging-btn-disabled");
            }
        }

        function LoadGrid() {

            if (settings.pagingOptions.server)
                LoadGridServer();
            else
                LoadGridLocal();
        }

        function LoadGridServer() {

            var loader = $.fn.loadMask("#" + idelem, null);
            loader.show();

            CleanGrid();

            console.log("LoadGridServer: " + idelem);

            var params = {
                "Page": page,
                "PageSize": pageSize,
                "SortCommand": sortCommand,
                "SortOrder": sortOrder};

            settings.params.forEach(function (e) {
                params[e.name] = eval(e.value);
            });

            $.ajax({
                url: settings.url,
                type: settings.method,
                //contentType: "application/json; charset=utf-8", 
                //dataType: "json",  
                data: params,
                cache: false,
                success: function (result) {

                    html = "";
                    data = null;
                    totalRecords = 0;

                    if (result) {
                        data = result.Lista;
                        totalRecords = result.TotalRecords;

                        if (data.length == 0) {
                            data = null;
                            totalRecords = 0;
                        }
                    }

                    console.log(data);
                    console.log("totalRecords= " + totalRecords);

                 
                    var r = (page - 1) * pageSize;

                    if (data) {
                        $(data).each(function (index, item) {

                            var tr = CreateRowElement(item, r);

                            html += tr;
                            r++;
                        });
                    }

                    console.log("html= ");

                    UpdateBody(html);
                    UpdatePagingBar();
                    loader.hide();
                },
                error: function (j, t, e) {
                    //if (j.status == 404)
                    //    alert("Url no encontrada!");
                    //else
                    //    alert("Fallo la conexión!");

                    //console.log(j);
                    //console.log(t);
                    //console.log(e);

                    console.log(j);

                    loader.hide();
                }
            });

        }

        function LoadGridLocal() {

            var loader = $.fn.loadMask("#" + idelem, null);
            loader.show();

            CleanGrid();

            var params = {};

            settings.params.forEach(function (e) {
                params[e.name] = eval(e.value);
            });

            $.ajax({
                url: settings.url,
                type: settings.method,
                data: params,
                cache: false,
                success: function (result) {

                    data = result.Lista;
                    totalRecords = result.TotalRecords;                    

                    if (data.length == 0) {
                        data = null;
                        totalRecords = 0;
                    }

                    page = 1;
                    LoadPage();

                    loader.hide();
                },
                error: function (j, t, e) {
                    //if (j.status == 404)
                    //    alert("Url no encontrada!");
                    //else
                    //    alert("Fallo la conexión!");
                    loader.hide();
                }
            });

        }

        function LoadPage() {

            var loader = $.fn.loadMask("#" + idelem, null);
            loader.show();

            var html = "";

            if (data) {

                var r = (page - 1) * pageSize;
                var ini = (page - 1) * pageSize;
                var fin = (ini + pageSize);

                if (page == lastPage) {
                    fin = totalRecords;
                }

                for (var i = ini; i < fin; i++) {
                    var item = data[i];

                    if (item) {
                        var tr = CreateRowElement(item, r);
                        html += tr;
                        r++;
                    }
                }          

                UpdateBody(html);
            }

            UpdatePagingBar();

            setTimeout(function () { loader.hide() }, 100);
            $('#' + idelem + " div:first").scrollTop(0);
        }

        function GetSelectedItems() {
            return selectedItems;
        }

        function GetSelectedItem() {
            return selectedItem;
        }

        function CreateRowElement(item, r) {

            var tr = '<tr row="' + (r) + '">';

            var c = 0;

            if (settings.selectionColumn.type == "checkbox")
                tr += '<td class="x-chk-ele"><input type="checkbox" value="check"/></td>';

            settings.columnModel.forEach(function (e) {

                var text = "";

                if (e.dataType == 'string') {
                    var value = item[e.dataIndex];

                    if (e.rendererFn) {
                        var newvalue = e.rendererFn(value);
                        if (newvalue)
                            text = newvalue;
                    }
                    else
                        text = value ? value : '';

                }

                if (e.dataType == 'int' || e.dataType == 'decimal') {
                    var value = item[e.dataIndex];

                    if (e.rendererFn) {
                        var newvalue = e.rendererFn(value);
                        if (newvalue)
                            text = newvalue;
                    }
                    else
                        text = value ? value : '';

                }

                if (e.dataType == 'datetime' || e.dataType == 'date') {
                    var value = item[e.dataIndex];

                    if (e.rendererFn) {
                        var newvalue = e.rendererFn(value);
                        if (newvalue)
                            text = newvalue;
                    }
                    else
                        text = value ? value : '';
                        //2019-09-12T00:00:00
                        //text = value ? value.toDateDDMMYYYY() : '';
                }

                if (e.dataType == 'template') {

                    var templateText = e.templateText;
                    var matches = templateText.match(/({{)[a-z]+(?=}})/gi);
                    text = templateText;

                    matches.forEach(function (e) {
                        if (e.length > 2) {
                            var dataIndex = e.substr(2);
                            var value = item[dataIndex];
                            if (value)
                                text = text.replace("{{" + dataIndex + "}}", value);
                        }
                    });
                }

                var ele = '<td>' + text + '</td>';

                if (settings.cellCreated)
                    ele = settings.cellCreated(r, c++, text, ele);

                tr += ele;
            });

            tr += "</tr>";

            return tr;
        }

        function AddRow(row) {

            var valid = true;

            settings.columnModel.forEach(function (e) {

                var value = row[dataIndex];
                if (value) 
                    valid = false;                
            });

            if (valid) {
                data.push(row);
                LoadPage();
                //var r = data.length;
                //var tr = CreateRowElement(row, r);
                //$('#' + idelem + ' table tr:last').after(tr);
            }
        }

        function AddRowAt(row, index) {

            var valid = true;

            settings.columnModel.forEach(function (e) {

                var value = row[dataIndex];
                if (value)
                    valid = false;
            });

            if (valid) {

                var tr = CreateRowElement(row, index+1);

                if (index < data.length) {
                    data.splice(index, 0, row);
                    //$('#' + idelem + ' table tbody tr').eq(index).after(tr);
                }
                else {
                    data.push(tr);
                    //$('#' + idelem + ' table tr:last').after(tr);
                }

                LoadPage();
            }

        }

        function DeleteRow(row) {

            var index;
            for (i = 0; i < data.length; i++) {
                var item = data[i];

                var exist = true;
                settings.columnModel.forEach(function (e) {
                    if (row[e.dataIndex] != ele[e.dataIndex]) {
                        exist = false;
                    }                    
                });

                if (exist) {
                    index = i;
                    break;
                }                               
            }

            if (exist) {
                data.splice(index, 1);
                LoadPage();
                //$('#' + idelem + ' table tbody tr').eq(index).remove();
            }
        }

        function DeleteRowAt(index) {

            data.splice(index, 1);
            LoadPage();
        }

        function SortData() {

            var type = settings.columnModel[column - 1].dataType;
            var dataIndex = settings.columnModel[column - 1].dataIndex;

            if (type == "string" || type == "int" || type == "date") {

                if (sortOrder == "asc") {

                    console.log("order asc");

                    data.sort(function (a, b) {
                        if (a[dataIndex] > b[dataIndex]) {
                            return 1;
                        }
                        if (b[dataIndex] > a[dataIndex]) {
                            return -1;
                        }
                        return 0;
                    });
                }

                if (sortOrder == "desc") {

                    console.log("order desc");

                    data.sort(function (a, b) {
                        if (a[dataIndex] > b[dataIndex]) {
                            return -1;
                        }
                        if (b[dataIndex] > a[dataIndex]) {
                            return 1;
                        }
                        return 0;
                    });
                }
            }

                 
        }

        function Destroy() {

            //console.log("removing!");

            //$(window).off('mousemove');
            //$(window).off('mouseup');

            var handlerstodelete = [];
            var events = ["click", "dblclick", "keydown", "mousedown", "mouseup"];

            events.forEach(function (eventname, i) {
                var handlers = $._data(document, "events")[eventname];
                if (handlers) {
                    handlers.forEach(function (ele) {
                        //console.log(ele.type, ", " + ele.selector);

                        var selector = "" + ele.selector;

                        var contiene= (selector.substr(0, ("#" + idelem + " ").length) == "#" + idelem + " ");

                        if (contiene) {
                            //console.log(ele.type, ", " + ele.selector);
                            handlerstodelete.push({ type: ele.type, selector: selector });
                        }
                    });
                }
            });

            handlerstodelete.forEach(function (ele) {
                //console.log(ele.type, ", " + ele.selector);
                $(document).off(ele.type, ele.selector);
            });
            
            //elem.remove();

            if (editCtrl)
                editCtrl.remove();

            //console.log($._data(editCtrl.get(0), "events"));


            $('#' + idelem).html("");
        }

        return {
            SetPage: SetPage,
            GetSelectedRow: GetSelectedRow,
            CleanGrid: CleanGrid,
            UpdateBody: UpdateBody,
            LoadGrid: LoadGrid,
            Reload: Reload,
            GetSelectedItems: GetSelectedItems,
            GetSelectedItem: GetSelectedItem,
            AddRow: AddRow,
            AddRowAt: AddRowAt,
            DeleteRow: DeleteRow,
            DeleteRowAt: DeleteRowAt,
            Destroy: Destroy
        };
    };

}(jQuery));


String.prototype.width = function (fontFamily, fontSize) {
    var el;
    var f = '12px Times New Roman';
    var width;

    if (fontSize && fontFamily)
        f = fontSize + " " + fontFamily;

    var c = document.createElement("canvas")

    if (c) {
        ctx = c.getContext("2d");
        ctx.font = f;
        width = ctx.measureText(this).width;
    }
    else {
        el = document.getElementById("metric");

        if (!el) {
            el = document.createElement('div');
            el.style.position = 'absolute';
            el.style.float = "left";
            el.style.whiteSpace = 'nowrap';
            el.style.visibility = 'hidden';
            el.style.font = f;
            el.innerHTML = this;
            el.id = "metric";
            el = document.body.appendChild(el);
        }
        else {
            el.innerHTML = this;
            el.style.font = f;
        }

        width = el.offsetWidth;
    }

    //el.parentNode.removeChild(el);
    return width;
}

String.prototype.toDateDDMMYYYY = function () {

    if (!this || this == undefined || this == '' || this == null || this.length < 6)
        return "";

    var dateString = this.substr(6);
    var currentTime = new Date(parseInt(dateString));
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    var date = day + "/" + month + "/" + year;

    return date;
}





