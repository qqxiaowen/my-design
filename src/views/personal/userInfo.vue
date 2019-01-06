<template>
    <div class="userinfo">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="formData.username"></mt-field>
        <mt-field label="昵称" placeholder="请输入用户名" v-model="formData.nicheng"></mt-field>
        <mt-field label="学号/工号" placeholder="请输入用户名" v-model="formData.number"></mt-field>
    </div>
</template>

<script>
    import bus from '../../bus/index.js'
    export default {
        data() {
            return {
                operation: '编辑',
                operationFuncText: '',
                formData:{}
            }
        },
        methods: {

        },
        mounted() {
            bus.$emit('status',this.operation)
            bus.$on('operation', val => {
                if(val == '编辑') {
                    this.operationFuncText = '编辑'
                    this.operation = '保存'
                } else if(val == '保存') {
                    this.operationFuncText = '保存'
                }
                // 这里面不能直接函数，会触发两次 为什么？
            })
        },
        beforeDestroy() {
            bus.$emit('status','')
        },
        watch: {
            operation (val) {
                bus.$emit('status',this.operation)
            },
            operationFuncText(val){
                if(val == '编辑') {
                    console.log('点击编辑按钮')
                } else if(val == '保存') {
                    console.log('点击保存按钮')
                    setTimeout(() => {
                        this.operation = '编辑'
                    }, 1000);
                }
            }
        }
    }
</script>

<style scoped lang='less'>

</style>