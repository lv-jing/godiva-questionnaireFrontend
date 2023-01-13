<template>
  <div class="page-keyword-edit">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/keyword/list' }">关键字回复</el-breadcrumb-item>
        <el-breadcrumb-item>修改关键字</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-form
        v-loading="loading"
        ref="form"
        :model="form"
        label-width="120px"
        :rules="rules"
        :inline-message="true"
        size="small"
        :hide-required-asterisk="true"
      >
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="form.type"
            @change="handleTypeSelectChange"
            placeholder="请选择类型"
            class="ui-width-custom"
          >
            <el-option
              v-for="item in Utils.typeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回复类型" prop="replyType">
          <el-select
            v-model="form.replyType"
            @change="handleReplyTypeSelectChange"
            :disabled="replyTypeSelectDisabled"
            placeholder="请选择回复类型"
            class="ui-width-custom"
          >
            <el-option v-for="item in Utils.replyTypeArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字" prop="keyword">
          <el-input
            v-model="form.keyword"
            :disabled="keywordInputDisabled"
            placeholder="请输入关键字"
            class="ui-width-custom"
          ></el-input>
        </el-form-item>
        <el-form-item label="匹配方式" prop="matchtype">
          <el-select
            v-model="form.matchtype"
            :disabled="matchtypeSelectDisabled"
            placeholder="请选择匹配方式"
            class="ui-width-custom"
          >
            <el-option
              v-for="item in Utils.matchtypeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回复内容" prop="replyContent" v-if="showReplyContentByText">
          <el-input
            v-model="form.replyContent"
            type="textarea"
            placeholder="请输入回复内容"
            class="ui-width-custom"
          ></el-input>
        </el-form-item>
        <el-form-item label="素材ID" prop="replyContent" v-else>
          <span class="ui-margin-right-10" v-if="form.replyContent">{{form.replyContent}}</span>
          <el-button
            class="btn-update"
            @click="showMaterialDialog"
          >{{form.replyContent ? '重新选择素材' : '请选择素材'}}</el-button>
        </el-form-item>

        <el-button class="btn-sure" type="primary" size="medium" @click="onSubmit">确 认</el-button>
      </el-form>
    </el-row>

    <el-dialog title="请选择素材" :visible.sync="dialogTableVisible">
      <el-table
        :data="gridData"
        highlight-current-row
        @current-change="handleCurrentChange"
        v-loading="dialogLoading"
        :row-style="{cursor: 'pointer'}"
        height="400"
        ref="dialogTable"
      >
        <el-table-column property="mediaType" align="center" label="素材类型"></el-table-column>
        <el-table-column property="mediaId" align="center" label="素材ID"></el-table-column>
        <el-table-column property="title" align="center" label="标题"></el-table-column>
        <el-table-column property="description" align="center" label="描述"></el-table-column>
      </el-table>
      <div class="row-pagination">
        <span>每页显示10条</span>
        <el-pagination
          v-if="gridData && gridData.length"
          @current-change="handleCurrentPageChange"
          :current-page.sync="paging.current"
          :pager-count="paging.count"
          layout="prev, pager, next"
          :page-size="paging.size"
          :total="paging.pages"
          :disabled="dialogLoading"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="chooseMaterialItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Utils from "./utils";

