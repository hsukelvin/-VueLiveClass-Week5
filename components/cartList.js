export default {
    data() {
        return {
            loadItemId: ''
        }
    },
    props: ['cart','apiConfig'],
    emits: ['getCart'], 
    methods: {
        //清空購物車
        deleteCartAllItem() {
            axios.delete(`${this.apiConfig.url}/api/${this.apiConfig.api_Path}/carts`)
                .then(res => {
                    this.getCart();
                    alert(res.data.message);
                    
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        //刪除購物車單一產品
        deleteCartItem(id) {
            this.loadItemId = id;
            axios.delete(`${this.apiConfig.url}/api/${this.apiConfig.api_Path}/cart/${id}`)
                .then(res => {
                    this.loadItemId = '';
                    this.getCart();
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
            axios.put(`${this.apiConfig.url}/api/${this.apiConfig.api_Path}/cart/${id}`, para)
                .then((res) => {
                    this.loadItemId = '';
                    this.getCart();
                    alert(res.data.message);
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        getCart() {
            this.$emit('getCart');
        }
    },
    mounted() {
    },
    template: '#cartList'
};