<template>
    
    <div>
      <!-- 信息列表 -->
      <el-dialog title="信息列表" :visible.sync="pwd.dialogTableVisible" width="800px">
        <el-button type="success" size="small" @click="handleAddPW()" icon="el-icon-plus" >添加</el-button>
        <el-table :data="pwd.gridData" max-height="300" :row-class-name="tableRowClassName" >
          <el-table-column property="info" label="描述" width="150" fixed></el-table-column>
          <el-table-column property="username" label="帐号" width="150"></el-table-column>
          <el-table-column property="password" label="密码" width="150"></el-table-column>
          <el-table-column property="phone" label="手机" width="150"></el-table-column>
          <el-table-column property="email" label="邮箱" width="200"></el-table-column>
          <el-table-column property="more" label="备注" width="200"></el-table-column>
          <el-table-column property="usable" label="状态" :formatter="getIcon"> </el-table-column>
          <el-table-column align="right" label="操作" fixed="right" width="100px">
            <template slot-scope="scope">
              <el-button
                round
                size="mini"
                type="primary"
                class="el-icon-edit"
                @click="handelEditPW(scope.$index, scope.row)">修改</el-button>
              <el-button
                round
                size="mini"
                type="danger"
                class="el-icon-delete"
                @click="deletePW(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

      <!-- 添加密码弹窗 -->
      <el-dialog title="修改信息" :visible.sync="addPWDialogFormVisible">
        <el-form :model="addpassform">
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="addpassform.info" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="帐号" :label-width="formLabelWidth">
            <el-input v-model="addpassform.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="addpassform.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth">
            <el-input v-model="addpassform.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="addpassform.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入备注"
                v-model="addpassform.more">
            </el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
                <el-switch v-model="addpassform.usable"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addPWDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPW()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改密码弹窗 -->
      <el-dialog title="修改信息" :visible.sync="editPWDialogFormVisible">
        <el-form :model="editpassform">
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="editpassform.info" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="帐号" :label-width="formLabelWidth">
            <el-input v-model="editpassform.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="editpassform.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth">
            <el-input v-model="editpassform.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="editpassform.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入备注"
                v-model="editpassform.more">
            </el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
                <el-switch v-model="editpassform.usable"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editPWDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editPW()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

</template>

<script>
export default {
    props:[
        'pwd'
    ],
    data(){
        return {
            //添加密码弹窗
            addPWDialogFormVisible: false,
            addpassform:{usable:true},
            // 修改密码弹窗
            editPWDialogFormVisible: false,
            editpassform:{},

            formLabelWidth: '120px',

        }

    },
    methods:{
        tableRowClassName({row, rowIndex}) {
            if(row.usable){
            return 'success-row';
            }else{
            return 'warning-row';

            }
        },
        getIcon(row, column, cellValue){
        const h = this.$createElement;
            if(cellValue){
            return h('i', { class: 'el-icon-success' ,style: 'color:green'}, '可用')
            }else{
            return h('i', { class: 'el-icon-error' ,style: 'color: gray'}, '废弃')

            }

        },
        handleAddPW(){
            this.addpassform = {usable:true}
            this.addPWDialogFormVisible = true;

        },
        addPW(){
            let _this = this;
            this.addpassform.createTime = new Date().getTime()
            this.addpassform.project_id = this.pwd.currentProjectId
            this.$db.password.insert(this.addpassform,function (err,res) {
                if(err){
                    _this.$message.error( '添加失败' );          
                }else{
                    _this.addPWDialogFormVisible = false;
                    _this.pwd.dialogTableVisible = false;
                    _this.$message({ type: 'success', message: '添加成功!' });

                }
                
            })

        },
        handelEditPW(index,rows){
            this.editpassform = rows
            this.editPWDialogFormVisible = true
        },
        editPW(){
            let _this = this
            this.$db.password.update({ _id: _this.editpassform._id }, { $set: { 
                info: _this.editpassform.info,
                username: _this.editpassform.username,
                password: _this.editpassform.password,
                phone: _this.editpassform.phone,
                email: _this.editpassform.email,
                more: _this.editpassform.more,
                usable: _this.editpassform.usable,
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
            this.editPWDialogFormVisible = false

        },
        deletePW(index,row){
            let _this = this
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    _this.$db.password.remove({ _id: row._id }, {}, function (err, numRemoved) {
                    if(err){
                        _this.$message.error("删除失败");

                    }else{
                        _this.$message({ type: 'success', message: '删除成功!' });
                        _this.pwd.dialogTableVisible = false;
                    }
                    });
                    
                }).catch(() => {
                    _this.$message({ type: 'info', message: '已取消删除' });          
                });

        },

    }
    
}
</script>

