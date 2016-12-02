var EditableTable = function () {

'use strict';

    return {
        init: function () {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }
                oTable.fnDraw();
            }

            // function editRow(oTable, nRow) {
            //     var aData = oTable.fnGetData(nRow);
            //     var jqTds = $('>td', nRow);
            //     jqTds[0].innerHTML = '<input type="text" class="form-control small" value="' + aData[0] + '">';
            //     jqTds[1].innerHTML = '<input type="text" class="form-control small" value="' + aData[1] + '">';
            //     jqTds[2].innerHTML = '<input type="text" class="form-control small" value="' + aData[2] + '">';
            //     jqTds[3].innerHTML = '<input type="text" class="form-control small" value="' + aData[3] + '">';
            //     jqTds[5].innerHTML = '<a class="cancel" href=""><span class="label label-info">保存</span></a><a class="edit" href=""><span class="label label-primary">重置</span></a>';
            // }

            // function saveRow(oTable, nRow) {
            //     var jqInputs = $('input', nRow);
            //     oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            //     oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            //     oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            //     oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
            //     oTable.fnUpdate('<a class="edit" href=""><span class="label label-success">Edit</span></a>', nRow, 4, false);
            //     oTable.fnUpdate('<a class="delete" href=""><span class="label label-danger">Delete</span></a>', nRow, 5, false);
            //     oTable.fnDraw();
            // }

            // function cancelEditRow(oTable, nRow) {
            //     var jqInputs = $('input', nRow);
            //     oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            //     oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            //     oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            //     oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
            //     oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 4, false);
            //     oTable.fnDraw();
            // }
            var oTable = $('#editable-sample').dataTable({
                "aLengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],
                "iDisplayLength": 10,
                "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ 页",
                    "oPaginate": {
                        "sPrevious": "上一页",
                        "sNext": "下一页"
                    }
                },
                "aoColumnDefs": [{
                    'bSortable': false,
                    'aTargets': [0]
                }]
            });
            jQuery('#editable-sample_wrapper .dataTables_filter input').addClass("form-control medium");
            jQuery('#editable-sample_wrapper .dataTables_length select').addClass("form-control xsmall");
            var nEditing = null;
            // $('#editable-sample_new').click(function (e) {
            //     e.preventDefault();
            //     var aiNew = oTable.fnAddData(['11', '11', '11', '22', '<a class="edit" href="">Edit</a>', '<a class="cancel" data-mode="new" href="">Cancel</a>']);
            //     var nRow = oTable.fnGetNodes(aiNew[0]);
            //     editRow(oTable, nRow);
            //     nEditing = nRow;
            // });
            $('#editable-sample a.delete').live('click', function (e) {
                e.preventDefault();
                if (confirm("您正在执行删除操作，是否继续?") == false) {
                    return;
                }
                var nRow = $(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
                // alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });
            $('#editable-sample a.cancel').live('click', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                } else {
                    restoreRow(oTable, nEditing);
                    nEditing = null;
                }
            });
            // $('#editable-sample a.edit').live('click', function (e) {
            //     e.preventDefault();
            //     var nRow = $(this).parents('tr')[0];
            //     if (nEditing !== null && nEditing != nRow) {
            //         restoreRow(oTable, nEditing);
            //         editRow(oTable, nRow);
            //         nEditing = nRow;
            //     } else if (nEditing == nRow && this.innerHTML == "Save") {
            //         saveRow(oTable, nEditing);
            //         nEditing = null;
            //         alert("Updated! Do not forget to do some ajax to sync with backend :)");
            //     } else {
            //         // editRow(oTable, nRow);
            //         nEditing = nRow;
            //     }
            // });
        }
    };
}();
