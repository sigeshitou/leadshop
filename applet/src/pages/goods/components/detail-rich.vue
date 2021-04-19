<template>
    <view class="detail-rich" id="detail-rich">
        <view class="he-top">- 商品详情 -</view>
        <view class="he-content">
           <!--  #ifdef H5 -->
            <div v-if="content" v-html="content"></div>
            <!-- #endif -->
            <!-- #ifndef H5 -->
            <he-rich v-if="content" :content="content" :lazy-load="true"></he-rich>
            <!-- #endif -->
            <view v-else class="he-empty">暂无内容</view>
        </view>
    </view>
</template>

<script>
import heRich from "@/components/he-html/he-html.vue";
export default {
    name: "detail-rich",
    props: {
        content: {
            type: [String, Array]
        }
    },
    components: {
        heRich
    }
}
</script>

<style scoped>
.detail-rich {
    margin-top: 20px;
}
.he-top {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    padding: 20px 0;
    text-align: center;
}
.he-content {
    padding: 20px;
    background: #FFFFFF;
}
.he-empty {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    text-align: center;
    padding: 36px 0;
}
</style>