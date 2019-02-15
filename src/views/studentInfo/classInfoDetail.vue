<template>
    <div class="classDetail">
        <table class="tableStyle">
            <thead>
                <tr>
                    <th>头像</th>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>班级</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in classInfo.student" :key="index">
                    <td><img v-lazy="item.avatar"></td>
                    <td>{{item.number}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.classText}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
// 分页尚未做，需要引分页ui库、处理state的pn，size、处理方法 等
import bus from '../../bus'
    export default {
        data() {
            return {
                classInfo: {}
            }
        },
        methods: {
            // 获取班级信息详情
            getClassDetail(id) {
                let classInfo = {
                    id: 'class77',
                    name: '软工1501B',
                    num: 77,
                    student: [
                        {id:'student01', number:'1534120011', avatar: 'http://pbl.mawenli.xyz/avatar1.png', name:'张三', classText:'软工1501B'},
                        {id:'student02', number:'1534120012', avatar: 'http://pbl.mawenli.xyz/avatar2.png', name:'张四', classText:'软工1501B'},
                        {id:'student02', number:'1534120012', avatar: 'http://pbl.mawenli.xyz/avatar2.png', name:'张四', classText:'软工1501B'},
                    ]
                }
                this.classInfo = classInfo
                bus.$emit('titleText', this.classInfo.name)
            }
        },
        mounted() {
            const {id} = this.$route.params
            this.getClassDetail(id)
        },
        beforeDestroy() {
            bus.$emit('titleText', '')
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
            &:nth-of-type(1),&:nth-of-type(3) {
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
    }
    img {
        width: 0.6rem;
        height: 0.6rem;
        vertical-align: middle;
    }
}
</style>