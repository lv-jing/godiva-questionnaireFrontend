<template>
  <div class="page-index-add">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index/list' }">售后问卷</el-breadcrumb-item>
        <el-breadcrumb-item>新建问卷</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-form
        v-loading="loading"
        ref="form"
        label-position="left"
        :model="form"
        label-width="120px"
        :rules="rules"
        :inline-message="true"
        size="small"
        :hide-required-asterisk="true"
      >
        <el-form-item label="问卷名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入问卷名称" class="ui-width-custom"></el-input>
        </el-form-item>
        <el-form-item label="问卷类型" prop="region">
          <el-select v-model="form.region" placeholder="请选择问卷类型" class="ui-width-custom">
            <el-option label="售后问卷" value="售后问卷"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问卷编号" prop="no">
          <el-input v-model="form.no" placeholder="请输入问卷编号" class="ui-width-custom"></el-input>
        </el-form-item>
        <el-form-item class="form-item-title" label prop="questionf">
          <span slot="label">题目1</span>
          <el-input
            v-model="form.questionf"
            maxlength="60"
            show-word-limit
            placeholder="请输入题目1"
            class="ui-width-custom"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项1" prop="tagf1">
          <el-input v-model="form.tagf1" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <el-form-item label="选项2" prop="tagf2">
          <el-input v-model="form.tagf2" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
          <i
            class="ui-icon-plus el-icon-circle-plus-outline"
            @click="addTag('title1')"
            :class="{disable: !canPlusForTitle1}"
          ></i>
          <i
            class="ui-icon-plus el-icon-remove-outline"
            @click="removeTag('title1')"
            :class="{disable: !canRemoveForTitle1}"
          ></i>
        </el-form-item>
        <el-form-item
          label="选项3"
          prop="tagf3"
          v-if="tagsForTitle1Status.find(t => t.name == 'tagf3').show"
        >
          <el-input v-model="form.tagf3" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <el-form-item
          label="选项4"
          prop="tagf4"
          v-if="tagsForTitle1Status.find(t => t.name == 'tagf4').show"
        >
          <el-input v-model="form.tagf4" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <el-form-item
          label="选项5"
          prop="tagf5"
          v-if="tagsForTitle1Status.find(t => t.name == 'tagf5').show"
        >
          <el-input v-model="form.tagf5" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <br />
        <el-form-item class="form-item-title" label prop="questions">
          <span slot="label">题目2</span>
          <el-input
            v-model="form.questions"
            maxlength="60"
            show-word-limit
            placeholder="请输入题目2"
            class="ui-width-custom"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项1" prop="tags1">
          <el-input v-model="form.tags1" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <el-form-item label="选项2" prop="tags2">
          <el-input v-model="form.tags2" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
          <i
            class="ui-icon-plus el-icon-circle-plus-outline"
            @click="addTag('title2')"
            :class="{disable: !canPlusForTitle2}"
          ></i>
          <i
            class="ui-icon-plus el-icon-remove-outline"
            @click="removeTag('title2')"
            :class="{disable: !canRemoveForTitle2}"
          ></i>
        </el-form-item>
        <el-form-item
          label="选项3"
          prop="tags3"
          v-if="tagsForTitle2Status.find(t => t.name == 'tags3').show"
        >
          <el-input v-model="form.tags3" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <el-form-item
          label="选项4"
          prop="tags4"
          v-if="tagsForTitle2Status.find(t => t.name == 'tags4').show"
        >
          <el-input v-model="form.tags4" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <el-form-item
          label="选项5"
          prop="tags5"
          v-if="tagsForTitle2Status.find(t => t.name == 'tags5').show"
        >
          <el-input v-model="form.tags5" placeholder class="ui-width-custom-2 ui-margin-right-5"></el-input>
        </el-form-item>
        <br />
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
            v-model="form.isRequired_guestmessage"
          >
            <el-checkbox label="是否必填"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- <br />
        <br />
        <br />-->
        <!-- <el-form-item label="题目类型">
          <el-checkbox-group v-model="form.type">
            <el-checkbox :label="Utils.SCORE_KEY_NAME" checked></el-checkbox>
            <el-checkbox :label="Utils.SHORTANSWER_KEY_NAME"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form-item-title" label prop="title_01">
          <span slot="label" v-html="title_01_html"></span>
          <el-input
            v-model="form.title_01"
            maxlength="60"
            show-word-limit
            placeholder="请输入题目"
            class="ui-width-custom"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item-title" label prop="title_02">
          <span slot="label" v-html="title_02_html"></span>
          <el-input
            v-model="form.title_02"
            maxlength="60"
            show-word-limit
            placeholder="请输入题目"
            class="ui-width-custom"
          ></el-input>
        </el-form-item>
        <div class="form-stars">
          <el-form-item :label="`${item}星`" v-for="item in starsOrder" :key="item">
            <span class="btn-addlabel" @click="showAddLabels(item)">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>添加标签
            </span>
            <el-checkbox-group v-model="form.isRequired_starlabel" v-if="item == 1">
              <el-checkbox label="是否必填"></el-checkbox>
            </el-checkbox-group>
            <div class="form-stars-labels" :class="{show: starLabels[item - 1].isAdd}">
              <el-input
                v-model="starLabels[item - 1].labels[index].content"
                :placeholder="`标签${Utils.toNumberzhCN(index)}`"
                v-for="(i, index) in starLabels[item - 1].labels"
                :key="index"
              ></el-input>
            </div>
          </el-form-item>

          <el-form-item class="form-stars-textarea" label>
            <span class="btn-addlabel" @click="showAddQuestion">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>留言框
            </span>
            <el-checkbox-group v-model="form.isRequired_guestmessage">
              <el-checkbox label="是否必填"></el-checkbox>
            </el-checkbox-group>
            <div class="form-stars-labels" :class="{show: needQuestion}">
              <el-input type="textarea" v-model="form.guestMessage" placeholder="请输入留言内容"></el-input>
            </div>
          </el-form-item>
        </div>-->

        <el-button class="btn-sure" type="primary" size="medium" @click="onSubmit">确 认</el-button>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import Utils from "../../utils/utils";

