<template>
    <div>
        <mt-header class="title" :fixed="true" :title= "this.titleText || $route.meta.title">
            <!-- $route.meta.title -->
            <div v-show="!hideBack" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </div>
            <mt-button v-show="operationText" @click="handleEmit" slot="right">{{operationText}}</mt-button>
            <mt-button @click="skipNextPage" slot="right">{{nextPageText}}</mt-button>
        </mt-header>
    </div>
</template>

<script>
    import bus from '../bus/index.js'
    export default {
        data() {
            return {
                titleText:'',
                // 利用bus在一个页面中的操作按钮
                hideBack: false,
                operationText : '',
                // 跳转到另一个页面的操作按钮
                nextPageText:'',
                nextPageUrl:''
            }
        },
        methods: {
            // 利用bus在一个页面中的操作按钮
            handleEmit() {
                bus.$emit('operation',this.operationText)
            },
            // 跳转方法
            skipNextPage() {
                console.log(this.nextPageUrl)
                this.$router.push(this.nextPageUrl)
            }
        },
        created() {

        },
        mounted() {
            // 头部标题
            bus.$on('titleText', text => {
                this.titleText = text
            })
            // 修改个人信息页（一个页面中）的操作
            bus.$on('status', text => {
                this.operationText = text
            })
            // 跳转到另一个页面的操作
            bus.$on('nextPage', (text, url) => {
                this.nextPageText = text,
                this.nextPageUrl = url
            })
        },
        watch: {
            $route(to,from) {
                if(to.meta.title == '用户中心') {
                    this.hideBack = true
                } else {
                    this.hideBack = false
                }
            }
        }
        
    }
</script>

<style scoped lang='less'>
.title {
    background: #229de4;
    height: 1rem;
    line-height: 1rem;
    /deep/ h1{
        font-size: 0.4rem;
    }
}
</style>