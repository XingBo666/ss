<template>
  <div id="app">
    <el-container>
      <el-header class="head">
        <el-page-header @back="goBack" content="详情页面"></el-page-header>
      </el-header>
      <el-container style="min-height: 400px">
        <!--导航栏内容-->
        <el-col :span="4">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>展开/收起</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="toPath('/')">供应商管理</el-menu-item>
                <el-menu-item index="1-2" @click="toPath('/reple')">进货管理</el-menu-item>
                <el-menu-item index="1-3" @click="toPath('/retgoods')">退货管理</el-menu-item>
                <el-menu-item index="1-4" @click="toPath('/order')">订单管理</el-menu-item>
                <el-menu-item index="1-5" @click="toPath('/inveninfo')">库存管理</el-menu-item>
                <el-menu-item index="1-6" @click="toPath('/invenwarn')">库存预警</el-menu-item>
                <el-menu-item index="1-7" @click="toPath('/goods')">商品管理</el-menu-item>
                <el-menu-item index="1-8" @click="toPath('/employee')">员工管理</el-menu-item>
                <el-menu-item index="1-9" @click="toPath('/customer')">顾客管理</el-menu-item>
                <el-menu-item index="1-10" @click="toPath('/custret')">顾客退货管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>

        <!--主要内容区域-->
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    goBack(){
      this.$router.go( -1 )
    },
    toPath(path) {
      this.$router.push(path);
    }
  },
  created() {}
};
</script>

<style>
.aside {
  background-color: rgb(229, 250, 210);
}
.main {
}

.head {
  background-color: lightblue;
}
* {
  margin: 0;
  padding: 0;
}
</style>
