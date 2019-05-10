<template>
    <div class="myCenter">
        <div class="buttons">
            <router-link to="/layout/info" class="item firstItem">
                <i class="iconfont icon-jiantou"></i>
                个人信息
            </router-link>
            <router-link to="/layout/password" class="item">
                <i class="iconfont icon-jiantou"></i>
                修改密码
            </router-link>
        </div>
        <div class="loginOutBox">
            <mt-button class="buttonInputStyle" @click="handleLoginOut" type="primary">退出登录</mt-button>
        </div>
    </div>
</template>

<script>
import {MessageBox} from 'mint-ui'
    export default {
        data() {
            return {

            }
        },
        methods: {
            handleLoginOut() {
                MessageBox({
                    showCancelButton: true,
                    cancelButtonClass: 'ensure',
                    confirmButtonClass: 'cancel',
                    title: '警告',
                    message: '确定退出登录？'
                }).then(action => {
                    if(action == 'confirm') {
                        
                        this.$axios.get('/user/logout').then(res => {

                            this.$store.commit('CHANGEINFO', '');

                            setTimeout( () => {
                                this.$router.push('/login')
                            }, 500)
                        })
                        
                    }
                })
            }
        }
    }
</script>

<style scoped lang='less'>
.myCenter {
    height: 100%;
    background: #f1f1f1;
}
.buttons {
    padding-top: 0.9rem;
    .item {
        display: block;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        padding: 0 0.5rem;
        box-sizing: border-box;
        background: #fff;
        color: #303030;
        cursor: pointer;
        i {
            float: right;
            font-size: 30px;
            color: #bdc8de;
        }
    }
    .item:first-child {
        margin-bottom: 1rem;
    }
    .item:nth-child(2) {
        border-bottom: 1px solid #eee;
    }
}
.loginOutBox {
    margin-top: 1.4rem;
    padding: 0 0.5rem;
}
</style>
<style>
.mint-msgbox-btns {
    height: 1rem;
}
.cancel{
    color: #333;
}
.ensure{
    color: #26a2ff;
}
</style>
