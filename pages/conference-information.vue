<template>
    <div class="common-section">
        <Banner />
        <div class="main-section">
            <div class="meeting-info">
                <Title title="研討會資訊"></Title>
                <div class="meeting-info-box">
                    <div>
                        <p><span class="title">會議時間:</span>2026年06月13日(六)，上午08:00 - 下午17:50
                        </p>
                        <p class="time">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            2026年06月14日(日)，上午08:00 - 下午12:10</p>
                    </div>
                    <p><span class="title">會議地點:</span>台中國際會展中心</p>
                </div>
            </div>

            <div class="agenda-info">
                <h1 class="title">Agenda</h1>
                <div class="agenda-info-box">
                    <img src="/img/agenda.jpg" alt="">
                    <div class="download">
                        <a href="/files/agenda.pdf" target="_blank" download class="agenda-download">
                            TICBCS 議程下載
                        </a>
                        <!-- <a href="https://lihi2.com/StUJt" target="_blank" download class="agenda-download">
                            TICBCS 手冊下載
                        </a> -->
                    </div>
                </div>
            </div>

            <el-divider />
            <div class="location">
                <h1 class="title">會議地點: <span class="location-info">台中國際會展中心</span>
                </h1>
                <div class="location-info-box">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.3742506591266!2d120.64870461089562!3d24.193668878280345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3469173875c5e6d5%3A0x7571e722f78acf23!2z6Ie65Lit5ZyL6Zqb5pyD5bGV5Lit5b-D!5e0!3m2!1szh-TW!2stw!4v1772522489602!5m2!1szh-TW!2stw"
                        width="600" height="450" style="border:0;" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
        <!-- <h1 class="temp">議程確認中</h1> -->

    </div>
</template>
<script setup lang="ts">
import Title from '@/components/layout/Title.vue';
import Banner from '@/components/layout/Banner.vue';

useSeoMeta({
    title: '會議資訊',
    description: '了解即將舉行的研討會的所有詳細資訊，包括日期、地點、議程等。保持資訊更新，並妥善規劃您的參與。',
    keywords: 'conference information, TICBCS, ticbcs, TICBCS2026, ticbcs2026, 會議資訊, 台中國際會展中心, 台中國際乳癌研討會 , 乳癌研討會, 乳癌, 乳癌教育, 乳癌防治, 中華民國乳癌教育暨防治學會, 中國醫藥大學附設醫院, 中國醫藥大學, 台灣乳房醫學會, 中華民國外科醫學會, 會議時間, 會議地點, 議程',
});

</script>
<style lang="scss" scoped>
.common-section {
    // margin: $common-section-margin;
    // width: $common-section-width;
    font-family: $common-section-font-family;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    color: $main-color;

    .temp {
        font-size: 2.5rem;
    }

    .main-section {
        width: 60%;
        margin: 0 auto;
    }


    .title {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0rem 0 1rem 0;
        color: $main-color;
    }

    .meeting-info {
        border-width: 1px 0 1px 0;
        border-style: solid;
        border-color: #D3D3D3;
        width: 100%;
        margin: 0 auto;
        padding: 1.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .meeting-info-box {
            color: $main-text-color;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            font-size: 1.5rem;
            line-height: 2rem;
            gap: 1rem;

            @media screen and (max-width: 768px) {
                font-size: 1.2rem;
            }


            .title {
                font-weight: bold;
                font-size: 1.5rem;
                margin-right: 1rem;
                color: $main-text-color;

                @media screen and (max-width: 768px) {
                    font-size: 1.2rem;
                }
            }
        }
    }

    .agenda-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 0 auto;


        img {
            width: 100%;
        }

        .agenda-download {
            background: linear-gradient(180deg, #ee9ab9 0%, #8f8dc2 100%);
            display: block;
            margin: 2rem auto 0 auto;
            padding: 0.5rem 0;
            color: white;
            border-radius: 0.3rem;
            text-align: center;
            width: 70%;
            font-size: 1.5rem;

            @media screen and (max-width: 768px) {
                font-size: 1.2rem;
            }

            &:hover {
                box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
            }
        }
    }

    .registration {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 2.5rem 0;
        border-width: 1px 0 1px 0;
        border-style: solid;
        border-color: #D3D3D3;

        .download {
            width: 80%;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .location {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 2.5rem 0;
        border-width: 0px 0 1px 0;
        border-style: solid;
        border-color: #D3D3D3;
        width: 100%;
        margin: 0 auto;

        .title {
            color: $main-text-color;
            font-weight: bold;
            font-size: 1.5rem;
            margin-right: 1rem;

            @media screen and (max-width: 768px) {
                font-size: 1.2rem;
            }
        }

        .location-info {
            font-size: 1.5rem;
            font-weight: normal;
            color: $main-text-color;

            @media screen and (max-width: 768px) {
                font-size: 1.2rem;

            }

        }

        .location-info-box {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            iframe {
                width: 100%;
                height: 30rem;
                border-radius: 0.5rem;
            }
        }
    }

}
</style>