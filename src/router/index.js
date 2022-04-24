import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            name: "home",
            component: () => import("../views/home/index.vue"),
            children: [{
                path: "/three",
                name: "three",
                component: () => import("../views/three/index.vue"),
            }]
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/login/index.vue")
        }
    ]
})
export default router;