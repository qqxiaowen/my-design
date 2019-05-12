<template>
    <div>
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
                <tr v-for="(item, index) in tableData" :key="item._id">
                    <td><img v-lazy="item.avatar"></td>
                    <td>{{item.numId}}</td>
                    <td>{{item.username}}</td>
                    <td class="td-status">
                        <label><input type="radio" :name="'status' + index" :value="2" v-model="item.status">出勤</label>
                        <label><input type="radio" :name="'status' + index" :value="1" v-model="item.status">请假</label>
                        <label><input type="radio" :name="'status' + index" :value="0" v-model="item.status">旷课</label>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="operation">
            <div @click="handleClock">立即创建</div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        data() {
            return {
                tableData: [],
            }
        },

        methods: {
            getData() {
               this.$axios.get(`/user/student/grade/${this.$route.query.grade}`).then(res => {
                   if (res.code == 0 && res.data[0]) {
                       this.tableData = res.data;
                       res.data.forEach( item => {
                            item.status = 2
                       })
                   } else {
                       Toast('该班级下还没有添加学生');
                       setTimeout( () => {
                           this.$router.push('/layout/home')
                       }, 500)
                   }
               })
            },

            handleClock() {
                let clockContent = [];
                this.tableData.forEach( item => {
                    clockContent.push({
                        student: item._id,
                        status: item.status
                    })
                })
                let clockName = new Date().toLocaleDateString() +" "+ new Date().toTimeString().substr(0, 5) ;
                // console.log(clockName)
                // console.log(clockContent);  clockName
                // console.log('教师：', this.$store.state.userinfo._id, this.$route.query.grade, this.$route.query.course)

                this.$axios.post(`clock`, {
                    clockName,
                    content: clockContent,
                    teacher: this.$store.state.userinfo._id,
                    grade: this.$route.query.grade,
                    course: this.$route.query.course
                }).then (res => {
                    if (res.code == 0) {
                        Toast('创建成功')
                        setTimeout( () => {
                            this.$router.push(`/layout/home`);
                        }, 500)
                    }
                })

            }
        },

        created() {
            this.getData()
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
    div {
        width: 1.8rem;
        padding: .1rem;        
        line-height: .5rem;
        color: #fff;
        background: #409eff;
        text-align: center;
        border-radius: 4px;
    }
}
</style>