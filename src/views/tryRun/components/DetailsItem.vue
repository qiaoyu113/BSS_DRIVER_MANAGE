<template>
  <div class="DetailsItem">
    <van-collapse
      v-model="activeNames"
      :border="false"
      class="van-hairline--bottom"
    >
      <div
        v-for="(item, index) in list"
        :key="index"
      >
        <van-collapse-item
          v-if="!item.hide"
          :title="item.title"
          :name="index"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template
            v-if="item.tags && item.tags.length > 0"
            #title
          >
            <span class="margin-right-xs">{{ item.title }}</span>
            <van-tag
              v-for="(tag, tagIndex) in item.tags"
              :key="tagIndex"
              class="tag"
            >
              {{ tag }}
            </van-tag>
          </template>
          <van-cell
            v-for="(child, j) in item.children"
            :key="j"
            :title="child.title + '：'"
            :value="child.value('项目名称', '项目编号')"
          ></van-cell>
          <div
            v-if="item.detail"
            class="bottom van-hairline--top flex flex align-center justify-center"
          >
            <div class="details van-hairline--surround">
              详情
            </div>
          </div>
        </van-collapse-item>
      </div>
    </van-collapse>
  </div>
</template>

<script>
export default {
  name: 'DetailsItem',
  props: {
    list: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeNames: []
    }
  }
}
</script>

<style lang="less" scoped>
.DetailsItem{
  .van-collapse {
    ::v-deep {
      .van-cell::after{
        border-bottom: 2px solid #E5E9EF;
        transform: scale(1);
      }
      .van-collapse-item--border::after{
        border-top: 2px solid #E5E9EF;
        transform: scale(1);
      }
      .van-collapse-item__content {
        .van-cell::after{
          display: none;
        }
        .van-cell__title {
          margin-right: 10px;
          flex: none;
          width: 6em;
          font-size: @font-size-md;
          color: @gray-10;
        }
        .van-cell__value {
          flex-wrap: wrap;
          text-align: left;
          font-size: @font-size-md;
          color: @text-color;
        }
      }
    }
    .tag{
      height: 20px;
      padding: 0 11px;
      font-size: @font-size-sm;
      color: #EFF5FE;
      background: #7F8FBD;
      border-radius: 3px;
      &::before{
        display: none;
      }
      &+.tag{
        margin-left: 10px;
      }
    }
    .bottom {
      margin: 0 15px;
      height: 35px;
      .details {
        width: 70px;
        height: 20px;
        line-height: 20px;
        color: #838a9d;
        border-radius: 10px;
        text-align: center;
        font-size: @font-size-sm;
        &::after {
          border-radius: 20px;
        }
      }
    }
  }
}
</style>
