<template>
  <el-container class="et-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/imgs/et.png">
        <span>海通OA管理系统</span>
      </div>

      <el-button type="primary">退出</el-button>
    </el-header>

     <el-container >
       <!-- 侧边栏 -->
       <el-aside width="200px">
         <!-- router:表示开启路由模式 -->
         <el-menu
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router>
           <el-submenu index="1">
             <template slot="title">
               <i class="el-icon-menu"></i>
               <span>项目管理</span>
             </template>
             <el-menu-item-group>
               <!-- index: 路由 -->
               <el-menu-item index="/toList">项目列表</el-menu-item>
             </el-menu-item-group>
           </el-submenu>
         </el-menu>
       </el-aside>
       <!-- 主体区域-->
       <el-main>
        <router-view />
       </el-main>
     </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
    
  }
}
</script>
<style scoped>
  .el-header {
    background-color: #B3C0D1;
    display: flex; /* flex布局 */
    justify-content: space-between; /* el-header */
    align-items: center; /* 水平居中 */

    padding-left: 10px;
  }
  .el-header div {
    display: flex;
    align-items: center;
  }

  .el-header div span { /* 文本()左外边距：15px */
    margin-left: 15px;
  }


  .el-aside {
    background-color: #545C64;
  }

  .el-main {

  }

  .et-container {
    height: 100%;
  }

  /* 解决菜单有个1像素宽度的问题 */
  .el-menu {
    border-right: none;
  }
</style>

