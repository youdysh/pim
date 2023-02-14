<script setup lang="ts">
import {ref, computed, Ref} from 'vue';
import * as icons from 'simple-icons';
import type {SimpleIcon} from 'simple-icons';
import chroma from 'chroma-js';
import {isDark} from "~/composables";
import {useFingerprint} from '~/store/fingerprint'
import {ElMessage} from "element-plus";
import {passwordAndTitleToCode} from "~/components/util";

const fingerprint = useFingerprint()

const selectIcon = (icon?: SimpleIcon) => {
  console.log(fingerprint.password, icon)
  if (fingerprint.password) {
    let title;
    if (icon) {
      title = icon.title;
    } else if (!!filterText.value) {
      title = filterText.value
    } else {
      return ElMessage.warning('请输入客户端名字或者选择已有客户端')
    }
    const code = passwordAndTitleToCode(fingerprint.password, title)
    console.log(code)
  } else {
    ElMessage.warning('请先认证')
  }
};

// 分页
const pageSize = ref(420);
const total = computed(() => iconsResult.value.length);
const currentPage = ref(1);
const pageIcons = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return iconsResult.value.slice(start, end);
});
const resetPage = () => {
  currentPage.value = 1;
};
const handleSizeChange = (val: number) => {
  currentPage.value = 1;
  pageSize.value = val;
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};
// 条件
const filterText = ref('');
// 结果集
const iconsResult = computed(() => {
  resetPage();
  const result = []
  for (let iconsKey in icons) {
    const item = icons[iconsKey as keyof typeof icons];
    if (filterText.value) {
      if (item.title.toLowerCase().includes(filterText.value.toLowerCase())) {
        result.push(item);
      }
    } else {
      result.push(item);
    }
  }
  return result;
});

// 为svg添加颜色
const getSVG = (svg: string) => {
  return svg.replace(/<path /g, '<path fill="currentColor" ')
}
// 调整颜色适配白天和黑夜两个模式
const isDarkNow = computed(() => isDark.value);
const adjustColor = (isDark: Ref<boolean>, colorHex: string): string => {
  let color = "#" + colorHex;
  let isDaytime = !isDark.value;
  let hsl = chroma(color).hsl();
  let hue = hsl[0];
  let saturation = hsl[1];
  let luminance = hsl[2];
  let targetLuminance = isDaytime ? 0.8 : 0.2;

  if (hue === 0 && saturation === 0) {
    luminance = targetLuminance;
  } else {
    let brightnessDifference = targetLuminance - luminance;
    luminance = luminance + brightnessDifference * 0.5;
  }

  let newColor = chroma.hsl(hue, saturation, luminance);
  return newColor.hex();
}
</script>

<template>
  <div class="icons">
    <div class="select-line">
      <el-input class="select-input" v-model="filterText" placeholder="客户端" clearable></el-input>
      <el-button clearable @click="selectIcon()">生成密码</el-button>
    </div>
    <div class="grid-container">
      <div class="scroll-box">
        <el-card class="card pointer" body-style="padding: 0;" :style="{color: adjustColor(isDarkNow,icon.hex)}"
                 v-for="icon in pageIcons" :key="icon.title" @click="selectIcon(icon)">
          <div class="img" v-html="getSVG(icon.svg)"></div>
          <div class="text">{{ icon.title }}</div>
        </el-card>
      </div>
    </div>
    <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        size="small"
        background
        :total="total">
    </el-pagination>
  </div>
  <el-drawer v-model="drawer" direction="btt">

  </el-drawer>
</template>

<style scoped lang="scss">
.icons {
  margin-top: 10px;
  height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  margin-bottom: 10px;

  .select-line {
    width: calc(100% - 20px);
    margin-bottom: 3px;
    display: flex;

    .select-input {
      margin-right: 10px;
    }
  }

  .pagination {
    margin-top: 3px;
  }

  .grid-container {
    position: relative;
    flex: 1;
    overflow: hidden;

    .scroll-box {
      width: 100%;
      height: 100%;
      overflow: auto;
      max-height: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: flex-start;
    }

    .card {
      z-index: 100;
      margin: 10px;
      width: 100px;
      height: 120px;
      padding: 0;

      .img {
        display: block;
        width: 70%;
        height: 70%;
        margin-left: 15%;
        margin-top: 2px;

        svg {
          fill: currentColor !important;
        }
      }

      .text {
        height: 40px;
        font-size: 15px;
        text-align: center;
        font-weight: 400;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

</style>
