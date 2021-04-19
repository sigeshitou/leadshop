<template>
    <view class="he-page-content" :class="isLoading ? 'flex justify-center align-center' : ''" :data-theme="theme">
        <view class="he-touch" v-if="isTouch"  @touchmove.stop.prevent="() => {}"></view>
        <detail-skeleton v-if="isLoading"></detail-skeleton>
        <template v-else-if="!isLoading && !emptyStatus">
            <he-navbar :is-back="true" :background="barBackground">
                <view class="flex he-tabs justify-center" v-if="isBar">
                    <view class="he-tab" @click="pageScrollTo('banner', 1, top.banner)">商品
                        <view class="he-tab-line" v-if="tab === 1"></view>
                    </view>
                    <view class="he-tab" @click="pageScrollTo('evaluation', 2, top.evaluation)">评价
                        <view class="he-tab-line" v-if="tab === 2"></view>
                    </view>
                    <view class="he-tab" @click="pageScrollTo('rich', 3, top.rich)">详情
                        <view class="he-tab-line" v-if="tab === 3"></view>
                    </view>
                    <view class="he-tab" @click="pageScrollTo('featured', 4, top.featured)"
                          v-if="isProductsFeatured">推荐
                        <view class="he-tab-line" v-if="tab === 4"></view>
                    </view>
                </view>
            </he-navbar>
            <view id="banner"></view>
            <detail-banner id="detail-banner" :video="detail.video" :is-video="detail.is_video"
                           :video-cover="detail.video_cover"
                           :list="detail.slideshow" :goods-id="detail.id"></detail-banner>
            <detail-basic-information
                :name="detail.name"
                :price="detail.price"
                :unit="detail.unit"
                :sales="detail.sales"
                :goods="detail"
                :goods-id="detail.id"
                :virtual_sales="detail.virtual_sales"
                :line-price="detail.line_price"></detail-basic-information>
            <detail-parameter
                :unit="detail.unit"
                :package="detail.package"
                @shopping="shopping"
                :select="select"
                :goods-id="detail.id"
                :services="detail.services">
            </detail-parameter>
            <view class="el-float" :style="[floatStyle]" id="evaluation"></view>
            <detail-evaluation id="detail-evaluation" :goods-id="detail.id"></detail-evaluation>
            <view class="el-float" :style="[floatStyle]" id="rich"></view>
            <detail-rich id="detail-rich" :content="detail.body.content"></detail-rich>
            <view class="el-float" :style="[floatStyle]" id="featured"></view>
            <he-products-featured id="products-featured"
                                  v-if="isProductsFeatured"></he-products-featured>
            <detail-bottom-button
                :slide-show="detail.slideshow"
                :name="detail.name"
                :stocks="detail.stocks"
                :shopping-type.sync="shoppingType"
                v-model="isShopping"></detail-bottom-button>
            <he-cart
                :show.sync="isShopping"
                :shopping-type="shoppingType"
                @setSelect="setSelect"
                :goods="detail"></he-cart>
            <view class="safe-area-inset-bottom">
                <view class="he-bottom-height"></view>
            </view>
        </template>
        <template v-else-if="emptyStatus">
            <he-no-content-yet :text="emptyText" :image="ipAddress + '/goods-background-empty.png'"></he-no-content-yet>
            <he-products-featured></he-products-featured>
        </template>
    </view>
</template>

<script>
import detailBanner from "./components/detail-banner.vue";
import detailBasicInformation from "./components/detail-basic-information.vue";
import detailParameter from "./components/detail-parameter.vue";
import detailEvaluation from "./components/detail-evaluation.vue";
import detailRich from "./components/detail-rich.vue";
import detailBottomButton from "./components/detail-bottom-button.vue";
import detailSkeleton from "./components/detail-skeleton.vue";
import detailBar from "./components/detail-bar.vue";
import heProductsFeatured from "../../components/he-products-featured.vue";
import heCart from "../../components/he-cart.vue";
import heNoContentYet from "../../components/he-no-content-yet.vue";
import heNavbar from "../../components/he-navbar.vue";
import {mapGetters} from "vuex";

