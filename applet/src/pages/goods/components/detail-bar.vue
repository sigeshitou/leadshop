<template>
    <view :style="[style]" class="he-detail-bar" :data-theme="theme">
        <view class="he-top" :style="[topHeight]"></view>
        <view class="he-bottom flex" :style="[bottomHeight]">
            <view class="he-back-btn flex align-center justify-center" @click="navigateBack">
                <text class="iconfont iconbtn_back"></text>
            </view>
            <view class="flex he-tabs align-center" v-if="isBar">
                <view class="he-tab" @click="scroll('detail-banner')" :class="tab === 1 ? 'he-tab-active' : ''">商品</view>
                <view class="he-tab" @click="scroll('evaluation')" :class="tab === 2 ? 'he-tab-active' : ''">评价</view>
                <view class="he-tab" @click="scroll('rich')" :class="tab === 3 ? 'he-tab-active' : ''">详情</view>
                <view class="he-tab" v-if="goods" @click="scroll('products-featured')" :class="tab === 4 ? 'he-tab-active' : ''">推荐</view>
            </view>
        </view>
    </view>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "detail-bar",
    props: {
        isBar: {
            type: Boolean,
            default: function () {
                return false;
            }
        },
        tab: {
            type: Number,
        },
        scrollIntoView: {
            type: String
        },
        goods: {
            type: Number
        }
    },
    computed: {
        ...mapGetters({
            navbarHeight: 'setting/getNavBarHeight',
            statusBarHeight: 'setting/statusBarHeight',
        }),
        style: function () {
            let style = {
                height: this.navbarHeight + this.statusBarHeight + 'px',
            }
            if (this.isBar) {
                style.backgroundColor = '#ffffff';
            }
            return style;
        },
        topHeight: function () {
            return {
                height: this.statusBarHeight + 'px',
            }
        },
        bottomHeight: function () {
            return {
                height: this.navbarHeight + 'px',
            }
        },
        scrollInto: {
            get: function () {
                return this.scrollIntoView;
            },
            set: function (str) {
                this.$emit('update:scrollIntoView', str);
            }
        }
    },
    methods: {
        navigateBack: function () {
            uni.navigateBack({
                delta: 1
            });
        },
        scroll: function (str) {
            this.$emit('update:scrollIntoView', str);
        }
    }
}
</script>

<style scoped lang="scss">
.he-top {
}

.he-detail-bar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0);
    z-index: 1000;
}
.he-bottom {
    .he-back-btn {
        width: 64px;
        height: 64px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        margin-left: 14px;
        margin-right: 80px;
        .iconbtn_back {
            color: rgba(25, 25, 25, 1);
            font-size: 40px;
        }
    }
}
.he-tabs {
    padding-bottom: 20px;
}
.he-tab {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 34px;
    margin-right: 50px;
    padding: 20px 0;
}
.he-tab-active {
    border-bottom: 2px solid red;
    @include border_color('border_color');
}
</style>