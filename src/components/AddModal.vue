<template>

  <!-- add Modal -->
  <div class="modal fade" id="add_modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">employee add</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label  class="col-sm-4 control-label">employee name</label>
              <div class="col-sm-8">
                <input type="text" v-model="emp.name" class="form-control" placeholder="employee name">
                <span class="text-danger">{{errorMsg.name}}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-4 control-label">email</label>
              <div class="col-sm-8">
                <input type="text" v-model="emp.email" class="form-control" placeholder="email@yahoo.com">
                <span class="text-danger">{{errorMsg.email}}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-4 control-label">gender</label>
              <div class="col-sm-8">
                <label class="radio-inline"> <input type="radio" v-model="emp.gender" value="1">男</label>
                <label class="radio-inline"> <input type="radio" v-model="emp.gender" value="2">女</label>
              </div>
              <span class="text-danger">{{errorMsg.gender}}</span>
            </div>
            <div class="form-group">
              <label  class="col-sm-4 control-label">department name</label>
              <div class="col-sm-4">
                <select class="form-control" v-model="emp.deptId">
                  <option v-for="(dept,index) in depts" :value="dept.id" :key="dept.id">{{dept.name}}</option>
                </select>
                <span class="text-danger">{{errorMsg.dept}}</span>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="saveEmp" >Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import instance from "../utils/request";

  export default {
    name: "AddModal",
    data(){
      return{
        emp:{},
        depts:[],
        errorMsg:{},
      }
    },
    methods:{
      getDeptAll(){
        instance.get("/depts").then(res=>{
          this.depts=res.data;
        })
      },
      saveEmp(){
        this.errorMsg={};

        if(this.emp.name==null){
          this.errorMsg.name='name required'
        }
        if(this.emp.email==null){
          this.errorMsg.email='email required'
        }

        let emailRegxp = /^([\w]+)(.[\w]+)*@([\w]+)(.[\w]{2,3}){1,2}$/;
        if (emailRegxp.test(this.emp.email) != true && this.emp.email!=null){
          this.errorMsg.email='email format error'
        }
        if(this.emp.gender==null){
          this.errorMsg.gender='gender required'
        }
        if(this.emp.deptId==null){
          this.errorMsg.dept='department required'
        }

        if( this.errorMsg.name!=null || this.errorMsg.email!=null
          || this.errorMsg.gender!=null || this.errorMsg.dept!=null ){
          return;
        }

        instance.post("/emp",this.emp).then(res=>{
          this.emp={};
          $("#add_modal").modal("hide");
          this.$parent.findAll();
        })

      }
    },
    created() {
      this.getDeptAll();
    },
  }
</script>

<style scoped>

</style>
