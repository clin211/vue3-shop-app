<script setup>
import { getArticleList } from '@/api/recommend';
import { usePageLoad } from '@/hooks/usePageLoad.js';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
    articleData: {
        type: Array,
        default: [],
    },
    apiFn: {
        type: Function,
        default: () => [],
    },
    params: {
        type: Object,
        default: {},
    },
    status: {
        type: Number,
        default: 2,
    },
});

const router = useRouter();

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
    // 异步更新数据// 加载状态结束
    loading.value = false;
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    const res = await getArticleList();
    console.log('🚀 ~ onLoad ~ res:', res);
    if (res.code !== 0) return;
    // 数据全部加载完成
    finished.value = true;
    list.value.push(...(res.data.list || []));
};

const handleClick = article => {
    if (props.status === 2) {
        router.push({
            path: '/article-detail',
            query: {
                articleId: article.id,
            },
        });
        return;
    }

    router.push({
        name: 'goodsDetail',
        params: {
            goodsId: article.id,
        },
    });
};
</script>

<template>
    <div>
        <van-list
            class="content"
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            offset>
            <van-card
                class="item"
                v-for="article in list"
                :thumb="article.pic_url"
                @click="handleClick(article)">
                <template #title>
                    <p class="title">
                        {{ article?.title || 'default' }}
                    </p>
                </template>
                <template #desc
                    ><p class="detail">{{ article.detail }}</p></template
                >
                <template #price>
                    <p class="desc">
                        {{ article.desc }}
                    </p>
                </template>
                <template #num>
                    <p>{{ article.created_at }}</p>
                </template>
            </van-card>
        </van-list>
    </div>
</template>
z
<style lang="scss" scoped>
.content {
    .item {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .title {
            font-size: 16px;
            color: black;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .detail {
            margin-top: 6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: rgb(105, 105, 105);
        }
        .desc {
            color: rgb(105, 105, 105);
            font-weight: normal;
        }
    }
}
</style>
