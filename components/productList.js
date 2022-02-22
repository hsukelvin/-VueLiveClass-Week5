export default {
    data() {
        return {
            products: [],
            loadItemId: ''
        }
    },
    props: ['loadId', 'apiConfig'],
    watch: {
        //監聽外層 loadItemId (loadId)
        loadId(n, o) {
            this.loadItemId = n;
        }
    },
    methods: {
        //取得所有產品
        getProducts() {
            this.emitLoadingStatus();
            axios.get(`${this.apiConfig.url}/api/${this.apiConfig.api_Path}/products`)
                .then((res) => {
                    const { products } = res.data;
                    this.products = products;
                    this.emitLoadingStatus();
                    //console.log(this.products);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        //取得單一產品
        getProduct(id) {
            this.loadItemId = id;
            this.emitLoadingStatus();
            axios.get(`${this.apiConfig.url}/api/${this.apiConfig.api_Path}/product/${id}`)
                .then((res) => {
                    this.loadItemId = '';
                    this.emitLoadingStatus();
                    const { product } = res.data;
                    this.$emit('openModal', product);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        emitProductItem(id) {
            this.$emit('addCart', id);
        },
        emitLoadingStatus() {
            this.$emit('updateLoading');
        }
    },
    mounted() {
        this.getProducts();
    },
    template: '#productList'
};