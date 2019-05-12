<template>
    <div class="classDetail">
        <label class="select-course">
            <select name="slectbox" v-model="selectCourse" @change="changeCourse">
                <option :value="0">可选择一个课程</option>
                <option v-for="item in courseData" :key="item._id" :value ="item._id" v-text="item.course_name.subjectName"></option>
            </select>
        </label>
        <table class="tableStyle">
            <thead>
                <tr>
                    <th>考勤时间</th>
                    <th>考勤科目</th>
                    <th>考勤班级</th>
                    <th>考勤教师</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in forData" :key="item._id" @click="clickLookDetail(item._id)">
                    <td><div>{{item.clockName}}</div></td>
                    <td><div>{{item.course.course_name.subjectName}}</div></td>
                    <td><div>{{item.grade.gradeName}}</div></td>
                    <td><div>{{item.teacher.username}}</div></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { Toast} from 'mint-ui'
    export default {
        data() {
            return{
                forData: {},
                courseData: [],
                selectCourse: 0,
                user: 'teacher'
            }
        },

        methods: {
            // 获取全部考勤信息
            getData() {
                this.$axios.get(`/clock/${this.user}`).then (res => {
                    // console.log('教师全部考勤：', res)
                    if (res.code == 0 && res.data[0]) {
                        this.forData = res.data
                    } else {
                        Toast('还没有考勤信息');
                        this.forData= [];
                    }
                })
            },
           

            // 获取课程信息
            getCourse() {
                let id = this.$store.state.userinfo._id;
                let url = 'teacher'

                if (this.user == 'student') {
                    id = this.$store.state.userinfo.grade._id;
                    url = 'grade'
                }
                this.$axios.get(`/course/${url}/${id}`).then(res => {
                    if (res.code == 0) {
                        this.courseData = res.data;
                    }
                })
            },

            changeCourse() {
                if (this.selectCourse == 0) {
                        this.getData();
                } else {
                    
                    this.$axios.get(`/clock/${this.user}/${this.selectCourse}`).then(res => {
                        if (res.code == 0 && res.data[0]) {
                            this.forData = res.data
                        } else {
                            Toast('该课程下还没有考勤信息');
                            this.forData= [];
                        }
                    })
                }
            },
            
            // 点击跳转考勤详情页
            clickLookDetail(id) {
                this.$router.push(`/layout/lookClockDetail/${id}`);
            }
        },

        created() {
            if (this.$store.state.userinfo.faculty) {
                // 教师用户
                this.getData();
                this.getCourse();
            } else if (this.$store.state.userinfo.grade) {
                // 学生用户
                this.user = 'student'
                this.getData();
                this.getCourse();
            } else {
                Toast('请先登录');
                setTimeout( () => {
                    this.$router.push('/login');
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.tableStyle {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    thead {
        line-height: 0.8rem;
    }
    tr {
        text-align: center;

        &:nth-of-type(2n) {
            background: rgba(206, 240, 245, .3);
        }

        th {
            border: 1px solid #ddd;
            background: #f5f5f5;
            // &:nth-of-type(1),&:nth-of-type(3) {
            //     width: 20%;
            // }
        }
        td {
            padding: 0.1rem;
            border: 1px solid #ddd;


            div {
                font-size: 13px;
                overflow: hidden;

                white-space: normal;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: break-all;
                line-height: 1.5;
            }
        }
    }
    img {
        width: 0.6rem;
        height: 0.6rem;
        vertical-align: middle;
    }
}

.select-course {
    display: block;
    padding: 0.3rem 0 0.3rem 0.3rem;

    select {
        -webkit-appearance: none;
        padding: .15rem;
        width: 3.2rem;
        margin-right: .2rem;
        border-radius: 4px;
        background: #409eff;
        color: #fff;
        font-size: 14px;
        outline: none;

        option {
            background: #eee;
            color: #333;
            font-size: 13px;
        }
    }
}

</style>