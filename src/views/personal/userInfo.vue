<template>
    <div class="userinfo">
        <div class="itemBox">
            <span>头像</span>
            <label v-show="operation == '保存'" class="uploadAvatar">
                <input type="file" style="display:none" @change="handleUploadimg">
            </label>
            <img :src="formData.avatar" alt="">
        </div>
        <mt-field class="disabled" disabled label="学号/工号" v-model="formData.numId"></mt-field>
        <mt-field class="disabled" disabled label="用户名" v-model="formData.username"></mt-field>
        <mt-field class="disabled" v-if="formData.grade" disabled label="班级" v-model="formData.grade.gradeName"></mt-field>
        <mt-field class="disabled" v-if="formData.faculty" disabled label="院系" v-model="formData.faculty.facultyName"></mt-field>
        <mt-field :disabled="operation == '编辑'" label="简介" v-model="formData.desc"></mt-field>
        <div class="itemBox styleBox sexBox">
            <span>性别</span>
            <div v-if="operation == '保存'">
                <label :class="formData.sex && 'select'">
                    <i class="iconfont icon-tijiaochenggongduigou"></i>
                    <input type="radio" name="sex" :value="1" v-model="formData.sex">男
                </label>
                <label :class="!formData.sex && 'select'">
                    <i class="iconfont icon-tijiaochenggongduigou"></i>
                    <input type="radio" name="sex" :value="0" v-model="formData.sex">女
                </label>
            </div>
            <span v-else>{{formData.sex ? '男' : '女'}}</span>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import bus from '../../bus/index.js'
import axios from 'axios'
import {MessageBox} from 'mint-ui'
    export default {
        data() {
            return {
                operation: '编辑',
                token: '',
                operationFuncText : '',
                formData: {},
                oldData: {},
                isUpdata: false
            }
        },
        methods: {
            handleUploadimg(e) {
                let file = e.target.files[0]
                let formData = new FormData()
                formData.append('file',file)
                formData.append('token',this.token)
                axios.post('https://upload-z1.qiniup.com',formData).then(res => {
                    this.formData.avatar = res.data.url
                })
            },
            getToken() {
                axios.get('http://upload.mawenli.xyz').then( res => {
                    this.token = res.data.data
                })
            }
        },
        created() {
            this.getToken()
        },
        mounted() {
            // 头部组件传值
            bus.$emit('status',this.operation)
            bus.$on('operation', val => {
                if (val == '编辑') {
                    this.operationFuncText = '编辑'
                    this.operation = '保存'
                    // console.log('这是编辑状态')
                } else if(val == '保存') {
                    // console.log('这是保存状态')
                    this.operationFuncText = '保存'
                }
                // 这里面不能直接函数，会触发两次 为什么？
            })

            this.formData = {...this.$store.state.userinfo};
            this.oldData = {...this.$store.state.userinfo};
        },
        // 注销组件时，将状态值至空，不影响其他页面的头部组件
        beforeDestroy() {
            bus.$emit('status','')
        },
        watch: {
            operation (val) {
                bus.$emit('status',this.operation)
            },
            operationFuncText(val){
                if (val == '保存') {
                    // console.log('点击保存按钮,调用保存接口')
                    let url = '';
                    let id = this.$store.state.userinfo._id
                    if (this.$store.state.userinfo.faculty) {
                        // 教师用户
                        url = '/user/teacher';
                    } else {
                        // 学生用户
                        url = '/user/student';
                    }
                    this.$axios.put(`${url}/${id}`, this.formData).then(res => {
                        if (res.code == 0) {
                            Toast('修改成功');
                            this.isUpdata = true;
                            // 赋值vuex
                            this.$store.commit('CHANGEINFO', this.formData);
                        }
                    })
                    // 改变操作按钮
                    this.operation = '编辑'
                }
            }
        },
         // 修改数据后提示用户后再页面跳转
        beforeRouteLeave(to, from, next){
            let isChangeNum = 0
            for (let key in this.oldData) {
                if (this.oldData[key] != this.formData[key]) {
                    isChangeNum ++
                }
            }
            if (isChangeNum && !this.isUpdata){
                // console.log('有数据变化')
                MessageBox({
                    showCancelButton: true,
                    cancelButtonClass: 'ensure',
                    confirmButtonClass: 'cancel',
                    title: '警告',
                    message: '还未保存修改的数据，是否退出？'
                }).then(action => {
                    if (action == 'confirm') {
                        next()
                    }
                })
            } else {
                next()
            }
        }
    }
</script>

<style scoped lang='less'>
.userinfo {
    // /deep/ .mint-field-core:disabled {
    //     background: #fff;
    //     color: #6d6e71;
    // }
    /deep/ .mint-field-core {
        // color: #333;
        background: #fff;
    }
    .disabled {
        color: rgb(180, 179, 179);
        /deep/ input {
            color: rgb(180, 179, 179);
        }
    }
    .itemBox {
        display: flex;
        justify-content: space-between;
        height: 48px;
        align-items: center;
        padding: 0 10px;
        background: #fff;
        position: relative;
        .uploadAvatar {
            position: absolute;
            left: 0;
            right: 0;
            height: 0.8rem;
        }
        img {
            width: 0.8rem;
            height: 0.8rem;
        }
    }
    /deep/ .mint-cell-value input{
        text-align: right;
    }
}
.styleBox::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 7.1rem;
    height: 1px;
    background: #d7d7d7;
}
.sexBox {
    label {
        color: rgb(107, 107, 107);
        input {
            display: none;
        }
    }
    .select {
        color: #229de4;
    }
}
</style>