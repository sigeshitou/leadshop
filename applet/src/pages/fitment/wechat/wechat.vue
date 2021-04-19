<template>
    <view class="le-wechat">
        <official-account></official-account>
    </view>
</template>
<script type="text/javascript">
export default {
    name: 'wechat',
};
</script>
<style lang="scss" scoped="true">
.le-wechat {
    height: 170px;
    width: 100%;

    .le-wechat__tips {
        color: #c5c5c5;
        font-size: 20px;
        padding-left: 20px;
    }

    .le-wechat-body {
        width: 100%;
        height: 120px;
        position: relative;

        .le-wechat-img {
            position: absolute;
            width: 90px;
            height: 90px;
            background-color: red;
            left: 20px;
            top: 20px;
        }

        .le-wechat-title {
            position: absolute;
            width: 800px;
            height: 90px;
            left: 130px;
            top: 25px;

            .le-wechat-h3 {
                font-size: 32px;
                color: #000000;
            }

            .le-wechat-p {
                font-size: 24px;
                color: #ababab;
                line-height: 50px;
            }
        }

        .le-wechat-btn {
            position: absolute;
            width: 130px;
            height: 60px;
            border-radius: 8px;
            color: #54c856;
            border: 2px solid #54c856;
            right: 40px;
            bottom: 20px;
            text-align: center;
            line-height: 60px;
        }
    }
}
</style>