
export default {
    namespaced: true,
    state: {
        store_setting: {},
        basic_setting: {},
        goods_setting: {},
        trade_setting: {},
        user_setting: {},
        version: null
    },
    mutations: {
        setStore: function (state, data) {
            state.store_setting = data
        },
        setBasic: function (state, data) {
            state.basic_setting = data
        },
        setGoods: function (state, data) {
            state.goods_setting = data;
        },
        setUser: function(state, data) {
            state.user_setting = data;
        },
        setTrade: function(state, data) {
            state.trade_setting = data;
        }
    },
    getters: {
        getStore: function(state) {
            return state.store_setting;
        },
        getBasic: function(state) {
            return state.basic_setting;
        },
        getGoods: function(state) {
            return state.goods_setting;
        },
        getUser: function(state) {
            return state.user_setting;
        },
        getTrade: function(state) {
            return state.trade_setting;
        },
        getVersion: function (state) {
            return state.version;
        }
    },
    actions: {
        getSettingInfo({commit}) {
            let $heshop = this._vm.$heshop;
            return new Promise(function(resolve, reject) {
                $heshop.search('post', {
                    include: 'setting'
                },{
                    keyword: 'setting_collection'
                }).then(function (res) {
                   let { basic_setting, goods_setting, store_setting, trade_setting, user_setting } = res.content;
                    if (!store_setting.logo) {
                        store_setting.logo = 'https://qmxq.oss-cn-hangzhou.aliyuncs.com/home.png';
                    }
                    commit('setStore', store_setting);
                    commit('setBasic', basic_setting);
                    commit('setGoods', goods_setting);
                    commit('setUser', user_setting);
                    commit('setTrade', trade_setting);
                });
            });
        },
        getVersion: function ({state}) {
            let $heshop = this._vm.$heshop;
            $heshop.cloud('get').then(function (res) {
                console.log(res);
                state.version = res.next_version;
                console.log(state.version);
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
};
