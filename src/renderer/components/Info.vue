<template>

    <el-main>
      <el-row>
         <el-button type="success" @click="handleAdd()" icon="el-icon-plus" >添加</el-button>
      </el-row>
      <el-table 
        ref="multipleTable"
        stripe
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="站点"> </el-table-column>
        <el-table-column prop="info" label="简介"> </el-table-column>
        <el-table-column prop="url" label="URL"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              @keyup.enter.native="onSearch"
              @blur="onSearch"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              circle
              size="small"
              type="success"
              class="el-icon-view"
              @click="viewPasswordTable(scope.$index, scope.row)"></el-button>
            <el-button
              circle
              size="small"
              type="primary"
              class="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-button
              circle
              size="small"
              type="danger"
              class="el-icon-delete"
              @click="deleteRow(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3,5, 10, 20, 50]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
      <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="showSearch()">显示搜索框内容</el-button>
        <el-button @click="setDb()">搜索框内容设置到数据库</el-button>
        <el-button @click="getDb()">从数据库中取值</el-button>
      </div> -->

      <!-- 信息列表 -->
      <el-dialog title="信息列表" :visible.sync="dialogTableVisible" width="800px">
        <el-button type="success" size="small" @click="handleAddPW()" icon="el-icon-plus" >添加</el-button>
        <el-table :data="gridData" max-height="300" :row-class-name="tableRowClassName" >
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

      <!-- 修改表单弹窗 -->
      <el-dialog title="修改信息" :visible.sync="editDialogFormVisible">
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
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editInfo()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加表单弹窗 -->
      <el-dialog title="添加信息" :visible.sync="addDialogFormVisible">
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
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addInfo()">确 定</el-button>
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


    </el-main>

</template>

