<template>
<el-container style=" border: 1px solid #eee">
  <!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']">
      <el-submenu v-for="menu in menus" :key="menu.mid" :index="menu.mid+''">
        <template slot="title"><i :class="menu.classObj"></i>{{menu.menusName}}</template>
        <el-menu-item-group >
          <el-menu-item  v-for="item in menu.items" v-bind:key="item.id" :index="menu.mid+'-'+item.id" v-on:click="routeTo(item.path)" :route="item.path" >{{item.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside> -->
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看个人信息</el-dropdown-item>
          <el-dropdown-item>修改</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>小张</span>
    </el-header>
    
    <router-view></router-view>

  </el-container>
</el-container>
</template>

<script>
  export default {
    name: 'password-manager',
    data: function () {
      return {
        menus:[
          { mid:1,
            menusName:'信息管理',
            classObj:{'el-icon-message':true},
            items:[
              {id:1,name:'信息',path:'/info'},
              {id:2,name:'测试',path:'/test'},
              {id:3,name:'日程',path:'/daily'},
            ]
           },
          { mid:2,
            menusName:'帮助',
            classObj:{'el-icon-document':true},
            items:[
              {id:1,name:'文档',path:'/doc'},
            ]
            
            },
        ],

      }
    },
    methods:{
      routeTo(path) {
        // console.log(this)
        this.$router.push({path: path})

      },

    },
    mounted(){
      console.log("hello,mounted")
    },
    updated() {
      console.log("hello")
    },
  }
</script>

<style >
  /* CSS */
  .el-aside {
    color: #333;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
