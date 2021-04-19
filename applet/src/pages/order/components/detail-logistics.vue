<template>
    <view class="detail-logistics flex align-center">
        <text class="iconfont iconorderdetails_logistics"></text>
        <template v-if="freight.type === 1">
            <template v-if="$h.test.isEmpty(freightObj.status)">
                <view class="flex-sub flex align-center" @click="navigateTo">
                    <view class="flex-sub he-text" v-if="!freightObj.state">
                        {{ freightObj.message }}
                    </view>
                    <view class="flex-sub he-data_now" v-else>
                        <view class="he-text he-line-2">{{ freightObj.desc }}</view>
                        <view class="he-time">{{ freightObj.datetime }}</view>
                    </view>
                    <text class="iconfont iconbtn_arrow"></text>
                </view>
            </template>
            <template v-else>
                <text class="he-text">{{ freight.logistics_company }}</text>
                <text class="he-text he-number">{{ freight.freight_sn }}</text>
                <button class="cu-btn he-copy" @click="copy(freight.freight_sn)">复制</button>
            </template>
        </template>
        <view class="flex-sub" v-else>
            <text class="he-text">无需物流</text>
        </view>
    </view>
</template>

<script>
export default {
    name: "detail-logistics",
    props: {
        freight: {
            type: Object,
            default: function () {
                return {}
            }
        },
        freightObj: {
            type: Object,
            default: function () {
                return {
                    status: 0
                }
            }
        },
        mobile: {
            type: String
        }
    },
    methods: {
        navigateTo: function () {
            uni.navigateTo({
                url: '/pages/order/logistics?no=' + this.freight.freight_sn + '&name=' + this.freight.logistics_company + '&mobile=' + this.mobile
            });
        },
        copy: function (content) {
            this.uniCopy({content});
        }
    },
    mounted() {
        console.log(this.freightObj);
    }
}
</script>

<style scoped lang="scss">
.detail-logistics {
    width: 100%;
    background: #FFFFFF;
    border-radius: 16px;
    margin-bottom: 20px;
    overflow: hidden;
    padding: 32px;
}

.iconorderdetails_logistics {
    font-size: 40px;
    color: rgb(215, 215, 215);
    margin-right: 26px;
}

.he-text {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}

.he-data_now {
    padding-right: 32px;
}

.he-time {
    height: 36px;
    line-height: 36px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}

.iconbtn_arrow {
    font-size: 28px;
    color: #bebebe;
}

.he-text {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.he-number {
    margin-left: 19px;
}
</style>