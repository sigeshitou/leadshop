<template>
    <view class="he-item flex" :data-theme="theme">
        <view class="he-item__check flex justify-center align-center" @click.stop.prevent="setSelect()">
            <he-radio
                v-if="!item.failure_reason || isEdit"
                :is-change="false"
                v-model="item.is_select"></he-radio>
            <view v-else class="he-invalid">失效</view>
        </view>
        <he-image :width="160" :height="160" @click.native="navigateTo(item.goods_id)"
                  :image-style="{borderRadius: '8rpx'}" :src="item.goods_image"></he-image>
        <view class="he-item__content">
            <view class="he-item__name he-line-1" :class="item.failure_reason ? 'he-item__0' : ''"
                  @click="navigateTo(item.goods_id)">{{ item.goods_name }}
            </view>
            <view class="he-item__attr" v-if="item.failure_reason !== 'is_sale'"
                  @click.stop="openShopping(item)">
                <text class="he-item__attr-text he-line-1">{{ item.show_goods_param }}</text>
                <text class="iconfont iconbtn_arrow"></text>
            </view>
            <view v-if="!item.failure_reason" class="he-item__bottom flex justify-between align-center">
                <view class="he-item__price">¥{{ item.price }}</view>
                <he-number-box @minus.stop="changeNumber"
                               @plus.stop="changeNumber"
                               :index="index"
                               @blur.stop="changeNumber"
                               :disabled-input="true"
                               v-model="item.goods_number"
                               :min="1" :max="item.stocks"></he-number-box>
            </view>
            <view v-else class="he-no-buy">商品已不能购买</view>
        </view>
    </view>
</template>

<script>
import heRadio from "../../../components/he-radio.vue";
import heNumberBox from "../../../components/he-number-box.vue";

export default {
    name: 'u-swipe-action',
    components: {
        heRadio,
        heNumberBox
    },
    props: {
        index: {
            type: [Number, String],
            default: ''
        },
        item: {
            type: Object
        },
        isEdit: {
            type: Boolean
        }
    },
    methods: {
        changeNumber: function (obj) {
            this.$emit('number', obj);
        },
        openShopping: function (item) {
            this.$emit('openShopping', item);
        },
        navigateTo: function (id) {
            uni.navigateTo({
                url: '/pages/goods/detail?id=' + id
            });
        },
        setSelect: function () {
            this.$emit('select');
        }
    }
};
</script>

<style scoped lang="scss">

.he-item {
    width: 710px;
    height: 233px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 32px 20px 32px 0;
    margin-bottom: 16px;
}

.he-item__check {
    width: 76px;
    height: 100%;
}

.he-item__image {
    width: 160px;
    height: 160px;
    border-radius: 8px;
    display: block;
    // #ifdef H5
    position: relative;
    // #endif
}

.he-item__content {
    width: 454px;
    height: 169px;
    padding-left: 24px;
    position: relative;
}

.he-item__name {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 1.3;
    margin-top: 5px;
}

.he-item__attr {
    margin-top: 20px;
    background: #F5F5F5;
    border-radius: 24px;
    display: inline-block;
    padding: 9px 18px 9px 21px;
}

.he-item__attr-text {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    line-height: 1.1;
    max-width: 352px;
    display: inline-block;
}

.iconbtn_arrow {
    width: 24px;
    height: 24px;
    font-size: 24px;
    margin-left: 14px;
    display: inline-block;
    transform: rotate(90deg);
}

.he-item__bottom {
    margin-top: 24px;
}

.he-item__price {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    @include font_color('font_color');
}

.he-invalid {
    width: 56px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: #CCCCCC;
    border-radius: 15px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
}

.he-no-buy {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    position: absolute;
    bottom: 10px;
}

.he-item__0 {
    color: #999999;
}
</style>
