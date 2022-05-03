import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        // 导航页
        {
            // redirect: "/chatRoom",
            path: "/home",
            name: "home",
            component: () => import("../views/home/index.vue"),
            children: []
        },
        // 聊天室
        {
            path: "/chatRoom",
            name: "chatRoom",
            component: () => import("../views/chatRoom/index.vue")
        },
        // 模型展示
        {
            path: "/three",
            name: "three",
            component: () => import("../views/three/index.vue"),
        },
        // 登陆
        {
            path: "/login",
            name: "login",
            component: () => import("../views/login/index.vue")
        },

    ]
})
export default router;