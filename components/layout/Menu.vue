<template>
    <section class="top-section">
        <div class="menu-container" :class="[{ 'menu-section-scroll': isScroll }, { 'is-active': isActive }]">

            <!-- 漢堡選單 -->
            <div class="hamburger-icon">
                <div class="container">
                    <div class="hamburger" :class="{ 'is-active': isActive }" id="hamburger-1" @click="openMenu">
                        <span class="line" :class="{ 'is-scroll': isScroll }"></span>
                        <span class="line" :class="{ 'is-scroll': isScroll }"></span>
                        <span class="line" :class="{ 'is-scroll': isScroll }"></span>
                    </div>
                </div>
            </div>

            <!-- Logo 區塊 -->
            <div class="logo-container" v-if="!isActive">
                <nuxt-link class="logo-link" to="/" @click="pcModeActiveItemState.setActiveItem('')">
                    <div class="logo-image-box">
                        <img class="logo" src="/img/logo.png" alt="TICBCS Logo" />
                    </div>
                </nuxt-link>
            </div>

            <!-- 主選單區塊 -->
            <div class="menu-box">
                <nuxt-link v-for="menu in primaryMenuItems" :key="menu.activeKey" class="menu-item" :to="menu.route"
                    @click="pcModeActiveItemState.setActiveItem(menu.activeKey)"
                    :class="pcModeActiveItemState.validActive(menu.activeKey)">{{ menu.name
                    }}</nuxt-link>

                <div class="item-box">
                    <nuxt-link v-for="menu in secondaryMenuItems" :key="menu.activeKey" class="menu-item"
                        :to="menu.route" @click="pcModeActiveItemState.setActiveItem(menu.activeKey)"
                        :class="pcModeActiveItemState.validActive(menu.activeKey)">{{
                            menu.name }}</nuxt-link>

                    <div class="gallery-box menu-item" @click="galleryMenuState.toggleMenu">
                        Gallery
                        <el-icon>
                            <ElIconArrowDown />
                        </el-icon>
                        <div class="gallery-sub-menu" v-if="galleryMenuState.isOpen">
                            <nuxt-link v-for="subMenu in galleryMenuItem.subMenu" :key="subMenu.activeKey"
                                class="sub-menu-item" :to="subMenu.route"
                                @click="pcModeActiveItemState.setActiveItem(subMenu.activeKey)"
                                :class="pcModeActiveItemState.validActive(subMenu.activeKey)">{{ subMenu.name
                                }}</nuxt-link>
                        </div>
                    </div>
                </div>

                <!-- 次選單區塊 -->
                <div class="sub-menu-box">
                    <div class="sub-menu-title" @click="secondaryMenuState.toggleMenu">查看更多<el-icon>
                            <ElIconArrowDown />
                        </el-icon></div>
                    <div class="sub-menu-item-box" v-if="secondaryMenuState.isOpen">
                        <nuxt-link v-for="menu in secondaryMenuItems" :key="menu.activeKey" class="sub-menu-item"
                            :to="menu.route" @click="pcModeActiveItemState.setActiveItem(menu.activeKey)"
                            :class="pcModeActiveItemState.validActive(menu.activeKey)">{{ menu.name }}</nuxt-link>

                        <div class="gallery-box sub-menu-item" @click="galleryMenuState.toggleMenu">
                            Gallery
                            <el-icon>
                                <ElIconArrowDown />
                            </el-icon>
                            <div class="gallery-sub-menu" v-if="galleryMenuState.isOpen">
                                <nuxt-link v-for="subMenu in galleryMenuItem.subMenu" :key="subMenu.activeKey"
                                    class="sub-menu-item" :to="subMenu.route"
                                    @click="pcModeActiveItemState.setActiveItem(subMenu.activeKey)"
                                    :class="pcModeActiveItemState.validActive(subMenu.activeKey)">{{ subMenu.name
                                    }}</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 會員選單區塊 -->
                <!-- <div class="menu-item gallery-box">
                    <div v-if="isLogin" class="sub-menu-title" @click="memberMenuState.toggleMenu">會員<el-icon>
                            <ElIconArrowDown />
                        </el-icon></div>

                    <div class="sub-menu-item-box gallery-sub-menu" v-if="memberMenuState.isOpen">
                        <nuxt-link class="sub-menu-item" to="/member-center">會員中心</nuxt-link>
                        <nuxt-link class="sub-menu-item" @click="handleLogout">登出</nuxt-link>
                    </div>
                    <nuxt-link v-if="!isLogin" to="/login">登入</nuxt-link>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>

