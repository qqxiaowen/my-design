<template>
    <div>
        <div class="login">
            <div class="logoBox">
                <img src="../assets/hhlogo.png" alt="logo">
            </div>
            <h1>黄淮学院考勤系统</h1>
            <div class="from">
                <input class="buttonInputStyle" placeholder="请输入用户名" v-model="formData.numId" />
                <input class="buttonInputStyle" placeholder="请输入密码" type="password" v-model="formData.password" /> 
            </div>
            <div class="operation">
                <mt-button class="buttonInputStyle" type="primary" @click="handleLogin">登录</mt-button>
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
                    numId: '',
                    password: ''
                }
            }
        },
        methods: {
            handleLogin() {
                console.log('这是表单里的数据:', this.formData)
                if (!this.formData.numId || !this.formData.password) {
                    Toast('请输入用户名或密码')
                } else {
                    this.$axios.post(`/user/login`, this.formData).then(res => {
                        if (res.code ==0) {
                            Toast('登录成功');
                            // 存入vuex
                            let userinfo = res.data;
                            this.$store.commit('CHANGEINFO',userinfo);
                            setTimeout(() => {
                                this.$router.push(`layout/home`)
                            }, 500);
                        } else {
                            Toast(res.msg);
                        }
                    })
                  
                }
            }
        }
    }
</script>

<style scoped lang='less'>
.login {
    padding: 0.5rem;
    height: 100vh;
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
.operation{
    margin-top: 0.4rem;
}
</style>