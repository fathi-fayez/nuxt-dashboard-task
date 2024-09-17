<template>
  <el-row>
    <el-col :span="4">
      <sideBar />
    </el-col>

    <el-col :span="20">
      <slot />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped></style>
