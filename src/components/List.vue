<template>
  <div class="container">
    <!-- button -->
    <div class="row">
      <div class="col-md-4 col-md-offset-8">
        <button class="btn btn-primary" @click="addModal">add</button>
        <button class="btn btn-danger" @click="batchDelete">batch delete</button>
      </div>
    </div>
    <!-- table  -->
    <div class="row">
      <div class="col-md-12">
        <table class="table table-hover" id="emps_table">
          <thead>
          <tr>
            <th><input type="checkbox" v-model="checkedAll" @click="selectAll" /></th>
            <th>#</th>
            <th>employee name</th>
            <th>gender</th>
            <th>email</th>
            <th>department name</th>
            <th>operation</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(emp,index) in emps" :key="emp.id">
            <td><input type="checkbox" v-model="selected" :value="emp.id" /></td>
            <td>{{emp.id}}</td>
            <td>{{emp.name}}</td>
            <td>
              <span v-if="emp.gender==1">男</span>
              <span v-if="emp.gender==2">女</span>
            </td>
            <td>{{emp.email}}</td>
            <td>{{emp.department.name}}</td>
            <td>
              <button class="btn btn-info" @click="editModal(emp.id)">edit</button>
              <button class="btn btn-danger" @click="deleteEmp(emp.id)">delete</button>
            </td>
          </tr>
          </tbody>
        </table>
        <ul id="pagination" class="pagination-sm"></ul>
      </div>
    </div>

    <!-- paginate  -->
    <div class="row">

      <nav aria-label="Page navigation">
        <ul class="pagination ">
          <li @click="prePage" :class="pageNum<=1?'disabled':''">
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li v-for="(v,i) in pages" :key="i" @click="curPage(v)" :class="pageNum==v?'active':''">
            <a href="#">{{v}}</a>
          </li>

          <li @click="nextPage" :class="pageNum>=pages?'disabled':''">
            <a href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>

    </div>

    <AddModal></AddModal>
    <EditModal :employee="emp"></EditModal>

  </div>
</template>

<script>
  import AddModal from "./AddModal";
  import EditModal from "./EditModal";
  import instance from "../utils/request";

  export default {
    name: "List",
    data(){
      return{
        emp:{},
        emps:[],
        selected: [],
        checkedAll:false,
        total:1,
        pageSize:6,
        pages:1,
        pageNum:1,
      }
    },
    methods:{
      addModal(){
        $("#add_modal").modal('show')
      },
      editModal(id){
        $("#edit_modal").modal('show')
        this.detailEmp(id)
      },
      findAll(i){
        this.pageNum= i || this.pageNum;
        instance.get(`/emps/${this.pageNum}/${this.pageSize}`).then(res=>{
          this.emps=res.data.list;
          this.total=res.data.total;
          this.pageSize=res.data.pageSize;
          this.pages=res.data.pages;
        });
      },
      curPage(i){
        this.findAll(i);
      },
      prePage(){
        if(this.pageNum>1){
          this.findAll(--this.pageNum);
        }

      },
      nextPage(){
        if(this.pageNum<this.pages){
          this.findAll(++this.pageNum);
        }

      },
      detailEmp(id){
        instance.get("/emp?id="+id).then(res=>{
          this.emp=res.data;
        })
      },
      deleteEmp(id){
        if(confirm("確認刪除嗎?")) {
          instance.delete("/emp?id=" + id).then(res => {
            this.findAll();
          })
        }
      },
      selectAll(){
        this.selected = [];
        if(!this.checkedAll){
          for(var i in this.emps){
            this.selected.push(this.emps[i].id)
          }
        }
      },
      batchDelete(){
        if(this.selected.length==0 ){
          alert("請選擇員工");
          return;
        }
        if(confirm("確認刪除嗎?")) {
          instance.post("/emp/batch", JSON.stringify(this.selected)).then(res => {
            this.findAll();
          })
        }

      }

    },
    created() {

    },
    mounted() {
      this.findAll();
    },
    components:{
      EditModal,AddModal
    },
    watch:{
      selected :{
        handler (){
          if(this.selected.length == this.emps.length){
            this.checkedAll = true
          }else{
            this.checkedAll = false
          }
        },
        deep: true
      }
    }

  }
</script>

<style scoped>

</style>
