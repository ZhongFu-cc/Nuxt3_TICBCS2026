<template>
    <ClientOnly>
        <section class="top-section">
            <div class="menu-container" :class="[{ 'scrolled-menu-section': isScroll }, { 'is-active': isActive }]">

                <!-- 漢堡選單 -->
                <div class="mobile-menu-box">
                    <div class="hamburger-icon">
                        <div class="container">
                            <div class="hamburger" :class="{ 'is-active': isActive }" id="hamburger-1"
                                @click="openMenu">
                                <span class="line" :class="{ 'is-scroll': isScroll }"></span>
                                <span class="line" :class="{ 'is-scroll': isScroll }"></span>
                                <span class="line" :class="{ 'is-scroll': isScroll }"></span>
                            </div>
                        </div>
                    </div>

                    <div class="member-center">
                        <nuxt-link to="/member-center">
                            <img src="@/assets/img/user.svg" alt="">
                        </nuxt-link>
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
                <div class="primary-menu-box menu-box">
                    <nuxt-link v-for="menu in primaryMenuItems" :key="menu.activeKey" class="menu-item" :to="menu.route"
                        @click="pcModeActiveItemState.setActiveItem(menu.activeKey)"
                        :class="pcModeActiveItemState.validActive(menu.activeKey)">{{ menu.name
                        }}</nuxt-link>

                    <div class="secondary-menu-box menu-box">
                        <nuxt-link v-for="menu in secondaryMenuItems" :key="menu.activeKey" class="menu-item"
                            :to="menu.route" @click="pcModeActiveItemState.setActiveItem(menu.activeKey)"
                            :class="pcModeActiveItemState.validActive(menu.activeKey)">{{
                                menu.name }}</nuxt-link>

                        <div class="gallery-menu-box menu-box" @click="galleryMenuState.toggleMenu">
                            <div class="menu-title" :class="pcModeActiveItemState.validActive('gallery')">
                                Gallery
                                <el-icon>
                                    <ElIconArrowDown />
                                </el-icon>
                            </div>
                            <div class="sub-menu-box" v-if="galleryMenuState.isOpen">
                                <nuxt-link v-for="subMenu in galleryMenuItem.subMenu" :key="subMenu.activeKey"
                                    class="sub-menu-item" :to="subMenu.route"
                                    @click.stop="pcModeActiveItemState.setActiveItem('gallery')"
                                    :class="pcModeActiveItemState.validActive(subMenu.activeKey)">{{ subMenu.name
                                    }}</nuxt-link>
                            </div>
                        </div>
                    </div>

                    <!-- 次選單區塊 -->
                    <div class="hidden-menu-box menu-box">
                        <div class="menu-title" :class="pcModeActiveItemState.validActive('secondary')"
                            @click="secondaryMenuState.toggleMenu">查看更多<el-icon>
                                <ElIconArrowDown />
                            </el-icon></div>
                        <div class="sub-menu-box" v-if="secondaryMenuState.isOpen">
                            <nuxt-link v-for="menu in secondaryMenuItems" :key="menu.activeKey" class="sub-menu-item"
                                :to="menu.route" @click="pcModeActiveItemState.setActiveItem(menu.activeKey)"
                                :class="pcModeActiveItemState.validActive(menu.activeKey)">{{ menu.name }}</nuxt-link>

                            <div class="gallery-menu-box menu-box" @click="galleryMenuState.toggleMenu">
                                <div class="menu-title" :class="pcModeActiveItemState.validActive('gallery')">
                                    Gallery
                                    <el-icon>
                                        <ElIconArrowDown />
                                    </el-icon>
                                </div>
                                <div class="sub-menu-box" v-if="galleryMenuState.isOpen">
                                    <nuxt-link v-for="subMenu in galleryMenuItem.subMenu" :key="subMenu.activeKey"
                                        class="sub-menu-item" :to="subMenu.route"
                                        @click="pcModeActiveItemState.setActiveItem('gallery')"
                                        :class="pcModeActiveItemState.validActive(subMenu.activeKey)">{{ subMenu.name
                                        }}</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 會員選單區塊 -->
                    <div class="member-menu-box menu-box">
                        <div v-if="isLogin" class="menu-title" :class="pcModeActiveItemState.validActive('member')"
                            @click="memberMenuState.toggleMenu">會員<el-icon>
                                <ElIconArrowDown />
                            </el-icon></div>

                        <div class="sub-menu-box" v-if="memberMenuState.isOpen">
                            <nuxt-link class="sub-menu-item" to="/member-center"
                                @click="pcModeActiveItemState.setActiveItem('member')">會員中心</nuxt-link>
                            <nuxt-link class="sub-menu-item" @click="handleLogout">登出</nuxt-link>
                        </div>
                        <nuxt-link class="menu-item" v-if="!isLogin" to="/login"
                            @click="pcModeActiveItemState.setActiveItem('member')">登入</nuxt-link>
                    </div>
                </div>
            </div>
        </section>
    </ClientOnly>
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
]