const isLogin = useState('isLogin', () => false)

// 偵測滾輪位置，更換 menu 背景色
const isScroll = ref(false)
function handleScroll() {
    isScroll.value = window.scrollY > 0
}

// 菜單基礎項目
const primaryMenuItems = [
    { name: '關於我們', route: '/about-us', activeKey: 'aboutUs' },
    { name: '會議資訊', route: '/conference-information', activeKey: 'conferenceInformation' },
    { name: '註冊資訊', route: '/seminar-registration', activeKey: 'seminarRegistration' },
    { name: '交通資訊', route: '/transportation', activeKey: 'transportation' },
]

// 次級菜單項目 (在螢幕寬度不足以顯示所有 primary menu 項目時會顯示在 sub-menu 中)
const secondaryMenuItems = [
    { name: '旅遊資訊', route: '/travel', activeKey: 'travel' },
    { name: '贊助廠商', route: '/sponsor-list', activeKey: 'sponsorList' },
    { name: '吉祥物專區', route: '/mascot', activeKey: 'mascot' },
]

// Gallery 菜單項目
const galleryMenuItem = {
    name: 'Gallery', route: '', activeKey: 'gallery', subMenu: [
        { name: 'Gallery 2023', route: '/gallery/2023', activeKey: 'gallery2023' },
        { name: 'Gallery 2024', route: '/gallery/2024', activeKey: 'gallery2024' },
        { name: 'Gallery 2025', route: '/gallery/2025', activeKey: 'gallery2025' },
    ]
}

// 次級菜單狀態
const secondaryMenuState = ref({
    isOpen: false,
    toggleMenu: () => {
        secondaryMenuState.value.isOpen = !secondaryMenuState.value.isOpen
    }
})

// Gallery 菜單狀態
const galleryMenuState = ref({
    isOpen: false,
    toggleMenu: () => {
        galleryMenuState.value.isOpen = !galleryMenuState.value.isOpen
    }
})

const memberMenuState = ref({
    isOpen: false,
    toggleMenu: () => {
        memberMenuState.value.isOpen = !memberMenuState.value.isOpen
    }
})

// PC 模式下 active menu 狀態
const pcModeActiveItemState = ref({
    activedItem: '',
    setActiveItem: (item: string) => {
        pcModeActiveItemState.value.activedItem = item
        secondaryMenuState.value.isOpen = false
        galleryMenuState.value.isOpen = false
    },
    validActive: (item: string) => {
        return pcModeActiveItemState.value.activedItem === item ? 'active' : ''
    }
})

const handleLogout = () => {
    const tokenCookie = useCookie('Authorization-member');
    tokenCookie.value = null;
    isLogin.value = false;
    memberMenuState.value.isOpen = false;
    useRouter().push('/')
}


/**================================================================ */

const isActive = ref(false);
const props = defineProps<{
    isActive: boolean;
}>();

watch(() => props.isActive, (value) => {
    isActive.value = value;
});


const openMenu = () => {
    isActive.value = !isActive.value;
    emits('openMenu', isActive.value);
}
const emits = defineEmits(['openMenu']);







/**================================================================ */
onMounted(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
})

