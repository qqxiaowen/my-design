<template>
    <div class="userinfo">
        <div class="avatarBox">
            <span>头像</span>
            <img src="../../assets/logo.png" alt="">
        </div>
        <mt-field :disabled="operation == '编辑'" label="用户名" v-model="formData.username"></mt-field>
        <mt-field :disabled="operation == '编辑'" label="昵称" v-model="formData.nicheng"></mt-field>
        <mt-field :disabled="operation == '编辑'" label="班级" v-model="formData.grade"></mt-field>
        <mt-field :disabled="operation == '编辑'" label="学号/工号" v-model="formData.number"></mt-field>
        <mt-field v-show="operation == '编辑'" disabled label="性别" :value="formData.sex ? '男' : '女'"></mt-field>
    </div>
</template>

<script>
    import bus from '../../bus/index.js'
    export default {
        data() {
            return {
                operation: '编辑',
                operationFuncText: '',
                formData:{
                    username: 'xiao',
                    nicheng: '风',
                    grade: '软工',
                    number: '123456',
                    sex: 1
                }
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
.userinfo {
    .avatarBox {
        display: flex;
        justify-content: space-between;
        height: 48px;
        align-items: center;
        padding: 0 10px;
        background: #fff;
        img {
            width: 0.4rem;
            height: 0.4rem;
        }
    }
    /deep/ .mint-cell-value input{
        text-align: right;
    }
}
</style>