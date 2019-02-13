<template>
    <div class="classDetail">
        班级信息详情页
    </div>
</template>

<script>
import bus from '../../bus'
    export default {
        data() {
            return {
                classId: null,
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
                bus.$emit('titleText',this.classInfo.name)
            }
        },
        created() {
            const {id} = this.$route.params
            this.getClassDetail(id)
        }
        
    }
</script>

<style scoped lang="less">
.classDetail {

}
</style>