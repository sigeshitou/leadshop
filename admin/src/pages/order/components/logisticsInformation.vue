<template>
    <div>
        <template v-if="value.freight.type ===1">
            <div class="le-header flex align-center">
                <span class="le-header--label">物流公司:</span>
                <span class="le-header--value">{{value.freight.logistics_company}}</span>
                <span class="le-header--label">快递单号:</span>
                <span class="le-header--value">{{value.freight.freight_sn}}</span>
                <span @click="copyTrackingNumber" class="le-header--copy">复制</span>
                <input id="copy-tracking-number" :value="value.freight.freight_sn">
            </div>
            <div class="le-body" v-loading="loading">
                <div style="padding:20px;" v-if="state < 1" class="le-desc"> 抱歉！未查到此运单物流信息，请确认运单号码是否正确，或联系客服</div>
                <logistics-step :list="list" v-if="state >= 1"></logistics-step>
            </div>
        </template>
        <el-form label-width="110px" class="le-matter" v-else>
            <el-form-item label="发货方式：">
                <span  class="le-text">无需物流</span>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import logisticsStep from "./logisticsStep";

export default {
    name: "logisticsInformation",
    components: {
        logisticsStep
    },
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            list: [],
            loading: false,
            state: 1
        }
    },
    methods: {
        getExpress: function () {
            let _this = this;
            this.loading = true;
            this.$heshop.express('post', {
                no: this.value.freight.freight_sn,
                mobile: this.value.buyer.mobile,
                name: this.value.freight.logistics_company
            }).then(function (res) {
                console.log(res);
                _this.state = res.state;
                if (parseInt(res.state) < 1) {
                    _this.message = res.message
                } else {
                    _this.list = res.list.reverse();
                }
                _this.loading = false;
            }).catch(function (err) {
                _this.loading = false;
                if (err.status === 403) {
                    _this.$message.error(err.data.message);
                }
            })
        },
        affirm(e) {
            let {handleClose} = e;
            handleClose();
        },
        copyTrackingNumber: function() {
            let input = document.getElementById("copy-tracking-number");
            input.select();
            document.execCommand("copy");
            this.$message.success('复制成功');
        },
    },
    mounted() {
        if (this.value.freight.type ===1) {
            this.getExpress();
        }
    }
}
</script>
<style scoped lang="scss">
.le-header {
    width: 660px;
    height: 40px;
    background: #F3F5F7;
    .le-header--label {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #8C8C8C;
        margin-right: 12px;
        margin-left: 24px;
    }
    .le-header-value {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #262626;
    }
    .le-header--copy {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #623CEB;
        opacity: 0.85;
        padding: 0 14px;
        margin: 0 10px;
        cursor: pointer;
    }
}

.le-body {
    width: 660px;
    height: 260px;
    margin-top: 4px;
    border: 1px solid #DCDFE6;
}

/deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
}
.le-desc {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #262626;
    line-height: 18px;
}
.le-time-line {
    width: 658px;
    padding-left: 40px;
    padding-top: 24px;

    .le-time-item {
        position: relative;
        border-left: 1px solid #E5E5E5;
        min-height: 50px;
        padding-bottom: 23px;
        .le-item-content {
            margin-left: 20px;
            position: absolute;
            top: -3px;
        }

        .le-datetime {
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #8C8C8C;
            line-height: 18px;
            margin-top: 11px;
        }
    }
    .le-time-item:last-child {
        border-left: none;
    }

    .le-dot {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        position: absolute;
        left: -5px;
    }
    .le-dot--default {
        background: #DCDFE6;
    }
    .le-dot--first {
        background-color: #623CEB;
    }
}
#copy-tracking-number {
    background-color: #ffffff;
    border: none;
    opacity: 0;
    position: absolute;
    z-index: -10;
}
</style>
