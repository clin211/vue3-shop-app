<script setup>
import { onMounted, ref } from 'vue';
import {
    getProductList,
    getCarouselChartData,
    getClassification,
} from '@/api/home.js';
import Goods from '@/components/Goods.vue';

/**
 * 轮播图数据
 */
const carouselChartData = ref([]);

/**
 * 商品数据
 */
const commodityData = ref([]);

onMounted(async () => {
    fetchCarouselChartData();
    fetchProductList();
    getClassification(1);
});

// 获取商品数据
const fetchProductList = async () => {
    const res = await getProductList({ size: 20, page: 1 });
    if (res.code === 0) {
        commodityData.value = res.data.list;
    }
};

// 获取轮播图数据
const fetchCarouselChartData = async () => {
    const res = await getCarouselChartData({ size: 10, page: 1 });
    if (res.code === 0) {
        carouselChartData.value = res.data.list;
    }
};
</script>

<template>
    <div>
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in carouselChartData" :key="item.id">
                <router-link
                    :key="item.link"
                    class="good-item"
                    tag="li"
                    :to="`/goods/${item.link}`">
                    <van-image
                        width="100%"
                        height="8rem"
                        :src="item.pic_url"
                        :alt="item.pic_url" />
                </router-link>
            </van-swipe-item>
        </van-swipe>
        <!-- 商品展示 -->
        <Goods :data-item="commodityData">
            <template #title>
                <div>商品</div>
            </template>
        </Goods>
        <van-back-top right="20px" bottom="60px" />
    </div>
</template>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
    width: 100%;
    img {
        width: 100%;
        height: inherit;
        object-fit: contain;
    }
}
</style>
