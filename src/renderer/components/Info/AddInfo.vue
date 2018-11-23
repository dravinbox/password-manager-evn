<template>
   <div class="addinfo">
       <el-row>
        <span class="info-title">添加站点信息</span>
       </el-row>
       <el-row>
           <el-col :span="8">站点</el-col>
           <el-col :span="16">
                <el-input 
                    v-model="name" 
                    placeholder="请输入站点名字">
                </el-input>
           </el-col>
       </el-row>
       <el-row>
           <el-col :span="8">简介</el-col>
           <el-col :span="16">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入简介"
                v-model="info">
            </el-input>
           </el-col>
       </el-row>
       <el-row>
           <el-col :span="8">简介</el-col>
           <el-col :span="16">
            <el-input placeholder="请输入URL" v-model="url">
                <template slot="prepend">http://</template>
            </el-input>
           </el-col>
       </el-row>
       <el-row>
           <el-col :span="12">
                <el-button type="success" icon="el-icon-check" @click="addInfo">提交</el-button>
           </el-col>
           <el-col :span="12">
                <el-button icon="el-icon-close" @click="cancel">取消</el-button>
           </el-col>
       </el-row>


    </div> 
</template>
<script>
export default {
    data: function () {
        return {
            name: '',
            info: '',
            url:''

        } 
    },
    methods:{
        addInfo(){
            // todo
            const h = this.$createElement;
            this.$notify({
                title: '提示',
                message: h('i', { style: 'color: green'}, '添加成功')
            });
            this.$router.go(-1)
        },
        cancel(){
            this.$router.go(-1)
        }

    }
    
}
</script>
<style>
.addinfo{
    text-align: center;
}
.addinfo .el-row{
    margin: 50px;
}
.info-title{
    font-size: 24px;
}
</style>

