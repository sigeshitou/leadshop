import Vue from "vue";

function isWechat() {
    let mic = window.navigator.userAgent.toLowerCase().match(/micromessenger/i);
    return mic && mic[0] === 'micromessenger' ? 1 : 0;
}

function call() {
    let whiteList = [
        "/pages/order/submit"
    ]
    let pathname = window.location.pathname;
    pathname = pathname.split("?")[0];
    if (whiteList.indexOf(pathname) > -1) {
        init();
    }
}

function init(callback) {
    if (isWechat()) {
        let url = window.location.href.split('#')[0];
        Vue.prototype.$heshop.jssdk('get', {
            url: url
        }).then((e) => {
            let apiList = [
                "chooseWXPay",
                "hideAllNonBaseMenuItem",
                "showMenuItems",
                "onMenuShareAppMessage"
            ];
            let config = {
                debug: false,
                appId: e.appid,
                timestamp: e.timestamp,
                nonceStr: e.noncestr,
                signature: e.signature,
                jsApiList: apiList,
                openTagList: ['wx-open-subscribe']
            };
            jWeixin.config(config);
            jWeixin.error(err => {
                console.error('config fail:', err);
            });
            jWeixin.ready(() => {
                if (callback) callback(jWeixin);
            });
        });
    }
}

function chooseWXPay({timestamp, nonceStr, packAge, signType, paySign, success, fail, cancel}) {
    jWeixin.chooseWXPay({
        timestamp: timestamp,
        nonceStr: nonceStr,
        package: packAge,
        signType: signType,
        paySign: paySign,
        success: function (res) {
            success && success(res);
        },
        fail: function (err) {
            fail && fail(err);
            console.error(err);
        },
        cancel: function (res) {
            cancel && cancel(res);
        },
        complete: function () {
        }
    });
}

function hideAllNonBaseMenuItem() {
    init(function (jssdk) {
        jssdk.hideAllNonBaseMenuItem();
    });
}

function showMenuItems() {
    init(function (jssdk) {
        jssdk.showMenuItems({
            menuList: [
                "menuItem:share:appMessage"
            ]
        });
    });
}

function onMenuShareAppMessage({title = '', desc = ' ', link = '', imgUrl = ''}) {
    init(function (jssdk) {
        jssdk.onMenuShareAppMessage({
            title: title, // ????????????
            desc: desc, // ????????????
            link: link, // ??????????????????????????????????????????????????????????????????????????????JS??????????????????
            imgUrl: imgUrl, // ????????????
            type: 'link'// ??????type???music???video??????????????????????????????????????????
        });
    });
}

export default {
    isWechat,
    onMenuShareAppMessage,
    showMenuItems,
    hideAllNonBaseMenuItem,
    chooseWXPay,
    init,
    call
}
