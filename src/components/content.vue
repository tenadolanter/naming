<template>
  <div class="content-wrap">
    12121
    <el-button type="primary">Primary</el-button>
    <!-- <el-form label-position="right" label-width="80px" :model="formRule">
      <el-form-item label="名称">
        <el-input v-model="formRule.surname"></el-input>
      </el-form-item>

    </el-form> -->
  </div>
</template>

<script>
export default {
  data(){
    return {
      formRule: {
        surname: "",
      },
    }
  }
}

</script>

<style scoped lang="scss">

</style>
