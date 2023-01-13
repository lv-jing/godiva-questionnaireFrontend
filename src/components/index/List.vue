<template>
  <div class="page-index-list">
    <el-row>
      <el-button class="btn-add">
        <router-link to="/index/add">新建问卷</router-link>
      </el-button>
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
      >
        <el-table-column prop="showUrl" label="生成RUL" align="center" width="80">
          <template slot-scope="scope">
            <span
              class="ui-checkbox-cheat"
              :class="{active: scope.row.showUrl}"
              @click="toggleShowUrl(scope.row)"
            ></span>
            <div class="container-copy" v-if="scope.row.showUrl">
              <el-button class="btn-copy" size="medium" @click="copyUrl(scope.row)">复制链接</el-button>
              <el-input
                :ref="'copyInput_' + scope.row.id"
                v-model="scope.row.questionnaireUrl"
                :readonly="true"
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="模板状态" align="center">
          <template slot-scope="scope">{{scope.row.type != '0' ? '使用中' : '未使用'}}</template>
        </el-table-column>
        <el-table-column prop="questionnaireName" align="center" label="问卷名称"></el-table-column>
        <el-table-column prop="questionnaireType" align="center" label="问卷类型"></el-table-column>
        <el-table-column prop="questionnaireNo" align="center" label="问卷编号"></el-table-column>
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
        <el-table-column prop="ruleNum" align="center" label="发放数量"></el-table-column>
        <el-table-column prop="submitNum" align="center" label="提交数量"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="gotoOperatePage({url: '/index/preview', item: scope.row})"
              type="text"
              size="small"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
              <br />查看
            </el-button>
            <el-button
              @click="gotoOperatePage({url: '/index/edit', item: scope.row})"
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
            <el-button
              @click="gotoOperatePage({url: '/record/chart', item: scope.row})"
              type="text"
              size="small"
              class="ui-margin-left-no"
            >
              <i class="fa el-icon-s-data" aria-hidden="true"></i>
              <br />问卷统计
            </el-button>
            <el-button @click="useTemplate(scope.row)" type="text" size="small">
              <!-- <el-checkbox v-model="checked">作为模板</el-checkbox> -->
              <template v-if="scope.row.type == '0'">
                <i class="fa el-icon-check" aria-hidden="true"></i>
                <br />作为模板
              </template>
              <template v-else>
                <i class="fa el-icon-close" aria-hidden="true"></i>
                <br />取消模板
              </template>
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
      checked: false,
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
    copyUrl(item) {
      this.$refs["copyInput_" + item.id].select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message("已复制好，可贴粘。");
      item.showUrl = !item.showUrl;
    },
    toggleShowUrl(item) {
      item.showUrl = !item.showUrl;
    },
    async queryList({ pageNo, pageSize = this.paging.size.toString() }) {
      this.loading = true;
      let res = await this.$api.questionnare.qsList({ pageNo, pageSize });
      this.loading = false;
      try {
        res = res.data;
        this.paging.pages = res.total;
        this.paging.current = res.current;

        this.tableData = res.records;
        this.tableData.map(t => {
          this.$set(t, "showUrl", false);
          return t;
        });
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
      let res = await this.$api.questionnare.deleteQS({ ids: [item.id] });
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
    async useTemplate(item) {
      this.loading = true;
      // type:0 - 改为未使用 1 - 改为使用中
      let res = await this.$api.questionnare.updateTemplateType({
        id: item.id,
        type: item.type == 1 ? "0" : "1"
      });
      this.loading = false;
      try {
        res = res.data;
        if (res.code == 1) {
          this.$alert("修改成功", "提示", {
            confirmButtonText: "确定",
            callback: () => {
              this.queryList({ pageNo: "1" });
            }
          });
        } else {
          this.$alert("修改失败，请稍后重试！", "提示", {
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
.page-index-list /deep/ {
    .table-custom .el-button {
      color: #333;
      line-height: 1.5;
      padding: 0;
    }
    .el-row {
      margin-bottom: 20px;
    }
  }
.page-index-list {
  .container-copy {
    position: absolute;
    padding: 2px;
    text-align: left;
    z-index: 1;
    background: #fff;
    border: 1px solid #e4e4e4;
    transform: translate(7%, -62%);
    .btn-copy {
      padding: 3px 25px !important;
      background: #563214;
      color: #fde4a4 !important;
    }
    .el-input {
      width: 600px;
    }
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
.ui-margin-left-no {
  margin-left: 0 !important;
}
.ui-checkbox-cheat {
  position: relative;
  display: inline-block;
  border: 1px solid #333;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  cursor: pointer;
  &.active:before {
    content: "";
    width: 60%;
    height: 60%;
    position: absolute;
    background: #333;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
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