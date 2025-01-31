<template>
  <div class="content-wrap">
    <el-form
      :model="formValue"
      :rules="formRules"
      ref="formRef"
      label-width="85px"
      size="large"
      label-position="top"
    >
      <el-form-item label="姓氏" prop="surname">
        <el-input
          :disabled="generated"
          v-model="formValue.surname"
          placeholder="输入孩子的姓氏"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select
          :disabled="generated"
          v-model="formValue.sex"
          placeholder="选择孩子的性别"
          clearable
        >
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期(阳历)" prop="date">
        <el-date-picker
          :disabled="generated"
          v-model="formValue.date"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="选择一个日期"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="出生时间" prop="time">
        <el-time-picker
          :disabled="generated"
          v-model="formValue.time"
          value-format="HH:mm"
          placeholder="选择一个时间"
          style="width: 100%"
        ></el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerSumbit" :disabled="generated">
          起名
        </el-button>
        <el-button type="primary" @click="handlerReset" :disabled="false"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <div class="result" v-if="generated">
      <div class="result-title">生成结果</div>
      <el-table
        :data="tableData"
        border
        :show-header="false"
        empty-text="暂无数据"
        style="width: 100%"
        @cell-click="handlerItemClick"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
        >
          <template #default="scope">
            {{ getTableCellValue(scope.row[item.prop]) }}
          </template>
        </el-table-column>
      </el-table>
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
  ElTable,
  ElTableColumn,
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
    ElTable,
    ElTableColumn,
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
        surname: [
          { required: true, message: "请输入姓氏", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5]{1,2}$/,
            message: "只能输入 1 到 2 个汉字",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        date: [{ required: true, message: "请输入日期", trigger: "blur" }],
        time: [{ required: true, message: "请输入时间", trigger: "blur" }],
      },
      formInfo: {},
      columns: [{ prop: "1" }, { prop: "2" }, { prop: "3" }, { prop: "4" }],
      generated: false,
    };
  },
  computed: {
    tableData() {
      let results = [];
      const size = 5;
      const arr = this.formInfo?.names ?? [];
      for (let i = 0; i < arr.length; i += size) {
        const tempArr = arr.slice(i, i + size);
        let tempObj = {};
        for (let j = 1; j < tempArr.length; j++) {
          tempObj[j] = tempArr[j - 1];
        }
        results.push(tempObj);
      }
      return results;
    },
  },
  methods: {
    getTableCellValue(item) {
      return this.formInfo?.surname + item.map((ele) => ele.char).join("");
    },
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
      this.generated = false;
    },
    handlerData() {
      let info = { ...this.formValue };
      getYearMonthDay(info);
      getLunar(info);
      getChar8(info);
      getElement5(info);
      getCnChar(info);
      this.formInfo = info;
      this.generated = true;
    },
    handlerItemClick(row, column) {
      console.log(row[column.property]);
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
  }
  ::v-deep {
    .el-form-item .el-form-item__label {
      font-weight: bold;
    }
    .el-table .cell {
      text-align: center;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 15px;
    }
  }
}
</style>
