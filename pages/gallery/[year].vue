<template>
    <div class="common-section">
        <Title :title="title"></Title>

        <div class="gallary-box">
            <NuxtImg v-for="image in dayOneImages" :key="image.id" :src="image.src" :alt="image.alt" densities="x1 x2"
                width="200" class="gallery-image" loading="lazy" @error="handleImgError" />



        </div>
        <el-divider></el-divider>

        <div class="gallary-box">
            <NuxtImg v-for="image in dayTwoImages" :key="image.id" :src="image.src" :alt="image.alt" densities="x1 x2"
                width="200" class="gallery-image" loading="lazy" />
        </div>




    </div>
</template>
<script lang="ts" setup>
import Title from '@/components/layout/Title.vue';

useSeoMeta({
    title: `Gallery - TICBCS`,
    description: '台中國際乳癌研討會的精彩回顧，展示了過去幾年活動的精彩瞬間和重要時刻。瀏覽我們的畫廊，重溫每一屆研討會的亮點，見證乳癌研究和治療的進步，以及與會者的熱情參與。',
    keywords: 'gallery, TICBCS, ticbcs, TICBCS2026, ticbcs2026, 台中國際乳癌研討會, 乳癌研討會, 乳癌, 乳癌教育, 乳癌防治, 中華民國乳癌教育暨防治學會, 中國醫藥大學附設醫院, 中國醫藥大學, 台灣乳房醫學會, 中華民國外科醫學會, 活動回顧, 活動照片',
});

const route = useRoute();
const year = route.params.year as string;
const title = `Gallery - ${year}`;

const imageUrl = ref(`/img/gallery/${year}/`);

const dayOneLength = ref<number>(0);
const dayTwoLength = ref<number>(0);
watch(() => year, (newYear: string) => {
    switch (newYear) {
        case '2023':
            dayOneLength.value = 62;
            dayTwoLength.value = 18;
            break;
        case '2024':
            dayOneLength.value = 43;
            dayTwoLength.value = 26;
            break;
        default:
            dayOneLength.value = 38;
            dayTwoLength.value = 31;
    }
}, { immediate: true });

const dayOneImages = computed(() => {
    console.log('dayOneLength.value', dayOneLength.value);
    return Array.from({ length: dayOneLength.value }, (_, i) => ({
        id: i + 1,
        src: `${imageUrl.value}day1/${i + 1}.jpg`,
        alt: `Gallery Image ${i + 1}`,
    }));
})

const dayTwoImages = computed(() => {
    return Array.from({ length: dayTwoLength.value }, (_, i) => ({
        id: i + 1,
        src: `${imageUrl.value}day2/${i + 1}.jpg`,
        alt: `Gallery Image ${i + 1}`,
    }));
})

const handleImgError = (event: any) => {
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
};
</script>
<style lang="scss" scoped>
.common-section {
    // padding: 2rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .gallary-box {
        width: 80%;
        display: grid;
        gap: 1rem;
        justify-content: center;
        margin: 1rem 0 3rem 0;

        grid-template-columns: repeat(1, 1fr);

        @media (min-width: 480px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 780px) {
            grid-template-columns: repeat(4, 1fr);
        }

        @media (min-width: 1080px) {
            grid-template-columns: repeat(6, 1fr);
        }

        img {
            width: 100%;
            max-width: 200px;
            justify-self: center;
            height: auto;
            border-radius: 8px;
            transition: transform 0.3s ease;

            &:hover {
                transform: scale(1.05);
            }
        }
    }
}
</style>