// 次級菜單項目 (在螢幕寬度不足以顯示所有 primary menu 項目時會顯示在 sub-menu 中)
const secondaryMenuItems = [
    { name: '交通資訊', route: '/transportation', activeKey: 'transportation' },
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
        galleryMenuState.value.isOpen = false;
        memberMenuState.value.isOpen = false;
    }
})

// Gallery 菜單狀態
const galleryMenuState = ref({
    isOpen: false,
    toggleMenu: () => {
        galleryMenuState.value.isOpen = !galleryMenuState.value.isOpen
        secondaryMenuState.value.isOpen = false;
        memberMenuState.value.isOpen = false;
    }
})

const memberMenuState = ref({
    isOpen: false,
    toggleMenu: () => {
        memberMenuState.value.isOpen = !memberMenuState.value.isOpen
        secondaryMenuState.value.isOpen = false;
        galleryMenuState.value.isOpen = false;
    }
})

// PC 模式下 active menu 狀態
const pcModeActiveItemState = ref({
    activedItem: '',
    setActiveItem: (item: string) => {
        pcModeActiveItemState.value.activedItem = item
        secondaryMenuState.value.isOpen = false;
        galleryMenuState.value.isOpen = false;
        memberMenuState.value.isOpen = false;
    },
    validActive: (item: string) => {
        return pcModeActiveItemState.value.activedItem === item ? 'active' : ''
    }
})

const handleLogout = () => {
    ElMessageBox.confirm('確定要登出嗎？', '登出確認', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        const tokenCookie = useCookie('Authorization-member');
        tokenCookie.value = null;
        isLogin.value = false;
        memberMenuState.value.isOpen = false;
        useRouter().push('/')
    }).catch(() => {
        // 取消登出
    });
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

                    @media screen and (max-width: 768px) {
                        display: none;
                    }
                }


                .logo-title {
                    font-size: 1.5rem;
                    color: #59413C;
                }
            }

            @media screen and (max-width: 768px) {
                display: none;
            }
        }

        .menu-box {
            display: flex;
            justify-content: space-around;
            gap: 1.5rem;
            position: relative;

            .menu-item,
            .menu-title {
                text-align: center;
                color: #59413C;
                font-size: 1.2rem;
                padding: 0.5rem;
                border-radius: 8px;

                &:hover {
                    cursor: pointer;
                    background-color: #915aa1;
                    color: white;
                }
            }

            .menu-title {
                display: flex;
                align-items: center;
                gap: 0.2rem;
            }

            .hidden-menu-box {
                display: none;
            }

            .sub-menu-box {
                position: absolute;
                top: 2.7rem;
                left: -4rem;
                background-color: black;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                z-index: 1000;
                width: 7rem;

                .sub-menu-item {
                    color: white;
                    font-size: 1.2rem;

                    &:hover {
                        cursor: pointer;
                        color: #FF5529;
                    }
                }
            }

            @media screen and (max-width: 1560px) {
                gap: 0.8rem;
            }

            @media screen and (max-width: 1440px) {
                font-size: 1rem;

                .secondary-menu-box {
                    display: none;
                }

                .hidden-menu-box {
                    display: block;
                }
            }

            @media screen and (max-width: 1024px) {}

            @media screen and (max-width: 768px) {
                display: none;
            }
        }

    }

    .scrolled-menu-section {
        background-color: black;
        transition: background-color 0.3s ease-in-out;


        .menu-box {

            .menu-item,
            .menu-title {
                color: white;

                &:hover {
                    color: #FF5529;
                    background-color: black
                }

                &.active {
                    color: #FF5529;
                }
            }

            .sub-menu-box {
                background-color: white;
                border: 1px solid #915aa1;

                .sub-menu-item {
                    color: black;

                    &:hover {
                        color: #FF5529;
                    }
                }
            }

        }
    }

    .mobile-menu-box {
        display: none;
        align-items: center;
        width: 100%;

        @media screen and (max-width: 768px) {
            display: flex;
            justify-content: space-around;
        }


    }

    .member-center {
        width: 30%;
        display: flex;
        justify-content: flex-end;

        img {
            width: 1.5rem;
            height: 1.5rem;
            object-fit: contain;
            object-position: center center;
            cursor: pointer;

            &:hover {
                filter: brightness(0.8);
            }
        }

    }

    .hamburger-icon {
        display: block;

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

    }
}
</style>