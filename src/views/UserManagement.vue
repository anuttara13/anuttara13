<template>
  <v-container>
    <v-row class="text-left">
        <v-col cols="12">
            <div class="headerSearch ">
                <div class="pull-left">
                    <div class="input-group" style="margin-right: 5px;">
                        <label id="user-title" class="input-group"><h2 style="margin: 10px 0px 20px 0px;">User Management</h2></label>
                    </div>
                </div>
            </div>
        </v-col>
        <v-col cols="12">
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
                        <v-btn color="primary" dark v-on:click="searchuser">ค้นหา</v-btn>
                </div>
            </div>
        </v-col>
        <v-col cols="8">
            <v-row justify="left">
                <v-dialog v-model="dialog" persistent max-width="800px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">เพิ่ม</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline" id="titledialog">เพิ่มผู้ใช้งาน</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <div class="col-md-12 col-sm-12">
                                            <label style="margin:6px 20px 0px 5px;font-weight: bold;">ประเภทผู้ใช้ : </label>
                                            <label class="radio">
                                                <input checked disabled v-on:click="selectuserforadd(1)" type="radio" name="selecttypeuser" value="Employee">
                                                <span style="margin:0px 20px 0px 5px">พนักงาน</span>
                                            </label>
                                            <label class="radio">
                                                <input disabled v-on:click="selectuserforadd(2)" type="radio" name="selecttypeuser" value="Supplier">
                                                <span style="margin:0px 20px 0px 5px">Supplier</span>
                                            </label>
                                    </div>
                                    <v-col cols="12" sm="6" id="dp">
                                        <v-select id="sldp"
                                        :items="['Mkt', 'IT', 'Agent', 'Account']"
                                        label="แผนก*"
                                        required
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" id="dp2" style="display:none">
                                        <v-select id="sldp" disabled
                                        :items="['IT']"
                                        label="IT"
                                        required
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" id="name">
                                        <v-select id="sluser"
                                        :items="['อนุตรา หาญณรงค์', 'ทินกร ลือจินดา', 'อรภิสา นานา', 'สุกัญญา คิดดี']"
                                        label="พนักงาน*"
                                        required
                                        ></v-select>
                                    </v-col> 
                                    <v-col cols="12" sm="6" id="name2" style="display:none">
                                        <v-select id="sluser" disabled
                                        :items="['อนุตรา หาญณรงค์', 'ทินกร ลือจินดา', 'อรภิสา นานา', 'สุกัญญา คิดดี']"
                                        label="อนุตรา หาญณรงค์"
                                        required
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12" id="spname" style="display:none;">
                                        <v-text-field id="supliername"
                                            label="Suplier Name*"
                                            outlined
                                            dense
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" id="username">
                                        <v-text-field 
                                            label="username*"
                                            outlined
                                            dense
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" id="username2" style="display:none">
                                        <v-text-field v-model="anuttara" 
                                            label="anuttara"
                                            outlined
                                            dense
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" id="password">
                                        <v-text-field 
                                            label="password*"
                                            outlined
                                            dense
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" id="password2" style="display:none">
                                        <v-text-field v-model="anuttara" 
                                            label="1234"
                                            outlined
                                            dense
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <span class="headline">กำหนดสิทธิ์การใช้งาน</span>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <span>Upload Excel Dup</span>
                                    </v-col>  
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch1" inset ></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch2" inset ></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch3" inset ></v-switch>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <span>Confirm Commission</span>
                                    </v-col>  
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch11" inset ></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch22" inset ></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch33" inset ></v-switch>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <span>Config Commission</span>
                                    </v-col>  
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch111" inset ></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch222" inset ></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch333" inset ></v-switch>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <span>User Management</span>
                                    </v-col>  
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch1111" inset ></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch2222" inset ></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-switch v-model="switch3333" inset ></v-switch>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" dark @click="dialog = false">บันทึก</v-btn>
                            <v-btn color="error" @click="dialog = false">ยกเลิก</v-btn><br><br><br>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-col>
        
        <v-col class="d-flex" cols="12" sm="2">
            <v-select id="maxRows"
            :items="slpage"
            label="แสดง"
            dense
            outlined
            ></v-select>
        </v-col>
        <v-col cols="10">
            <template>
                <v-simple-table fixed-header height="300px" id="tbuser">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left" style="background-color: #b3d4fc;">ลำดับ</th>
                                <th class="text-left" style="background-color: #b3d4fc;">รหัสพนักงาน</th>
                                <th class="text-left" style="background-color: #b3d4fc;">ชื่อพนักงาน</th>
                                <th class="text-left" style="background-color: #b3d4fc;">แก้ไข</th>
                                <th class="text-left" style="background-color: #b3d4fc;">ลบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in desserts" :key="item.name">
                                <td>{{ item.id }}</td>
                                <td>{{ item.calories }}</td>
                                <td>{{ item.name }}</td>
                                <td>
                                    <v-btn color="primary" text @click.stop="dialog = true" @click="edituser(id)">
                                        <v-icon color="primary">mdi-pencil</v-icon>
                                    </v-btn>
                                </td>
                                <td>
                                    <v-btn  @click="deluser(id)"
                                    slot="activator"
                                    class="v-btn--simple"
                                    color="danger"
                                    icon
                                    >
                                    <v-icon color="error">mdi-close</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
        <v-col cols="4"></v-col>
        <v-col cols="8">
            <div class="text-right">
                <v-pagination
                v-model="page"
                :length="4"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                ></v-pagination>
            </div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
        slpage: ['10', '20', '30', 'ทั้งหมด'],
        dialog: false,
        searchuser: () => {
            alert('ค้นหา')
        }, 
        selectuserforadd: (index) => {
            
            if (index == '1') {
                document.getElementById("dp").style.display = "block";
                document.getElementById("name").style.display = "block";
                document.getElementById("spname").style.display = "none";
            }
            else {
                document.getElementById("dp").style.display = "none";
                document.getElementById("name").style.display = "none";
                document.getElementById("spname").style.display = "block";
            }
            
        },
        adduser: () => {
            document.getElementById("titledialog").innerHTML = "เพิ่มผู้ใช้งาน";
            document.getElementById("dp").style.display = "none";
            document.getElementById("name2").style.display = "none";
            document.getElementById("username2").style.display = "none";
            document.getElementById("password2").style.display = "none";
        },
        edituser: () => {
            document.getElementById("titledialog").innerHTML = "แก้ไขผู้ใช้งาน";
            document.getElementById("dp2").style.display = "block";
            document.getElementById("name2").style.display = "block";
            document.getElementById("username2").style.display = "block";
            document.getElementById("password2").style.display = "block";
            document.getElementById("dp").style.display = "none";
            document.getElementById("name").style.display = "none";
            document.getElementById("username").style.display = "none";
            document.getElementById("password").style.display = "none";
        },
        deluser: () => {
            alert('Delete User');
        },
        methods: {
            complete (index) {
                this.list[index] = !this.list[index]
            },
        },
        desserts: [
          {
            id: '1',
            calories: 159,
            name: 'Frozen Yogurt'
          },
          {
            id: '2',
            calories: 237,
            name: 'Ice cream sandwich'
          },
          {
            id: '3',
            calories: 262,
            name: 'Eclair'
          },
          {
            id: '4',
            calories: 305,
            name: 'Cupcake'
          },
          {
            id: '5',
            calories: 356,
            name: 'Gingerbread'
          },
          {
            id: '6',
            calories: 375,
            name: 'Jelly bean'
          },
          {
            id: '7',
            calories: 392,
            name: 'Lollipop'
          },
          {
            id: '8',
            calories: 408,
            name: 'Honeycomb'
          },
          {
            id: '9',
            calories: 452,
            name: 'Donut'
          },
          {
            id: '10',
            calories: 518,
            name: 'KitKat'
          },
        ],
      }
    },
  }
</script>
<style>
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
          background-color: #1976d2 !important;
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
