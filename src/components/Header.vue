<template>
    <div>
        <mt-header class="title" :fixed="true" :title=$route.meta.title>
            <div v-show="!hideBack" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </div>
            <mt-button v-show="operationText" @click="handleEmit" slot="right">{{operationText}}</mt-button>
        </mt-header>
    </div>
</template>

<script>
    import bus from '../bus/index.js'
    export default {
        data() {
            return {
                hideBack: false,
                operationText : ''
            }
        },
        methods: {
            handleEmit() {
                bus.$emit('operation',this.operationText)
            }
        },
        created() {

        },
        mounted() {
            bus.$on('status', text => {
                this.operationText = text
            })  
        },
        watch: {
            $route(to,from){
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