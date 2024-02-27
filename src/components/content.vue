<template>
  <div class="content-wrap">
    <el-form :model="formValue" :rules="formRules" ref="formRef" status-icon label-width="120px" size="large">
      <el-form-item label="姓氏" prop="surname">
        <el-input v-model="formValue.surname" placeholder="输入孩子的姓氏" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="formValue.sex" placeholder="输入孩子的姓氏" clearable style="width: 500px">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阳历日期" prop="date">
        <el-date-picker v-model="formValue.date" type="date" value-format="YYYY-MM-DD" placeholder="选择一个日期" style="width: 500px"></el-date-picker>
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-time-picker v-model="formValue.time" value-format="HH:mm" placeholder="选择一个时间" style="width: 500px"></el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerSumbit(formRef)">起名</el-button>
        <el-button type="primary" @click="handlerReset(formRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElDatePicker, ElTimePicker, ElSelect, ElOption } from 'element-plus';
import { getYearMonthDay, getLunar, getChar8, getElement5 } from "../utils/index.js";
import { reactive, ref } from "vue";

const formRef = ref();

const formValue = reactive({
  surname: "",
  sex: "",
  date: "",
  time: "",
})

const formRules = reactive({
  surname: [{ required: true, message: '请输入姓氏', trigger: 'blur' },],
  sex: [{ required: true, message: '请输入性别', trigger: 'blur' },],
  date: [{ required: true, message: '请输入日期', trigger: 'blur' },],
  time: [{ required: true, message: '请输入时间', trigger: 'blur' },],
})

const handlerSumbit = async (formEl) => {
  if (!formEl) return
  const validate = await formEl.validate();
  if(validate) {
    // console.log("formValue", formValue);
    handlerData(formValue);
  }
}

const handlerReset = (formEl) => {
  if (!formEl) return
  formEl.resetFields();
}

const handlerData = () => {
  let info = {  ...formValue };
  getYearMonthDay(info);
  getLunar(info)
  getChar8(info)
  getElement5(info)
  console.log(info);
}

</script>

<style scoped lang="scss">
.content-wrap {
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 24px;
}
</style>
