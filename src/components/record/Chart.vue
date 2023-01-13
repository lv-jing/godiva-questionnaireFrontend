<template>
  <div class="page-record-chart">
    <el-row v-loading="details.loading" type="flex" class="row-title ui-bg-grey ui-padding">
      <img src="../../assets/images/logo.png" alt/>
      <div class="row-title__content">
        <p>{{ details.name }}</p>
        <p>
          问卷类型：{{ details.region }}
          <span style="padding-left: 30px">问卷编号：{{ details.no }}</span>
        </p>
      </div>
    </el-row>
    <el-row>
      <table class="table-echart">
        <thead class="ui-bg-grey-deepen">
        <tr>
          <td class="ui-text-center">NPS关键指标</td>
          <td>
            <div class="ui-flex">
              <span style="padding-left: 5px">关键指标趋势</span>
              <el-form :inline="true" :model="formInlineEchart" class="form-inline-echart">
                <el-col :span="5" :offset="1">
                  <el-date-picker
                    :type="formInlineEchart.pickerType"
                    placeholder="开始日期"
                    v-model="formInlineEchart.starttime"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"
                    @change="handleStartTimeChange"
                    align="center"
                    prefix-icon="el-input__icon_none"
                    :clearable="false"
                    :editable="false"
                  ></el-date-picker>
                </el-col>
                <el-col class="line ui-text-center" :span="2">—</el-col>
                <el-col :span="5">
                  <el-date-picker
                    :type="formInlineEchart.pickerType"
                    placeholder="结束日期"
                    v-model="formInlineEchart.endtime"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"
                    @change="handleEndTimeChange"
                    align="center"
                    prefix-icon="el-input__icon_none"
                    :clearable="false"
                    :editable="false"
                  ></el-date-picker>
                </el-col>
                <el-col :span="7" :offset="1">
                  <el-button-group>
                    <el-button
                      size="mini"
                      @click="changePickerType(item, i)"
                      :disabled="item == formInlineEchart.pickerType"
                      plain
                      v-for="(item, i) in formInlineEchart.changeType"
                      :key="i"
                    >{{ {date: '日', month: '月', year: '年'}[item] }}
                    </el-button>
                  </el-button-group>
                </el-col>
              </el-form>
            </div>
          </td>
        </tr>
        </thead>
        <tbody v-loading="formInlineEchart.loading">
        <tr>
          <td class="ui-text-center ui-bg-grey-deepen">人数</td>
          <td>
            <div id="container-chart" style="height: 400px"></div>
          </td>
        </tr>
        </tbody>
      </table>
    </el-row>
    <el-row class="ui-bg-grey ui-padding">
      <el-form :inline="true" :model="formInline" class="form-inline-table">
        <el-date-picker
          v-model="formInline.time"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :editable="false"
          :clearable="false"
        ></el-date-picker>
        <el-button
          type="primary"
          class="btn-query"
          :disabled="formInline.loading"
          @click="queryTableData"
        >确定
        </el-button>
      </el-form>
      <el-table
        :data="tableData"
        class="table-custom"
        border
        style="width: 100%"
        v-loading="formInline.loading"
        :header-cell-style="{fontWeight: 'normal', color: '#000'}"
      >
        <el-table-column prop="grantnum" align="center" label="推送人数"></el-table-column>
        <el-table-column prop="submitnum" align="center" label="填写人数"></el-table-column>
        <el-table-column prop="resrate" align="center" label="回复率"></el-table-column>
        <el-table-column prop="avgscore" align="center" label="平均分数"></el-table-column>
        <el-table-column prop="star1" align="center" label="一星人数"></el-table-column>
        <el-table-column prop="star2" align="center" label="二星人数"></el-table-column>
        <el-table-column prop="star3" align="center" label="三星人数"></el-table-column>
        <el-table-column prop="star4" align="center" label="四星人数"></el-table-column>
        <el-table-column prop="star5" align="center" label="五星人数"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";

require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");

