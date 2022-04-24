import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            redirect: "/chatRoom",
            // path: "/home",
            name: "home",
            component: () => import("../views/home/index.vue"),
            children: [
                {
                    path: "/chatRoom",
                    name: "chatRoom",
                    component: () => import("../views/chatRoom/index.vue")
                },
                {
                    path: "/three",
                    name: "three",
                    component: () => import("../views/three/index.vue"),
                },
            ]
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/login/index.vue")
        },

    ]
})
export default router;