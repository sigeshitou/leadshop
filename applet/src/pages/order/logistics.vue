<template>
    <view class="he-page-content">
        <view class="he-card he-header flex flex-direction align-center">
            <image class="he-header__icon" :src="ipAddress + '/logistics-icon.png'"></image>
            <text class="he-header-express">{{ name }}</text>
            <view class="he-header--numbering flex align-center">
                <text class="he-numbering">运单编号：{{ no }}</text>
                <text class="he-header-copy" @click="copy(no)">复制</text>
            </view>
        </view>
        <view class="he-card he-body" :class="state > 0 ? '' : ' flex justify-center'">
            <he-no-content-yet class="he-body-no-content" v-if="state < 1" :image="ipAddress + '/logistics-background-no.png'" text="抱歉！未查到此运单物流信息，请确认运单号码是否正确，或联系客服" ></he-no-content-yet>
            <view class="he-time-item" v-for="(item, index) in list" :key="index">
                <view class="he-dot"></view>
                <view class="he-time-axis-time">
                    <view class="le-date">{{ item.date }}</view>
                    <view class="le-time">{{ item.time }}</view>
                </view>
                <view class="he-desc" :class="index === 0 ? 'he-newest-desc' :'he-order-desc'">
                    {{ item.desc }}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import heNoContentYet from "../../components/he-no-content-yet.vue";
export default {
    name: "logistics",
    components: {
        heNoContentYet
    },
    data() {
        return {
            name: "",
            no: '',
            list: [],
            state: 1
        }
    },
    methods: {
        copy: function (content) {
            this.uniCopy({content});
        },
        getLogistics: function (no, mobile, name) {
            let _this = this;
            this.$heshop.express('post', {
                no,
                mobile,
                name
            }).then(function (res) {
                let list = res.list;
                _this.state = res.state;
                for (let i = 0; i < list.length; i++) {
                    let date = _this.$h.timeFormat(new Date(list[i].datetime.replace(/\-/g, "/")), 'mm-dd');
                    let time = _this.$h.timeFormat(new Date(list[i].datetime.replace(/\-/g, "/")), 'hh:MM');
                    list[i].date = date;
                    list[i].time = time;
                }
                list.reverse();
                _this.list = list;
            }).catch(function (err) {
                console.error(err);
            });
        }
    },
    onLoad(options) {
        this.name = options.name;
        this.no = options.no;
        if (options.title) {
            uni.setNavigationBarTitle({
                title: options.title
            });
        }
        this.getLogistics(options.no, options.mobile, options.name);
    }
}
</script>

<style scoped lang="scss">
.he-page-content {
    padding: 24px 20px 0 20px;
}

.he-card {
    background: #FFFFFF;
    border-radius: 16px;
}

.he-header {
    width: 710px;
    height: 220px;
    margin-bottom: 16px;
    position: relative;
    margin-top: 60px;

    .he-header__icon {
        width: 120px;
        height: 120px;
        top: -50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, 50%);
    }

    .he-header-express {
        margin-top: 76px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 56px;
    }

    .he-header--numbering {
        height: 52px;

        .he-numbering {
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
            margin-right: 6px;
        }
    }

    .he-header-copy {
        width: 66px;
        height: 34px;
        line-height: 32px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid #CCCCCC;
        border-radius: 17px;
        font-size: 20px;
        text-align: center;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-left: 6px;
    }
}

.he-body {
    padding: 24px;
    min-height: 640px;
    .he-body-no-content {
        width: 410px;
        /deep/.he-no-content-yet {
            width: 410px;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 34px;
        }
    }
    .he-desc {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        padding-left: 30px;
        padding-bottom: 40px;
        transform: translateY(-6px);
        line-height: 34px;
        min-height: 88px;
    }

    .he-order-desc {
        color: #999999;
    }

    .he-newest-desc {
        color: #222222;
    }

    .he-time-item {
        position: relative;
        border-left: 1px solid #E5E5E5;
        margin-left: 112px;
    }

    .he-time-item:last-child {
        border-left: none;
    }

    .he-dot {
        height: 16px;
        width: 16px;
        border-radius: 100px;
        background: #ddd;
        position: absolute;
        left: -7.5px;
    }

    .he-time-axis-time {
        position: absolute;
        width: 88px;
        left: -112px;
        transform: translateY(-6px);

        .le-date {
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            text-align: center;
            line-height: 1.2;
        }

        .le-time {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
            text-align: center;

        }
    }
}
</style>