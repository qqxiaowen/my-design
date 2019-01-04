<template>
    <div class="footer">
        <router-link to='/home' class="item">
            <i class="iconfont icon-shouye"></i>
            <span>用户中心</span>
        </router-link>
        <router-link to='/myinfo' class="item">
            <i class="iconfont icon-wode1"></i>
            我的信息
        </router-link>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='less'>
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1rem;
    background: #229de4;
    display: flex;
    justify-content: space-around;
    .item{
        width: 50%;
        line-height: 1rem;
        color: #fff;
        font-size: 0.34rem;
        i {
            float: left;
            margin: 0 0.2rem 0 0.6rem;
            font-size: 0.6rem;
        }
      
    }
}
</style>