export default {
  name: "Add",
  data () {
    return {
      Utils,
      loading: false,
      title_01_html: '题目<em class="ui-smaller">(问卷标题)</em>',
      title_02_html: '题目<em class="ui-smaller">(顾客留言标题)</em>',
      form: {
        name: "",
        region: "",
        no: "",
        type: [],
        title_01: "",
        title_02: "",
        isRequired_starlabel: false,
        isRequired_guestmessage: false,
        guestMessage: "",
        questionf: '',
        questions: '',
        tagf1: '',
        tagf2: '',
        tagf3: '',
        tagf4: '',
        tagf5: '',
        tags1: '',
        tags2: '',
        tags3: '',
        tags4: '',
        tags5: ''
      },
      tagsForTitle1Status: [
        { show: false, name: 'tagf3' },
        { show: false, name: 'tagf4' },
        { show: false, name: 'tagf5' }
      ],
      tagsForTitle2Status: [
        { show: false, name: 'tags3' },
        { show: false, name: 'tags4' },
        { show: false, name: 'tags5' }
      ],
      starsOrder: [1, 4, 2, 5, 3],
      starLabels: Array(5)
        .fill(null)
        .map(
          () =>
            new Object({
              isAdd: false,
              labels: Array(3)
                .fill(null)
                .map((m, i) => new Object({ content: "", order: i }))
            })
        ),
      rules: {
        name: [{ required: true, message: "请输入问卷名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择问卷类型", trigger: "change" }
        ],
        no: [{ required: true, message: "请输入问卷编号", trigger: "blur" }],
        title_01: [{ required: true, message: "请输入题目", trigger: "blur" }],
        title_02: [{ required: true, message: "请输入题目", trigger: "blur" }],
        questionf: [{ required: true, message: "请输入题目1", trigger: "blur" }],
        questions: [{ required: true, message: "请输入题目2", trigger: "blur" }],
        tagf1: [{ required: true, message: "请输入选项1", trigger: "blur" }],
        tagf2: [{ required: true, message: "请输入选项2", trigger: "blur" }],
        // tagf3: [{ required: true, message: "请输入选项3", trigger: "blur" }],
        tags1: [{ required: true, message: "请输入选项1", trigger: "blur" }],
        tags2: [{ required: true, message: "请输入选项2", trigger: "blur" }],
        // tags3: [{ required: true, message: "请输入选项3", trigger: "blur" }]
      }
    };
  },
  computed: {
    needQuestion () {
      return this.form.type.includes(this.SHORTANSWER_KEY_NAME);
    },
    canPlusForTitle1 () {
      return this.tagsForTitle1Status.find(t => !t.show)
    },
    canRemoveForTitle1 () {
      return this.tagsForTitle1Status.find(t => t.show)
    },
    canPlusForTitle2 () {
      return this.tagsForTitle2Status.find(t => !t.show)
    },
    canRemoveForTitle2 () {
      return this.tagsForTitle2Status.find(t => t.show)
    }
  },
  methods: {
    removeTag (type) {
      let targetArr;
      if (type == 'title1') {
        targetArr = this.tagsForTitle1Status
      } else {
        targetArr = this.tagsForTitle2Status
      }
      let copyArr = JSON.parse(JSON.stringify(targetArr))
      copyArr.reverse()
      let target = copyArr.find(t => t.show)
      if (target) {
        target.show = false
        this.form[target.name] = ''
        if (type == 'title1') {
          this.tagsForTitle1Status = copyArr.reverse()
        } else {
          this.tagsForTitle2Status = copyArr.reverse()
        }
      }
    },
    addTag (type) {
      let targetArr;
      if (type == 'title1') {
        targetArr = this.tagsForTitle1Status
      } else {
        targetArr = this.tagsForTitle2Status
      }
      let target = targetArr.find(t => !t.show)
      if (target) {
        target.show = true
        
      }
    },
    showAddLabels (i) {
      let starLabels = this.starLabels;
      if (starLabels[i - 1].isAdd) {
        return;
      }
      this.$set(
        starLabels,
        i - 1,
        Object.assign(starLabels[i - 1], { isAdd: true })
      );
    },
    showAddQuestion () {
      if (this.needQuestion) {
        return;
      }
      this.form.type.push(this.SHORTANSWER_KEY_NAME);
    },
    async onSubmit () {
      const { form, Utils } = this;
      const $form = this.$refs.form;
      const starLabels = this.starLabels;
      $form.validate(async (valid, object) => {
        if (valid) {
          let param = {
            action: 1,
            questionnaireName: form.name,
            questionnaireType: form.region,
            questionnaireNo: form.no,
            isRequired: form.isRequired_guestmessage ? 1 : 2,
            guestMessage: form.guestMessage,
            questionf: form.questionf,
            questions: form.questions,
            tagf1: form.tagf1,
            tagf2: form.tagf2,
            tagf3: form.tagf3,
            tagf4: form.tagf4,
            tagf5: form.tagf5,

            tags1: form.tags1,
            tags2: form.tags2,
            tags3: form.tags3,
            tags4: form.tags4,
            tags5: form.tags5
          };

          // for (let [i, item] of starLabels.entries()) {
          //   const { labels } = item;
          //   for (let [index, label] of labels.entries()) {
          //     if (!label.content) {
          //       this.$alert(
          //         `${i + 1}星级的标签${Utils.toNumberzhCN(
          //           index
          //         )}未填写，请填写后重试！`,
          //         "提示",
          //         {
          //           confirmButtonText: "确定"
          //         }
          //       );
          //       return false;
          //     }
          //     param.tags.push({
          //       tagContent: label.content,
          //       tagLevel: i + 1,
          //       tagOrder: label.order + 1
          //     });
          //   }
          // }
          this.loading = true;
          let res = await this.$api.questionnare.addOrUpdateQs(param);
          this.loading = false;
          try {
            res = res.data;
            if (res.code == 1) {
              this.$alert("新增成功", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  if (action == "confirm") {
                    this.$router.push({
                      path: "/index/list"
                    });
                  }
                }
              });
            } else {
              this.$alert("新增失败", "提示", {
                confirmButtonText: "确定"
              });
            }
          } catch (e) { }
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
.page-index-add {
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
      display: inline-block;
    }
    .btn-addlabel {
      background: #f0d584;
      width: 150px;
      margin-right: 20px;
      display: inline-block;
      height: 18px;
      line-height: 18px;
      text-align: center;
      position: relative;
      cursor: pointer;
      i {
        position: absolute;
        left: -1px;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
      }
    }
  }
  .form-stars-labels {
    opacity: 0;
    display: flex;
    flex-wrap: wrap;
    margin-left: -23px;
    &.show {
      opacity: 1;
    }
    .el-input__inner {
      width: 200px;
    }
  }
  .btn-sure {
    margin-top: 20px;
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
  /deep/ .ui-smaller {
    font-size: 0.8em;
  }
}
</style>
<style lang="less">
.page-index-add {
  .el-form-item__label {
    color: #333;
  }
  .form-stars {
    .el-form-item {
      max-width: 50%;
    }
    .el-form-item__label {
      width: 42px !important;
    }
    .el-form-item__content {
      margin-left: 42px !important;
      line-height: 3;
      width: 61%;
    }
    .form-stars-textarea {
      width: 50%;
    }
  }
  .form-stars-labels {
    .el-input {
      width: auto;
      line-height: 2.2;
    }
    .el-input__inner {
      width: 193px;
      margin-right: 10px;
      height: 20px;
      line-height: 20px;
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
  .el-row {
    margin-bottom: 20px;
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