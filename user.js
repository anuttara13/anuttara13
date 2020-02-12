var arr = [];
var arrpermission = [];
var arrsearch = [];
var ip = $("#hidden_ipaddress").val();
var write1user = '';

$(document).ready(function () {
    testrest();
    $("#dvSpinner").css('display', 'block');
    getuser();
    write1user = $.cookie("writeuser");
    if (write1user == 'false') {
        $("#allTargetDone").css('display', 'none');
    }
    else {
        $("#btnedit").css('display', 'inline-block');
    }
    $("#dvSpinner").css('display', 'none');
});

function refresh() {
    location.reload(true);
}

function getuser() {
    var data = { };
    APIPost("/partner-commission/getUser", data, false, function (err, res) {
        arr = res;
        if (err) {
            console.log(err);
        }
        if (res.data != null && res.data.length > 0) {
            createtb(arr);
        }
    });
}

function createtb(res) {
    $("#tbuser > tbody").empty();
    var x = 0;
    for (var i = 0; i < res.data.length; i++) {
        x = i + 1;
        if ($.cookie("deluser") == 'false') {
            row3 = '<a href="#"></a>'
        }
        else {
            row3 = '<a href="#" id="chkdel' + res.data[i].upc_id + '" onclick=\'deluser("' + res.data[i].upc_id + '");\' style="display:block"><i class="fa fa-trash" aria-hidden="true" style="color:Red;font-size:20px"></i></a>'
        }


        row = $(
                    '<tr><td style="text-align: center;">' + x + '</td><td>' + res.data[i].code + '</td><td>' + res.data[i].name + '</td><td style="text-align: center;"><a href="#" onclick=\'edituser("' + res.data[i].upc_type + '","' + res.data[i].name + '","' + res.data[i].upc_id + '");\' data-toggle="modal" data-target="#Modaledituser"><i class="fa fa-pencil-square-o" style="color:#1ab394;font-size:20px"></i></a></td><td style="text-align: center;">' + row3 + '</td></tr>'
                );
        $("#tbuser > tbody").append(row);
    }
    getPagination('#tbuser');
    $('#chkdel200115094302905888').css('display', 'none');
}

function searchuser() {
    var radioValue = $("input[name='selectuser']:checked").val();
    $("#tbuser > tbody").empty();
    var x = 0;
    for (var i = 0; i < arr.data.length; i++) {
        if (arr.data[i].upc_type == radioValue || radioValue == 'all') {
            x = x + 1;
            if ($.cookie("deluser") == 'false') {
                row3 = '<a href="#"></a>'
            }
            else {
                row3 = '<a href="#" id="chkdel' + arr.data[i].upc_id + '" onclick=\'deluser("' + arr.data[i].upc_id + '");\'><i class="fa fa-trash" aria-hidden="true" style="color:Red;font-size:20px"></i></a>'
            }


            row = $(
                        '<tr><td style="text-align: center;">' + x + '</td><td>' + arr.data[i].code + '</td><td>' + arr.data[i].name + '</td><td style="text-align: center;"><a href="#" onclick=\'edituser("' + arr.data[i].upc_type + '","' + arr.data[i].name + '","' + arr.data[i].upc_id + '");\' data-toggle="modal" data-target="#Modaledituser"><i class="fa fa-pencil-square-o" style="color:#1ab394;font-size:20px"></i></a></td><td style="text-align: center;">' + row3 + '</td></tr>'
                    );
            $("#tbuser > tbody").append(row);
        }
    }
    getPagination('#tbuser');
    $('#chkdel200115094302905888').css('display', 'none');
}

