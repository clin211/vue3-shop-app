import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { getCartList } from '@/api/cart';

export const useCartStore = defineStore('cart', () => {
    const count = ref(0);
    const data = ref([]);
    const changeCart = async () => {
        const res = await getCartList({ page: 1, limit: 100 });
        console.log('🚀 ~ changeCart ~ res:', res)
        if (res.code === 0) {
            count.value = res.data.count;
            data.value = res.data.list;
            console.log('res data:', res.data)
        } else {
            // 可以设置一个错误状态，并在界面上反馈给用户
        }
    };
    const reset = () => {
        count.value = 0;
        data.value = [];
    };

    return { count, data, changeCart, reset };
});
