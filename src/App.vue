<script setup lang="ts">
import Icons from "~/components/Icons.vue";
</script>
<template>
  <!--  <el-config-provider namespace="ep">-->
  <div class="app">
    <div class="header">
      <base-header></base-header>
    </div>
    <div class="main">
      <icons></icons>
    </div>
    <div class="footer center">ydys</div>
  </div>
  <!--  </el-config-provider>-->
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  .header {
    margin: 0 auto;
    max-width: 950px;
    width: calc(100% - 10px);
    height: 50px;
    border-bottom: 1px solid var(--ep-border-color);
    position: relative;
  }

  .main {
    flex: 1;
    position: relative;
    overflow: hidden;
    max-width: 950px;
    margin: 0 auto;
    width: 100%;
  }

  .footer {
    margin: 0 auto;
    max-width: 950px;
    height: 80px;
    border-top: 1px solid var(--ep-border-color);
    position: relative;
  }
}
</style>
