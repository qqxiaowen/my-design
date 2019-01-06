<template>
    <div class="password">
       <div class="form">
            <input class="buttonInputStyle" placeholder="请输入旧密码" type="password" v-model="oldPassword" />
            <input class="buttonInputStyle" placeholder="请输入新密码" type="password" v-model="newPassword" />
            <input class="buttonInputStyle" placeholder="再次输入新密码" type="password" v-model="agePassword" />
       </div>
       <div class="operation">
            <mt-button class="buttonInputStyle" type="primary" @click="handlePassword">修改密码</mt-button>
       </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        data() {
            return {
                oldPassword: '',
                newPassword: '',
                agePassword: ''
            }
        },
        methods: {
            handlePassword() {
                if (!this.oldPassword || !this.newPassword || !this.agePassword) {
                    Toast('请完善表单')
                } else if (this.newPassword != this.agePassword) {
                    Toast('两次输入的密码不一致')
                } else {
                    console.log('表单数据：',this.oldPassword,this.agePassword)
                }
            }
        }
    }
</script>

<style scoped lang='less'>
.password {
    padding: 0 0.5rem;
}
.form {
    margin-top: 0.4rem;
    input {
        width: 100%;
        color: #333;
        border: none;
        padding-left: 0.4rem;
        margin: 0.3rem 0;
        box-sizing: border-box;
        color: #fff;
        background: rgba(12, 157, 224, 0.5);
    }
    input::-webkit-input-placeholder {
        color: #fff;
    }
}
.operation {
    margin-top: 1.1rem;
}
</style>