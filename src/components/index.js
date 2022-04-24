import three from "./three/index.vue"; // 图表

const commonalityStype = {
    install: function (Vue) {
        Vue.component("c-three", three);
    }
};
export default commonalityStype;
// 导出组件
