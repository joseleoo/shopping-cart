
import shop from "@/api/shop";
export default {
    state: {
        items: []
    },

    mutations: {
        setProducts(state, products) {
            //update products
            state.items = products
        },

        decrementProductInventory(state, product) {
            product.inventory--
        },
    },
    getters: {
        availableProducts(state, getters) {
            return state.items.filter(product => product.inventory > 0)
        },

        productIsInStock() {
            return (product) => {
                return product.inventory > 0
            }
        }

    },

    actions: { // =methods
        fetchProducts({ commit }) {
            return new Promise((resolve, reject) => {

                //make the call
                //call setProducts mutations
                shop.getProducts((products) => {
                    commit('setProducts', products);
                    resolve()
                })
            })
        },

        checkout({ state, commit }) {

            shop.buyProducts(state.cart, () => {
                commit('emptyCart')
                commit('setCheckoutStatus', 'succes')
            }, () => { commit('setCheckoutStatus', 'fail') }

            )
        }


    },
};