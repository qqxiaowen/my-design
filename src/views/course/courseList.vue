<template>
    <div class="courseList">
        <div class="course-text" v-text="courseName"></div>
        <div class="table-title">
            <div v-for="item in ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日']" :key="item"> {{item}}</div>
        </div>
        <div class="table-main">
            <div class="main-left">
                <div v-for="item in ['第一节', '第二节', '第三节', '第四节', '第五节']" :key="item"><span>{{item}}</span></div>
            </div>
            <div class="main-right">
                <div class="main-list" v-for="(aItem, aIndex) in course" :key="aIndex">
                    <div class="mian-item" v-for="(bItem, bIndex) in aItem" :key="bIndex">
                        <!-- 1 -->
                        <div class="item-content" v-if="bItem._id">
                            {{bItem.course_name.subjectName}} <br/>
                            {{bItem.classroom}} <br/>
                            <span v-if="courseName == '班级课程信息'">{{bItem.teacher.username}}</span>
                            <span v-else>{{bItem.grade.gradeName}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                course: [
                    [{},{},{},{},{}],
                    [{},{},{},{},{}],
                    [{},{},{},{},{}],
                    [{},{},{},{},{}],
                    [{},{},{},{},{}],
                    [{},{},{},{},{}],
                    [{},{},{},{},{}]
                ],
                url: '',
                courseName: '教师课程信息',
            }
        },
        methods: {
            getData() {
                let course =  [
                    [{},{},{},{},{}],
                    [{},{},{},{},{}],
                    [{},{},{},{},{}],
                    [{},{},{},{},{}],
                    [{},{},{},{},{}],
                    [{},{},{},{},{}],
                    [{},{},{},{},{}]
                ]

                this.$axios.get(this.url).then( res => {
                    console.log(res)

                    res.data.forEach(item => {

                        item.time_site.forEach(tItem => {
                            course[tItem.day -1][tItem.node -1] = {...item, ...tItem};
                        })
                    })
                    this.course = course;
                })
            }
        },
        mounted() {
            if (!this.$store.state.userinfo || !this.$store.state.userinfo._id) {
                Toast('请先登录')
                setTimeout(() => {
                    this.$router.push('/login')
                }, 300);
            }
            
            if (this.$store.state.userinfo.faculty) {
                // 教师用户
                this.url = `/course/teacher/${this.$store.state.userinfo._id}`
            } else {
                // 学生用户
                this.url = `/course/grade/${this.$store.state.userinfo.grade._id}`
                this.courseName = '班级课程信息'
            }
            this.getData();
        }
    }
</script>

<style lang="less" scoped>
.course-text {
    padding-left: 0.6rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #409eff;
}

.table-title {
    display: flex;
    div {
        width: 12.5%;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        border-right: 2px solid #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
        background: #b4c7dd;
        color: #666;
        font-size: 0.26rem;

        &:last-child {
            border-right: none;
        }
    }
}

.table-main {
    display: flex;
    height: calc(100vh - 3.6rem);

    .main-left {
        width: 12.5%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background: #b4c7dd;
        color: #666;
        border-right: 2px solid #f1f1f1;
        box-sizing: border-box;

        div {
            display: flex;
            flex: 1;
            padding: 0 10px;
            border-top: 2px solid #f1f1f1;

            &:first-child {
                border-top: none;
            }
            span {
                font-size: 0.26rem;
                margin: auto;
                text-align: center;
            }
        }
    }
}

.main-right {
    display: flex;
    flex: 1;
    justify-content: space-between;
}

.main-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-right: 2px solid #f1f1f1;

    &:nth-child(1) {
        background: rgb(252, 144, 144);
    }

    &:nth-child(2) {
        background: rgb(188, 137, 255);;
    }

    &:nth-child(3) {
        background: #95c6f7;
    }

    &:nth-child(4) {
        background: rgb(201, 250, 128);
    }

    &:nth-child(5) {
        background: #ffd375;
    }

    &:last-child {
        border-right: none;

    }
    .mian-item {
        border-bottom: 2px solid #f1f1f1;
        width: 100%;
        flex: 1;
        overflow: hidden;

        &:last-child {
            border-bottom: none;
        }
    }
}

.item-content {
    display: flex;
    flex-direction: column;
    margin: auto;
    font-size: 12px;
    word-break: break-all;
    overflow: hidden;
    justify-content: center;
    color: #666;

    span {
        font-size: 12px;
    }
}
</style>