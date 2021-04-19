const components = {
    namespaced: true,
    state: {
        search: {
            height: 0,
            top: 0,
            fixed: false,
            index: 0
        },
        page: []
    },
    mutations: {
        setSearchFixed: function(state, data) {
            state.search.fixed = data;
        },
        setSearchIndex: function(state, data) {
            state.search.index = data;
        },
        setPage: function(state, data) {
            state.page = data;
        }
    },
    getters: {
        getSearchHeight: function(state) {
            return state.search.height;
        },
        getSearchFixed: function(state) {
            return state.search.fixed;
        },
        getSearchTop: function(state) {
            return state.search.top;
        },
        getSearchIndex: function(state) {
            return state.search.index;
        }
    },
    actions: {
        getSearch: function({ state }) {
            let page = state.page;
            let num = state.search.index;
            let array = [];
            for (let i = 0; i < page.length; i++) {
                array.push(
                    new Promise((resolve, reject) => {
                        try {
                            let query = uni.createSelectorQuery();
                            query.select('#' + page[i].name + '_' + i).boundingClientRect(rect => {
                                if (rect) {
                                    resolve(rect.height);
                                }

                            }).exec();
                        } catch (e) {
                            reject(e);
                        }
                    })
                )
                if (i >= (num - 1)) break;
            }
            Promise.all(array).then(function(res) {
                state.search.top = 0;
                res.forEach((item) => {
                    state.search.top += parseInt(item);
                });
                console.log(state.search.top);
            }).catch(function(err) {
                console.log(err);
            });
            uni.createSelectorQuery().select('#search').boundingClientRect(function(rect) {
                if (rect) {
                    state.search.height = rect.height;
                }
            }).exec();
        }
    }
};

export default components;