export default {
  data() {
    return {
      id: "",
      details: {
        name: "",
        region: "",
        no: "",
        loading: false
      },
      formInline: {
        time: [],
        loading: false
      },
      formInlineEchart: {
        starttime: "",
        endtime: "",
        loading: false,
        pickerType: "date",
        changeType: ["year", "month", "date"]
      },
      tableData: [
        {
          grantnum: "--",
          submitnum: "--",
          resrate: "--",
          avgscore: "--",
          star1: "--",
          star2: "--",
          star3: "--",
          star4: "--",
          star5: "--"
        }
      ]
    };
  },
  async created() {
    const nowTime = new Date();
    this.formInline.time[0] = this.formInlineEchart.starttime = `${nowTime.getFullYear()}-01-01`;
    this.formInline.time[1] = this.formInlineEchart.endtime = `${nowTime.getFullYear()}-${this.addZero(
      nowTime.getMonth() + 1
    )}-${this.addZero(nowTime.getDate())}`;
  },
  async mounted() {
    this.echartData = {
      xAxis: [
        {
          type: "category",
          axisTick: {show: false},
          splitLine: {show: false},
          data: []
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {show: false},
          axisTick: {show: false},
          splitLine: {show: false},
          min: 0,
          max: 500
        }
      ],
      series: [
        {
          name: "推送人数",
          type: "bar",
          barGap: 0,
          data: []
        },
        {
          name: "填写人数",
          type: "bar",
          data: []
        }
      ]
    };
    const {id} = this.$route.query;
    this.id = id;

    this.queryQsinfo();
    this.queryTableData();
    this.queryChartData();
  },
  methods: {
    addZero(data) {
      return data.toString().padStart(2, 0);
    },
    renderChart() {
      var myChart = echarts.init(document.getElementById("container-chart"));

      let option = {
        color: ["#ad8d5f", "#f0d584"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["推送人数", "填写人数"]
        },
        xAxis: this.echartData.xAxis,
        yAxis: this.echartData.yAxis,
        series: this.echartData.series, //标题
        title: {
          show: this.echartData.showTitle,
          text: "暂无数据",
          x: "center",
          y: "center",
          textAlign: null,
          backgroundColor: "rgba(0,0,0,0)",
          padding: 5,
          itemGap: 10,
          textStyle: {
            fontSize: 13,
            fontWeight: "normal",
            color: "#333"
          }
        }
      };
      myChart.setOption(option);
    },
    async queryQsinfo() {
      this.details.loading = true;
      let res = await this.$api.questionnare.qsItem({id: this.id});
      this.details.loading = false;
      try {
        res = res.data;
        if (res.code == 1 && res.data) {
          const {
            questionnaireName = "--",
            questionnaireType = "--",
            questionnaireNo = "--"
          } = res.data || {};
          this.details.name = questionnaireName;
          this.details.region = questionnaireType;
          this.details.no = questionnaireNo;
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    async queryTableData() {
      const {formInline} = this;
      formInline.loading = true;
      let res = await this.$api.questionnare.qsRecordTable({
        details_id: this.id,
        startdate: formInline.time[0],
        enddate: formInline.time[1]
      });
      formInline.loading = false;
      try {
        res = res.data;
        if (res.code == 1 && res.data && res.data.length) {
          this.tableData = res.data;
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    async queryChartData() {
      const {formInlineEchart} = this;
      formInlineEchart.loading = true;
      let params = {
        datetype: {date: "1", month: "2", year: "3"}[
          formInlineEchart.pickerType
          ], // 1-按天统计 2-按月统计 3-按年统计
        details_id: this.id,
        startdate: formInlineEchart.starttime,
        enddate: formInlineEchart.endtime
      };
      let res = await this.$api.questionnare.qsRecordEchart(params);
      formInlineEchart.loading = false;
      try {
        res = res.data;
        if (res.code == 1) {
          this.echartData.showTitle = !res.data.length;
          if (res.data.length) {
            this.echartData.xAxis[0].data = res.data.map(d => d.tdate);
            // 推送人数
            this.echartData.series[0].data = res.data.map(d => d.grantnum)
            // 填写人数
            this.echartData.series[1].data = res.data.map(d => d.submitnum);
          }
          this.renderChart();
        } else {
          this.$message("echart接口请求出错，请重试！");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    // 年/月/日切换
    changePickerType(item, i) {
      let {
        pickerType,
        changeType,
        starttime,
        endtime
      } = this.formInlineEchart;
      let preIndex = changeType.indexOf(pickerType);
      if (i < preIndex) {
        let offset = -3 * (preIndex - i);
        this.formInlineEchart.starttime = starttime.slice(0, offset);
        this.formInlineEchart.endtime = endtime.slice(0, offset);
      } else {
        if (preIndex == 0 && i == 1) {
          // 年 -> 月
          this.formInlineEchart.starttime = this.fixMonth(starttime, true);
          this.formInlineEchart.endtime = this.fixMonth(endtime, false);
        } else if (preIndex == 1 && i == 0) {
          // 月 -> 日
          this.formInlineEchart.starttime = this.fixDate(starttime, true);
          this.formInlineEchart.endtime = this.fixDate(endtime, false);
        } else {
          // 年 -> 日
          this.formInlineEchart.starttime = this.fixMonth(
            this.formInlineEchart.starttime,
            true
          );
          this.formInlineEchart.endtime = this.fixMonth(
            this.formInlineEchart.endtime,
            false
          );
          this.formInlineEchart.starttime = this.fixDate(
            this.formInlineEchart.starttime,
            true
          );
          this.formInlineEchart.endtime = this.fixDate(
            this.formInlineEchart.endtime,
            false
          );
        }
      }
      this.formInlineEchart.pickerType = item;
      this.handleStartTimeChange(this.formInlineEchart.starttime);
      this.handleEndTimeChange(this.formInlineEchart.endtime);
    },
    fixMonth(str, isStartTime) {
      if (isStartTime) {
        str += "-01";
      } else {
        str += `-${this.addZero(new Date().getMonth() + 1)}`;
      }
      return str;
    },
    fixDate(str, isStartTime) {
      if (isStartTime) {
        str += "-01";
      } else {
        str += `-${this.addZero(new Date().getDate())}`;
      }
      return str;
    },
    handleStartTimeChange(val) {
      if (val > this.formInlineEchart.endtime) {
        this.formInlineEchart.endtime = "";
      }
      if (this.formInlineEchart.endtime && this.formInlineEchart.starttime) {
        this.queryChartData();
      }
    },
    handleEndTimeChange() {
      if (this.formInlineEchart.endtime && this.formInlineEchart.starttime) {
        this.queryChartData();
      }
    }
  }
};
</script>

<style lang="less" scope>
.page-record-chart /deep/ {
  .el-row {
    margin-bottom: 20px;
  }

  .el-table th.gutter {
    display: table-cell !important;
  }

  .el-table--border,
  .el-table th.is-leaf,
  .el-table--border td {
    border-color: #000;
  }

  .el-table::before {
    background-color: #000;
  }

  .el-input__inner {
    border-color: #a9a9a9;
    border-radius: 0;
    color: #000;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }

  .el-input__prefix {
    color: #090909;
    right: 5px;
    left: auto;
  }

  .el-button-group .is-disabled {
    background-color: #ad8d5f;
    border-color: #ad8d5f;
    color: #fff;
  }
}

.page-record-chart {
  .table-echart {
    width: 100%;

    td {
      border: 1px solid #666;
    }
  }

  .form-inline-echart {
    margin: 5px 0;
    display: flex;
    align-items: center;
  }

  .ui-text-center {
    text-align: center;
  }

  .row-title {
    height: 120px;
    align-items: center;
    flex-direction: column;
    align-items: start;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;

    .row-title__content {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-around;
    }
  }

  font-size: 14px;

  img {
    width: 10%;
    margin-right: 2%;
  }

  .ui-bg-grey {
    background: #f2f2f2;
  }

  .ui-bg-grey-deepen {
    background: #d7d7d7;
  }

  .ui-padding {
    padding: 15px;
  }

  .ui-flex {
    display: flex;
    align-items: center;
  }

  .form-inline-table {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .btn-query {
    margin-left: 10px;
    padding: 7px 24px;
    background-color: #563214;
    border-color: #563214;
    color: #fdd971;
    border-radius: 0;
  }

}
</style>
