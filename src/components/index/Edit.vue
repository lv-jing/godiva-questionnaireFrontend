<template>
  <div class="page-index-edit">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index/list' }">售后问卷</el-breadcrumb-item>
        <el-breadcrumb-item>修改问卷</el-breadcrumb-item>
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
        <el-form-item label="问卷名称" prop="questionnaireName">
          <el-input v-model="form.questionnaireName" placeholder="请输入问卷名称" class="ui-width-custom"></el-input>
        </el-form-item>
        <el-form-item label="问卷类型" prop="questionnaireType">
          <el-select v-model="form.questionnaireType" placeholder="请选择问卷类型" class="ui-width-custom">
            <el-option label="售后问卷" value="售后问卷"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问卷编号" prop="questionnaireNo">
          <el-input v-model="form.questionnaireNo" placeholder="请输入问卷编号" class="ui-width-custom"></el-input>
        </el-form-item>
        <template v-for="(item,index) in list">
          <el-form-item class="form-item-title" :key="index" :label="`题目${index+1}`"
                        :prop="item.name"
                        :rules="{required: true,message: `请输入题目${index+1}`,trigger: 'blur'}">
            <el-input
              v-model="form[item.name]"
              maxlength="60"
              show-word-limit
              :placeholder="`请输入题目${index+1}`"
              class="ui-width-custom"
            ></el-input>
            <!--            <i-->
            <!--              v-if="list.length-1===index"-->
            <!--              class="ui-icon-plus el-icon-circle-plus-outline"-->
            <!--              @click="addTag(index)"-->
            <!--              :class="{disable: index>=3}"-->
            <!--            ></i>-->
            <!--            <i-->
            <!--              v-if="list.length-1===index"-->
            <!--              class="ui-icon-plus el-icon-remove-outline"-->
            <!--              @click="removeTag(index)"-->
            <!--              :class="{disable: index===1}"-->
            <!--            ></i>-->
          </el-form-item>
          <el-form-item v-for="(items,indexs) in item.list" :label="`选项${indexs+1}`"
                        :prop="items.name"
                        :rules="{required: true,message: `请输入选项${indexs+1}`,trigger: 'blur'}">
            <el-input v-model="form[items.name]" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
            <!--            <i-->
            <!--              v-if="list[index].list.length-1===indexs"-->
            <!--              class="ui-icon-plus el-icon-circle-plus-outline"-->
            <!--              @click="addTags(index,indexs)"-->
            <!--              :class="{disable: indexs>=3}"-->
            <!--            ></i>-->
            <!--            <i-->
            <!--              v-if="list[index].list.length-1===indexs"-->
            <!--              class="ui-icon-plus el-icon-remove-outline"-->
            <!--              @click="removeTags(index,indexs)"-->
            <!--              :class="{disable: indexs===1}"-->
            <!--            ></i>-->
          </el-form-item>
        </template>
        <el-form-item class="form-item-title" label="题目4" prop="questionFourth">
          <el-input
            v-model="form.questionFourth"
            maxlength="60"
            show-word-limit
            placeholder="请输入题目4"
            class="ui-width-custom"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项1" prop="tagfour1">
          <el-input v-model="form.tagfour1" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <el-form-item label="选项2" prop="tagfour2">
          <el-input v-model="form.tagfour2" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <el-form-item label="选项3" prop="tagfour3">
          <el-input v-model="form.tagfour3" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <el-form-item label="选项4" prop="tagfour4">
          <el-input v-model="form.tagfour4" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <el-form-item label="选项5" prop="tagfour5">
          <el-input v-model="form.tagfour5" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <el-form-item class="form-item-title" label prop>
          <span slot="label">留言框</span>
          <el-input
            v-model="form.guestMessage"
            maxlength="60"
            show-word-limit
            placeholder
            class="ui-width-custom"
          ></el-input>
          <el-checkbox-group
            style="display:inline-block;margin-left:10px"
            v-model="form.isRequired"
          >
            <el-checkbox label="是否必填" true-label="1" false-label="2"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item align="right" style="width:83%">
          <el-button class="btn-sure" type="primary" size="medium" @click="onSubmit">确 认</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      list: [{
        name: 'questionf',
        list: [
          {name: 'tagf1'},
          {name: 'tagf2'},
          {name: 'tagf3'},
        ]
      }, {
        name: 'questions',
        list: [
          {name: 'tags1'},
          {name: 'tags2'},
          {name: 'tags3'},
        ]
      },
        {
        name: 'questionThird',
        list: [
          {name: 'tagth1'},
          {name: 'tagth2'},
          {name: 'tagth3'},
        ]
      },
      ],
      form: {
        isRequired: '',
        questionnaireName: "",
        questionnaireType: "",
        questionnaireNo: "",
        questionThird: "",
        questionFourth: "",
        questionFifth: '',
        questionf: '',
        questions: '',
        tagf1: '',
        tagf2: '',
        tagf3: '',
        tags1: '',
        tags2: '',
        tags3: '',
        tagth1: '',
        tagth2: '',
        tagth3: '',
        tagfour1: '',
        tagfour2: '',
        tagfour3: '',
        tagfour4: '',
        tagfour5: '',
        // tagfifth1: '',
        // tagfifth2: '',
        // tagfifth3: ''
      },
      loading: false,
      rules: {
        questionnaireName: [{required: true, message: "请输入问卷名称", trigger: "blur"}],
        questionnaireType: [{required: true, message: "请选择问卷类型", trigger: "change"}],
        questionnaireNo: [{required: true, message: "请输入问卷编号", trigger: "blur"}],
        questionFourth: [{required: true, message: "请输入题目4", trigger: "blur"}],
        tagfour1: [{required: true, message: "请输入选项1", trigger: "blur"}],
        tagfour2: [{required: true, message: "请输入选项2", trigger: "blur"}],
        tagfour3: [{required: true, message: "请输入选项3", trigger: "blur"}],
        tagfour4: [{required: true, message: "请输入选项4", trigger: "blur"}],
        tagfour5: [{required: true, message: "请输入选项5", trigger: "blur"}],
      }
    };
  },
  async created() {
    const {id} = this.$route.query;
    this.loading = true;
    let res = await this.$api.questionnare.qsItem({id});
    this.loading = false;
    try {
      res = res.data;
      if (res.code === 1) {
        this.form = {
          ...this.form,
          ...res.data
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  methods: {
    onSubmit() {
      const $form = this.$refs.form;
      $form.validate(async valid => {
        if (valid) {
          let param = {
            action: 2,
            ...this.form
          };
          this.loading = true;
          let res = await this.$api.questionnare.addOrUpdateQs(param);
          this.loading = false;
          try {
            res = res.data;
            if (res.code === 1) {
              this.$alert("修改成功", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  if (action === "confirm") {
                    this.$router.push({
                      path: "/index/list"
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
.page-index-edit {
  color: #333;

  .ui-icon-plus {
    display: inline-block;
    margin-left: 5px;
    font-size: 23px;
    vertical-align: middle;
    color: #a9a9a9;
    cursor: pointer;

    &.disable {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .form-stars {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .el-checkbox-group {
      position: absolute;
      left: -149px;
      top: 20px;
    }

    .el-checkbox__label {
      padding-left: 4px;
    }
  }

  .form-stars-labels {
    display: flex;
    flex-wrap: wrap;
    margin-left: -23px;

    .el-input__inner {
      width: 300px;
    }
  }

  .ui-width-custom {
    width: 300px;
  }

  .ui-width-custom-2 {
    width: 200px;
  }

  .ui-margin-right-5 {
    margin-right: 5px;
  }

  .ui-width-custom-02 {
    width: 320px;
  }

  /deep/ .ui-smaller {
    font-size: 0.8em;
  }
}
</style>
<style lang="less">
.page-index-edit {
  .el-row {
    margin-bottom: 20px;
  }

  .el-form-item__label {
    text-align: left;
    color: #333;
  }

  .form-stars {
    .el-form-item {
      max-width: 50%;
    }

    .el-form-item__label {
      width: 42px !important;
      white-space: nowrap;
    }

    .el-form-item__content {
      margin-left: 142px !important;
      line-height: 3;
      width: 61%;
    }

    .form-stars-textarea {
      width: 50%;
    }
  }

  .form-stars-labels {
    .el-input {
      line-height: 3;
    }

    .el-input__inner {
      margin-right: 10px;

      &::-webkit-input-placeholder {
        color: #733125;
      }
    }
  }

  .el-input__inner {
    border-radius: 0;
    border-color: #a9a9a9;
    color: #333;
  }

  .el-form-item {
    margin-bottom: 5px;
  }

  .el-button {
    border-color: #ad8d5f;
    background: #ad8d5f;
    font-weight: bold;
    color: #f0d584;
    padding: 10px 73px;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: inherit;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: inherit;
    border-color: inherit;
  }

  .el-checkbox__inner::after {
    border-color: #333;
  }
}
</style>
