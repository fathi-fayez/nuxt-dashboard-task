<template>
  <div v-loading="loading" class="container">
    <header>
      <div class="page-header">
        <div class="text">
          <h1>Users</h1>
          <span>Users</span>
        </div>
        <div class="buttons">
          <el-button
            ><el-icon><Download /></el-icon><span>Export</span></el-button
          >
          <NuxtLink to="/addUser">
            <el-button
              ><el-icon><Plus /></el-icon><span>Add user</span></el-button
            >
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Taps -->
    <el-tabs class="demo-tabs">
      <el-tab-pane label="Active users" name="first"></el-tab-pane>
      <el-tab-pane label="Blocked users" name="second"></el-tab-pane>
    </el-tabs>

    <!-- Filter picker -->
    <div class="fillters-cotainer">
      <!-- Search bar -->
      <el-input placeholder="Type something" />
      <div>
        <!-- Date picker -->
        <div class="demo-date-picker">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker type="date" placeholder="Pick a day" />
          </div>
        </div>
        <!-- Filter btn -->
        <el-button
          ><svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.625 10C15.625 10.1658 15.5592 10.3247 15.4419 10.4419C15.3247 10.5592 15.1658 10.625 15 10.625H5C4.83424 10.625 4.67527 10.5592 4.55806 10.4419C4.44085 10.3247 4.375 10.1658 4.375 10C4.375 9.83424 4.44085 9.67527 4.55806 9.55806C4.67527 9.44085 4.83424 9.375 5 9.375H15C15.1658 9.375 15.3247 9.44085 15.4419 9.55806C15.5592 9.67527 15.625 9.83424 15.625 10ZM18.125 5.625H1.875C1.70924 5.625 1.55027 5.69085 1.43306 5.80806C1.31585 5.92527 1.25 6.08424 1.25 6.25C1.25 6.41576 1.31585 6.57473 1.43306 6.69194C1.55027 6.80915 1.70924 6.875 1.875 6.875H18.125C18.2908 6.875 18.4497 6.80915 18.5669 6.69194C18.6842 6.57473 18.75 6.41576 18.75 6.25C18.75 6.08424 18.6842 5.92527 18.5669 5.80806C18.4497 5.69085 18.2908 5.625 18.125 5.625ZM11.875 13.125H8.125C7.95924 13.125 7.80027 13.1908 7.68306 13.3081C7.56585 13.4253 7.5 13.5842 7.5 13.75C7.5 13.9158 7.56585 14.0747 7.68306 14.1919C7.80027 14.3092 7.95924 14.375 8.125 14.375H11.875C12.0408 14.375 12.1997 14.3092 12.3169 14.1919C12.4342 14.0747 12.5 13.9158 12.5 13.75C12.5 13.5842 12.4342 13.4253 12.3169 13.3081C12.1997 13.1908 12.0408 13.125 11.875 13.125Z"
              fill="#343330"
            />
          </svg>
          Fillters</el-button
        >
      </div>
    </div>

    <!-- Table -->
    <h3 style="padding: 10px">All users</h3>
    <el-table :data="paginatedTableData" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="Name" width="180">
        <template #default="scope">
          <NuxtLink class="user-link" :to="`/users/${scope.row.id}`">
            <el-image
              style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
              "
              :src="scope.row.avatar"
            />
            <div>
              <h4>{{ scope.row.name }}</h4>
              <span style="font-size: 12px; color: #999">{{
                scope.row.id
              }}</span>
            </div>
          </NuxtLink>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Email" width="200" />
      <el-table-column prop="username" label="Username" width="150">
        <template #default="scope">
          {{ scope.row.username || "@oli267" }}
        </template>
      </el-table-column>
      <el-table-column prop="mobileNumber" label="Mobile number" width="180">
        <template #default="scope">
          {{ scope.row.mobileNumber || "+20 123 456 789" }}
        </template>
      </el-table-column>
      <el-table-column prop="region" label="Region" width="150">
        <template #default="scope">
          {{ scope.row.region || "Egypt, cairo" }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="Created at" width="180">
        <template #default="scope">
          {{ scope.row.creationAt || "Jan 13, 2022" }}
        </template>
      </el-table-column>
      <el-table-column class="test" width="100">
        <template #default="scope">
          <el-button size="small">
            <Icon name="uil:ban" style="color: rgba(183, 26, 42, 1)"
          /></el-button>
          <el-button size="small"
            ><Icon name="heroicons-outline:dots-vertical"
          /></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Pagination -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.length"
      :page-size="5"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      next-text="Next"
      prev-text="Previous"
    />
  </div>
</template>

<script lang="ts" setup>
const loading = ref(true);
  const data = await GqlGetUsers();
const tableData = computed(() => data?.users ?? []);
const currentPage = ref(1);
const pageSize = 5;

const paginatedTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return tableData.value.slice(start, end);
});

watchEffect(() => {
  if (tableData.value.length > 0) {
    loading.value = false;
  }
});

const handleCurrentChange = (val) => {
  currentPage.value = val;
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30px;
}
/* Page header */
.page-header {
  display: flex;
  align-items: flex-start;
  padding: 0px;
  justify-content: space-between;
  h1 {
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
  span {
    color: rgb(71, 103, 76);
  }
  .buttons {
    display: flex;
    .el-button {
      padding: 20px;
      border-radius: 8px;
      font-weight: bold;
      &:last-child {
        background: $main-gradient;
        margin-left: 15px;
        color: white;
        span {
          color: white;
        }
      }
      @media (max-width: 768px) {
        padding: 10px !important;
      }
    }
  }
}
/* Taps */
.demo-tabs {
  margin: 0 30px;
  ::v-deep(.el-tabs__item:hover) {
    color: #ef3e2c;
  }
  ::v-deep(.is-active) {
    color: #ef3e2c;
    border-color: #ef3e2c;
  }
  ::v-deep(.el-tabs__active-bar) {
    background-color: #ef3e2c;
  }
}

// fillters
.fillters-cotainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 2px solid #e4e7ed;
  .el-input {
    @media (min-width: 768px) {
      width: 400px;
    }
  }
  & > div {
    display: flex;
    gap: 10px;
    @media (max-width: 768px) {
      gap: 0;
      flex-direction: column;
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
    ::v-deep(.el-input) {
      width: 100%;
      margin-bottom: 5px;
    }
  }
}

// Taple
.el-table {
  text-align: center;

  .user-link {
    display: flex;
    gap: 10px;
  }

  .el-button.el-button--small {
    border: none;
    background-color: transparent;

    .iconify {
      font-size: 16px;
    }
  }
}

// Pagination
.el-pagination {
  margin-top: 10px;
  justify-content: space-between;
  padding: 10px;
  ::v-deep(.el-pager) {
    li {
      background-color: white;
      &:hover {
        background-color: rgba(245, 245, 245, 1);
        color: $brand-text-color;
      }
      &.is-active {
        background-color: rgba(245, 245, 245, 1);
        color: $brand-text-color;
      }
    }
  }
  ::v-deep(button) {
    padding: 20px !important;
    &:hover {
      color: $brand-text-color;
    }
  }
}
</style>
