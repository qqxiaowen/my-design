<template>
    <div class="layout">
        <Header />
        <div class="content">
            <router-view />
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
}
.content {
    height: 100%;
    box-sizing: border-box;
    padding: 1rem 0 ;
    background: #f1f1f1;
}
</style>