function adduser() {
    $("#conditionuser").empty();
    $('#selecttypeemployee').prop("checked", true);
    $('#inputemployee2').css('display', 'block');
    $('#inputsupplier2').css('display', 'none');
    $('#inputdepartment2').css('display', 'block');

    var data = {};
    $("#dvSpinner").css('display', 'block');
    APIPost("/partner-commission/getdepartment", data, false, function (err, res) {
        if (err) {
            console.log(err);
        }
        if (res.data != null && res.data.length > 0) {
            for (var i = 0; i < res.data.length; i++) {
                row = $(
                    '<option value="' + res.data[i].department + '">' + res.data[i].department + '</option>'
                );
                $("#departmentselect").append(row);
            }
        }
    });
    $("#dvSpinner").css('display', 'none');
    var id = $.cookie("upc_id");
    var data = { id: id }
    $("#dvSpinner").css('display', 'block');
    var res = APIPost("/partner-commission/getMenu", data, false, function (err, res) {
        
        if (err) {
            console.log(err);
        }
        if (res.data != null && res.data.length > 0) {
            
            for (var i = 0; i < res.data.length; i++) {
                row = $(
                        '<div style="float:left;width:40%;margin:0px 0px 10px 0px;">' + res.data[i].msp_menu_display + '</div>' +
                        '<div style="float:left;width:20%;margin:0px 0px 10px 0px;">' +
                            '<div class="onoffswitch">' +
                                '<input onchange=\'checkread2("read' + res.data[i].upcr_msp_id + '","write' + res.data[i].upcr_msp_id + '","delete' + res.data[i].upcr_msp_id + '");\' id="read' + res.data[i].upcr_msp_id + '" class="onoffswitch-checkbox" type="checkbox">' +
                                '<label class="onoffswitch-label" for="read' + res.data[i].upcr_msp_id + '">' +
                                    '<span class="onoffswitch-inner"></span>' +
                                    '<span class="onoffswitch-switch"></span>' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<div style="float:left;width:20%;margin:0px 0px 10px 0px;">' +
                            '<div class="onoffswitch">' +
                                '<input onchange=\'checkread("read' + res.data[i].upcr_msp_id + '","write' + res.data[i].upcr_msp_id + '");\' id="write' + res.data[i].upcr_msp_id + '" class="onoffswitch-checkbox" type="checkbox">' +
                                '<label class="onoffswitch-label" for="write' + res.data[i].upcr_msp_id + '">' +
                                    '<span class="onoffswitch-inner"></span>' +
                                    '<span class="onoffswitch-switch"></span>' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<div style="float:left;width:20%;margin:0px 0px 10px 0px;">' +
                            '<div class="onoffswitch">'+
                                '<input onchange=\'checkread("read' + res.data[i].upcr_msp_id + '","delete' + res.data[i].upcr_msp_id + '");\' id="delete' + res.data[i].upcr_msp_id + '" class="onoffswitch-checkbox" type="checkbox">' +
                                '<label class="onoffswitch-label" for="delete' + res.data[i].upcr_msp_id + '">' +
                                    '<span class="onoffswitch-inner"></span>'+
                                    '<span class="onoffswitch-switch"></span>'+
                                '</label>'+
                            '</div>'+
                        '</div>' 
                 );
                $("#conditionuser").append(row);
            }
        }
    });
    $("#dvSpinner").css('display', 'none');
}

function getemployee() {
    $("#dvSpinner").css('display', 'block');
    $("#selectemp").empty();
    $("#selectemp").append('<option value="ระบุชื่อพนักงาน">ระบุชื่อพนักงาน</option>');
    var dp = $("#departmentselect").val();
    var data = {department : dp };
    APIPost("/partner-commission/getemployee", data, false, function (err, res) {
        if (err) {
            console.log(err);
        }
        if (res.data != null && res.data.length > 0) {
            for (var i = 0; i < res.data.length; i++) {
                row = $(
                    '<option value="' + res.data[i].code + '"> (' + res.data[i].code + ') ' + res.data[i].name + '</option>'
                );
                $("#selectemp").append(row);
            }
        }
    });
    $("#dvSpinner").css('display', 'none');
}

function selectuserforadd() {
    var radiouser = $("input[name='selecttypeuser']:checked").val();
    if (radiouser == 'Employee') {
        $('#inputemployee2').css('display', 'block');
        $('#inputsupplier2').css('display', 'none');
        $('#inputdepartment2').css('display', 'block');
    }
    else if (radiouser == 'Supplier') {
        $('#inputemployee2').css('display', 'none');
        $('#inputsupplier2').css('display', 'block');
        $('#inputdepartment2').css('display', 'none');
    }
}

