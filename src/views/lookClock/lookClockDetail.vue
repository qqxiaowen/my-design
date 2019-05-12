<template>
    <div class="classDetail">
        <div class="title" v-if="formData._id">
            <div>{{this.formData.clockName}}</div>
            <div>{{this.formData.grade.gradeName}}</div>
            <div>{{this.formData.course.course_name.subjectName}}</div>
        </div>
        <table class="tableStyle">
            <thead>
                <tr>
                    <th>头像</th>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in formData.content" :key="item._id">
                    <td><img v-lazy="item.student.avatar"></td>
                    <td>{{item.student.numId}}</td>
                    <td>{{item.student.username}}</td>
                    <td v-if="!isUpdata">
                        <span style="color: green; font-size: 0.28rem" v-if="item.status == 2">出勤</span>
                        <span style="color: #b4b406; font-size: 0.28rem" v-else-if="item.status == 1">请假</span>
                        <span style="color: red; font-size: 0.28rem" v-else>旷课</span>
                    </td>
                    <td v-else class="td-status">
                        <label><input type="radio" :name="'status' + index" :value="2" v-model="item.status">出勤</label>
                        <label><input type="radio" :name="'status' + index" :value="1" v-model="item.status">请假</label>
                        <label><input type="radio" :name="'status' + index" :value="0" v-model="item.status">旷课</label>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="operation" v-if="user == 'teacher'">
            <div>
                <div class="button" @click="isUpdata = true">修改该表</div>
            </div>
            <div v-if="isUpdata">
                <div class="button" @click="handleUpdata">确认修改</div>
                <div class="button" style="background: #fff; color: #333; border: 1px solid #dcdfe6" @click="getData(true)">取消</div>
            </div>
            <div>
                <div class="button" style="background: #f56c6c" @click="handleDel">删除该表</div>
            </div>
            <div>
                <download-excel
                    class="button"
                    :data="excelData">
                    导出excel
                </download-excel>
            </div>
        </div>

        


    </div>
</template>

<script>
    import {MessageBox, Toast} from 'mint-ui'
    export default {
        data() {
            return {
                formData: {},
                isUpdata: false,
                user: 'teacher',
                excelData: []
            }
        },

        methods: {
            getData(upData) {
                this.$axios.get(`/clock/${this.$route.params.id}`).then(res => {
                    // console.log('res: ', res)
                    if (res.code == 0) {
                        this.formData = res.data;
                        this.getExcelData();
                    }

                    if (upData) {
                        this.isUpdata = !this.isUpdata;
                    }
                })
            },

            handleDel() {
                MessageBox({
                    showCancelButton: true,
                    cancelButtonClass: 'ensure',
                    confirmButtonClass: 'cancel',
                    title: '警告',
                    message: '确定删除该考勤？'
                }).then(action => {
                    if(action == 'confirm') {
                        
                        this.$axios.delete(`/clock/${this.formData._id}`).then(res => {
                            if (res.code == 0) {
                                Toast('删除成功');

                                setTimeout( () => {
                                    this.$router.push('/layout/lookClock')
                                }, 500)
                            }
                        })
                        
                    }
                })
            },

            handleUpdata() {
                console.log('确认修改')
                this.$axios.put(`/clock/${this.formData._id}`, {
                    content: this.formData.content
                }).then (res => {
                    if (res.code == 0) {
                        Toast('修改成功');
                        this.getData(true);

                    }
                })
            },

            getExcelData() {
                let excelData = [];

                this.formData.content.forEach(item => {
                    // console.log(item.student.username, item.status);
                    if (item.status == 0) {
                        item.stausText = '旷课'
                    } else if (item.status == 1) {
                        item.stausText = '请假'
                    } else {
                        item.stausText = '出勤'
                    }
                    excelData.push(
                        {
                            '学生学号': item.student.numId,
                            '学生姓名': item.student.username,
                            '考勤状态': item.stausText,
                            '考勤时间': this.formData.clockName,
                            '班级': this.formData.grade.gradeName,
                            '课程': this.formData.course.course_name.subjectName,
                        }
                    )
                })

                this.excelData = excelData;
            }
        },

        mounted() {
           if (this.$store.state.userinfo.faculty) {
                // 教师用户
                this.getData();
            } else if (this.$store.state.userinfo.grade) {
                // 学生用户
                this.user = 'student'
                this.getData();
            } else {
                Toast('请先登录');
                setTimeout( () => {
                    this.$router.push('/login');
                })
            }
        }
        
    }
</script>

<style scoped lang="less">
.tableStyle {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    thead {
        line-height: 0.8rem;
    }
    tr {
        text-align: center;
        th {
            border: 1px solid #ddd;
            background: #f5f5f5;
            
            &:nth-of-type(1) {
                width: 14%;
            }

            &:nth-of-type(2) {
                width: 28%;
            }

            &:nth-of-type(3) {
                width: 20%;
            }
        }
        td {
            font-size: 0.28rem;
            border: 1px solid #ddd;
            overflow: hidden;
            padding: 0.1rem;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .td-status {
            font-size: 0;

            label {
                font-size: 12px;

                input {
                    vertical-align: middle;
                }

                &:nth-of-type(1) {
                    color: green;
                }

                &:nth-of-type(2) {
                    color: rgb(180, 180, 6);
                    padding: 0 2px;
                }

                &:nth-of-type(3) {
                    color: red;
                }
            }
        }
    }
    img {
        width: 0.6rem;
        height: 0.6rem;
        vertical-align: middle;
    }
}

.operation {
    padding: .4rem 0 0 .4rem;

    &>div {
        display: flex;
        margin-bottom: .2rem;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .button {
        width: 1.8rem;
        padding: .08rem;        
        line-height: .5rem;
        color: #fff;
        background: #409eff;
        text-align: center;
        border-radius: 4px;
        font-size: 14px;
        margin-right: .4rem;
    }
}

.title {
    display: flex;
    justify-content: space-between;
    background: #f5f5f5;
    color: #409eff;

    div {
        line-height: .8rem;
        font-size: 12px;
        max-width: 2.4rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 6px;
    }
}
</style>