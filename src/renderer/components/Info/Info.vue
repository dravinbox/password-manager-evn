<template>

    <el-main>
      <el-row>
         <el-button type="success" @click="showAddInfo(true)" icon="el-icon-plus" >添加</el-button>
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

      <add-info 
      :addDialogFormVisible="addDialogFormVisible" 
      @listenShowAddInfo="showAddInfo" 
      @listenReloadTable="reloadTableDataAfterOperate"
      ></add-info>

      <edit-info
      :editDialogFormVisible="editDialogFormVisible" 
      :editform="editform"
      @listenShowEditInfo="ShowEditInfo" 
      ></edit-info>

      <password-list
      :pwd="pwd"

      > </password-list>



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
import AddInfo from './AddInfo'
import EditInfo from './EditInfo'
import PasswordList from './PasswordList'

export default {
  components:{
    AddInfo,
    EditInfo,
    PasswordList,

  },
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
      // currentProjectId:0,

      // table弹窗
      // dialogTableVisible: false,
      pwd:{
        dialogTableVisible:false,
        currentProjectId: 0,
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

      },
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
    // onBlur(){
    //   alert(123)

    // },
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
        ).sort({createTime: -1}).skip(_this.skipNum).limit(_this.pageSize).exec(function (err,res) {
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
    // setDb(){
    //   let _this = this;
    //   this.$db.project.insert({
    //       name: _this.search,
    //       age: 18
    //       }, function (err,res) {
    //       if (err) {
    //           alert(err)
    //       }else{
    //         alert("插入成功")
    //         console.log(res)
    //       }
    //   })

    // },
    // getDb(){
    //   this.$db.project.find({},function (err,res) {
    //     console.log(err,res)
        
    //   })

    // },
    handleAdd(){
      this.addDialogFormVisible = true;
    },
    showAddInfo(data){
      this.addDialogFormVisible = data

    },
    // 添加 / 修改 / 删除 后 从新加载数据 返回到当前页面 todo
    reloadTableDataAfterOperate(){
      let _this = this;
      //统计条数
      _this.$db.project.count(
        { $or: [ {name:_this.key_re},{info:_this.key_re},{url:_this.key_re} ]}
      , function (err, count) {
        _this.totalCount = count;
      });
      // _this.$db.project.find({}).sort({createTime: -1}).exec(function (err,res) {
      _this.$db.project.find(
        { $or: [ {name:_this.key_re},{info:_this.key_re},{url:_this.key_re} ]}
      ).sort({createTime: -1}).skip(_this.skipNum).limit(_this.pageSize).exec(function (err,res) {
        console.log(err,res)
        if(err){
          this.$message.error( '加载数据失败' );          
        }else{
          _this.tableData = res


        }
        
      })

    },
    handleEdit(index, row){
      // console.log(index,row);
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
          _this.pwd.gridData = res
          _this.pwd.currentProjectId = row._id

        }

      })
      this.pwd.dialogTableVisible = true;

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
      console.log(index,rows._id)
      console.log(this)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          console.log('yes')
            _this.$db.project.remove({ _id: rows._id }, {}, function (err, numRemoved) {
              if(err){
                _this.$message.error("删除失败");

              }else{
                console.log("删了")
                console.log(rows._id)
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                _this.reloadTableDataAfterOperate();
              }
            });
        }).catch(()=>{
          console.log('no')
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });          

        })
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
    // showSearch(){
    //   alert(this.search)
    // },
    ShowEditInfo(data){
      this.editDialogFormVisible = data

    }
  }
};
</script>