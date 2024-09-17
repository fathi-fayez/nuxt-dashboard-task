<template>
  <el-row class="container">
    <el-col :span="12" :xs="0" :sm="0" :md="12" :lg="12">
      <div class="left-background">
        <div class="circle"></div>
      </div>
    </el-col>
    <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12">
      <slot />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.container {
  height: 100vh;
}
.left-background {
  background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .circle {
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: linear-gradient(215deg, #e7225d 0%, #ea2c4c 100%);
  }
}
</style>
