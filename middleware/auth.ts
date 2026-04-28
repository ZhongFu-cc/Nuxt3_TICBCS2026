export default defineNuxtRouteMiddleware(async (to, from) => {
    const isLogin = useState('isLogin', () => false)
    const memberInfo = useState('memberInfo', () => null) as Ref<any>

    const token = useCookie('Authorization-member').value
    if (!token) {
        isLogin.value = false
        memberInfo.value = null

        if (to.path !== '/login') {
            return navigateTo('/login')
        }
        return
    }

    if (!memberInfo.value) {
        try {
            const res: any = await CSRrequest.get('/member/getMemberInfo')

            if (res.code === 200) {
                isLogin.value = true
                memberInfo.value = res.data
            } else {
                useCookie('Authorization-member').value = null
                isLogin.value = false
                memberInfo.value = null
                return navigateTo('/login')
            }
        } catch (error) {
            const tokenCookie = useCookie('Authorization-member')
            tokenCookie.value = null
            isLogin.value = false
            memberInfo.value = null
            return navigateTo('/login')
        }
    }

    if (isLogin.value && to.path === '/login') {
        return navigateTo('/')
    }
})
