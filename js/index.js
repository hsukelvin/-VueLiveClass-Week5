import componentProductModal from "../components/productModal.js";
import componentProductList from "../components/productList.js";
import componentCartList from "../components/cartList.js";

//VeeValidate
VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('required', VeeValidateRules['required']);
VeeValidate.defineRule('regex', VeeValidateRules['regex']);
//載入所有中文規則 JSON檔
VeeValidateI18n.loadLocaleFromURL('../zh_TW.json');
// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'), //設定中文
    validateOnInput: true, // 調整為輸入字元立即進行驗證 (正常是離開欄為時才驗證)
});

const app = Vue.createApp({
    data() {
        return {
            apiConfig: {
                url: 'https://vue3-course-api.hexschool.io/v2',
                api_Path: 'skps0102',
            },
            user: {
                email: '',
                name: '',
                address: '',
                phone: '',
                message: ''
            },
            product: {},
            cart: {},
            loadItemId: ''
        }
    },
    methods:{
        //加入購物車
        addToCart(id, quantity = 1){
            const para = {
                data: {
                    product_id: id,
                    qty: quantity
                }
            };
            this.loadItemId = id;
            axios.post(`${this.apiConfig.url}/api/${this.apiConfig.api_Path}/cart`, para)
                .then(res => {
                    this.loadItemId = '';
                    alert(res.data.message);
                    this.getCart();
                    this.hideModal();
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        //取得購物車資料
        getCart() {
            axios.get(`${this.apiConfig.url}/api/${this.apiConfig.api_Path }/cart`)
                .then((res) => {
                    this.cart = res.data.data;
                    //console.log(this.cart);
                })
                .catch((err) => {
                    alert(err.data.message);
                    //console.log(err);
                })
        },
        openModal(product) {
            this.product = product;
            this.$refs.productModal.openModal();
        },
        hideModal() {
            this.$refs.productModal.hideModal();
        },
        //自訂義的驗證
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
        },
        onSubmit() {
            console.log(this.user);
        },
    },
    mounted() {
        this.getCart();
    }
});

//productmodal
app.component('product-modal', componentProductModal);
//productlist
app.component('product-list', componentProductList);
//cartlist
app.component('cart-list', componentCartList);
//form VeeValidate
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');