<style >
.el-table .warning-row {
    background: rgb(226, 226, 226);
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
export default {
  data() {
    return {
      //添加密码弹窗
      addPWDialogFormVisible: false,
      addpassform:{usable:true},

      // 修改密码弹窗
      editPWDialogFormVisible: false,
      editpassform:{},
      // 添加表单弹窗
      addDialogFormVisible: false,
      addform: {
          name: '',
          info: '',
          url: '',
        },
      // 修改表单弹窗
      editDialogFormVisible: false,
      editform: {
          _id: '',
          name: '',
          info: '',
          url: '',
        },
      formLabelWidth: '120px',

      // 正在修改的项目id
      currentProjectId:0,

      // table弹窗
      gridData:[
            {
            info:'管理员帐号',
            username:'yy',
            password:'123456',
            phone:'18612344321',
            email:'12@21.com',
            more:'这是备注',
            usable:1
          },
          ],
      dialogTableVisible: false,
      // 搜索
      search:'',
      // 表格数据
      tableData: [ ],
      multipleSelection: [],
      //分页
      currentPage: 1,
      totalCount: 10,
      pageSize: 5,
      pageNum: 1,

    };
  },
  computed:{
    skipNum:function () {
      
      return (this.pageNum-1)*this.pageSize
    },
    key_re: function(){
      return new RegExp(this.search)
    }


  },
  mounted() {
    let _this = this;
    // Count all documents in the datastore
    _this.$db.project.count({}, function (err, count) {
      _this.totalCount = count;
    });
    _this.$db.project.find({}).sort({createTime: -1}).skip(_this.skipNum).limit(_this.pageSize).exec(function (err,res) {
      console.log(err,res)
      if(err){
        _this.$message.error( '加载数据失败' );          
      }else{
        _this.tableData = res
        console.log('加载成功')
        console.log(_this.tableData)
      }
    })
  },
  methods: {
    onBlur(){
      alert(123)

    },
    onSearch(){
      // alert(this.search)
      let _this = this
      // let key_re = new RegExp(this.search)
      // console.log(key_re)
      _this.$db.project.count(
       { $or: [ {name:_this.key_re},{info:_this.key_re},{url:_this.key_re} ]},
       function (err, count) {
        _this.totalCount = count;
        // console.log(count)
      });
      this.pageNum = 1
      this.currentPage = 1

      _this.$db.project.find(
        { $or: [ {name:_this.key_re},{info:_this.key_re},{url:_this.key_re} ]}
        ).skip(_this.skipNum).limit(_this.pageSize).exec(function (err,res) {
        console.log(err,res)
        if(err){
          _this.$message.error( '加载数据失败' );          
        }else{
          _this.tableData = res
          // console.log('加载成功')
          // console.log(_this.tableData)
        }
      })

    },
    addPW(){
      let _this = this;
      this.addpassform.createTime = new Date().getTime()
      this.addpassform.project_id = this.currentProjectId
      this.$db.password.insert(this.addpassform,function (err,res) {
        if(err){
          this.$message.error( '添加失败' );          
        }else{
          _this.addPWDialogFormVisible = false;
          _this.dialogTableVisible = false;
          _this.$message({ type: 'success', message: '添加成功!' });

        }
        
      })

    },
    handleAddPW(){
      this.addpassform = {usable:true}
      this.addPWDialogFormVisible = true;

    },
    deletePW(index,row){
      let _this = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // _this.$db.password.find({},function (err,res) {
            // console.log(err,res)
            _this.$db.password.remove({ _id: row._id }, {}, function (err, numRemoved) {
              if(err){
                _this.$message.error("删除失败");

              }else{
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                // _this.reloadTableDataAfterOperate();
                // _this.editPWDialogFormVisible = false
                _this.dialogTableVisible = false;
              }
            });
            
          // })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

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
    handelEditPW(index,rows){
      this.editpassform = rows
      console.log(this.editpassform)

      this.editPWDialogFormVisible = true
    },
    getIcon(row, column, cellValue){
      const h = this.$createElement;
        if(cellValue){
          return h('i', { class: 'el-icon-success' ,style: 'color:green'}, '可用')
        }else{
          return h('i', { class: 'el-icon-error' ,style: 'color: gray'}, '废弃')

        }

    },
    tableRowClassName({row, rowIndex}) {
        if(row.usable){
          return 'success-row';
        }else{
          return 'warning-row';

        }
      },
    setDb(){
      let _this = this;
      this.$db.project.insert({
          name: _this.search,
          age: 18
          }, function (err,res) {
          if (err) {
              alert(err)
          }else{
            alert("插入成功")
            console.log(res)
          }
      })

    },
    getDb(){
      this.$db.project.find({},function (err,res) {
        console.log(err,res)
        
      })

    },
    handleAdd(){
      this.addform = {}
      this.addDialogFormVisible = true;
    },
    addInfo(){
      // this.addform.id = this.tableData.length+1
      // console.log(this.addform)
      // this.tableData.push(this.addform)
      let _this = this;
      this.addform.createTime = new Date().getTime();
      this.$db.project.insert(this.addform,function (err,res) {
        if(err){
          this.$message.error( '添加失败' );          
        }else{
          _this.$message({ type: 'success', message: '添加成功!' });
          _this.reloadTableDataAfterOperate();

        }
        
      })

      // 通知
      // const h = this.$createElement;
      // this.$notify({
      //     title: '提示',
      //     message: h('i', { style: 'color: green'}, '添加成功')
      // });
      this.addDialogFormVisible = false;
    },
    // 添加 / 修改 / 删除 后 从新加载数据 返回到当前页面 todo
    reloadTableDataAfterOperate(){
      let _this = this;
      //统计条数
      _this.$db.project.count({}, function (err, count) {
        _this.totalCount = count;
      });
      // _this.$db.project.find({}).sort({createTime: -1}).exec(function (err,res) {
      _this.$db.project.find({name:_this.key_re}).sort({createTime: -1}).skip(_this.skipNum).limit(_this.pageSize).exec(function (err,res) {
        console.log(err,res)
        if(err){
          this.$message.error( '加载数据失败' );          
        }else{
          _this.tableData = res


        }
        
      })

    },
    editInfo(){
      let _this = this
      // let id = _this.editform._id
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
      // 通知
      // const h = this.$createElement;
      // this.$notify({
      //     title: '提示',
      //     message: h('i', { style: 'color: green'}, '修改成功')
      // });
      this.editDialogFormVisible = false;

    },
    handleEdit(index, row){
      console.log(index,row);
      this.editDialogFormVisible = true;
      this.editform = row
      console.log(this.editform)

    },
    viewPasswordTable(index,row){
      let _this = this
      this.$db.password.find({project_id:row._id},function(err,res){
        if(err){
          _this.$message.error('查询失败')
        }else{
          // console.log(row._id)
          console.log(err,res)
          _this.gridData = res
          console.log("查看数据")
          console.log(res)
          console.log(_this.gridData)
          _this.currentProjectId = row._id

        }

      })
      this.dialogTableVisible = true;

    },
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.reloadTableDataAfterOperate();
      },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageNum = val;
        // console.log(this.skipNum)
        this.reloadTableDataAfterOperate();
      },
    deleteRow(index, rows) {
      let _this = this;
      // console.log(index,rows._id)
      // console.log(this)
      // this.$alert('111')
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // rows.splice(index, 1);
          console.log(index,rows._id)
          // _this.$db.project.find({},function (err,res) {
            console.log(err,res)
            _this.$db.project.remove({ _id: rows._id }, {}, function (err, numRemoved) {
              if(err){
                _this.$message.error("删除失败");

              }else{
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                _this.reloadTableDataAfterOperate();
              }
            });
            
          // })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showSearch(){
      alert(this.search)
    }
  }
};
</script>