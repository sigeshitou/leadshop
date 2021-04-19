<template>
    <view class="pages fitment-pages" :style="{
        'background':background
    }">
        <!-- #ifndef H5 -->
        <he-navbar :is-back="false" title-bold title-size="32" :title="fixed ? '' : title"  :background="{background: '#fff'}">
            <view class="he-search flex align-center" v-if="fixed" :style="{height: menuButtonInfo.height + 'px'}" @click="navigateToDetail">
                <text class="iconfont iconsearchbar_search"></text>
                <text class="he-search-text">请输入关键字搜索</text>
            </view>
        </he-navbar>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <he-navbar  :is-back="false" title-bold title-size="32" :background="{background: '#fff'}">
            <view class="he-search flex align-center" @click="navigateToDetail" v-if="fixed">
                <text class="iconfont iconsearchbar_search"></text>
                <text class="he-search-text">请输入关键字搜索</text>
            </view>
        </he-navbar>
        <!-- #endif -->
        <view :style="[topHeight]"></view>
        <view v-for="(item,index) in page" :key="index">
            <component v-if="item.name === 'rubik'" :id="item.name +'_' + index" is="rubik" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-else-if="item.name === 'title'" :id="item.name +'_' + index" is="titles" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-else-if="item.name === 'navigation'" :id="item.name +'_' + index" is="navigation" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-else-if="item.name === 'video'" :id="item.name +'_' + index" is="videos" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-else-if="item.name === 'separate'" :id="item.name +'_' + index" is="separate" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-else-if="item.name === 'banner'" :id="item.name +'_' + index" is="banner" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-else-if="item.name === 'search'" id="search" is="search" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-else-if="item.name === 'goods'" :id="item.name +'_' + index" is="goods" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-else-if="item.name === 'blank'" :id="item.name +'_' + index" is="blank" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-else-if="item.name === 'tabs'" :background="background" :page-index="index" :id="item.name +'_' + index" is="tabs" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <!-- #ifndef H5 -->
            <component v-else-if="item.name === 'wechat'" :id="item.name +'_' + index" is="wechat" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <!--#endif-->
        </view>
    </view>
</template>
<script type="text/javascript">
let menuButtonInfo = {};
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif
//组件列表
import titles from '../fitment/title/title.vue';
import navigation from '../fitment/navigation/navigation.vue';
import videos from '../fitment/video/video.vue';
import separate from '../fitment/separate/separate.vue';
import blank from '../fitment/blank/blank.vue';
import banner from '../fitment/banner/banner.vue';
import search from '../fitment/search/search.vue';
import goods from '../fitment/goods/goods.vue';
import tabs from '../fitment/tabs/tabs.vue';
import rubik from "../fitment/rubik/rubik.vue";
import advertising from '../fitment/advertising/advertising.vue';
// #ifndef H5
import wechat from '../fitment/wechat/wechat.vue';
// #endif
import heNavbar from "../../components/he-navbar.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        videos,
        separate,
        blank,
        banner,
        search,
        goods,
        navigation,
        tabs,
        titles,
        rubik,
        advertising,
        // #ifndef H5
        wechat,
        // #endif
        heNavbar
    },
    data() {
        return {
            background: "#F7F7F7",
            page: [],
            empty: {
                "name": "blank",
                "icon": this.ipAddress + "/pageicon/blank-icon.png",
                "title": "辅助空白",
                "content": {},
                "facade": {
                    "height": 10,
                    "background_color": "#FFFFFF"
                }
            },
            // #ifndef H5
            title: '首页',
            // #endif
            menuButtonInfo: menuButtonInfo
        };
    },
    computed: {
        ...mapGetters({
            searchTop: 'components/getSearchTop',
            fixed: "components/getSearchFixed",
            searchHeight: 'components/getSearchHeight',
            navbarHeight: 'setting/getNavBarHeight',
            statusBarHeight: 'setting/statusBarHeight',
        }),
        topHeight: function() {
            return {
                height: `${this.statusBarHeight + this.navbarHeight}px`,
                // #ifdef H5
                lineHeight: `${this.statusBarHeight + this.navbarHeight}px`,
                // #endif
            }
        }
    },
    /**
     * 页面显示时
     * @return {[type]} [description]
     */
    onShow() {
        this.handlePageLoading();
    },
    methods: {
        /**
         * 执行页面保存操作
         * @return {[type]} [description]
         */
        handlePageLoading() {
            try {
                const value = this.getStorageSync('micropage');
                if (value) {
                    // #ifdef H5
                    uni.setNavigationBarTitle({
                        title: value.name
                    });
                    // #endif
                    // #ifndef H5
                    this.title = value.name;
                    // #endif
                    this.background = value.background;
                    this.page = JSON.parse(value.content);
                    const num = this.page.findIndex(function(item) {
                        return item.name === 'search';
                    });
                    this.$store.commit('components/setSearchIndex', num);
                    this.$store.commit('components/setPage', this.page);
                    this.handleLoadData(value);
                } else {
                    this.handleLoadData();
                }
            } catch (error) {
                this.handleLoadData();
            }
        },
        /**
         * 加载数据信息
         * @return {[type]} [description]
         */
        handleLoadData(value) {
            this.$heshop.pages("GET").then(data => {
                this.background = data.background;
                if (!(value && (this.$heshop.MD5(value) == this.$heshop.MD5(data)))) {
                    this.page = JSON.parse(data.content);
                    const num = this.page.findIndex(function(item) {
                        return item.name === 'search';
                    });
                    this.$store.commit('components/setSearchIndex', num);
                    this.$store.commit('components/setPage', this.page);
                    uni.setStorageSync('micropage', data);
                    // #ifdef H5
                    uni.setNavigationBarTitle({
                        title: data.name
                    });
                    // #endif
                    // #ifndef H5
                    this.title = data.name;
                    // #endif
                }
            }).catch(error => {
                console.log("页面接在信息", error);
            });
        },
        navigateToDetail() {
            uni.navigateTo({
                url: "/pages/goods/search"
            });
        }
    },
    onPageScroll(e) {
        let that = this;
        let scrollTop = parseInt(e.scrollTop);
        let isSatisfy = scrollTop >= (that.searchTop + this.navbarHeight) ? true : false;
        if (that.searchFixed === isSatisfy) {
            return false;
        }
        this.$store.commit('components/setSearchFixed', isSatisfy);
    }
};
</script>
<style lang="scss">
.pages {
    width: 100%;
    min-height: 100vh;
    background-color: RGBA(245, 245, 245, 1);
}

.he-page-title {
    background-color: #fff;
    position: fixed;
    z-index: 10;
    width: 100%;
    top: 0;
    text-align: center;
    // #ifndef H5
    padding-top: 95px;
    // #endif
}

.he-search {
    background: #FFFFFF;
    border: 2px solid #E5E5E5;
    border-radius: 32px;
    margin:0 20px;
    width: 100%;
    padding-left: 24px;
    // #ifdef H5
    height: 63px;
    // #endif
}
.he-search-text {
    display: inline-block;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-left: 12px;
}
.iconsearchbar_search {
    font-size: 24px;
}
</style>