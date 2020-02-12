<%@ Page Title="" Language="C#" MasterPageFile="~/MasterForm.master" AutoEventWireup="true" CodeFile="configUserManagement.aspx.cs" Inherits="configUserManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="headContent" Runat="Server">
    <style type="text/css">
        #divMain
        {
            padding:  0pt;
             background-color:#F4F8FF !important;
        }
        .headerSearch
        {
            height: 50px !important;
            clear: left;
            background-color: #FFFFFF;
            border-bottom: 2px solid #999999;
            color: #222222;
            font-weight: bold;
            vertical-align: middle;
            padding-left: 5px;
            margin-top: 5px;
            padding-top: 5px;
            position: static;
        }
        .bodyPage
        {
            margin-top: 10px;
        }
        
        .modal-backdrop {
            z-index: 1 !important;
        }
        
        .sweet-alert button.cancel {
            background-color: #ed5565;
        }
        
        .sweet-alert button.cancel:hover {
            background-color: #ed5565;
        }
        
        .radio {
          margin: 6px 0;
          display: inline-block;
          cursor: pointer;
        }
        .radio input {
          display: none;
        }
        .radio input + span {
          line-height: 22px;
          height: 22px;
          padding-left: 22px;
          display: block;
          position: relative;
        }
        .radio input + span:not(:empty) {
          padding-left: 30px;
        }
        .radio input + span:before, .radio input + span:after {
          content: '';
          width: 22px;
          height: 22px;
          display: block;
          border-radius: 50%;
          left: 0;
          top: 0;
          position: absolute;
        }
        .radio input + span:before {
          background: #D1D7E3;
          transition: background 0.2s ease, -webkit-transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2);
          transition: background 0.2s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2);
          transition: background 0.2s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2), -webkit-transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2);
        }
        .radio input + span:after {
          background: #fff;
          -webkit-transform: scale(0.78);
                  transform: scale(0.78);
          transition: -webkit-transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.4);
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.4);
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.4), -webkit-transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.4);
        }
        .radio input:checked + span:before {
          -webkit-transform: scale(1.04);
                  transform: scale(1.04);
          background: #169F85;
        }
        .radio input:checked + span:after {
          -webkit-transform: scale(0.4);
                  transform: scale(0.4);
          transition: -webkit-transform .3s ease;
          transition: transform .3s ease;
          transition: transform .3s ease, -webkit-transform .3s ease;
        }
        .radio:hover input + span:before {
          -webkit-transform: scale(0.92);
                  transform: scale(0.92);
        }
        .radio:hover input + span:after {
          -webkit-transform: scale(0.74);
                  transform: scale(0.74);
        }
        .radio:hover input:checked + span:after {
          -webkit-transform: scale(0.4);
                  transform: scale(0.4);
        }
        
        .fixed_headers {
            width: 900px;
            table-layout: fixed;
            border-collapse: collapse;
        }
        .fixed_headers th,
        .fixed_headers td {
            padding: 5px;
            text-align: left;
        }
        .fixed_headers td:nth-child(1),
        .fixed_headers th:nth-child(1) {
            min-width: 100px;
        }
        .fixed_headers td:nth-child(2),
        .fixed_headers th:nth-child(2) {
            min-width: 100px;
        }
        .fixed_headers td:nth-child(3),
        .fixed_headers th:nth-child(3) {
            width: 500px;
        }
        .fixed_headers td:nth-child(4),
        .fixed_headers th:nth-child(4) {
            width: 100px;
        }

        .fixed_headers th:nth-child(5) {
            width: 80px;
        }
        .fixed_headers td:nth-child(5) {
            width: 80px;
        }
        .fixed_headers thead tr {
            display: block;
            position: relative;
        }
        .fixed_headers tbody {
            display: block;
            overflow: auto;
            width: 100%;
            height: 375px;
        }
        
        
        .table-bordered {
            border: 1px solid #f8f0f01a;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="bodyPageContent" Runat="Server">
    <div id="divMain">
        <div class="col-md-12" style="position:fixed; z-index:9; background-color:#F4F8FF;">
            <div class="headerSearch ">
                <div class="pull-left">
                    <div class="input-group" style="margin-right: 5px;">
                        <label id="user-title" class="input-group"><h2 style="margin: 10px 0px 20px 0px;">User Management</h2></label>
                        <input id="hidden_ipaddress" class="hidden" style="width:100px;" type="text" value="<%=Request.ServerVariables["REMOTE_ADDR"]%>" readonly="readonly"/>
                    </div>
                </div>
            </div>
            <div class="bodyPage">
                <div class="item form-group" style="margin: 30px 0px 0px 0px;">
                    <label style="margin:6px 20px 0px 5px;font-weight: bold;">ประเภทผู้ใช้ : </label>
                        <label class="radio">
                            <input type="radio" value="all" id="selectall" name="selectuser" checked>
                            <span style="margin:0px 20px 0px 5px">ทั้งหมด</span>
                        </label>
                        <label class="radio">
                            <input type="radio" value="Employee" id="selectemployee" name="selectuser">
                            <span style="margin:0px 20px 0px 5px">พนักงาน</span>
                        </label>
                        <label class="radio">
                            <input type="radio" value="Supplier" id="selectsupplier" name="selectuser">
                            <span style="margin:0px 20px 0px 5px">Supplier</span>
                        </label>

                        <button id="Button1" onclick="searchuser()" type="button" style="width: 100px; margin-right: 10px;" class="btn btn-primary">ค้นหา</button>
                </div>
                
                
                    
                <div style="width:900px;margin:0px 0px 50px 0px">
                    <div class="divTarget pull-left" id="allTargetDone" style="margin:20px 0px 5px 0px">
                        <button onclick="adduser()" type="button" class="btn btn-primary" data-toggle="modal" data-target="#Modaladduser">เพิ่ม</button>
                    </div>
                    <div class="pull-right" style="margin: 20px 18px 5px 0px;">
                        <span style="padding: 10px 0px 20px 0px;display: inline-block;"> แสดง </span>&nbsp;&nbsp;&nbsp;
			 		    <select class="form-control pull-right" style="width:70%;display:inline-block;" name="state" id="maxRows">
                                <option value="10" selected>10</option>
						        <option value="20">20</option>
						        <option value="30">30</option>
                                <option value="100">ทั้งหมด</option>
					    </select>	
                    </div><br />
                    <table id="tbuser" class="table table-bordered fixed_headers">
                        <thead>
                            <tr>
                                <th style="background-color: #2f4050;color: white;text-align: center;">ลำดับ</th>
                                <th style="background-color: #2f4050;color: white;">รหัสพนักงาน</th>
                                <th style="background-color: #2f4050;color: white;">ชื่อพนักงาน</th>
                                <th style="background-color: #2f4050;color: white;text-align: center;">แก้ไข</th>
                                <th style="background-color: #2f4050;color: white;text-align: center;">ลบ</th>
                            </tr>
                        </thead>
                        <tbody >
                        </tbody>
                    </table>
                    <div class='pagination-container pull-right' style="width:65%;display:inline-block;">
	                    <nav>
		                    <ul class="pagination pull-right" style="margin: 0px 0px;padding: 20px 0px 20px 0px;"> 
                                <li data-page="prev" >
				                    <span> < <span class="sr-only">...</span></span>
			                    </li>
			                    <li data-page="next" id="prev">
				                    <span> > <span class="sr-only">...</span></span>
			                    </li>
		                    </ul>
	                    </nav>
                   </div>
                </div>

                <!-- Modal -->
                <div id="Modaladduser" class="modal fade" role="dialog" style="z-index: 999 !important;">
                    <div class="modal-dialog" style="width: 800px;">
                    <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">เพิ่มผู้ใช้งาน</h4>
                            </div>
                            <div class="modal-body">
                                    <div class="col-md-12 col-sm-12">
                                            <label style="margin:6px 20px 0px 5px;font-weight: bold;">ประเภทผู้ใช้ : </label>
                                            <label class="radio">
                                                <input checked id="selecttypeemployee" onclick="selectuserforadd()" type="radio" name="selecttypeuser" value="Employee">
                                                <span style="margin:0px 20px 0px 5px">พนักงาน</span>
                                            </label>
                                            <label class="radio">
                                                <input id="selecttypesupplier" onclick="selectuserforadd()" type="radio" name="selecttypeuser" value="Supplier">
                                                <span style="margin:0px 20px 0px 5px">Supplier</span>
                                            </label>
                                    </div>
                                    <div class="col-md-12 col-sm-12" style="margin:20px 0px 0px 0px;">
                                        <div  id="inputsupplier2" style="display:none;">
                                            <div id="supplier" style="float:left;width:15%;margin:0px 0px 10px 0px;">Supplier :</div>
                                            <div id="supplierinput" style="float:left;width:85%;margin:0px 0px 10px 0px;">
                                                 <input id="inputsupplier" type="text" placeholder="" style="width:40%;">
                                            </div></br>
                                        </div>
                                        <div id="inputdepartment2">
                                        <div style="float:left;width:15%;margin:0px 0px 10px 0px;">แผนก :</div>
                                            <div onchange="getemployee()" id="departmentselect1" style="float:left;width:85%;margin:0px 0px 10px 0px;">
                                                <select id="departmentselect" style="width: 40%;height:25px;">
                                                    <option value="ระบุแผนก">ระบุแผนก</option>
                                                </select>
                                            </div></br>
                                        </div>
                                        <div  id="inputemployee2">
                                            <div id="employee" style="float:left;width:15%;margin:0px 0px 10px 0px;">พนักงาน :</div>
                                            <div id="employeeselect" style="float:left;width:85%;margin:0px 0px 10px 0px;">
                                                    <select id="selectemp" style="width: 40%;height:25px;"></select>
                                            </div></br>
                                        </div>
                                        <div style="float:left;width:15%;margin:0px 0px 10px 0px;">username :</div>
                                        <div style="float:left;width:85%;margin:0px 0px 10px 0px;">
                                                <input id="username" type="text" value="" placeholder="" style="width:40%;">
                                        </div></br>
                                        <div style="float:left;width:15%;margin:0px 0px 10px 0px;">password :</div>
                                        <div style="float:left;width:85%;margin:0px 0px 10px 0px;">
                                                <input id="password" type="text" value="" placeholder="" style="width:40%;">
                                        </div></br>
                                        <div style="float:left;width:15%;margin:0px 0px 10px 0px;">หน้างาน :</div>
                                        <div style="float:left;width:85%;margin:0px 0px 10px 0px;">
                                                <select disabled id="systemntl" style="width: 40%;height:25px;">
                                                <option> NTL</option>
                                            </select>
                                        </div></br>
                                    </div>

                                    <div class="col-md-12 col-sm-12">
                                        <label style="margin:30px 20px 10px 0px;font-weight: bold;">กำหนดสิทธิ์การใช้งาน</label>
                                    </div>
                                    <div class="col-md-12 col-sm-12">
                                        <div style="float:left;width:40%;margin:0px 0px 10px 0px;">ระบบ</div>
                                        <div style="float:left;width:20%;margin:0px 0px 10px 0px;">read</div>
                                        <div style="float:left;width:20%;margin:0px 0px 10px 0px;">write</div>
                                        <div style="float:left;width:20%;margin:0px 0px 10px 0px;">delete</div>
                                    </div>
                                    <div id="conditionuser" class="col-md-12 col-sm-12"></div>         
                            </div>
                            <div class="modal-footer" style="margin:420px 0px 0px 0px;">
                                <button onclick="savenewuser()" type="button" class="btn btn-primary">บันทึก</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">ยกเลิก</button>
                            </div>
                        </div>
                        <!-- end body-->       
                    </div>
                </div>
                <!-- end modal-->

                <!-- Modal edit user-->
                <div id="Modaledituser" class="modal fade" role="dialog" style="z-index: 999 !important;">
                    <div class="modal-dialog" style="width: 800px;">
                    <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">แก้ไขสิทธิ์การใช้งาน</h4>
                            </div>
                            <div class="modal-body">
                                    <div class="col-md-12 col-sm-12">
                                            <label style="margin:6px 20px 0px 5px;font-weight: bold;">ประเภทผู้ใช้ : </label>
                                            <label class="radioo">
                                                <input disabled id="type1" onclick="selectuserforadd()" type="radio" name="selecttypeuser" value="employee">
                                                <span style="margin:0px 20px 0px 5px">พนักงาน</span>
                                            </label>
                                            <label class="radioo">
                                                <input disabled id="type2" onclick="selectuserforadd()" type="radio" name="selecttypeuser" value="supplier">
                                                <span style="margin:0px 20px 0px 5px">Supplier</span>
                                            </label>
                                    </div>
                                    <div class="col-md-12 col-sm-12" style="margin:20px 0px 0px 0px;">
                                        <div id="editsupplier2">
                                            <div id="Div2" style="float:left;width:15%;margin:0px 0px 10px 0px;">Supplier :</div>
                                            <div id="Div3" style="float:left;width:85%;margin:0px 0px 10px 0px;">
                                                 <input id="editsupplier" type="text" placeholder="" style="width:40%;" disabled>
                                            </div></br>
                                        </div>
                                        <div id="editemployee2">
                                            <div id="Div6" style="float:left;width:15%;margin:0px 0px 10px 0px;">พนักงาน :</div>
                                            <div id="Div7" style="float:left;width:85%;margin:0px 0px 10px 0px;">
                                                 <input id="editemployee" type="text" placeholder="" style="width:40%;" disabled>
                                            </div></br>
                                        </div>
                                        <div id="usernameedit2" style="display:block;">
                                            <div style="float:left;width:15%;margin:0px 0px 10px 0px;">username :</div>
                                            <div style="float:left;width:85%;margin:0px 0px 10px 0px;">
                                                    <input id="usernameedit" type="text" value="" placeholder="" style="width:40%;">
                                            </div></br>
                                        </div>
                                        <div id="passwordedit2" style="display:block;">
                                            <div style="float:left;width:15%;margin:0px 0px 10px 0px;">password :</div>
                                            <div style="float:left;width:85%;margin:0px 0px 10px 0px;">
                                                    <input id="passwordedit" type="text" value="" placeholder="" style="width:40%;">
                                            </div></br>
                                        </div>
                                        
                                        <div style="float:left;width:15%;margin:0px 0px 10px 0px;">หน้างาน :</div>
                                        <div style="float:left;width:85%;margin:0px 0px 10px 0px;">
                                                <select disabled id="Select3" style="width: 40%;height:25px;">
                                                <option> NTL</option>
                                            </select>
                                        </div></br>
                                    </div>

                                    <div class="col-md-12 col-sm-12">
                                        <label style="margin:30px 20px 10px 0px;font-weight: bold;">กำหนดสิทธิ์การใช้งาน</label>
                                    </div>
                                    <div class="col-md-12 col-sm-12">
                                        <div style="float:left;width:40%;margin:0px 0px 10px 0px;">ระบบ</div>
                                        <div style="float:left;width:20%;margin:0px 0px 10px 0px;">read</div>
                                        <div style="float:left;width:20%;margin:0px 0px 10px 0px;">write</div>
                                        <div style="float:left;width:20%;margin:0px 0px 10px 0px;">delete</div>
                                    </div>
                                    <div id="conditionuseredit" class="col-md-12 col-sm-12"></div>         
                            </div>
                            <div class="modal-footer" style="margin:400px 0px 0px 0px;">
                                <span id="btnedit" style="display:inline-block;">
                                
                                </span>
                                <%--<button onclick="saveedituser()" type="button" class="btn btn-primary">บันทึก</button>--%>
                                <button type="button" id="closeedit" class="btn btn-danger" data-dismiss="modal">ยกเลิก</button>
                            </div>
                        </div>
                        <!-- end body-->       
                    </div>
                </div>
                <!-- end modal-->
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scriptContent" Runat="Server">
    <script src="js/app/usermanagement.js?ver=<%=DateTime.Now.ToString("ddMMhhmm")%>" type="text/javascript"></script>
    <script type="text/javascript">
        if ($.cookie("upc_id") == null || $.cookie("upc_id") == "null" || $.cookie("upc_id") == "" || $.cookie("upc_id") == undefined) {
            window.location.href = "Login.aspx";
        }
        </script>
</asp:Content>