function savenewuser() {
    var departmentselect = $('#departmentselect').val();
    var selectemp = $('#selectemp').val();
    var selectsupplier = $('#inputsupplier').val();
    var username = $('#username').val();
    var password = $('#password').val();
    var newuser = $("input[name='selecttypeuser']:checked").val();

    if (newuser == 'Employee' && departmentselect == 'ระบุแผนก') {
        swal("กรุณาเลือกแผนก", "", "warning")
    }
    else if (newuser == 'Employee' && selectemp == 'ระบุชื่อพนักงาน') {
        swal('กรุณาเลือกชื่อพนักงาน', "", "warning")
    }
    else if (newuser == 'Supplier' && selectsupplier == '') {
        swal('กรุณาระบุชื่อ Supplier', "", "warning")
    }
    else if (username == '') {
        swal('กรุณากรอก username', "", "warning")
    }
    else if (password == '') {
        swal('กรุณากรอก password', "", "warning")
    }
    else if (username != '') {
        var data = { username: username};
        APIPost("/partner-commission/checkuser", data, false, function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                if (res.data.length > 0) {
                    swal('มี username นี้แล้วในระบบ', "", "warning")
                }
                else {
                    var readupload = ($('#read200115092753031042').is(":checked")) ? '1' : '0';
                    var writeupload = ($("#write200115092753031042").is(":checked")) ? '1' : '0';
                    var delupload = ($("#delete200115092753031042").is(":checked")) ? '1' : '0';
                    if (readupload == '1' || writeupload == '1' || delupload == '1') {
                        var uploadactive = '1';
                    }
                    else {
                        var uploadactive = '0';
                    }

                    var readconfirm = ($('#read200115093047917266').is(":checked")) ? '1' : '0';
                    var writeconfirm = ($("#write200115093047917266").is(":checked")) ? '1' : '0';
                    var delconfirm = ($("#delete200115093047917266").is(":checked")) ? '1' : '0';
                    if (readconfirm == '1' || writeconfirm == '1' || delconfirm == '1') {
                        var confirmactive = '1';
                    }
                    else {
                        var confirmactive = '0';
                    }

                    var readconfig = ($('#read200115093251186371').is(":checked")) ? '1' : '0';
                    var writeconfig = ($("#write200115093251186371").is(":checked")) ? '1' : '0';
                    var delconfig = ($("#delete200115093251186371").is(":checked")) ? '1' : '0';
                    if (readconfig == '1' || writeconfig == '1' || delconfig == '1') {
                        var configactive = '1';
                    }
                    else {
                        var configactive = '0';
                    }

                    var readuser = ($('#read200115093447087900').is(":checked")) ? '1' : '0';
                    var writeuser = ($("#write200115093447087900").is(":checked")) ? '1' : '0';
                    var deluser = ($("#delete200115093447087900").is(":checked")) ? '1' : '0';
                    if (readuser == '1' || writeuser == '1' || deluser == '1') {
                        var useractive = '1';
                    }
                    else {
                        var useractive = '0';
                    }

                    swal({
                        title: "ยืนยันการบันทึกข้อมูล",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: '#18a689',
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "ยืนยัน",
                        cancelButtonText: "ยกเลิก",
                        closeOnConfirm: false
                    },
                    function () {
                        if (1 == 1) {
                            var data = { selectsupplier: selectsupplier, uploadactive: uploadactive, confirmactive: confirmactive, configactive: configactive
                            , useractive: useractive, user: $.cookie("upc_id"), ip: ip, selectemp: selectemp, username: username, password: password
                            , newuser: newuser, readupload: readupload, writeupload: writeupload, delupload: delupload, readconfirm: readconfirm
                            , writeconfirm: writeconfirm, delconfirm: delconfirm, readconfig: readconfig, writeconfig: writeconfig, delconfig: delconfig
                            , readuser: readuser, writeuser: writeuser, deluser: deluser
                            };
                            APIPost("/partner-commission/addnewuser", data, false, function (err, res) {
                                if (err) {
                                    console.log(err);
                                }
                                else {

                                }
                            });
                        }
                        swal({ title: "ส่งข้อมูลเรียบร้อย", text: "", type: "success" },
		                function () {
		                    location.reload(true);
		                }
	                );
                    });
                }
            }
        });
    }
    
    
}

