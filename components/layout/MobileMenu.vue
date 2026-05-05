<template>
    <div class="mobile-section">
        <div class="mobile-menu">
            <ol>
                <div v-for="item in menu">
                    <li v-if="!item.submenu && item.isShow" @click="handleClick(item.path)"
                        :class="activeClass(item.path)">
                        {{ item.title }}
                    </li>
                    <li v-if="item.submenu && item.isShow" @click="setActiveItem(item)"
                        :class="{ 'active': item.isActive }">
                        {{ item.title }}
                        <el-icon class="arrow" :class="{ 'is-active': item.isActive }">
                            <ElIconArrowDown />
                        </el-icon>
                        <ul class="submenu" :class="{ 'is-open': item.isActive }">
                            <li v-for="subItem in item.submenu" :key="subItem.path">
                                <nuxt-link class="sub-menu-item" :to="localePath(subItem.path)"
                                    @click="handleClick(subItem.path)" :class="activeClass(subItem.path)">{{
                                        subItem.title }}</nuxt-link>
                            </li>
                        </ul>
                    </li>
                </div>
                <li v-if="isLogin" @click="handleLogout">登出</li>
                <li v-else>
                    <nuxt-link :to="localePath('/login')" @click="closeMenu">{{ t('login') }}</nuxt-link>
                </li>
                <el-card class="translation-card">
                    <p>Translation</p>
                    <ol>
                        <li @click="setLang('zh')">繁體中文</li>
                        <li @click="setLang('en')">English</li>
                    </ol>
                </el-card>
            </ol>

        </div>
        <div class="gray-section" @click="closeMenu"></div>

    </div>
</template>
<script lang="ts" setup>

const { t, setLocale } = useI18n()
const localePath = useLocalePath()
const emits = defineEmits(['closeMenu']);

const closeMenu = () => {
    emits('closeMenu');
}

const isLogin = useState('isLogin', () => false)

const setLang = (lang: string) => {
    setLocale(lang)
    localStorage.setItem('lang', lang)
    closeMenu()
}


const menu = reactive([
    { title: t('home'), path: '/', isActive: false, isShow: true },
    { title: t('aboutUs'), path: '/about-us', isActive: false, isShow: true },
    { title: t('conferenceInformation'), path: '/conference-information', isActive: false, isShow: true },
    { title: t('seminarRegistration'), path: '/seminar-registration', isActive: false, isShow: true },
    { title: t('transportation'), path: '/transportation', isActive: false, isShow: true },
    { title: t('travel'), path: '/travel', isActive: false, isShow: true },
    { title: t('sponsorList'), path: '/sponsor-list', isActive: false, isShow: true },
    { title: t('mascot'), path: '/mascot', isActive: false, isShow: true },
    {
        title: 'Gallery', path: '/gallery', isActive: false, isShow: true, submenu: [
            { title: '2023 Gallery', path: '/gallery/2023' },
            { title: '2024 Gallery', path: '/gallery/2024' },
            { title: '2025 Gallery', path: '/gallery/2025' },
        ]
    },
])


const activeItem = ref('')
const setActiveItem = (item: any) => {
    item.isActive = !item.isActive
    activeItem.value = item.title
}

const activeClass = (item: string) => {
    return router.currentRoute.value.path === item ? 'active' : ''
}

const router = useRouter()
console.log('router', router.currentRoute.value.path);

const handleClick = (path: string) => {
    router.push(localePath(path))
    closeMenu()
}

const handleLogout = () => {
    ElMessageBox.confirm(t('logoutConfirmation'), t('logoutTitle'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning',
    }).then(() => {
        const token = ref<string | null>(localStorage.getItem('Authorization-member') || null);
        token.value = null;
        isLogin.value = false;
        router.push(localePath('/login'));
        console.log('登出成功');
    }).catch(() => {
        // 取消登出
    });
}





router.beforeEach(async (to, from, next) => {
    next();
});

const logout = async () => {
    let res = await CSRrequest.post('/member/logout');
    if (res.code === 200) {
        localStorage.removeItem('Authorization-member');
        isLogin.value = false;
        router.push(localePath('/login'));
    }
}


</script>
<style lang="scss" scoped>
.mobile-menu {
    background-color: black;
    height: 100vh;
    width: 60%;
    position: fixed;
    top: 0rem;
    left: 0rem;
    z-index: 10;
    transition: 0.5s;


    ol {
        list-style: none;
        padding: 2rem 2rem;

        li {
            padding: 1rem;
            font-size: 1.3rem;
            font-weight: bold;
            color: white;

            img {
                width: 1.5rem;
                margin-right: 0.5rem;
                position: relative;
                top: 3px;
            }

            .arrow {
                width: 1rem;
                margin-left: 1rem;
                transform: rotateZ(-90deg);
                position: relative;
                top: 1px;
            }

            .is-active {
                transform: rotateZ(0deg);
            }

            &:hover {
                cursor: pointer;
            }

            &.active {
                color: #FF5529;
                border-radius: 10px;
            }
        }

        .submenu {
            padding-left: 1rem;

            li {
                list-style: none;
            }

            overflow: hidden;
            max-height: 0px;
            transition: 0.5s;
            font-size: 16px;

            a {
                font-size: 1.2rem;
                font-weight: bold;
                display: block;
                color: $main-content-color;
                padding: 0.5rem 0;
            }

            &.is-open {
                overflow: auto !important;
                max-height: none !important;
                margin-left: 5vw;
                font-size: 16px;
            }
        }
    }
}

.gray-section {
    background-color: #F0F0F0;
    opacity: 0.5;
    height: 100vh;
    width: 40%;
    position: fixed;
    top: 0rem;
    right: 0rem;
    z-index: 10;
}

.translation-card {
    border: none;
    border-radius: 8px;
    color: white;
    background-color: #242424;
    display: flex;
    flex-direction: column;
    align-items: center;

    :deep(.el-card__body) {
        padding: 0.5rem;
        background-color: #242424;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>