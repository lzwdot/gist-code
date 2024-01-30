<template>
  <div>
    <!-- label 标签-->
    <label v-if="label">{{ label }}</label>
    <!-- 内容-->
    <slot></slot>
    <!-- {{ form.rules[prop] }}-->
    <!-- 校验信息-->
    <p v-if="error">{{ error }}</p>
  </div>
</template>
<script>
import Validator from 'async-validator'

export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      error: ''
    }
  },
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      // 执行校验，获取数值和规则
      // console.log('v')
      const rules = this.form.rules[this.prop]
      const value = this.form.model[this.prop]

      const validator = new Validator({[this.prop]: rules})
      // 校验时传入数据源
      return validator.validate({[this.prop]: value}, errors => {
        if (errors) {
          this.error = errors[0].message
        } else {
          this.error = ''
        }
      })
    }
  },
}
</script>