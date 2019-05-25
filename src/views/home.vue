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
            <div v-if="isTeacher" class="item" @click="openModel">
                <img src="../assets/check.png" alt="">
                <span>考勤</span>
            </div>
            <router-link v-else class="item" to="selectClock">
                <img src="../assets/check.png" alt="">
                <span>参与考勤</span>
            </router-link>
            <router-link class="item" to="/layout/lookClock">
                <img src="../assets/record.png" alt="">
                <span>考勤记录</span>
            </router-link>
        </div>
        <div class="model-box">
            <div class="model-main">
                <router-link to="/layout/selectClock?type=1">普通考勤</router-link>
                <router-link to="/layout/selectClock?type=2">定位考勤</router-link>
            </div>
            <div class="model-bg" @click="closeModel"></div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        data() {
            return {
                studentUrl: '/layout/classInfo',
                isTeacher: true
            }
        },

        methods: {
            closeModel() {
                document.querySelector('.model-box').style.display = 'none';
            },

            openModel() {
                document.querySelector('.model-box').style.display = 'flex';
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
                this.studentUrl = `/layout/classInfoDetail/${this.$store.state.userinfo.grade._id}`;
                this.isTeacher = false;
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

.model-box {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    .model-main {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: space-around;
        width: 4rem;
        height: 3rem;
        padding: 0.5rem;
        margin: auto;
        background: #f1f1f1;
        border-radius: 4px;
        z-index: 120;

        a {
            color: #fff;
            background-color: #26a2ff;
            display: inline-block;
            padding: 0 12px;
            text-align: center;
            line-height: 40px;
            border-radius: 4px;
        }
    }

    .model-bg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, .4);
        z-index: 110;
    }
}
</style>