function edituser(upc_type,name,upc_id) {
    $("#conditionuseredit").empty();
    if (upc_type == 'Employee') {
        $('#type1').prop("checked", true);
        $('#editemployee2').css('display', 'block');
        $('#editsupplier2').css('display', 'none');
        $('#editemployee').val(name);
    }
    else if (upc_type == 'Supplier') {
        $('#type2').prop("checked", true);
        $('#editsupplier2').css('display', 'block');
        $('#editemployee2').css('display', 'none');
        $('#editsupplier').val(name);
    }

    $("#dvSpinner").css('display', 'block');
    var data = { id: upc_id }
    var res = APIPost("/partner-commission/getMenu2", data, false, function (err, res) {
        $('#usernameedit').val(res.data[0].upc_username);
        $('#passwordedit').val(res.data[0].upc_pwd);
        if (err) {
            console.log(err);
        }
        if (res.data != null && res.data.length > 0) {
            for (var i = 0; i < res.data.length; i++) {
                if (write1user == 'false' || upc_id == '200115094302905888') {
                    var chkdisable = 'disabled';

                    if (upc_id == $.cookie("upc_id") && upc_id != '200115094302905888') {
                        $('#usernameedit2').css('display', 'block')
                        $('#passwordedit2').css('display', 'block')
                        $('#btnedit').css('display', 'inline-block')
                    }
                    else {
                        $('#usernameedit2').css('display', 'none')
                        $('#passwordedit2').css('display', 'none')
                        $('#btnedit').css('display', 'none')
                    }
                }
                else {
                    var chkdisable = '';
                    $('#usernameedit2').css('display', 'block')
                    $('#passwordedit2').css('display', 'block')
                    $('#btnedit').css('display', 'inline-block')
                }
                row = $(
                '<div style="float:left;width:40%;margin:0px 0px 10px 0px;">' + res.data[i].msp_menu_display + '</div>' +
                '<div style="float:left;width:20%;margin:0px 0px 10px 0px;">' +
                    '<div class="onoffswitch">' +
                        '<input ' + chkdisable + ' onchange=\'checkread2("2read' + res.data[i].upcr_msp_id + '","2write' + res.data[i].upcr_msp_id + '","2delete' + res.data[i].upcr_msp_id + '");\' id="2read' + res.data[i].upcr_msp_id + '" class="onoffswitch-checkbox" type="checkbox">' +
                        '<label class="onoffswitch-label" for="2read' + res.data[i].upcr_msp_id + '">' +
                            '<span class="onoffswitch-inner"></span>' +
                            '<span class="onoffswitch-switch"></span>' +
                        '</label>' +
                    '</div>' +
                '</div>' +
                '<div style="float:left;width:20%;margin:0px 0px 10px 0px;">' +
                    '<div class="onoffswitch">' +
                        '<input ' + chkdisable + ' onchange=\'checkread("2read' + res.data[i].upcr_msp_id + '","2write' + res.data[i].upcr_msp_id + '");\' id="2write' + res.data[i].upcr_msp_id + '" class="onoffswitch-checkbox" type="checkbox">' +
                        '<label class="onoffswitch-label" for="2write' + res.data[i].upcr_msp_id + '">' +
                            '<span class="onoffswitch-inner"></span>' +
                            '<span class="onoffswitch-switch"></span>' +
                        '</label>' +
                    '</div>' +
                '</div>' +
                '<div style="float:left;width:20%;margin:0px 0px 10px 0px;">' +
                    '<div class="onoffswitch">' +
                        '<input ' + chkdisable + ' onchange=\'checkread("2read' + res.data[i].upcr_msp_id + '","2delete' + res.data[i].upcr_msp_id + '");\' id="2delete' + res.data[i].upcr_msp_id + '" class="onoffswitch-checkbox" type="checkbox">' +
                        '<label class="onoffswitch-label" for="2delete' + res.data[i].upcr_msp_id + '">' +
                            '<span class="onoffswitch-inner"></span>' +
                            '<span class="onoffswitch-switch"></span>' +
                        '</label>' +
                    '</div>' +
                '</div>'
                 );
                $("#conditionuseredit").append(row);
                if (res.data[i].upcr_is_read == '1') {
                    $('#2read' + res.data[i].upcr_msp_id).prop("checked", true);
                }
                if (res.data[i].upcr_is_write == '1') {
                    $('#2write' + res.data[i].upcr_msp_id).prop("checked", true);
                }

                if (res.data[i].upcr_is_delete == '1') {
                    $('#2delete' + res.data[i].upcr_msp_id).prop("checked", true);
                }
            }
        }
    });

    var btnedit = '<button onclick=\'saveedituser("' + upc_id + '");\' type="button" class="btn btn-primary">บันทึก</button>'
    $('#btnedit').html(btnedit);

    $("#dvSpinner").css('display', 'none');
}

