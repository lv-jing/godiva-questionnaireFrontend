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
        :model="form.details"
        label-width="120px"
        :rules="rules"
        :inline-message="true"
        size="small"
        :hide-required-asterisk="true"
      >
        <el-form-item label="问卷名称" prop="name">
          <el-input v-model="form.details.name" placeholder="请输入问卷名称" class="ui-width-custom"></el-input>
        </el-form-item>
        <el-form-item label="问卷类型" prop="region">
          <el-select v-model="form.details.region" placeholder="请选择问卷类型" class="ui-width-custom">
            <el-option label="售后问卷" value="售后问卷"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问卷编号" prop="no">
          <el-input v-model="form.details.no" placeholder="请输入问卷编号" class="ui-width-custom"></el-input>
        </el-form-item>
        <el-form-item class="form-item-title" label prop="questionf">
          <span slot="label">题目1</span>
          <el-input
            v-model="form.details.questionf"
            maxlength="60"
            show-word-limit
            placeholder="请输入题目1"
            class="ui-width-custom"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项1" prop="tagf1">
          <el-input
            v-model="form.details.tagf1"
            placeholder
            class="ui-width-custom-2 ui-margin-right-5"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项2" prop="tagf2">
          <el-input
            v-model="form.details.tagf2"
            placeholder
            class="ui-width-custom-2 ui-margin-right-5"
          ></el-input>
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
          <el-input v-model="form.details.tagf3" placeholder class="ui-width-custom-2"></el-input>
        </el-form-item>
        <el-form-item
          label="选项4"
          prop="tagf4"
          v-if="tagsForTitle1Status.find(t => t.name == 'tagf4').show"
        >
          <el-input v-model="form.details.tagf4" placeholder class="ui-width-custom-2"></el-input>
        </el-form-item>
        <el-form-item
          label="选项5"
          prop="tagf5"
          v-if="tagsForTitle1Status.find(t => t.name == 'tagf5').show"
        >
          <el-input v-model="form.details.tagf5" placeholder class="ui-width-custom-2"></el-input>
        </el-form-item>
        <br />
        <el-form-item class="form-item-title" label prop="questions">
          <span slot="label">题目2</span>
          <el-input
            v-model="form.details.questions"
            maxlength="60"
            show-word-limit
            placeholder="请输入题目2"
            class="ui-width-custom"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项1" prop="tags1">
          <el-input
            v-model="form.details.tags1"
            placeholder
            class="ui-width-custom-2 ui-margin-right-5"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项2" prop="tags2">
          <el-input
            v-model="form.details.tags2"
            placeholder
            class="ui-width-custom-2 ui-margin-right-5"
          ></el-input>
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
          <el-input v-model="form.details.tags3" placeholder class="ui-width-custom-2"></el-input>
        </el-form-item>
        <el-form-item
          label="选项4"
          prop="tags4"
          v-if="tagsForTitle2Status.find(t => t.name == 'tags4').show"
        >
          <el-input v-model="form.details.tags4" placeholder class="ui-width-custom-2"></el-input>
        </el-form-item>
        <el-form-item
          label="选项5"
          prop="tags5"
          v-if="tagsForTitle2Status.find(t => t.name == 'tags5').show"
        >
          <el-input v-model="form.details.tags5" placeholder class="ui-width-custom-2"></el-input>
        </el-form-item>
        <br />
        <el-form-item class="form-item-title" label prop>
          <span slot="label">留言框</span>
          <el-input
            v-model="form.details.guestMessage"
            maxlength="60"
            show-word-limit
            placeholder
            class="ui-width-custom"
          ></el-input>
          <el-checkbox-group
            style="display:inline-block;margin-left:10px"
            v-model="form.details.isRequired_guestmessage"
          >
            <el-checkbox label="是否必填"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- <el-form-item label="题目类型">
          <el-checkbox-group v-model="form.details.type">
            <el-checkbox :label="SCORE_KEY_NAME"></el-checkbox>
            <el-checkbox :label="SHORTANSWER_KEY_NAME"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form-item-title" label prop="title_01">
          <span slot="label" v-html="title_01_html"></span>
          <el-input
            v-model="form.details.title_01"
            maxlength="60"
            show-word-limit
            placeholder="请输入题目"
            class="ui-width-custom"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item-title" label prop="title_02">
          <span slot="label" v-html="title_02_html"></span>
          <el-input
            v-model="form.details.title_02"
            maxlength="60"
            show-word-limit
            placeholder="请输入题目"
            class="ui-width-custom"
          ></el-input>
        </el-form-item>
        <div class="form-stars">
          <el-form-item :label="`${starLevel}星`" v-for="starLevel in starsOrder" :key="starLevel">
            <el-checkbox-group v-model="form.details.isRequired_starlabel" v-if="starLevel == 1">
              <el-checkbox label="必填"></el-checkbox>
            </el-checkbox-group>
            <div class="form-stars-labels" v-if="form.tags[starLevel - 1]">
              <el-input
                v-for="(label, i) in form.tags[starLevel - 1].labels"
                :key="i"
                :placeholder="`标签${Utils.toNumberzhCN(i)}`"
                v-model="label.tagContent"
                class="ui-width-custom-02"
              ></el-input>
            </div>
          </el-form-item>

          <el-form-item class="form-stars-textarea" label="留言框">
            <el-checkbox-group v-model="form.details.isRequired_guestmessage">
              <el-checkbox label="必填"></el-checkbox>
            </el-checkbox-group>
            <div class="form-stars-labels" :class="{show: true}">
              <el-input
                type="textarea"
                v-model="form.details.guestMessage"
                class="ui-width-custom-02"
                placeholder="请输入留言内容"
                @input="handleGuestMessage"
              ></el-input>
            </div>
          </el-form-item>
        </div>-->

        <el-form-item align="right" style="width:83%">
          <el-button class="btn-sure" type="primary" size="medium" @click="onSubmit">确 认</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import Utils from "../../utils/utils";

