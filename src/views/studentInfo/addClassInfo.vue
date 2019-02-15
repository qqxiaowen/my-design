<template>
    <div class="addClassInfo">
        <div class="item">
            <span>院系：</span>
            <select class="selectItem" v-model="SelectFacultyId">
                <option value="0">请选择一个院系</option>
                <option v-for="item in facultyCatalog" :key="item.id" :value="item.id">{{item.faculty}}</option>
            </select>
        </div>
        <div class="item">
            <span>专业：</span>
            <select class="selectItem" v-model="SelectmajorId">
                <option value="0">请选择一个专业</option>
                <option v-for="item in majorCatalog" :key="item.mId" :value="item.mId">{{item.mName}}</option>
            </select>
        </div>
        <div class="item">
            <span>班级：</span>
            <select class="selectItem" v-model="SelectclassId">
                <option value="0">请选择一个班级</option>
                <option v-for="item in classCatalog" :key="item.cId" :value="item.cId">{{item.className}}</option>
            </select>
        </div>
    </div>
</template>

<script>
import bus from '../../bus/index.js'
import {Toast} from 'mint-ui'
    export default {
        data() {
            return {
                opration: false,
                facultyCatalog: [],
                majorCatalog: [],
                classCatalog: [],
                SelectFacultyId: '0',
                SelectmajorId: '0',
                SelectclassId: '0'
            }
        },
        methods: {
            getCatalog() {
                let catalog = [
                    {
                        faculty: '信工',
                        id: '001',
                        major: [
                            {
                                mName: '软件工程',
                                mId: '001001',
                                mClasss: [
                                    {
                                        className: '软工1401B',
                                        cId: '001001001'
                                    },
                                    {
                                        className: '软工1501B',
                                        cId: '001001002'
                                    },
                                    {
                                        className: '软工1601B',
                                        cId: '001001003'
                                    }
                                ]
                            },
                            {
                                mName: '网络工程',
                                mId: '001002',
                                mClasss: [
                                    {
                                        className: '网工1401B',
                                        cId: '001002001'
                                    },
                                    {
                                        className: '网工1501B',
                                        cId: '001002002'
                                    },
                                    {
                                        className: '网工1601B',
                                        cId: '001002003'
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        faculty: '国际学院',
                        id: '002',
                        major: [
                            {
                                mName: '国软件工程',
                                mId: '002001',
                                mClasss: [
                                    {
                                        className: '国软工1401B',
                                        cId: '002001001'
                                    },
                                    {
                                        className: '国软工1501B',
                                        cId: '002001002'
                                    },
                                    {
                                        className: '国软工1601B',
                                        cId: '002001003'
                                    }
                                ]
                            },
                            {
                                mName: '国网络工程',
                                mId: '002002',
                                mClasss: [
                                    {
                                        className: '国网工1401B',
                                        cId: '002002001'
                                    },
                                    {
                                        className: '国网工1501B',
                                        cId: '002002002'
                                    },
                                    {
                                        className: '国网工1601B',
                                        cId: '002002003'
                                    },
                                ]
                            }
                        ]
                    }
                ]
                this.facultyCatalog = catalog
            }
        },
        mounted() {
            bus.$emit('operationOne', '添加')
            bus.$on('operationOneBack', text => {
                this.opration = true
            })
        },
        created() {
            this.getCatalog()
        },
        watch: {
            opration(val) {
                if (val) {
                    this.opration = false
                    if (this.SelectFacultyId != 0 && this.SelectmajorId != 0 && this.SelectclassId != 0) {
                        console.log('调用添加接口')
                    } else {
                        Toast('请先选择表单')
                    }
                }
            },
            SelectFacultyId(val) {
                this.facultyCatalog.forEach(item => {
                    if (item.id == val) {
                        this.majorCatalog = item.major
                    }
                });
                this.classCatalog = []
                this.SelectmajorId = 0
                this.SelectclassId = 0
            },
            SelectmajorId(val) {
                this.majorCatalog.forEach(item => {
                    if (item.mId == val) {
                        this.classCatalog = item.mClasss
                    }
                });
                this.SelectclassId = 0
            }
        },
        // 注销组件时，将状态值至空，不影响其他页面的头部组件
        beforeDestroy() {
            this.opration = false
            bus.$emit('operationOne', '')
        }
    }
</script>

<style scoped lang='less'>
.addClassInfo {
    padding: 1rem 0.4rem;
}
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    margin-bottom: 0.4rem;
    .selectItem {
        flex: 1;
        padding-left: 0.2rem;
        height: 0.8rem;
        border: none;
        border-radius: 4px;
        background: #46abe6;
        color: #fff;
        -webkit-appearance: none;
        outline: none;
    }
}
</style>