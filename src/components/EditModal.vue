<template>
  <!-- edit Modal -->
  <div class="modal fade" id="edit_modal" data-backdrop="static" data-keyboard="false" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">employee edit</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <input type="hidden" name="id">
            <div class="form-group">
              <label class="col-sm-4 control-label">employee name</label>
              <div class="col-sm-8">
                <input type="text" v-model="employee.name" class="form-control" placeholder="employee name">
                <span class="text-danger">{{errorMsg.name}}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-4 control-label">email</label>
              <div class="col-sm-8">
                <input type="text" v-model="employee.email" class="form-control" placeholder="email@yahoo.com">
                <span class="text-danger">{{errorMsg.email}}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-4 control-label">gender</label>
              <div class="col-sm-8">
                <label class="radio-inline"> <input type="radio" v-model="employee.gender" value="1">男</label>
                <label class="radio-inline"> <input type="radio" v-model="employee.gender" value="2">女</label>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-4 control-label">department name</label>
              <div class="col-sm-4">
                <select class="form-control" v-model="employee.deptId" >
                  <option v-for="(dept,index) in depts" :value="dept.id" :key="dept.id">{{dept.name}}</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="updateEmp">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import instance from "../utils/request";

  export default {
    name: "EditModal",
    data(){
      return {
        depts:[],
        errorMsg:{},
      }
    },
    props:[
      'employee',
    ],
    created() {
      this.getDeptAll();
    },
    methods:{
      getDeptAll(){
        instance.get("/depts").then(res=>{
          this.depts=res.data;
        })
      },
      updateEmp(){
        instance.put("/emp",this.employee).then(res=>{
          $("#edit_modal").modal("hide");
          this.$parent.findAll();
        })

      }
    }

  }
</script>

<style scoped>

</style>