export default {
    name: "detail",
    components: {
        detailBanner,
        detailBasicInformation,
        detailParameter,
        detailEvaluation,
        detailRich,
        detailBottomButton,
        detailSkeleton,
        heProductsFeatured,
        heCart,
        heNoContentYet,
        detailBar,
        heNavbar
    },
    computed: {
        ...mapGetters("setting", {
            address: "getLocation",
            goodsSetting: 'goodsSetting',
            navbarHeight: 'getNavBarHeight',
            statusBarHeight: 'statusBarHeight',
        }),
        isProductsFeatured: function () {
            return this.goodsSetting.recommend_showpage.goodsinfo.value;
        },
        emptyText: function () {
            if (this.emptyStatus === 1) {
                return "商品不存在";
            } else if (this.emptyStatus === 2) {
                return "商品已下架";
            }
        },
        shareData: function () {
            return {
                title: this.detail.name,
                path: '/pages/goods/detail?id=' + this.detail.id,
                // #ifndef H5
                imageUrl: this.detail.slideshow[0],
                // #endif
                // #ifdef H5
                imgUrl: this.detail.slideshow[0],
                // #endif
            }
        },
        floatStyle: function () {
            return {
                transform: `translateY(-${this.navbarHeight + this.statusBarHeight - uni.upx2px(24)}px)`
            }
        },
        barBackground: function () {
            if (this.isBar) {
                return {
                    background: '#ffffff'
                }
            } else {
                return {
                    background: 'transparent'
                }
            }
        }
    },
    data() {
        return {
            detail: {
                slideshow: []
            },
            isLoading: true,
            isShopping: false,
            select: null,
            shoppingType: 'cart',
            emptyStatus: null,
            isBar: false,
            tab: 1,
            isScroll: false,
            top: {
                banner: 0,
                evaluation: 0,
                rich: 0,
                featured: 0
            },
            isTouch: false
        }
    },
    methods: {
        getDetail: function getDetail(id, callback) {
            let _this = this;
            _this.$heshop.goods('get', id).then(function (res) {
                if (!res.hasOwnProperty('empty_status')) {
                    _this.detail = res;
                } else {
                    _this.emptyStatus = res.empty_status;
                    uni.setNavigationBarTitle({
                        title: _this.emptyText
                    });
                }
                callback();
            }).catch(err => {
                console.error(err);
                this.$toError();
            });
        },
        shopping: function () {
            this.isShopping = true;
            this.shoppingType = '';
        },
        setSelect: function (select) {
            this.select = select;
        },
        selectEval: function (id) {
            let _this = this;
            return new Promise(function (resolve) {
                uni.createSelectorQuery().select(id).boundingClientRect(function (rect) {
                    resolve(rect.top - _this.navbarHeight - _this.statusBarHeight);
                }).exec();
            });
        },
        catchtouchmove: function () {

        },
        // #ifdef H5
        async pageScrollTo(str, num, top) {
            let _this = this;
            _this.isScroll = true;
            await uni.pageScrollTo({
                scrollTop: top + 10,
                duration: 200
            });
            // H5的执行顺序跟小程序不一样 所以必须在
            // setTimeout(() => {
            //     _this.isScroll = false;
            // }, 800);
        },
        // #endif
        // #ifndef H5
        pageScrollTo: function (str, num, top) {
            let _this = this;
            _this.isScroll = true;
            uni.pageScrollTo({
                selector: '#' + str,
                duration: 200,
                success: function () {
                    _this.isScroll = false;
                }
            });
        }
        // #endif
    },
    onLoad(options) {
        this.isTouch = true;
        // #ifdef MP-WEIXIN
        uni.showShareMenu({
            withShareTicket: true
        });
        // #endif
        let id = 0;
        if (options.scene) {
            id = parseInt(decodeURIComponent(options.scene).split('=')[1]);
        } else {
            id = parseInt(options.id);
        }
        let _this = this;
        this.getDetail(id, function () {
            _this.isLoading = false;
            // #ifdef H5
            _this.$wechat.onMenuShareAppMessage(_this.shareData);
            setTimeout(() => {
                let array = [_this.selectEval('#detail-evaluation'), _this.selectEval('#detail-rich')];
                if (_this.isProductsFeatured) {
                    array.push(_this.selectEval('#products-featured'));
                }
                Promise.all(array).then(function (res) {
                    _this.top.evaluation = res[0]
                    _this.top.rich = res[1]
                    if (_this.isProductsFeatured) {
                        _this.top.featured = res[2];
                    }
                    _this.isTouch = false;
                });
            }, 800);
            // #endif
            // #ifndef H5
            _this.isTouch = false;
            // #endif
        });
    },
    onPageScroll(e) {
        let _this = this;
        _this.isBar = e.scrollTop > 150;
        let array = [_this.selectEval('#detail-evaluation'), _this.selectEval('#detail-rich')];
        if (_this.isProductsFeatured) {
            array.push(_this.selectEval('#products-featured'));
        }
        Promise.all(array).then(function (res) {
            if (res[0] < 0) {
                _this.tab = 2;
            } else {
                _this.tab = 1;
            }
            if (res[1] < 0) {
                _this.tab = 3;
            }
            if (_this.isProductsFeatured && res[2] < 0) {
                _this.tab = 4;
            }
        });
    },
    // #ifndef H5
    onShareAppMessage() {
        return this.$shareAppMessage(this.shareData);
    }
    // #endif
}
</script>

<style scoped lang="scss">
.he-bottom-height {
    height: 115px;
}

.he-page-content {
    overflow: hidden;
}

.el-float {
    position: absolute;
    z-index: -10;
    width: 100%;
}

.he-tabs {
    width: 100%;
    background-color: #ffffff;

    .he-tab {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        padding: 18px 24px;
        position: relative;
    }

    .he-tab-line {
        width: 24px;
        height: 4px;
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        @include background_color("background_color");
        border-radius: 2px;
    }
}

.he-touch {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 10000;
}
</style>