export default {
  name: "Edit",
  data() {
    return {
      Utils,
      loading: false,
      dialogLoading: false,
      dialogTableVisible: false,
      gridData: [],
      paging: {
        current: 1,
        count: 7,
        pages: 0,
        size: 10
      },
      form: {
        type: "",
        replyType: "",
        keyword: "",
        replyContent: "",
        matchtype: ""
      },
      currentRow: null,
      keywordInputDisabled: false,
      matchtypeSelectDisabled: false,
      replyTypeSelectDisabled: false,
      showReplyContentByText: true,
      materialIDArrs: [],
      rules: {
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        replyType: [
          { required: true, message: "请选择回复类型", trigger: "change" }
        ],
        keyword: [{ required: true, message: "请输入关键字", trigger: "blur" }],
        matchtype: [
          { required: true, message: "请选择匹配方式", trigger: "change" }
        ],
        replyContent: [
          { required: true, message: "请输入回复内容", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    showReplyContentByText(val) {
      this.form.replyContent = "";
      this.rules.replyContent[0].message = val
        ? "请输入回复内容"
        : "请选择素材ID";
      this.triggerValidateReplyContent();
    }
  },
  async created() {
    const { id } = this.$route.query;
    const { Utils } = this;
    this.id = id;
    this.loading = true;
    let res = await this.$api.keyword.keywordItem({ id });
    this.loading = false;
    try {
      res = res.data;
      if (res.code == 1) {
        res = res.data;
        this.showReplyContentByText =
          res.replyType == this.Utils.replyTypeArr[0];

        // 绕过watch校验
        setTimeout(() => {
          this.form = res;
        }, 500);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  methods: {
    showMaterialDialog() {
      this.dialogTableVisible = true;
      this.queryList({ pageNo: "1" });
    },
    chooseMaterialItem() {
      this.dialogTableVisible = false;
      this.form.replyContent = this.currentRow.mediaId || "";
      this.triggerValidateReplyContent();
    },
    /**
     * 当类型改变时，更改其他字段(回复内容/回复类型/匹配方式/关键字)可用性
     * 具体要点：当类型为2/3时，只能修改回复内容，且回复类型只能为text，匹配方式只能为1，关键字只能为subscribe/other
     */
    handleTypeSelectChange(val) {
      this.keywordInputDisabled = this.matchtypeSelectDisabled = this.replyTypeSelectDisabled =
        val == "2" || val == "3";

      if (val == "2" || val == "3") {
        this.form.keyword = val == "2" ? "subscribe" : "other";
        this.form.matchtype = this.Utils.matchtypeArr[0].value;
        this.form.replyType = this.Utils.replyTypeArr[0];
        this.showReplyContentByText = true;
      }
    },
    // 当回复类型为text时，回复内容为text，否则回复内容为素材ID选择
    handleReplyTypeSelectChange(val) {
      this.showReplyContentByText = val == this.Utils.replyTypeArr[0];
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleCurrentPageChange(val) {
      this.queryList({ pageNo: val.toString() });
    },
    async queryList({ pageNo, pageSize = this.paging.size.toString() }) {
      this.dialogLoading = true;
      let res = await this.$api.keyword.materialList({
        pageNo,
        pageSize,
        mediaType: this.form.replyType
      });
      this.dialogLoading = false;
      try {
        res = res && res.data;
        this.paging.pages = res.total;
        this.paging.current = res.current;

        this.gridData = res.records;

        // 高亮选中行
        let replyContent = this.form.replyContent;
        if (replyContent) {
          let targetItem = this.gridData.find(v => v.mediaId == replyContent);
          if (targetItem) {
            this.$refs.dialogTable.setCurrentRow(targetItem);
          }
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    chooseMaterialItem() {
      this.dialogTableVisible = false;
      this.form.replyContent = this.currentRow.mediaId || "";
      this.triggerValidateReplyContent();
    },
    triggerValidateReplyContent() {
      this.$refs.form.validateField("replyContent");
    },
    onSubmit() {
      const { form, Utils } = this;
      const $form = this.$refs.form;

      $form.validate(async valid => {
        if (valid) {
          let param = Object.assign({}, form);
          this.loading = true;
          let res = await this.$api.keyword.addOrUpdate(param);
          this.loading = false;
          try {
            res = res.data;
            if (res.code == 1) {
              this.$alert("修改成功", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  if (action == "confirm") {
                    this.$router.push({
                      path: "/keyword/list"
                    });
                  }
                }
              });
            } else {
              this.$alert("修改失败", "提示", {
                confirmButtonText: "确定"
              });
            }
          } catch (e) {
            throw new Error(e);
          }
        } else {
          $form.$el.scrollIntoView({
            block: "center",
            behavior: "smooth"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page-keyword-edit  /deep/ {
    .ui-smaller {
      font-size: 0.8em;
    }
    .row-pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .el-row {
      margin-bottom: 20px;
    }
    .el-form-item__label {
      text-align: left;
      color: #333;
    }
    .el-input.is-disabled .el-input__inner {
      border-color: #e4e7ed;
    }
    .el-input__inner,
    .el-textarea__inner {
      border-radius: 0;
      border-color: #a9a9a9;
      color: #333;
    }
    .el-form-item {
      margin-bottom: 5px;
    }
  }
.page-keyword-edit {
  color: #333;
  .ui-width-custom {
    width: 300px;
  }
  .ui-width-custom-02 {
    width: 320px;
  }
  .ui-margin-right-10 {
    margin-right: 10px;
  }
  .btn-sure {
    margin-top: 20px;
    border-color: #ad8d5f;
    background: #ad8d5f;
    font-weight: bold;
    color: #f0d584;
    padding: 10px 73px;
  }

}
</style>