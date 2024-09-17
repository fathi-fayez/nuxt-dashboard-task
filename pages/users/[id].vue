<template>
  <div>
    <!-- Header -->
    <header class="header-section">
      <div class="page-header">
        <div class="text">
          <h1>Users</h1>
          <span style="color: rgba(71, 84, 103, 1)">Users > user profile</span>
        </div>
        <div class="buttons">
          <el-button
            ><el-icon><clock /></el-icon> Unblock</el-button
          >
          <el-button
            ><el-icon><delete /></el-icon> Delete</el-button
          >
          <el-button class="set-btn"
            ><el-icon><MoreFilled /></el-icon
          ></el-button>
        </div>
      </div>
      <!-- User header -->
      <div class="user-header">
        <el-avatar :size="100" :src="user.avatar" />
        <div>
          <h1><Icon name="uil:ban" /> {{ user.name }}</h1>
          <span>u123456789</span>
        </div>
      </div>
      <!-- Taps -->
      <el-tabs class="demo-tabs">
        <el-tab-pane label="Acount" name="first"></el-tab-pane>
      </el-tabs>
    </header>
    <!-- Content -->
    <el-row>
      <el-col :span="20" :xs="24" :sm="24" :md="20">
        <div class="user-info">
          <h4>Account info</h4>
          <h5>Name</h5>
          <span>{{ user.name }}</span>
          <el-divider />
          <h5>Email address</h5>
          <span>{{ user.email }}</span>
          <el-divider />
          <h5>Role</h5>
          <span>{{ user.role }}</span>
        </div>
      </el-col>
      <el-col class="edit-btn-container" :span="4" :xs="24" :sm="24" :md="4">
        <el-button class="edit-btn"
          ><el-icon><edit /></el-icon> Edit</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const { id } = useRoute().params;
const result = await GqlGetUser({ id });

const user = computed(() => result?.user ?? []);
</script>

<style lang="scss" scoped>
.header-section {
  background-color: rgba(254, 247, 247, 1);
  padding: 30px 30px 0;
  margin: 0;

  .page-header {
    display: flex;
    align-items: flex-start;
    padding: 0px;
    justify-content: space-between;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .user-header {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    margin: 10px 0;
    color: rgba(183, 26, 42, 1);
    h1 {
      display: flex;
      align-items: center;
    }
  }

  .buttons {
    .el-button {
      padding: 20px;
      border-radius: 8px;
      font-weight: bold;
      &:first-child {
        background: $main-gradient;
        margin-left: 15px;
        color: white;
      }
      .el-icon {
        margin-right: 10px;
      }
      @media (max-width: 768px) {
        padding: 10px;
      }
    }
    .el-button.set-btn {
      transform: rotate(90deg);
      padding: 13px !important;
      margin: 0;
      .el-icon {
        margin: 0 !important;
      }
    }
    @media (max-width: 768px) {
      display: flex;
      margin: 20px 0;
    }
  }

  /* Taps */
  .demo-tabs {
    margin: 0 30px;

    .el-tabs__item {
      color: #ef3e2c;
    }

    .is-active {
      color: #ef3e2c;
      border-color: #ef3e2c;
    }
    .el-tabs__active-bar {
      background-color: #ef3e2c;
    }
  }
}

.el-row {
  background-color: rgba(245, 245, 245, 1);
  padding: 20px 30px 140px;

  .user-info {
    padding: 20px;
    background-color: white;
    h4 {
      margin-bottom: 10px;
    }
    span {
      color: #888;
    }
    .el-divider {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }

  .edit-btn-container {
    display: flex;
    align-items: start;
    justify-content: center;
    .edit-btn {
      margin-top: 10px;
      padding: 20px;
      .el-icon {
        margin-right: 5px;
      }
    }
  }
  @media (max-width: 768px) {
    padding-bottom: 60px;
  }
}
</style>
