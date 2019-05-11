<template>
    <div class="class-info">
        <div class="faculty" v-for="(item,index) in tableInfo" :key=index>
            <input class="faculty-input" type="checkbox" :id="'faculty' + index">
            <label class="faculty-title" :for="'faculty' + index" @click="isMajorNull(item.majorData)">
                <div class="faculty-title-left">
                    <i class="iconfont icon-Shapecopy"></i> {{ item.facultyName }}
                </div>
                <i class="arrows"></i>
            </label>
            <div class="major" v-show="item.majorData[0]" v-for="(mItem,mIndex) in item.majorData" :key="mIndex">
                <input class="major-input" type="checkbox" :id="'major' + index + mIndex">
                <label class="major-title" :for="'major' + index + mIndex" @click="isGradeNull(mItem.gradeData)">
                    <div class="major-title-left">
                        <i class="iconfont icon-Shapecopy"></i> {{mItem.majorName}}
                    </div>
                    <i class="arrows"></i>
                </label>
                <div class="class" v-show="mItem.gradeData && mItem.gradeData[0] && mItem.gradeData[0]._id">
                    <div class="class-title"  v-for="(cItem,cIndex) in mItem.gradeData" :key="cIndex" @click="handleDetail(cItem._id)">
                        <span>{{cItem.gradeName}} </span>
                        <!-- <span>{{cItem.number}} <i class="arrows"></i></span> -->
                    </div>
                </div>
            </div>

        </div>

        <!-- <div v-if="tableInfo[0] && tableInfo[0].desc">
            {{tableInfo[0].majorData[0].desc}}
        </div> -->
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        data() {
            return {
                tableInfo: []
            }
        },
        methods: {
            // 跳转班级详情页
            handleDetail(id) {
                this.$router.push(`/layout/classInfoDetail/${id}`)
            },
            // 获取信息
            getFaculty() {
                let updataMajor = 0;
                let updataGrade = 0;
                let majorNum = 0;
                this.$axios.get(`/faculty`).then( res => {
                    res.data.forEach(item=> {
                        this.$axios.get(`/major/faculty/${item._id}`).then(res2 => {
                            if (!res2.data[0]) {
                                item.majorData = {isNull: true};
                            } else {
                                item.majorData = res2.data;
                                updataGrade ++;
                                
                                res2.data.forEach( (item2,index) => {
                                    this.$axios.get(`/grade/major/${item2._id}`).then(res3 => {
                                        if (!res3.data[0]) {
                                            item2.gradeData = {isNull: true}
                                        } else {
                                            item2.gradeData = res3.data;
                                        }
                                        if (index == res2.data.length -1) {
                                            // console.log('一个major下的grade渲染结束')
                                            majorNum ++
                                            if(majorNum == updataGrade) {
                                                // console.log('渲染结束')
                                                this.tableInfo = res.data;
                                            }
                                        }
                                    })
                                })
                            }
                            updataMajor ++ ;
                           
                        })
                    })
                   
                })
            },


            // 判断是否为空
            isMajorNull(ele) {
                if (ele.isNull) {
                    Toast('该院系下暂无数据')
                }
            },
            isGradeNull(ele) {
                if (ele.isNull) {
                    Toast('该专业下暂无数据')
                }
            }
           
        },
        created() {
            this.getFaculty()
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
            display: block;
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
    display: none;
    overflow: hidden;
    transition: all 1s ease;
    .major-input:checked ~ &-title .arrows {
        transform: rotateZ(135deg)
    }
    .major-input:checked ~ .class .class-title {
        display: block;
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
        display: none;
        transition: all 1s ease;
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