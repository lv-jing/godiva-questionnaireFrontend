<template>
  <div id="app">
    <el-container>
      <el-aside width="13%">
        <div class="logo">
          <img src="./assets/images/logo.png" alt />
        </div>
        <div class="asd-wrap">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical"
                background-color="transparent"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>售后问卷</span>
                  </template>
                  <el-menu-item index="1-1">
                    <router-link to="/index/list">列表概览</router-link>
                  </el-menu-item>
                  <el-menu-item index="1-2">
                    <router-link to="/index/add">新建问卷</router-link>
                  </el-menu-item>
                  <el-menu-item index="1-3">
                    <router-link to="/record/list">问卷记录</router-link>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>关键词回复</span>
                  </template>
                  <el-menu-item index="2-1">
                    <router-link to="/keyword/list">列表概览</router-link>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <router-link to="/keyword/add">新建关键词</router-link>
                  </el-menu-item>
                  <el-menu-item index="2-3">
                    <router-link to="/keyword/materiallist">素材列表概览</router-link>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </el-aside>
      <el-container>
        <el-header height="111px">
          <el-button class="btn-logout" @click="logout">退出登录 <i class="el-icon-open icon"></i></el-button>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import apiBase from './api/base'
export default {
  name: "app",
  methods: {
    logout () {
      window.location.href= `${apiBase.apiBase}/scrm/logout`
    }
  }
};
</script>

<style lang="less" scope>
#app {
  text-align: center;
  color: #333;  
  .el-header {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    background: #f0d584;
  }  
  .btn-logout {
    background: transparent;
    border: none;
    .icon {
      font-size: 20px;
      vertical-align: sub;
    }
  }
} 
.el-container {
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #ad8d5f;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: left;
  line-height: 1.5;
}

.logo {
  height: 111px;
  background: #381100;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 80%;
    max-height: 76%;
    position: relative;
    left: -1%;
  }
}
.asd-wrap {
  border-top: 1px solid #a9a9a9;
}
.el-menu-vertical {
  .el-submenu {
    border-bottom: 1px solid #a9a9a9;
    .el-submenu__title {
      font-size: 16px;
    }
    .el-submenu__title i {
      color: #fff
    }
    &.is-opened {
      .el-submenu__title {
        border-bottom: 1px solid #a9a9a9;
      }
    }
    .el-menu-item {
      display: flex;
      justify-content: center;   
      a {
        flex: 1;
        color: #fff
      } 
    }    
  }
}

</style>
<style lang="less">
#app /deep/ .el-breadcrumb__inner.is-link,
#app /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #333;
}
/* common ui */
.ui-color333 {
  color: #333;
}
.ui-table-row__highlight {
  background: #f2f2f2 !important;
}
</style>