function saveedituser(upc_id) {
    var readupload = ($('#2read200115092753031042').is(":checked")) ? '1' : '0';
    var writeupload = ($("#2write200115092753031042").is(":checked")) ? '1' : '0';
    var delupload = ($("#2delete200115092753031042").is(":checked")) ? '1' : '0';
    if (readupload == '1' || writeupload == '1' || delupload == '1') {
        var uploadactive = '1';
    }
    else {
        var uploadactive = '0';
    }

    var readconfirm = ($('#2read200115093047917266').is(":checked")) ? '1' : '0';
    var writeconfirm = ($("#2write200115093047917266").is(":checked")) ? '1' : '0';
    var delconfirm = ($("#2delete200115093047917266").is(":checked")) ? '1' : '0';
    if (readconfirm == '1' || writeconfirm == '1' || delconfirm == '1') {
        var confirmactive = '1';
    }
    else {
        var confirmactive = '0';
    }

    var readconfig = ($('#2read200115093251186371').is(":checked")) ? '1' : '0';
    var writeconfig = ($("#2write200115093251186371").is(":checked")) ? '1' : '0';
    var delconfig = ($("#2delete200115093251186371").is(":checked")) ? '1' : '0';
    if (readconfig == '1' || writeconfig == '1' || delconfig == '1') {
        var configactive = '1';
    }
    else {
        var configactive = '0';
    }

    var readuser = ($('#2read200115093447087900').is(":checked")) ? '1' : '0';
    var writeuser = ($("#2write200115093447087900").is(":checked")) ? '1' : '0';
    var deluser = ($("#2delete200115093447087900").is(":checked")) ? '1' : '0';
    if (readuser == '1' || writeuser == '1' || deluser == '1') {
        var useractive = '1';
    }
    else {
        var useractive = '0';
    }

    var usernameedit = $("#usernameedit").val();
    var passwordedit = $("#passwordedit").val();
    if (usernameedit != '') {
        var data = { username: usernameedit, id: upc_id};
        APIPost("/partner-commission/checkuser2", data, false, function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                if (res.data.length > 0) {
                    swal('มี username นี้แล้วในระบบ', "", "warning")
                }
                else {
                    swal({
                        title: "ยืนยันการแก้ไขข้อมูล",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: '#18a689',
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "ยืนยัน",
                        cancelButtonText: "ยกเลิก",
                        closeOnConfirm: false
                    },
                    function () {
                        if (1 == 1) {
                            var data = { idlogin: $.cookie("upc_id"), write1user: write1user, usernameedit: usernameedit, passwordedit: passwordedit, id: upc_id, uploadactive: uploadactive, confirmactive: confirmactive, configactive: configactive, useractive: useractive, user: $.cookie("username"), ip: ip
                        , readupload: readupload, writeupload: writeupload, delupload: delupload
                        , readconfirm: readconfirm, writeconfirm: writeconfirm, delconfirm: delconfirm
                        , readconfig: readconfig, writeconfig: writeconfig, delconfig: delconfig
                        , readuser: readuser, writeuser: writeuser, deluser: deluser
                            };
                            APIPost("/partner-commission/edituser", data, false, function (err, res) {
                                if (err) {
                                    console.log(err);
                                }
                                else {

                                }
                            });
                            }
                            swal({ title: "บันทึกข้อมูลเรียบร้อย", text: "", type: "success" },
		                    function () {
		                        $("#closeedit").trigger("click");
		                    }
	                    );
                    });
                }
            }
        });
    }

    
}

