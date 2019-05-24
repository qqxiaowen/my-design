<template>
    <div class="courseList">
        <div class="course-text">请选择一门课</div>
        <div class="table-title">
            <div v-for="item in ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日']" :key="item"> {{item}}</div>
        </div>
        <div class="table-main">
            <div class="main-left">
                <div v-for="item in ['第一节', '第二节', '第三节', '第四节', '第五节']" :key="item"><span>{{item}}</span></div>
            </div>
            <div class="main-rigth">
                <div class="main-list" v-for="(aItem, aIndex) in course" :key="aIndex">
                    <div class="mian-item" v-for="(bItem, bIndex) in aItem" :key="bIndex">
                        <!-- 1 -->
                        <div class="item-content" v-if="bItem._id" @click="handleclock(bItem)">
                            {{bItem.course_name.subjectName}} <br/>
                            {{bItem.classroom}} <br/>
                            <span v-if="user == '学生'">{{bItem.teacher.username}}</span>
                            <span v-else>{{bItem.grade.gradeName}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
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
                user: '教师',
                location: {},
                gradeID: null,
                courseID: null,
                tacherID: null,
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
                        item.courseId = item._id;

                        item.time_site.forEach(tItem => {
                            course[tItem.day -1][tItem.node -1] = {...item, ...tItem};
                        })
                    })
                    this.course = course;
                })
            },

            handleclock(ele) {
                // console.log('ele: ', ele)
                this.gradeID = ele.grade._id;
                this.courseID =  ele.courseId;
                this.tacherID = ele.teacher._id;
                if (this.$route.query.type == 1) {
                    // 普通考勤
                    this.$router.push(`/layout/commonClock?grade=${ele.grade._id}&course=${ele.courseId}`)
                } else if (this.$route.query.type == 2) {
                    // 教师定位考勤
                    // this.$router.push(`/layout/locationTeacherClock?grade=${ele.grade._id}&course=${ele._id}`)
                    this.getLocation();
                } else if (this.user = '学生') {
                    // 学生定位考勤
                    // this.$router.push(`/layout/locationStudentClock?grade=${ele.grade._id}&course=${ele._id}`)
                    this.getLocation();
                }
            },

            // 获取定位信息
            getLocation() {

                //获取当前位置(方法名)
                mMap.getSessionLocation(() => {
                        var data = JSON.parse(sessionStorage.getItem("location"));
                        // console.log(data);
                        console.log("您当前位置:"+data.formattedAddress);
                        console.log("lng:"+data.position.lng);
                        console.log("lat:"+data.position.lat);

                        // alert("您当前位置:"+data.formattedAddress);
                        // alert("lng:"+data.position.lng);
                        // alert("lat:"+data.position.lat);

                        this.location = {
                            lng: data.position.lng,
                            lat: data.position.lat
                        }

                        if (this.user == '教师') {
                            let clockName = new Date().toLocaleDateString() +" "+ new Date().toTimeString().substr(0, 5);

                            this.$axios.post(`/clock/teacher`, {
                                teacherLocation: this.location,
                                grade: this.gradeID,
                                course: this.courseID,
                                clockName

                            }).then(res => {
                                if (res.code == 0) {
                                    console.log('教师定位ok： ', res)
                                    Toast('定位考勤成功，5分钟后接口关闭')
                                } else if (res.code == 301) {
                                    Toast('已发起过定位考勤')
                                }
                            })

                        } else if (this.user == '学生') {

                            this.$axios.post(`/clock/student`, {
                                grade: this.gradeID,
                                teacher: this.tacherID,
                                studentLocation: this.location

                            }).then(res => {
                                if (res.code == 0) {
                                    Toast(res.msg);
                                    this.$router.push(`/layout/lookClock`);
                                } else {
                                    Toast(res.msg);
                                }
                            })
                        }
                        // console.log('location: ', this.location)
                    }
                );
                
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
                this.user = '学生'
                this.url = `/course/grade/${this.$store.state.userinfo.grade._id}`
            }
            this.getData()
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
        background: #b4c7dd;
        color: #666;

        div {
            display: flex;
            flex-direction: column;
            height: 20%;
            padding: 0 10px;
            border-top: 2px solid #f1f1f1;
            border-right: 2px solid #f1f1f1;

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

.main-rigth {
    display: flex;
    flex: 1;
    justify-content: space-between;
}

.main-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
        display: flex;
        width: 100%;
        height: 100%;
        border-bottom: 2px solid #f1f1f1;
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