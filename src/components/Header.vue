<template>
    <div>
        <mt-header class="title" :fixed="true" :title=$route.meta.title>
            <div v-show="!hideBack" @click="$router.back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </div>
        </mt-header>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                hideBack: false
            }
        },
        methods: {
            
        },
        created() {
            if(this.$route.path == '/home') {
                this.hideBack = false
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