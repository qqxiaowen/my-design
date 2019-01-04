<template>
    <div>
        <div class="login">
            <h1>欢迎来到考勤管理系统</h1>
            <div class="from">
                <input label="用户名" placeholder="请输入用户名" v-model="formData.username" />
                <input label="密码" placeholder="请输入密码" type="password" v-model="formData.password" /> 
            </div>
            <div class="operation">
                <mt-button type="primary" @click="handleLogin">登录</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        data() {
            return {
                formData: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            handleLogin() {
                console.log('这是表单里的数据:', this.formData)
                if(!this.formData.username || !this.formData.password) {
                    Toast('请输入用户名或密码')
                }
            }
        }
    }
</script>

<style scoped lang='less'>
.login {
    padding: 0.2rem;
    height: 100vh;
    background: #f1f1f1;
    box-sizing:  border-box;
    h1 {
        text-align: center;
        font-size: 0.48rem;
        font-weight: 400;
        margin: 1rem 0 0.8rem;
    }
}
.from {
    input {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        color: #333;
        border: 1px solid #eee;
        padding-left: 0.4rem;
        margin: 0.1rem 0;
        box-sizing: border-box;
    }
}
.operation{
    margin-top: 0.4rem;
    button {
        width: 100%;
        height: 1rem;
        color: #fff;
    }
}
</style>