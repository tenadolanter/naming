<template>
  <div class="content-wrap">
    <el-form
      :model="formValue"
      :rules="formRules"
      ref="formRef"
      status-icon
      label-width="85px"
      size="large"
    >
      <el-form-item label="姓氏" prop="surname">
        <el-input
          v-model="formValue.surname"
          placeholder="输入孩子的姓氏"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select
          v-model="formValue.sex"
          placeholder="选择孩子的性别"
          clearable
        >
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阳历日期" prop="date">
        <el-date-picker
          v-model="formValue.date"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="选择一个日期"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-time-picker
          v-model="formValue.time"
          value-format="HH:mm"
          placeholder="选择一个时间"
          style="width: 100%"
        ></el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerSumbit">起名</el-button>
        <el-button type="primary" @click="handlerReset">重置</el-button>
      </el-form-item>
    </el-form>
    <div
      class="result"
      v-if="
        formInfo.names &&
        Array.isArray(formInfo.names) &&
        !!formInfo.names.length
      "
    >
      <div class="result-title">生成结果</div>
      <div class="result-names">
        <div
          class="name-item"
          v-for="(item, index) in formInfo.names"
          :key="index"
          @click="handlerItemClick(index)"
        >
          {{ formInfo.surname + item.map((ele) => ele.char).join("") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
  ElTimePicker,
  ElSelect,
  ElOption,
} from "element-plus";
import {
  getYearMonthDay,
  getLunar,
  getChar8,
  getElement5,
  getCnChar,
} from "../utils/index.js";
export default {
  components: {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElDatePicker,
    ElTimePicker,
    ElSelect,
    ElOption,
  },
  data() {
    return {
      formValue: {
        surname: "",
        sex: "",
        date: "",
        time: "",
      },
      formRules: {
        surname: [{ required: true, message: "请输入姓氏", trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        date: [{ required: true, message: "请输入日期", trigger: "blur" }],
        time: [{ required: true, message: "请输入时间", trigger: "blur" }],
      },
      formInfo: {},
    };
  },
  methods: {
    async handlerSumbit() {
      const formEl = this.$refs.formRef;
      if (!formEl) return;
      const validate = await formEl.validate();
      if (validate) {
        this.handlerData();
      }
    },
    handlerReset() {
      const formEl = this.$refs.formRef;
      if (!formEl) return;
      formEl.resetFields();
    },
    handlerData() {
      let info = { ...this.formValue };
      getYearMonthDay(info);
      getLunar(info);
      getChar8(info);
      getElement5(info);
      getCnChar(info);
      this.formInfo = info;
    },
    handlerItemClick(index){
      console.log(this.formInfo, this.formInfo.names[index]);
    },
  },
};
</script>

<style scoped lang="scss">
.content-wrap {
  margin-top: 24px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  .result {
    .result-title {
      font-weight: bold;
      margin-bottom: 16px;
    }
    .result-names {
      display: grid;
      grid-template-columns: auto auto auto auto;
      .name-item {
        text-align: center;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.8);
        background-color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
        &:hover {
          background-color: #409eff;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
