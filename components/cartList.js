export default {
    data() {
        return {
            loadItemId: ''
        }
    },
    props: ['cart','apiConfig'],
    emits: ['getCart', 'updateLoading'], 
    methods: {
        //清空購物車
        deleteCartAllItem() {
            this.emitLoadingStatus();
            axios.delete(`${this.apiConfig.url}/api/${this.apiConfig.api_Path}/carts`)
                .then(res => {
                    this.getCart();
                    this.emitLoadingStatus();
                    alert(res.data.message);
                    
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        //刪除購物車單一產品
        deleteCartItem(id) {
            this.loadItemId = id;
            this.emitLoadingStatus();
            axios.delete(`${this.apiConfig.url}/api/${this.apiConfig.api_Path}/cart/${id}`)
                .then(res => {
                    this.loadItemId = '';
                    this.getCart();
                    this.emitLoadingStatus();
                    alert(res.data.message);
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        //更新購物車單一產品數量
        updateCartItem(item) {
            const { product_id, qty, id } = item;
            const para = {
                data: {
                    product_id,
                    qty
                }
            };
            this.loadItemId = id;
            this.emitLoadingStatus();
            axios.put(`${this.apiConfig.url}/api/${this.apiConfig.api_Path}/cart/${id}`, para)
                .then((res) => {
                    this.loadItemId = '';
                    this.getCart();
                    this.emitLoadingStatus();
                    alert(res.data.message);
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        getCart() {
            this.$emit('getCart');
        },
        emitLoadingStatus() {
            this.$emit('updateLoading');
        }
    },
    mounted() {
    },
    template: '#cartList'
};