function deluser(upc_id) {
    swal({
	title: "ยืนยันการลบข้อมูล",
	type: "warning",
	showCancelButton: true,
	confirmButtonColor: '#18a689',
	confirmButtonClass: "btn-danger",
	confirmButtonText: "ยืนยัน",
	cancelButtonText: "ยกเลิก",
	closeOnConfirm: false
    },
    function () {
        if (1 == 1) {
            var data = { id: upc_id, user: $.cookie("upc_id"), ip: ip };
            APIPost("/partner-commission/deluser", data, false, function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {

                }
            });
        }
        swal({ title: "ลบข้อมูลเรียบร้อย", text: "", type: "success" },
            function () {
                location.reload(true);
            }
        );
    });
}

function checkread(read_id,write_id) {
    var readid = ($('#' + read_id).is(":checked")) ? '1' : '0';
    if (readid == '0') {
        swal("ต้องให้สิทธิ์ read ก่อน", "", "warning")
        $('#' + write_id).prop("checked", false);
    }
}

function checkread2(read_id, write_id,delete_id) {
    var readid = ($('#' + read_id).is(":checked")) ? '1' : '0';
    if (readid == '0') {
        $('#' + write_id).prop("checked", false);
        $('#' + delete_id).prop("checked", false);
    }
}


function getPagination(table) {
    var lastPage = 1;
    $('#maxRows').on('change', function (evt) {
        lastPage = 1;
        $('.pagination').find("li").slice(1, -1).remove();
        var trnum = 0; 								// reset tr counter 
        var maxRows = parseInt($(this).val()); 		// รับค่าจาก select option

        if (maxRows == 100) {
            $('.pagination').hide();
        } else {

            $('.pagination').show();
        }

        var totalRows = $(table + ' tbody tr').length; 	// จำนวน rows ทั้งหมด
        $(table + ' tr:gt(0)').each(function () {			// each TR in  table and not the header
            trnum++; 								// Start Counter 
            if (trnum > maxRows) {						// if tr number gt maxRows
                $(this).hide(); 						// fade it out 
            } 
            if (trnum <= maxRows) {
                $(this).show(); 
            } // else fade in Important in case if it ..
        }); 										//  was fade out to fade it in 
        if (totalRows > maxRows) {						// if tr total rows gt max rows option
            var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..  
            //	numbers of pages 
            for (var i = 1; i <= pagenum; ) {			// for each page append pagination li 
                $('.pagination #prev').before('<li data-page="' + i + '">\
						<span>' + i++ + '<span class="sr-only">(current)</span></span>\
					</li>').show();
            } 										// end for i 
        } 												// end if row count > max rows
        $('.pagination [data-page="1"]').addClass('active'); // add active class to the first li 
        $('.pagination li').on('click', function (evt) {		// on click each page
            evt.stopImmediatePropagation();
            evt.preventDefault();
            var pageNum = $(this).attr('data-page'); // get it's number

            var maxRows = parseInt($('#maxRows').val()); 		// get Max Rows from select option

            if (pageNum == "prev") {
                if (lastPage == 1) { return; }
                pageNum = --lastPage;
            }
            if (pageNum == "next") {
                if (lastPage == ($('.pagination li').length - 2)) { return; }
                pageNum = ++lastPage;
            }

            lastPage = pageNum;
            var trIndex = 0; 						// reset tr counter
            $('.pagination li').removeClass('active'); // remove active class from all li 
            $('.pagination [data-page="' + lastPage + '"]').addClass('active'); // add active class to the clicked 
            // $(this).addClass('active');					// add active class to the clicked 
            $(table + ' tr:gt(0)').each(function () {		// each tr in table not the header
                trIndex++; 							// tr index counter 
                // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
                if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                    $(this).hide();
                } else { $(this).show(); } 				//else fade in 
            }); 										// end of for each tr in table
        }); 									// end of on click pagination list

    }).change();
}

