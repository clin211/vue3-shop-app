<template>
    <main>
        <van-nav-bar
            :title="$route.meta.title"
            left-arrow
            @click-left="$router.back()"
            fixed
            placeholder />
        <div class="container">
            <div class="body_box">
                <div class="img_box">
                    <img
                        :src="goodsDetail.pic_url"
                        :alt="goodsDetail.pic_url" />
                </div>
                <p class="price">￥{{ goodsDetail.price?.toFixed(2) }}</p>
                <div class="goods_name">{{ goodsDetail.name }}</div>
                <p class="brands">生产日期：{{ goodsDetail.brand }}</p>
                <div class="express_prompt">
                    <span>
                        保质期天数：<span>{{ goodsDetail.stock }}</span>
                    </span>
                    <span>免邮费 顺丰快递</span>
                </div>
                <div class="detail">
                    <p class="title">商品详情</p>
                    <p class="content">{{ goodsDetail.detail_info }}</p>
                </div>
            </div>
        </div>
        <!-- 动作栏 -->
        <van-action-bar placeholder>
            <van-action-bar-icon
                :badge="cartStore?.count ? cartStore.count : ''"
                icon="cart-o"
                text="购物车"
                @click="$router.push('/cart')" />
            <van-action-bar-icon
                :icon="isStar ? 'star' : 'star-o'"
                text="收藏"
                color="#ff5000"
                @click="toggleStar(goodsDetail)" />
            <van-action-bar-button
                type="warning"
                text="加入购物车"
                @click="addToCart(goodsId)" />
            <van-action-bar-button
                type="danger"
                text="立即购买"
                @click="toBuy" />
        </van-action-bar>
    </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getGoodsDetail } from '@/api/goods';
import { addCart, editCart } from '@/api/cart';
import { useCartStore } from '@/stores/cart';
import { addCollection, deleteCollectionByType } from '@/api/collection';

const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();

// 商品id
const goodsId = route.params.goodsId;

// 商品详情
const goodsDetail = ref({});

onMounted(async () => {
    const res = await getGoodsDetail(goodsId);
    goodsDetail.value = res.data;
    isStar.value = goodsDetail.value.is_collect;
});

const isStar = ref(false);

/**goodsDetail
 * 收藏事件
 */
const toggleStar = async goodsInfo => {
    console.table(goodsInfo);
    if (isStar.value) {
        const res = await deleteCollectionByType({
            type: 1,
            object_id: goodsInfo.id,
        });
    } else {
        const res = await addCollection({ type: 1, object_id: goodsInfo.id });
    }
    const res = await getGoodsDetail(goodsId);
    goodsDetail.value = res.data;
    isStar.value = goodsDetail.value.is_collect;
};

/**
 * 添加到购物车事件
 */
const addToCart = async id => {
    console.table(cartStore.data);
    const hasGoods = cartStore.data?.find(it => it.goods_id == id);
    if (hasGoods) {
        const res = await editCart({
            goods_id: id,
            count: hasGoods.count + 1,
            id: hasGoods.id,
        });
        console.table(res);
    } else {
        const res = await addCart({ goods_id: id, count: 1 });
        console.table(res);
    }
    cartStore.changeCart();
};

const toBuy = () => {
    const orderInfo = {
        goods: [
            {
                count: 1,
                goods_id: goodsDetail.value.id,
                goodsInfo: goodsDetail.value,
            },
        ],
        price: goodsDetail.value.price,
    };

    const encodedOrderInfo = btoa(encodeURI(JSON.stringify(orderInfo)));

    router.push({
        name: 'addressList',
        query: { orderInfo: encodedOrderInfo },
    });
};
</script>
