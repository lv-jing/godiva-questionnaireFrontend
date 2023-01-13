<template>
  <div class="page-record-list">
    <el-row>
      <el-form :inline="true" :rules="rules" :model="formInline" ref="ruleForm" class="form-inline">
        <el-form-item label prop="memberPhone">
          <el-input v-model="formInline.memberPhone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label prop="tradestore">
          <el-input v-model="formInline.tradestore" placeholder="交易门店"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-date-picker
            v-model="formInline.time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            prefix-icon="el-input__icon_none"
            :editable="false"
            class="el-inpute__datepicker"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-query" :disabled="loading" @click="toQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        class="table-custom"
        border
        style="width: 100%"
        v-loading="loading"
        :row-class-name="tableRowClassName"
        cell-class-name="ui-color333"
        header-cell-class-name="ui-color333"
        :header-cell-style="{'fontWeight': 'normal'}"
      >
        <el-table-column prop="memberName" align="center" label="姓名" width="80"></el-table-column>
        <el-table-column prop="memberPhone" align="center" label="手机号"></el-table-column>
        <el-table-column prop="memberNo" align="center" label="会员卡号"></el-table-column>
        <el-table-column prop="orderid" align="center" label="订单编号"></el-table-column>
        <el-table-column prop="tradetime" align="center" label="交易时间">
          <template slot-scope="scope" v-if="scope.row.tradetime">
            {{scope.row.tradetime.substr(0, 10)}}
            <br />
            {{scope.row.tradetime.substr(11)}}
          </template>
          <template v-else>--</template>
        </el-table-column>
        <el-table-column prop="tradestore" align="center" label="交易门店"></el-table-column>
        <el-table-column prop="id" align="center" label="问卷编号"></el-table-column>
        <el-table-column prop="givetime" align="center" label="发放时间">
          <template slot-scope="scope" v-if="scope.row.givetime">
            {{scope.row.givetime.substr(0, 10)}}
            <br />
            {{scope.row.givetime.substr(11)}}
          </template>
          <template v-else>--</template>
        </el-table-column>
        <el-table-column prop="subtime" align="center" label="提交时间">
          <template slot-scope="scope" v-if="scope.row.subtime">
            {{scope.row.subtime.substr(0, 10)}}
            <br />
            {{scope.row.subtime.substr(11)}}
          </template>
          <template v-else>--</template>
        </el-table-column>
        <el-table-column prop="score" align="center" label="评价得分"></el-table-column>
        <el-table-column prop="type" align="center" label="问卷状态">
          <template
            slot-scope="scope"
          >{{ scope.row.type && {0:'初始化', 1: '已发放', 2:'已提交'}[scope.row.type] || '--'}}</template>
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
    var validatePhone = (rule, value, callback) => {
      if (value && !/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      formInline: {
        memberPhone: "",
        tradestore: "",
        time: []
      },
      formInlineByQuery: {},
      rules: {
        memberPhone: [{ validator: validatePhone, trigger: "blur" }]
      },
      tableData: [],
      paging: {
        current: 1,
        count: 7,
        pages: 0,
        size: 20
      }
    };
  },
  created() {
    this.queryList({ pageNo: "1" });
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (!(rowIndex % 2)) {
        return "ui-table-row__highlight";
      }
    },
    addZero(data) {
      return data.toString().padStart(2, 0);
    },
    toQuery() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.formInlineByQuery = Object.assign({}, this.formInline);
          this.formInlineByQuery = JSON.parse(JSON.stringify(this.formInline));
          this.queryList({ pageNo: "1" });
        }
      });
    },
    handleCurrentChange(val) {
      this.queryList({ pageNo: val.toString() });
    },
    async queryList({ pageNo, pageSize = this.paging.size.toString() }) {
      let { time, ...rest } = this.formInlineByQuery;
      let params = {
        pageNo,
        pageSize,
        ...rest,
        starttime: time && time.length ? time[0] : "",
        endtime: time && time.length ? time[1] : ""
      };
      this.loading = true;
      let res = await this.$api.questionnare.qsRecord(params);
      this.loading = false;
      try {
        res = res.data;
        this.paging.pages = res.total;
        this.paging.current = res.current;

        this.tableData = res.records;
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-record-list /deep/ {
    .table-custom .el-button--text {
      color: #333;
      line-height: 1.5;
    }
    .form-inline {
      .el-input__inner {
        height: 30px;
        line-height: 30px;
        border-radius: 0;
      }
    }
  }
.page-record-list {
  .row-pagination {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn-query {
    padding: 7px 24px;
    background-color: #ad8d5f;
    border-color: #ad8d5f;
  }
  .el-inpute__datepicker {
    vertical-align: middle;
    position: relative;
    top: -2px;
    /deep/ .el-range-separator {
      line-height: 24px;
    }
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