<template>
    <div class="class-info">
        <div class="faculty" v-for="(item,index) in tableInfo" :key=index>
            <!-- 这里的inpit 的 id 和label 的 for 循环的时候注意处理 -->
            <input class="faculty-input" type="checkbox" :id="'faculty' + index">
            <label class="faculty-title" :for="'faculty' + index">
                <div class="faculty-title-left">
                    <i class="iconfont icon-Shapecopy"></i> {{item.faculty }}
                </div>
                <i class="arrows"></i>
            </label>
            <div class="major" v-for="(mItem,mIndex) in item.major" :key="mIndex">
                <!-- 这里的inpit 的 id 和label 的 for 循环的时候注意处理 -->
                <input class="major-input" type="checkbox" :id="'major' + index + mIndex">
                <label class="major-title" :for="'major' + index + mIndex">
                    <div class="major-title-left">
                        <i class="iconfont icon-Shapecopy"></i> {{mItem.name}}
                    </div>
                    <i class="arrows"></i>
                </label>
                <div class="class">
                    <div class="class-title" v-for="(cItem,cIndex) in mItem.classInfo" :key="cIndex">
                        <span>{{cItem.name}} </span>
                        <span>{{cItem.number}} <i class="arrows"></i></span>
                    </div>
                </div>
            </div>


        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableInfo: [
                    {
                        faculty: '信息工程学院',
                        abc: 100,
                        major: [
                            {
                                name: '软件工程',
                                classInfo: [
                                    {
                                        name: '软工1401B',
                                        number: 77
                                    },
                                    {
                                        name: '软工1501B',
                                        number: 55
                                    }
                                ]
                            },
                            {
                                name: '网络工程',
                                classInfo: [
                                    {
                                        name: '网工1501B',
                                        number: 66
                                    },
                                    {
                                        name: '网工1601B',
                                        number: 77
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        faculty: '信息工程学院',
                        abc: 101,
                        major: [
                            {
                                name: '软件工程',
                                classInfo: [
                                    {
                                        name: '软工1401B',
                                        number: 77
                                    },
                                    {
                                        name: '软工1501B',
                                        number: 55
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped lang='less'>
.class-info {
    padding: 0.4rem 0.4rem 0;
    color: #333;
    background: #fff;
    height: 100%;
}
.faculty {
    display: block;
    cursor: pointer;
    margin-bottom: 0.2rem;
        .faculty-input:checked ~ &-title .arrows{
            transform: rotateZ(135deg)
        }
        .faculty-input:checked ~ .major {
            // min-height: 0.8rem;
            max-height: 3rem;
        }
    &-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(108,170,208,0.6);
        line-height: 1rem;
        &-left {
            i {
                color: rgb(108,170,208);
                padding:  0 0.2rem;
            }
        }
        .arrows {
            border-color: #666;
            transform: rotateZ(-45deg);
        }
    }
}
.major {
    padding: 0.1rem 0 0 0.4rem;
    max-height: 0;
    // min-height: 0;
    overflow: hidden;
    transition: max-height 1s ease;
    .major-input:checked ~ &-title .arrows {
        transform: rotateZ(135deg)
    }
    .major-input:checked ~ .class .class-title {
        max-height: 1rem;
        border-color: #e8e8e8;
    }
    &-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(108,170,208,0.2);
        line-height: 0.8rem;
        &-left {
            font-size: 0.3rem;
            i {
                color: rgb(108,170,208);
            padding:  0 0.2rem;
            }
        }
        .arrows {
            border-color: #666;
            transform: rotateZ(-45deg);
        }
    }
}
.class {
    padding: 0.1rem 0 0 0.4rem;
    &-title {
        line-height: 0.8rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid transparent;

        overflow: hidden;
        max-height: 0;
        transition: max-height 1s ease;
        span {
            font-size: 0.28rem;
            &:last-child {
                display: flex;
                align-items: center;
            }
        }
    }
}
.arrows {
    width: 10px;
    height: 10px;
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    margin: 0 0.2rem;
    transform: rotateZ(45deg);
    border-color: rgb(108,170,208);
    transition: transform .5s ease;
}
.faculty-input,.major-input {
    display: none;
}
</style>