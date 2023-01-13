<template>
  <div class="page-keyword-list">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/keyword/materiallist' }">关键字回复</el-breadcrumb-item>
        <el-breadcrumb-item>素材列表概览</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-button class="btn-update" @click="toUpdate">更新</el-button>
      <span style="margin-left: 10px">注：此更新操作为，将微信服务器上的素材同步到本地数据库。</span>
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
        height="58vh"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-custom-expand">
              <el-form-item label="素材类型">
                <span>{{ props.row.mediaType || '--' }}</span>
              </el-form-item>
              <el-form-item label="素材ID">
                <span>{{ props.row.mediaId || '--' }}</span>
              </el-form-item>
              <el-form-item label="标题">
                <span>{{ props.row.title || '--' }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.description || '--' }}</span>
              </el-form-item>
              <el-form-item label="图片链接">
                <span>{{ props.row.picUrl || '--' }}</span>
              </el-form-item>
              <el-form-item label="跳转地址">
                <span>{{ props.row.url || '--' }}</span>
              </el-form-item>
              <el-form-item label="音乐链接">
                <span>{{ props.row.musicUrl || '--' }}</span>
              </el-form-item>
              <el-form-item label="高质量音乐链接">
                <span>{{ props.row.hQMusicUrl || '--' }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createtime || '--' }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.updatetime || '--' }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="mediaType" align="center" label="素材类型"></el-table-column>
        <el-table-column prop="mediaId" align="center" label="素材ID"></el-table-column>
        <el-table-column prop="title" align="center" label="标题"></el-table-column>
        <el-table-column prop="description" align="center" label="描述"></el-table-column>
        <!-- <el-table-column prop="picUrl" align="center" label="图片链接" width="300"></el-table-column>
        <el-table-column prop="url" align="center" label="跳转地址" width="300"></el-table-column>
        <el-table-column prop="musicUrl" align="center" label="音乐链接"></el-table-column>
        <el-table-column prop="hQMusicUrl" align="center" label="高质量音乐链接"></el-table-column>-->
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
    async queryList({ pageNo, pageSize = this.paging.size.toString() }) {
      this.loading = true;
      let res = await this.$api.keyword.materialList({ pageNo, pageSize });
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
    async toUpdate() {
      this.loading = true;
      let res = await this.$api.keyword.updateMaterial();
      this.loading = false;
      try {
        res = res.data;
        this.queryList({ pageNo: "1" });
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
.table-custom-expand .el-form-item  /deep/ {
    .el-form-item__label {
      width: 20%;
      white-space: nowrap;
    }
    .el-form-item__content {
      width: 70%;
      word-break: break-all;
      line-height: 1.5;
      vertical-align: middle;
    }
  }
.table-custom-expand .el-form-item {
  width: 50%;
  margin-right: 0;

}
.btn-update {
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
  /deep/ span {
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