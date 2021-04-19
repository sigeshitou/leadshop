<template>
    <div class="le-matter">
        <div class="le-header flex align-center">
            <img class="le-header-log" src="../../assets/images/leashop.png" alt="">
            <div class="le-header-name">LEADSHOP更新日志</div>
        </div>
        <div class="le-body">
            <el-scrollbar style="height: 100%">
                <div class="le-card">
                    <div class="le-time-item" v-for="(item, index) in list" :key="index"
                         :class="list.length-1 === index ? '' : 'le-border'">
                        <div class="le-dot" :class="!item.is_last_version ? 'le-dot-default' : 'le-dot-last'"></div>
                        <div class="le-left">
                            <div class="le-version">
                                <span class="le-version-new" v-if="item.is_last_version">new</span>
                                V{{ item.version }}
                            </div>
                            <div class="le-time">{{item.time}}</div>
                        </div>
                        <div class="le-content">
                            <div class="flex align-center le-content-header">
                                <button v-if="item.is_last_version" class="le-button">
                                    <a href="https://forum.leadshop.vip/category/2?search_ids=2" target="_blank" style="color: #fff;">下载更新包</a>
                                </button>
                                <span v-if="item.is_need" class="le-prompt">此版本需上传小程序包重新发布</span>
                                <div v-if="item.host_version" class="le-host-version" >
                                    <span class="le-icon le-icon-positioning">  您当前的版本</span>
                                </div>
                            </div>
                            <div class="le-content-info">
                                <div class="le-content-info-item flex align-top" v-for="(tag, key) in item.content.slice(0, item.is_collapse? item.content.length : 2)" :key="key">
                                    <span class="le-tag le-icon " :class="tag.type == 1 ? 'le-icon-add' : tag.type == 2 ? 'le-icon-youhua' : 'le-icon-xiufu'">
                                        {{tag.type == 1 ? '新增' : tag.type == 2 ? '优化' : '修复'}}
                                    </span>
                                    <span class="le-content-info-item__text flex-sub">{{tag.text}}</span>
                                </div>
                                <div v-if="item.content.length > 2" class="le-more flex" @click="item.is_collapse = !item.is_collapse">
                                    <span>{{item.is_collapse ? '收起' : '展开'}}</span>
                                    <span class="le-icon " :class="item.is_collapse ? 'le-icon-arrow-top' : 'le-icon-arrow-down'"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center le-pagination">
                        <el-pagination
                            background
                            layout="prev, pager, next, jumper"
                            @current-change="currentChange"
                            :current-page="pagination.current"
                            :page-count="pagination.count">
                        </el-pagination>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "changelog",
    computed: {
        ...mapGetters({
            'getStore': 'setting/getStore'
        })
    },
    data() {
        return {
            pagination: {
                current: 1,
                count: 1
            },
            list: [

            ],
            last_version: '1.0.0'
        }
    },
    methods: {
        currentChange: function (e) {
            this.pagination.current = e;
            this.getList();
        },
        getList: function () {
            let _this = this;
            this.$heshop.cloud('get').page(this.pagination.current, 5).then(function (res) {
                let list = res.list;
                for (let i = 0; i < list.length; i++) {
                    list[i].is_collapse = false;
                    if (list[i].version == res.host_version) {
                        list[i].host_version = true;
                    }
                    if (list[i].version === res.last_version.version) {
                        list[i].is_last_version = true;
                    }
                }
                _this.list = res.list;
                _this.pagination = {
                    current: res.pagination.current_page,
                    count: res.pagination.page_count
                }
            }).catch(function (err) {
               console.error(err);
            });
        }
    },
    mounted() {
        this.getList();
    }
}
</script>

<style scoped lang="scss">
.le-matter {
    min-width: 1200px;
}

.le-header {
    width: 100%;
    height: 64px;
    background-color: #FFFFFF;

    .le-header-log {
        width: 36px;
        height: 36px;
        margin: 0 0 0 118px;
    }

    .le-header-name {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #262626;
        margin-left: 20px;
    }
}

.le-body {
    height: calc(100vh - 64px);
    background-color: #F3F5F7;
    overflow: hidden;
    /deep/.el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .le-card {
        margin: 24px 120px 74px 120px;
        height: calc(100% - 98px);
        background: #FFFFFF;
        border-radius: 16px;
        padding-left: 200px;
        padding-top: 64px;
        padding-right: 80px;
        overflow: hidden;
        .le-pagination {
            margin-bottom: 64px;
        }
        .le-time-item {
            position: relative;

            .le-dot {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                position: absolute;
                left: -8px;
            }
            .le-dot-default {
                background: #DCDFE6;
            }
            .le-dot-last {
                background: #623CEB;
            }
            .le-left {
                position: absolute;
                left: -135px;
                text-align: right;
                width: 115px;

                .le-version {
                    font-size: 20px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #222222;
                    text-align: right;
                    .le-version-new {
                        display: inline-block;
                        text-align: center;
                        width: 42px;
                        height: 20px;
                        line-height: 20px;
                        background: #623CEB;
                        border-radius: 10px 10px 0 10px;
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #FFFFFF;
                    }
                }

                .le-time {
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #999999;
                    text-align: right;
                }
            }

            .le-content {
                padding-left: 28px;
                padding-bottom: 48px;
                .le-content-header {
                    margin-bottom: 10px;
                }
                .le-host-version {
                    span {
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #623CEB;
                    }
                    span:last-child {
                        margin-left: 5px;
                        line-height: 1;
                    }
                }
                .le-button {
                    width: 118px;
                    height: 32px;
                    background: #623CEB;
                    border-radius: 4px;
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #FFFFFF;
                    outline: none;
                    border: none;
                    cursor: pointer;
                    margin-right: 15px;
                }
                .le-prompt {
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #595959;
                }
            }

            .le-content-info {
                width: 100%;
                background: #F7F7F7;
                border-radius: 0px 16px 16px 16px;
                padding: 24px;
                .le-more {
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #623CEB;
                    cursor: pointer;
                    height: 16px;
                    line-height: 16px;
                }
                .le-icon-arrow-top {
                    font-size: 12px;
                    margin-left: 4px;
                }
                .le-tag {
                    display: inline-block;
                    width: 54px;
                    height: 18px;
                    border-radius: 9px;
                    font-size: 12px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #FFFFFF;
                    padding: 0 7px;
                }
                .le-icon-add {
                    background: #518DF5;
                }
                .le-icon-youhua {
                    background: #FBAD15;
                }
                .le-icon-xiufu {
                    background: #53C41A;
                }
                .le-content-info-item {
                    margin-bottom: 10px;
                    .le-content-info-item__text {
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #262626;
                        margin-left: 8px;
                        line-height: 18px;
                    }
                }
            }
        }

        .le-time-item.le-border {
            border-left: 1px solid #DCDFE6;
        }
    }
}
</style>