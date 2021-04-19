<template>
    <he-popup v-model="showModal" mode="center" :border-radius="16" background-color="transparent" :zoom="false" width="100%" height="100%">
        <view class="he-poster flex justify-center align-center" @touchmove.stop.prevent="() => {}">
            <view class="he-poster__box" v-if="!loading">
                <view class="he-poster__close flex align-center justify-center" @click="showModal = false;">
                    <text class="iconfont iconpopup_close"></text>
                </view>
                <view>
                    <image class="he-wechat__image" :src="path"></image>
                    <!-- #ifndef H5 -->
                    <button class="he-poster__save cu-btn" @click="saveImage">保存图片</button>
                    <!-- #endif -->
                    <!-- #ifdef H5 -->
                    <button class="he-poster__save cu-btn">长按图片保存</button>
                    <!-- #endif -->
                </view>
            </view>
        </view>
    </he-popup>
</template>
<script>
import hePopup from "./he-popup.vue";
import detailPoster from "./detail-poster"
import lPainter from './lime-painter'

export default {
    name: "detail-poster",
    props: {
        value: Boolean,
        goodsId: {
            type: [Number, String]
        },
        goods: Object
    },
    components: {
        hePopup,
        detailPoster,
        lPainter
    },
    data() {
        return {
            path: "",
            base: {},
            loading: false,
            poster: ''
        }
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        showModal(value) {
            if (value) {
                this.onLoadImage();
            }
        }
    },
    computed: {
        showModal: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        },
        background: function() {
            return {
                background: 'url(' + this.poster + ')'
            }
        }
    },
    methods: {
        onLoadImage() {
            let type = 1;
            // #ifndef H5
            type = 2;
            // #endif
            uni.showLoading({
                title: '生成中……'
            });
            this.loading = true;
            if (this.path) {
                uni.hideLoading();
                this.loading = false;
            }
            let data = {
                type: type,
                goods_id: this.goodsId
            }
            this.$heshop.poster('get', data).then(res => {
                this.path = res;
                uni.hideLoading();
                this.loading = false;
            }).catch((err) => {
                console.error(err);
                uni.showToast({
                    title: '生成失败，请检查网络',
                    duration: 3000
                });
                this.showModal = false;
                uni.hideLoading();
                this.loading = false;
            });
        },
        /**
         * 保存图片
         * @return {[type]} [description]
         */
        successImage() {
            uni.hideLoading();
        },
        /**
         * 本地保存
         * @param  {[type]} imgSrc [description]
         * @return {[type]}        [description]
         */
        function_name(imgSrc) {
            var save = uni.getFileSystemManager();
            var number = Math.random();
            save.writeFile({
                filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
                data: imgSrc.slice(22),
                encoding: 'base64',
                success: res => {
                    uni.saveImageToPhotosAlbum({
                        filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
                        success: function(res) {
                            uni.showToast({
                                title: '已保存到相册',
                                icon: 'success',
                                duration: 2000
                            });
                        },
                        fail: function(err) {
                            console.log(err)
                            uni.showToast({
                                title: '保存失败',
                                icon: 'error',
                                duration: 2000
                            });
                        }
                    })
                    console.log(res)
                },
                fail: err => {
                    uni.showToast({
                        title: '保存失败',
                        icon: 'error',
                        duration: 2000
                    });
                }
            })
        },
        saveImage: function() {
            // #ifndef H5
            this.function_name(this.path);
            // uni.saveImageToPhotosAlbum({
            //     filePath: this.path,
            //     success() {
            //         uni.showToast({
            //             title: '已保存到相册',
            //             icon: 'success',
            //             duration: 2000
            //         });
            //     }
            // });
            // #endif
            // #ifdef H5
            let base64ToBlob = function(code) {
                let parts = code.split(';base64,');
                let contentType = parts[0].split(':')[1];
                let raw = window.atob(parts[1]);
                let rawLength = raw.length;
                let uInt8Array = new Uint8Array(rawLength);
                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }
                return new Blob([uInt8Array], {
                    type: contentType
                });
            };
            let aLink = document.createElement('a');
            let blob = base64ToBlob(this.path); //new Blob([content]);
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
            aLink.download = 'fileName';
            aLink.href = URL.createObjectURL(blob);
            aLink.click();
            // #endif
        }
    }
}
</script>
<style scoped>
.he-poster {
    height: 100vh;
}

.he-poster__box {
    position: relative;
    width: 562px;
}

.he-poster__close {
    width: 52px;
    height: 52px;
    border: 2px solid #FFFFFF;
    border-radius: 50%;
    margin: 0 0 32px 510px;
}

.he-poster__image {
    width: 562px;
    height: 784px;
    border-radius: 16px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.he-poster__save {
    width: 380px;
    height: 80px;
    background: #E60B30;
    border-radius: 40px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    margin: 40px 91px 0 91px;
}

.iconpopup_close {
    font-size: 20px;
    color: #FFFFFF;
}

.he-wechat__image {
    width: 562px;
    height: 784px;
}
</style>