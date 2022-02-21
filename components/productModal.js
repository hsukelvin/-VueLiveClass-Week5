export default {
    data() {
        return {
            bsModal: '',
            quantity: 1
        }
    },
    props: ['product'],
    methods: {
        openModal() {
            this.bsModal.show();
        },
        hideModal() {
            this.bsModal.hide();
        },
        emitProductItem(id, quantity) {
            this.$emit('addCart', id, quantity);
        }
    },
    mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.modal);
    },
    template: '#userProductModal'
};