export default {
  name: "Edit",
  data () {
    return {
      Utils,
      id: "",
      title_01_html: '题目<em class="ui-smaller">(问卷标题)</em>',
      title_02_html: '题目<em class="ui-smaller">(顾客留言标题)</em>',
      form: {
        details: {
          name: "",
          region: "",
          no: "",
          title_01: "",
          title_02: "",
          type: [],
          isRequired_starlabel: false,
          isRequired_guestmessage: false,
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
          tags5: '',
          guestMessage: ''
        },
        tags: Array(5)
          .fill(null)
          .map(
            (m, i) =>
              new Object({
                tagLevel: i + 1,
                labels: Array(3)
                  .fill(null)
                  .map(
                    (m, i) => new Object({ tagContent: "", tagOrder: i + 1 })
                  )
              })
          )
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
      SCORE_KEY_NAME: "评分",
      SHORTANSWER_KEY_NAME: "简答",
      starsOrder: [1, 4, 2, 5, 3],
      loading: false,
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
  async created () {
    const { id } = this.$route.query;
    const { Utils } = this;
    this.id = id;
    this.loading = true;
    let res = await this.$api.questionnare.qsItem({ id });
    this.loading = false;
    try {
      res = res.data;
      if (res.code == 1) {
        let resDetails = res.data,
          { details: formDetails } = this.form;
        formDetails.name = resDetails.questionnaireName;
        formDetails.region = resDetails.questionnaireType;
        formDetails.no = resDetails.questionnaireNo;
        formDetails.isRequired_guestmessage = resDetails.isRequired == 1;
        formDetails.guestMessage = resDetails.guestMessage;

        formDetails.questionf = resDetails.questionf;
        formDetails.questions = resDetails.questions;
        formDetails.tagf1 = resDetails.tagf1;
        formDetails.tagf2 = resDetails.tagf2;
        formDetails.tagf3 = resDetails.tagf3;
        formDetails.tagf4 = resDetails.tagf4;
        formDetails.tagf5 = resDetails.tagf5;
        formDetails.tags1 = resDetails.tags1;
        formDetails.tags2 = resDetails.tags2;
        formDetails.tags3 = resDetails.tags3;
        formDetails.tags4 = resDetails.tags4;
        formDetails.tags5 = resDetails.tags5;
        this.tagsForTitle1Status.forEach(t => {
          t.show = !!resDetails[t.name]
        })
        this.tagsForTitle2Status.forEach(t => {
          t.show = !!resDetails[t.name]
        })
        // this.handleTagsData(res.data);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  computed: {
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
        this.form.details[target.name] = ''
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
    handleGuestMessage () {
      this.$forceUpdate();
    },
    handleTagsData ({ tags }) {
      let pageTags = this.form.tags;
      tags.forEach(tag => {
        let targetTag = pageTags.find(t => t.tagLevel == tag.tagLevel);
        if (targetTag) {
          let targetLabel = targetTag.labels.find(
            l => l.tagOrder == tag.tagOrder
          );
          if (targetLabel) {
            targetLabel.tagContent = tag.tagContent;
          }
        }
      });
    },
    onSubmit () {
      const { Utils } = this;
      const { details, tags } = this.form;
      const $form = this.$refs.form;

      $form.validate(async valid => {
        if (valid) {
          let param = {
            action: 2,
            id: this.id,
            questionnaireName: details.name,
            questionnaireType: details.region,
            questionnaireNo: details.no,
            isRequired: details.isRequired_guestmessage ? "1" : "2",
            guestMessage: details.guestMessage,
            questionf: details.questionf,
            questions: details.questions,
            tagf1: details.tagf1,
            tagf2: details.tagf2,
            tagf3: details.tagf3,
            tagf4: details.tagf4,
            tagf5: details.tagf5,
            tags1: details.tags1,
            tags2: details.tags2,
            tags3: details.tags3,
            tags4: details.tags4,
            tags5: details.tags5
          };

          // for (let [i, item] of tags.entries()) {
          //   const { labels } = item;
          //   for (let [index, label] of labels.entries()) {
          //     if (!label.tagContent) {
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
          //     let { labels, ...otherParam } = item;
          //     param.tags.push(Object.assign({}, otherParam, label));
          //   }
          // }
          this.loading = true;
          let res = await this.$api.questionnare.addOrUpdateQs(param);
          this.loading = false;
          try {
            res = res.data;

            if (res.code == 1) {
              this.$alert("修改成功", "提示", {
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