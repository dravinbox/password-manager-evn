<template>
      <!-- 添加表单弹窗 -->
      <el-dialog title="添加信息" :visible.sync="myVisible" >
        <el-form :model="addform">
          <el-form-item label="站点" :label-width="formLabelWidth">
            <el-input v-model="addform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="简介" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入简介"
                v-model="addform.info">
            </el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="formLabelWidth">
            <el-input placeholder="请输入URL" v-model="addform.url">
                <template slot="prepend">http://</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="addInfo()">确 定</el-button>
        </div>
      </el-dialog>
</template>

<script>
export default {
    props:[
        'addDialogFormVisible',
    ],
    computed:{
        myVisible:{
            get: function(){
                return this.addDialogFormVisible
            },
            set: function(data){
                this.$emit("listenShowAddInfo",data)
                return this.addDialogFormVisible
            }
        }

    },
     data() {
        return {
            // addVisible: false,
            addform: {
                name: '',
                info: '',
                url: '',
            },
            formLabelWidth: '120px',

        }
    },
    methods: {
        close(){
            this.myVisible = false
        },
    addInfo(){
      let _this = this;
      this.addform.createTime = new Date().getTime();
      this.$db.project.insert(this.addform,function (err,res) {
        if(err){
          this.$message.error( '添加失败' );          
        }else{
          _this.$message({ type: 'success', message: '添加成功!' });
          _this.$emit('listenReloadTable');

        }
        
      })
      this.close()
    },

    }
    
}
</script>
<style scoped>

</style>


