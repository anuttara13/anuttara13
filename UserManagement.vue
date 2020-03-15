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

        <v-col cols="12">
            <template>
                <v-data-table id="tbuser" fixed-header height="300px"
                    :headers="headers"
                    :items="user"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    class="elevation-1"
                    @page-count="pageCount = $event"
                >
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                            <v-divider style="border-color: rgba(0, 0, 0, 0);"
                            vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="800px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" dark class="mb-2" v-on="on">เพิ่มผู้ใช้งาน</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">เพิ่มผู้ใช้งาน</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <div class="col-md-12 col-sm-12">
                                                    <label style="margin:6px 20px 0px 5px;font-weight: bold;">ประเภทผู้ใช้ : </label>
                                                    <label class="radio">
                                                        <input checked v-on:click="selectuserforadd(1)" type="radio" name="selecttypeuser" value="Employee">
                                                        <span style="margin:0px 20px 0px 5px">พนักงาน</span>
                                                    </label>
                                                    <label class="radio">
                                                        <input v-on:click="selectuserforadd(2)" type="radio" name="selecttypeuser" value="Supplier">
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
                                                <v-col cols="12" sm="6" id="name">
                                                    <v-select id="sluser"
                                                    :items="['อนุตรา หาญณรงค์', 'ทินกร ลือจินดา', 'อรภิสา นานา', 'สุกัญญา คิดดี']"
                                                    label="พนักงาน*"
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
                                                <v-col cols="12" sm="6" md="6" id="password">
                                                    <v-text-field 
                                                        label="password*"
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
                                        <v-btn color="primary" dark @click="save">บันทึก</v-btn>
                                        <v-btn color="error" dark @click="close">ยกเลิก</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogEdit" max-width="800px">
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">แก้ไขผู้ใช้งาน</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <div class="col-md-12 col-sm-12">
                                                    <label style="margin:6px 20px 0px 5px;font-weight: bold;">ประเภทผู้ใช้ : </label>
                                                    <label class="radio">
                                                        <input type="radio" name="selecttypeuser" id="typeemployee" value="Employee">
                                                        <span style="margin:0px 20px 0px 5px">พนักงาน</span>
                                                    </label>
                                                    <label class="radio">
                                                        <input type="radio" name="selecttypeuser" id="typesupplier" value="Supplier">
                                                        <span style="margin:0px 20px 0px 5px">Supplier</span>
                                                    </label>
                                                </div>
                                                <v-col cols="12" sm="6" id="dp">
                                                    <v-text-field v-model="editedItem.id" id="sldp"
                                                        label="แผนก*"
                                                        outlined
                                                        dense
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" id="name">
                                                    <v-text-field v-model="editedItem.name" id="slname"
                                                        label="Name*"
                                                        outlined
                                                        dense
                                                    ></v-text-field>
                                                </v-col> 
                                                <v-col cols="12" sm="6" md="6" id="username">
                                                    <v-text-field v-model="editedItem.username"
                                                        label="username*"
                                                        outlined
                                                        dense
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6" id="password">
                                                    <v-text-field v-model="editedItem.password"
                                                        label="password*"
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
                                        <v-btn color="primary" dark @click="saveEdit">บันทึก</v-btn>
                                        <v-btn color="error" dark @click="closeEdit">ยกเลิก</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actione="{ item }">
                        <v-icon color="primary"
                            small
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            fa-pencil-square
                        </v-icon>
                    </template>
                    <template v-slot:item.actiond="{ item }">
                        <v-icon color="error"
                            small
                            @click="deleteItem(item)"
                        >
                            fa-trash-o
                        </v-icon>
                    </template>
                </v-data-table>
                <span class="float-left" style="width:10%;">
                    <v-text-field
                        :value="itemsPerPage"
                        label="จำนวนบรรทัด"
                        type="number"
                        min="-1"
                        max="15"
                        @input="itemsPerPage = parseInt($event, 10)"
                    ></v-text-field>
                </span>
                <span class="float-right" style="width:88%;">
                    <v-pagination style="display: -webkit-inline-box;-webkit-box-pack: end;-webkit-box-align: end;align-items: end;" v-model="page" :length="pageCount" prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"></v-pagination>
                </span> 
            </template>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        data: () => ({
            searchuser: () => {
                alert('ค้นหา')
            }, 
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            dialog: false,
            headers: [
                { text: 'ลำดับ', align: 'start', value: 'no', },
                { text: 'รหัสพนักงาน', value: 'id' },
                { text: 'ชื่อพนักงาน', value: 'name' },
                { text: 'แก้ไข', value: 'actione', sortable: false },
                { text: 'ลบ', value: 'actiond', sortable: false },
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                id: 0,
                fat: 0,
                no: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                id: 0,
                fat: 0,
                no: 0,
                protein: 0,
            },
        }),
        name: 'tbuser',
        mounted:function(){
            this.getUser() //method1 will execute at pageload
        },

        computed: {
            ...mapState({
            user: state => state.user
            }),
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.initialize()
        },

        methods: {
            ...mapActions({
                getUser: 'getUser'
            }),

            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogEdit = true
                if (item.type == "employee") {
                    document.getElementById("typeemployee").checked = true;
                } 
                else {
                    document.getElementById("typesupplier").checked = true;
                }
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

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            closeEdit () {
                this.dialogEdit = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },

            saveEdit () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>
<style>
    #tbuser table thead tr th {
        background: #b3d4fc;
    }
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
