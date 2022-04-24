/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="model-box" v-loading="state.loading" :element-loading-text="state.loadingText" element-loading-background="rgba(0, 0, 0, 0.8)">
    </div>
</template>

<script>
import { getCurrentInstance, reactive, onMounted, computed, onBeforeUnmount, toRefs } from 'vue'
import threeModel from "../three"

export default {
    props: {
        title: {
            type: [Number, String],
            deflert: ""
        }
    },
    setup(props, { emit, slots, attrs }) {
        const state = reactive({
            three: null,
            loading: false,
            loadingText: "aaaaaaaaa",
            // lowerCaseUsername: computed(() => state.username.toLowerCase()), //计算属性
        })
        const { ctx } = getCurrentInstance();
        onMounted(() => {
            console.log(ctx)
            initThree();
        });
        // 初始化3d场景
        let initThree = () => {
            state.three = new threeModel(document.getElementsByClassName("model-box")[0], 2);
            // state.three.loadModel("http://192.168.2.121:8083/1.glb", "aaa", (progress, model) => {
            //     console.log(progress, model)
            //     state.loading = true;
            //     progress = (progress ? progress-- : progress)
            //     if (model) {
            //         // progress = 100;
            //         state.loading = false;
            //         state.loadingText = `模型加载${parseInt(progress)}%`;
            //     }
            // }); // 加载模型

        }
        // 组件销毁前
        onBeforeUnmount(() => {
            state.scene = null;
        })
        return { state }
    },
    watch: {},
    components: {},
};
</script>

<style lang="scss">
.model-box {
    height: 100%;
    width: 100%;
}
</style>
