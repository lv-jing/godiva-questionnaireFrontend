<template>
  <div class="page-index-preview">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index/list' }">售后问卷</el-breadcrumb-item>
        <el-breadcrumb-item>查看问卷</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <div class="p-content" v-loading="loading">
      <div class="p-item">
        <span class="p-item-label">问卷名称</span>
        <p class="p-item-text fixwidth">{{details.questionnaireName}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">问卷类型</span>
        <p class="p-item-text fixwidth">{{details.questionnaireType}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">问卷编号</span>
        <p class="p-item-text fixwidth">{{details.questionnaireNo}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">题目1</span>
        <p class="p-item-text fixwidth">{{details.questionf}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项1</span>
        <p class="p-item-text fixwidth">{{details.tagf1}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项2</span>
        <p class="p-item-text fixwidth">{{details.tagf2}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项3</span>
        <p class="p-item-text fixwidth">{{details.tagf3}}</p>
      </div>
      <br />
      <div class="p-item">
        <span class="p-item-label">题目2</span>
        <p class="p-item-text fixwidth">{{details.questions}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项1</span>
        <p class="p-item-text fixwidth">{{details.tags1}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项2</span>
        <p class="p-item-text fixwidth">{{details.tags2}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项3</span>
        <p class="p-item-text fixwidth">{{details.tags3}}</p>
      </div>
      <br />
      <br />
      <div class="p-item">
        <span class="p-item-label">题目3</span>
        <p class="p-item-text fixwidth">{{details.questionThird}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项1</span>
        <p class="p-item-text fixwidth">{{details.tagth1}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项2</span>
        <p class="p-item-text fixwidth">{{details.tagth2}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项3</span>
        <p class="p-item-text fixwidth">{{details.tagth3}}</p>
      </div>
      <br />
      <br />
      <div class="p-item">
        <span class="p-item-label">题目4</span>
        <p class="p-item-text fixwidth">{{details.questionFourth}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项1</span>
        <p class="p-item-text fixwidth">{{details.tagfour1}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项2</span>
        <p class="p-item-text fixwidth">{{details.tagfour2}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项3</span>
        <p class="p-item-text fixwidth">{{details.tagfour3}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项4</span>
        <p class="p-item-text fixwidth">{{details.tagfour4}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">选项5</span>
        <p class="p-item-text fixwidth">{{details.tagfour5}}</p>
      </div>
      <br />
      <div class="p-item">
        <span class="p-item-label">
          留言框
          <template v-if="details.isRequired == 1">
            <br />*必填
          </template>
        </span>
        <p class="p-item-text fixwidth">{{details.guestMessage}}</p>
      </div>

      <!-- <div class="p-item">
        <span class="p-item-label">题目类型</span>
        <p
          class="p-item-text"
        >{{details.titleType && details.titleType.split(',').map(n=> Utils.SCORE_MAP.find(item => item.code == n).name).join(',')}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">
          题目
          <em class="ui-smaller">(问卷标题)</em>
        </span>
        <p class="p-item-text">{{details.titleContent}}</p>
      </div>
      <div class="p-item">
        <span class="p-item-label">
          题目
          <em class="ui-smaller">(顾客留言标题)</em>
        </span>
        <p class="p-item-text">{{details.titleContent2}}</p>
      </div>
      <div class="p-item long">
        <div class="stars-wrap" v-for="starLevel in starsOrder" :key="starLevel">
          <span class="p-item-label">
            {{starLevel}}星
            <template v-if="starLevel == 1 && details.isRequired == 1">
              <br />*必填
            </template>
          </span>
          <div class="item-wrap" v-if="tags[starLevel - 1]">
            <p
              v-for="(label, i) in tags[starLevel - 1].labels"
              :key="i"
              class="p-item-text"
            >{{label.content}}</p>
          </div>
        </div>

        <div
          class="stars-wrap"
          v-if="details.titleType && details.titleType.split(',').includes('2')"
        >
          <span class="p-item-label">
            留言框
            <template v-if="details.isRequired2 == 1">
              <br />*必填
            </template>
          </span>
          <div class="item-wrap">
            <p class="p-item-text">{{details.guestMessage}}</p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Utils from "../../utils/utils";

export default {
  name: "Preview",
  data () {
    return {
      Utils,
      details: {},
      tags: [],
      starsOrder: [1, 4, 2, 5, 3]
    };
  },
  async created () {
    const { id } = this.$route.query;
    this.loading = true;
    let res = await this.$api.questionnare.qsItem({ id });
    this.loading = false;
    try {
      res = res.data;
      if (res.code == 1 && res.data) {
        this.details = res.data;
        // this.tags = this.handleTagsData(res.data);
      }
    } catch (e) {

    }
  },
  methods: {
    handleTagsData ({ tags }) {
      let ret = [];
      tags.forEach(tag => {
        let target = ret.find(n => n.tagLevel === tag.tagLevel);
        if (!target) {
          this.$set(tag, "labels", []);
          tag.labels.push({ order: tag.tagOrder, content: tag.tagContent });
          ret.push(tag);
        } else {
          target.labels.push({ order: tag.tagOrder, content: tag.tagContent });
        }
      });
      ret.forEach(n => {
        n.labels = n.labels.sort(
          (a, b) => parseInt(a.order) - parseInt(b.order)
        );
      });
      ret = ret.sort((a, b) => parseInt(a.tagLevel) - parseInt(b.tagLevel));
      return ret;
    }
  }
};
</script>

<style lang="less" scoped>
.p-content {
  font-size: 14px;
  .p-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .p-item-label {
      display: inline-block;
      width: 9%;
    }
    &.long {
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: flex-start;
    }
    .stars-wrap {
      width: 50%;
      display: flex;
      align-items: flex-start;
      .p-item-label {
        width: 12%;
      }
      .item-wrap {
        flex: 1;
        line-height: 2;
      }
    }
  }
  .fixwidth {
    text-align: center;
    width: 20%;
  }
  .ui-smaller {
    font-size: 0.8em;
  }
}
</style>
<style scoped lang="less">
.page-index-preview {
  .el-row {
    margin-bottom: 20px;
  }
}
</style>
