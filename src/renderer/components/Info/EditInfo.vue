<template>
      <!-- 修改表单弹窗 -->
        <el-dialog title="修改信息" :visible.sync="myVisible">
        <el-form :model="editform">
          <el-form-item label="站点" :label-width="formLabelWidth">
            <el-input v-model="editform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="简介" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入简介"
                v-model="editform.info">
            </el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="formLabelWidth">
            <el-input placeholder="请输入URL" v-model="editform.url">
                <template slot="prepend">http://</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="editInfo()">确 定</el-button>
        </div>
      </el-dialog>
</template>

<script>
export default {
    props:[
        'editDialogFormVisible',
        'editform',
    ],
    computed:{
        myVisible:{
            get: function(){
                console.log("get edit visible")
                return this.editDialogFormVisible
            },
            set: function(data){
                this.$emit("listenShowEditInfo",data)
                return this.editDialogFormVisible
            }
        },


    },
     data() {
        return {
            // editform: {
            //     name: '',
            //     info: '',
            //     url: '',
            // },
            formLabelWidth: '120px',

        }
    },
    methods: {
        close(){
            this.myVisible = false
        },
    editInfo(){
      let _this = this
      this.$db.project.update({ _id: _this.editform._id }, { $set: { 
        name: _this.editform.name,
        info: _this.editform.info,
        url: _this.editform.url,
         } }, {}, function (err) {
           if(err){
                _this.$message.error("修改失败");
              }else{
                _this.$message({
                  type: 'success',
                  message: '修改成功!'
                });

           }
      });
      this.close()
    },

    }
    
}
</script>
<style scoped>

</style>


