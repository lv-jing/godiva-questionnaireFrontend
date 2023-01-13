<template>
  <div class="page-keyword-list">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/keyword/list' }">关键字回复</el-breadcrumb-item>
        <el-breadcrumb-item>列表概览</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-button class="btn-add">
        <router-link to="/keyword/add">新建关键字</router-link>
      </el-button>
    </el-row>
    <el-row>
      <p>注：当回复类型不为text时，回复内容为素材库的素材ID</p>
    </el-row>
    <el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        class="table-custom"
        border
        style="width: 100%"
        :row-class-name="tableRowClassName"
        cell-class-name="ui-color333"
        header-cell-class-name="ui-color333"
        :header-cell-style="{fontWeight: 'normal'}"
        height="53vh"
      >
        <el-table-column prop="type" align="center" label="类型">
          <template slot-scope="scope">{{{1: '关键字回复', 2: '被关注回复，自动回复', 3: '其他消息'}[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column prop="replyType" align="center" label="回复类型">
          <!-- <template slot-scope="scope">
            {{{}[scope.row.replyType]}}
          </template>-->
        </el-table-column>
        <el-table-column prop="keyword" align="center" label="关键字"></el-table-column>
        <el-table-column prop="matchtype" align="center" label="匹配方式">
          <template slot-scope="scope">{{{1: '精确', 2: '模糊'}[scope.row.matchtype]}}</template>
        </el-table-column>
        <el-table-column prop="replyContent" align="center" label="回复内容/素材ID"></el-table-column>
        <el-table-column prop="createtime" align="center" label="创建时间">
          <template slot-scope="scope" v-if="scope.row.createtime">
            {{scope.row.createtime.substr(0, 10)}}
            <br />
            {{scope.row.createtime.substr(11)}}
          </template>
          <template v-else>--</template>
        </el-table-column>
        <el-table-column prop="updatetime" align="center" label="更新时间">
          <template slot-scope="scope">
            <template v-if="scope.row.updatetime">
              {{scope.row.updatetime.substr(0, 10)}}
              <br />
              {{scope.row.updatetime.substr(11)}}
            </template>
            <template v-else>--</template>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="gotoOperatePage({url: '/keyword/edit', item: scope.row})"
              type="text"
              size="small"
            >
              <i class="fa fa-pencil" aria-hidden="true"></i>
              <br />修改
            </el-button>
            <el-button @click="deleteItem(scope.row)" type="text" size="small">
              <i class="fa fa-trash-o"></i>
              <br />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div class="row-pagination">
        <span>每页显示20条</span>
        <el-pagination
          v-if="tableData && tableData.length"
          @current-change="handleCurrentChange"
          :current-page.sync="paging.current"
          :pager-count="paging.count"
          layout="prev, pager, next"
          :page-size="paging.size"
          :total="paging.pages"
          :disabled="loading"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      tableData: [],
      paging: {
        current: 1,
        count: 7,
        pages: 0,
        size: 20
      },
      loading: false
    };
  },
  async created() {
    this.queryList({ pageNo: "1" });
  },
  methods: {
    async queryList({ pageNo, pageSize = this.paging.size.toString() }) {
      this.loading = true;
      let res = await this.$api.keyword.qsList({ pageNo, pageSize });
      this.loading = false;
      try {
        res = res.data;
        this.paging.pages = res.total;
        this.paging.current = res.current;

        this.tableData = res.records;
      } catch (e) {
        throw new Error(e);
      }
    },
    gotoOperatePage({ url, item }) {
      this.$router.push({
        path: url,
        query: {
          id: item.id
        }
      });
    },
    async deleteItem(item) {
      this.loading = true;
      let res = await this.$api.keyword.deleteItem({ ids: [item.id] });
      this.loading = false;
      try {
        res = res.data;
        if (res.code == 1) {
          this.$alert("删除成功", "提示", {
            confirmButtonText: "确定",
            callback: () => {
              this.queryList({ pageNo: "1" });
            }
          });
        } else {
          this.$alert("删除失败，请稍后重试！", "提示", {
            confirmButtonText: "确定"
          });
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    handleCurrentChange(val) {
      this.queryList({ pageNo: val.toString() });
    },
    tableRowClassName({ rowIndex }) {
      if (!(rowIndex % 2)) {
        return "ui-table-row__highlight";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-keyword-list /deep/ {
    .table-custom .el-button {
      color: #333;
      line-height: 1.5;
      padding: 0;
    }
    .el-row {
      margin-bottom: 20px;
    }
}
.btn-add {
  width: 104px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  background-color: #ad8d5f;
  border-radius: 0;
  border: none;
  font-size: 16px;
  &:hover {
    color: #fff;
    background-color: #ad8d5f;
  }
  > span,
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #fff;
  }
}
.row-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/deep/ .el-table th.gutter {
  display: table-cell !important;
}
/deep/ .el-table td,
/deep/ .el-table th,
/deep/ .el-table--border {
  border-color: #e4e4e4 !important;
}
</style>