</script>
<style lang="scss" scoped>
.top-section {

    .menu-container {
        display: flex;
        position: fixed;
        text-align: center;
        align-items: center;
        justify-content: space-around;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 6.5rem;
        padding: 0.5rem 0;
        border-bottom: 8px solid #915aa1;


        @media screen and (max-width: 1920px) {
            height: 4.5rem;
        }

        @media screen and (max-width: 1024px) {}

        @media screen and (max-width: 469px) {
            padding-left: 2rem;
            justify-content: flex-start;
        }

        // Logo區域
        .logo-container {
            width: 30%;

            .logo-link {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;

                .logo-image-box {
                    width: 30%;

                    .logo {
                        width: 100%;
                        object-fit: contain;
                        object-position: center center;
                    }

                    @media screen and (max-width: 1024px) {
                        width: 70%;
                    }

                    @media screen and (max-width: 524px) {
                        display: none;
                    }
                }


                .logo-title {
                    font-size: 1.5rem;
                    color: #59413C;
                }
            }
        }

        // Right nav bar
        .menu-box {
            display: flex;
            font-size: 1.2rem;
            gap: 1.5rem;

            @media screen and (max-width: 1024px) {
                gap: 0.5rem;
            }

            @media screen and (max-width: 524px) {
                display: none;
            }

            // when viewport is scrolled down
            .active {
                color: black;
            }

            .item-box {
                display: flex;
                gap: 1.5rem;

                @media screen and (max-width: 1024px) {
                    gap: 0.5rem;
                }

                @media screen and (max-width: 800px) {
                    display: none;
                }

            }

            .menu-item {
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                color: #59413C;
                height: 4.5rem;
                padding: 1rem;

                @media screen and (max-width: 1920px) {
                    height: 2.5rem;
                    padding: 0.1rem;
                }

                @media screen and (max-width: 1439px) {
                    font-size: 1rem;
                }

                @media screen and (max-width: 1024px) {
                    justify-items: flex-end;
                }

                @media screen and (max-width: 870px) {
                    font-size: 0.9rem;
                }

                &:hover {
                    cursor: pointer;
                    color: white;
                    background-color: #915aa1;
                }
            }

            .sub-menu-box {
                display: none;
                color: #59413C;
                text-decoration: none;
                position: relative;

                @media screen and (max-width: 800px) {
                    display: flex;
                }

                .sub-menu-title {
                    display: flex;
                    align-items: center;
                    gap: 0.1rem;

                    @media screen and (max-width: 1024px) {
                        font-size: 1rem;
                    }
                }

                .sub-menu-item-box {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    gap: 1rem;
                    top: 3rem;
                    right: -0.5rem;
                    background-color: black;
                    width: 10rem;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    z-index: 1000;

                    .active {
                        color: #FF5529;
                    }

                    .sub-menu-item {
                        color: white;

                        &:active {
                            color: #FF5529;
                        }
                    }
                }
            }

            .gallery-box {
                color: #59413C;
                text-decoration: none;
                position: relative;

                @media screen and (max-width: 800px) {
                    color: white;
                    display: flex;
                    font-size: 1.2rem;
                    justify-content: center;
                    align-items: center;
                    gap: 0.5rem;
                }


                .gallery-sub-menu {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    gap: 1rem;
                    top: 3rem;
                    right: -0.5rem;
                    background-color: black;
                    width: 10rem;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    z-index: 1000;

                    @media screen and (max-width: 800px) {
                        width: 8rem;
                        left: -12rem;
                        top: 0;


                        &:hover {
                            cursor: pointer;
                            color: white;
                            background-color: black !important;
                        }

                    }


                    .active {
                        color: #FF5529;
                    }

                    .sub-menu-item {
                        color: white;

                        &:active {
                            color: #FF5529;
                        }

                        &:hover {
                            color: #FF5529;
                        }
                    }
                }
            }
        }
    }

    .menu-section-scroll {
        background-color: black;
        transition: background-color 0.3s ease-in-out;


        .logo-container {

            .logo-link {

                .logo-title {
                    color: white;
                }
            }
        }

        .menu-box {
            .menu-item {
                color: white;

                &:hover {
                    cursor: pointer;
                    color: #FF5529;
                    background-color: black
                }
            }

            .active {
                color: #FF5529;
            }

            .sub-menu-box {
                font-size: 1rem;
                color: white;
                text-decoration: none;

                .sub-menu-item-box {
                    .active {
                        color: #FF5529 !important;
                    }
                }

            }
        }
    }


    // 測試
    .hamburger-icon {
        display: none;

        .hamburger .line {
            width: 1.5rem;
            height: 3px;
            background-color: #000;
            margin-top: 5px;
            display: block;
            -webkit-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;



            &:hover {
                cursor: pointer;
            }

            &.is-scroll {
                background-color: white !important;
            }
        }

        #hamburger-1.is-active .line:nth-child(2) {
            background-color: white;
            opacity: 0;
        }

        #hamburger-1.is-active .line:nth-child(1) {
            background-color: white;
            transform: 0.5s;

            rotate: 360deg;
            -webkit-transform: translateY(7.9px) rotate(47deg);
            -ms-transform: translateY(7.9px) rotate(47deg);
            -o-transform: translateY(7.9px) rotate(47deg);
            transform: translateY(7.9px) rotate(47deg);
            border-radius: 3px;
        }

        #hamburger-1.is-active .line:nth-child(3) {
            background-color: white;
            transform: 0.5s;
            rotate: 360deg;


            -webkit-transform: translateY(-8.4px) rotate(-47deg);
            -ms-transform: translateY(-8.4px) rotate(-47deg);
            -o-transform: translateY(-8.4px) rotate(-47deg);
            transform: translateY(-8.4px) rotate(-47deg);
            border-radius: 3px;
        }

        @media screen and (max-width: 524px) {
            display: block;
        }

    }
}
</style>