function testrest() {
    var data = {
  "status": "PRE",
  "agentCode": "99999",
  "transactionID": "61608000371",
  "saleName": "ชลธิชา สว่างวงศ์",
  "quotationCode": null,
  "appSignDate": "20200221",
  "effectiveDate": "20200221",
  "expiredDate": "20210221",
  "insuredcardType": "C",
  "insuredcardNo": "1234567890123",
  "insuredType": "P",
  "insuredTitleName": 1,
  "insuredName": "สมพร",
  "insuredLastName": "สุนทรสกุล",
  "insuredCompanyName": "null",
  "insuredHeadOffice": "N",
  "insuredBranchCode": null,
  "insuredGender": "M",
  "insuredBirthDate": "19851225",
  "insuredOccupationCode": "99",
  "insuredOccupation": null,
  "insuredTelephone": null,
  "insuredMobileNo": "0123456789",
  "insuredHomeNo": "99/999",
  "insuredBuilding": "ออลซีซั่นเพลส",
  "insuredMoo": "1",
  "insuredTrok": "ข้าวสาร",
  "insuredSoi": "ลาดพร้าว 51",
  "insuredRoad": "สุขุมวิท",
  "insuredTambol": "ลุมพินี",
  "insuredAmphur": "ปทุมวัน",
  "insuredProvince": "10",
  "insuredPostcode": "11000",
  "carType": "1",
  "vehicleType": "110",
  "carBrand": "TOYOTA",
  "carModel": "YARIS",
  "carSubModel": null,
  "vehicleRegYear": "2017",
  "cc": 1500,
  "seat": 0,
  "weight": 0,
  "carcolorCode": "99",
  "bodyType": "A01",
  "flagExtraAccessories": "N",
  "packageCode": "BWA",
  "packageName": "โครงการประเภท 5 (2+) ทุน 100,000 บาท",
  "subPackageCode": null,
  "subPackageName": null,
  "sumInsured": 100000,
  "productClass": "5",
  "repairType": "N",
  "licensePlateType": "B",
  "licensePlateNo": "1กม 8583",
  "licenseProvince": "10",
  "chassisNo": "MTH09PU5M7107285",
  "engineNo": null,
  "flagDriver": "N",
  "driver1TitleName": 0,
  "driver1Fname": null,
  "driver1Lname": null,
  "driver1Gender": null,
  "driver1BirthDate": null,
  "driver1LicenseNo": null,
  "driver1OccupationCode": null,
  "driver1Occupation": null,
  "driver2TitleName": 0,
  "driver2Fname": null,
  "driver2Lname": null,
  "driver2BirthDate": null,
  "driver2LicenseNo": null,
  "driver2OccupationCode": null,
  "driver2Occupation": null,
  "netPremium": 6981.35,
  "vat": 490.65,
  "stamp": 28,
  "grossPremium": 7500,
  "benefName": null,
  "receiptFlag": "N",
  "receiptCardType": null,
  "receiptCardNo": null,
  "receiptInsurerType": null,
  "receiptTitleName": 0,
  "receiptFname": null,
  "receiptLname": null,
  "receiptHeadOffice": null,
  "receiptBranchCode": null,
  "receiptHomeno": null,
  "receiptMoo": null,
  "receiptBuilding": null,
  "receiptTrok": null,
  "receiptSoi": null,
  "receiptRoad": null,
  "receiptTumbol": null,
  "receiptAmphur": null,
  "receiptProvince": null,
  "receiptPostcode": null,
  "flagOnline": "1",
  "emailCustomer": "test1@gmail.com",
  "emailAgent": "test2@gmail.com",
  "onlinePaymentNo": null,
  "onlinePaymentAmout": 0.0,
  "onlinemerchantID": null
 };
 var link = "https://wsdev.viriyah.co.th/ViriyahWSPolicy/SendEPolicyVMIRealTime"
    $.ajax({
        url: link,
        type: "POST",
        method: "POST",
        async: true,
        crossDomain: true,
        processData: true,
        dataType: "JSON",
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        headers: {
            "Protocal": "REST",
            "Content-Type": "application/json",
            "Authorization": "Basic dGVzdDp0ZXN0",
            'Access-Control-Allow-Origin': '*',
            "Cache-Control": "no-cache",
            "Encoding": "UTF-8",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Accept",
            "Access-Control-Max-Age": "1728000",
            "X-Requested-By": "user"
        },
        success: function (res, status, xhr) {
            console.log(xhr.getResponseHeader);
            console.log(xhr);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
        }
    });
}

function testrest2() {
    
}
