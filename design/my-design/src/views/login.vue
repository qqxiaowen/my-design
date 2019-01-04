<template>
    <div>
        <div class="login">
            <div class="logoBox">
                <img src="../assets/logo.png" alt="logo">
            </div>
            <h1>黄淮学院考勤系统</h1>
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
    padding: 0.5rem;
    height: 100vh;
    // background: skyblue;
    background: url('../assets/loginBg.jpg') no-repeat;
    background-size: 100% 100%;
    box-sizing:  border-box;
    .logoBox{
        width: 1.5rem;
        height: 1.5rem;
        margin: 1rem auto 0;
        img{
            width: 1.5rem;
            height: 1.5rem;
        }
    }
     h1 {
        text-align: center;
        font-size: 0.6rem;
        font-weight: 400;
        margin-bottom: 0.8rem;
        color: #fff;
    }
}
.from {
    input {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        color: #333;
        border: none;
        padding-left: 0.4rem;
        margin: 0.3rem 0;
        box-sizing: border-box;
        color: #fff;
        background: rgba(0,0,0,0.1);
    }
    input::-webkit-input-placeholder {
        color: #fff;
    }
}
input, button {
    border-top-left-radius: 8% 50%;
    border-top-right-radius: 8% 50%;
    border-bottom-right-radius: 8% 50%;
    border-bottom-left-radius: 8% 50%;
    outline: none;
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