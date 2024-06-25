<template>
    <div class="goods">
        <div class="goods-header">
            <slot name="title">默认标题</slot>
        </div>
        <ul class="goods-box">
            <li
                v-for="item in props.dataItem"
                :key="item.id"
                class="goods-item">
                <router-link :to="`/goods/${item.id}`">
                    <div class="img_box">
                        <img
                            style="height: 100%; width: 100%"
                            :src="item.picUrl"
                            :alt="item.goodsName" />
                    </div>
                    <div class="goods-desc">
                        <div class="title">{{ item.name }}</div>
                        <div class="price">
                            {{ item.price.toFixed(2) }}
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    dataItem: {
        type: Array,
        default: [],
        required: true,
    },
});
</script>

<style lang="scss"></style>
