const cart = {
    namespaced: true,
    state: {
        cart_add: false,
        isShip: {
            bool: false,
            id: null
        }
    },
    mutations: {
        setCartAdd(state, data) {
            state.cart_add = data;
        },
        setShip(state, data) {
            state.isShip = data;
        }
    },
    getters: {
        getCartAdd: function (state) {
            return state.cart_add;
        },
        getShip: function (state) {
            return state.isShip;
        }
    },
    actions: {}
};

export default cart;
