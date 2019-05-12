<template>
    <div class="layout">
        <Header />
        <div class="content">
            <router-view/>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
    export default {
        components: {
            Header,
            Footer
        }
    }
</script>

<style scoped lang='less'>
.layout {
    height: 100%;
    overflow: hidden;
}
.content {
    height: calc(100% - 2rem); 
    box-sizing: border-box;
    margin: 1rem 0 ;
    background: #fff;
    overflow-y: auto;
}
</style>