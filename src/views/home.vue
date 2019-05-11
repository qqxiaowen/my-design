<template>
    <div class="home">
        <div class="swiper">
            <img src="../assets/bander.png" alt="">
        </div>
        <div class="content">
            <router-link :to="studentUrl" class="item">
                <img src="../assets/card.png" alt="">
                <span>学生信息</span>
            </router-link>
            <router-link to="/layout/course" class="item">
                <img src="../assets/course.png" alt="">
                <span>课程表</span>
            </router-link>
            <div class="item">
                <img src="../assets/check.png" alt="">
                <span>考勤</span>
            </div>
            <div class="item">
                <img src="../assets/record.png" alt="">
                <span>考勤记录</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        data() {
            return {
                studentUrl: '/layout/classInfo'
            }
        },
        mounted() {
            if (!this.$store.state.userinfo || !this.$store.state.userinfo._id) {
                Toast('请先登录')
                setTimeout(() => {
                    this.$router.push('/login')
                }, 300);
            }
            if (!this.$store.state.userinfo.faculty) {
                this.studentUrl = `/layout/classInfoDetail/${this.$store.state.userinfo.grade._id}`
            }
        }
    }
</script>

<style scoped lang='less'>
.home {
    background: #f1f1f1;
    height: 100%;
}
.swiper {
    width: 100%;
    height: 3.1rem;
    margin-bottom: 0.1rem;
    img {
        width: 100%;
        height: 3.1rem;
    }
}
.content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 0.6rem;
    .item {
        display: block;
        width: 2.7rem;
        height: 1.7rem;
        line-height: 1.7rem;
        margin-top: 0.4rem;
        background: #fff;
        border-radius: 6%;
        text-align: left;
        box-shadow: 1px 1px 2px rgb(77, 77, 77);
        img {
            width: 0.8rem;
            height: 0.8rem;
            vertical-align: middle;
            margin-left: 0.2rem;
            margin-top: -0.05rem;
        }
        span {
            color: #7c8489;
            font-size: 0.36rem;
        }
    }
}
</style>