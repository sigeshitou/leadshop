<template>
    <view class="he-page-content" :class="loading ? 'flex justify-center align-center' : ''">
        <he-loading size="50" mode="flower" v-if="loading"></he-loading>
        <template v-if="!loading">
            <detail-top
                :status="detail.status"
                :created-time="detail.created_time"
                :received-time="detail.received_time"
                :after-sales="detail.after_sales"
            ></detail-top>
            <view class="he-detail">
                <view class="he-order-detail">
                    <detail-logistics v-if="detail.status >= 202" :mobile="detail.buyer.mobile" :freight-obj="freight"
                                      :freight="detail.freight"></detail-logistics>
                    <detail-receipt :consignee-info="detail.buyer"></detail-receipt>
                    <detail-product-info :goods="detail.goods" :status="detail.status"></detail-product-info>
                    <detail-price
                        :goods-amount="detail.goods_amount"
                        :freight-amount="detail.freight_amount"
                        :pay-amount="detail.pay_amount"
                        :status="detail.status"
                    ></detail-price>
                    <detail-order-info
                        :order-sn="detail.order_sn"
                        :created-time="detail.created_time"
                        :pay-time="detail.pay_time"
                        :send-time="detail.send_time"
                        :received-time="detail.received_time"
                        :finish-time="detail.finish_time"
                        :note="detail.buyer.note"
                        :status="detail.status"
                    ></detail-order-info>
                </view>
                <he-products-featured v-if="goodsSetting.recommend_showpage.orderinfo.value"></he-products-featured>
                <view class="safe-area-inset-bottom" v-if="isBottom">
                    <view class="he-bottom-height"></view>
                </view>
            </view>
            <detail-bottom-operating
                v-if="isBottom"
                :order-sn="detail.order_sn"
                :order-id="detail.id"
                :pay-amount="detail.pay_amount"
                :total-amount="detail.total_amount"
                :is-evaluate="detail.is_evaluate"
                :status.sync="detail.status">
            </detail-bottom-operating>
        </template>
    </view>
</template>

<script>
import detailTop from "./components/detail-top.vue";
import detailReceipt from "./components/detail-receipt.vue";
import detailProductInfo from "./components/detail-product-info.vue";
import detailPrice from "./components/detail-price.vue";
import detailBottomOperating from "./components/detail-bottom-operating.vue";
import detailOrderInfo from "./components/detail-order-info.vue";
import detailLogistics from "./components/detail-logistics.vue";
import heProductsFeatured from "../../components/he-products-featured.vue";
import heLoading from "../../components/he-loading.vue";
import {mapGetters} from "vuex";

export default {
    name: "detail",
    components: {
        detailTop,
        detailReceipt,
        detailProductInfo,
        detailPrice,
        detailBottomOperating,
        detailOrderInfo,
        detailLogistics,
        heProductsFeatured,
        heLoading
    },
    data() {
        return {
            detail: {
                goods: [],
                buyer: {},
            },
            loading: true,
            freight: {
                status: 0,
                message: '',
                desc: '',
                datetime: ''
            }
        }
    },
    computed: {
        isBottom: function () {
            let {status, is_evaluate} = this.detail;
            return status === 100 || status === 202 || (status === 203 && is_evaluate === 0);
        },
        ...mapGetters('setting', {
            goodsSetting: 'goodsSetting'
        }),
    },
    methods: {
        getDetail: function (id) {
            let _this = this;
            this.$heshop.order('get', id).then(function (res) {
                _this.detail = res;
                if (res.status >= 202 && res.freight.type === 1) {
                    _this.loading = true;
                    let {freight_sn, mobile, logistics_company} = res.freight;
                    _this.$heshop.express('post', {
                        no: freight_sn,
                        mobile: mobile,
                        name: logistics_company
                    }).then(function (response) {
                        if (response.state >= 1) {
                            _this.freight = response.list[response.list.length - 1];
                        } else {
                            _this.freight.message = response.message;
                        }
                        _this.freight.no = freight_sn;
                        _this.freight.mobile = res.buyer.mobile;
                        _this.freight.name = logistics_company;
                        _this.freight.state = response.state;
                    }).catch(function (err) {
                        console.log(err);
                        _this.freight.status = err.status;
                    });
                }
                _this.loading = false;
            }).catch(function (err) {
                console.error(err);
                _this.$toError();
            });
        }
    },
    onLoad(options) {
        // #ifdef H5
        this.$wechat.init();
        // #endif
        options.id ? this.getDetail(parseInt(options.id)) : this.$toError();
    },
    onShow() {
        let storageKey = this.$storageKey.evaluation_post;
        let storage = uni.getStorageSync(storageKey);
        if (storage) {
            this.detail.is_evaluate = 1;
            uni.removeStorageSync(storageKey);
        }
    }
}
</script>

<style lang="less">
.he-page-content {
    overflow: hidden;
}

.he-detail {
    position: relative;
    z-index: 1;
    margin-top: 186px;

    /deep/ .he-copy {
        height: 34px;
        width: 66px;
        text-align: center;
        line-height: 32px;
        padding: 0;
        background: #FFFFFF;
        border: 1px solid #CCCCCC;
        border-radius: 17px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-left: 12px;
    }
}

.he-order-detail {
    padding: 20px;
}

.he-bottom-height {
    height: 96px;
}
</style>
