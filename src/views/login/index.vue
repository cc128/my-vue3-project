/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="login">
        <el-button type="primary">登录</el-button>
    </div>
</template>

<script>
import { getCurrentInstance, reactive, onMounted, computed, onBeforeUnmount } from 'vue'
export default {
    props: {
        title: {
            type: [Number, String],
            deflert: ""
        }
    },
    setup(props, { emit, slots, attrs }) {
        const state = reactive({
            xx: "",
            lowerCaseUsername: computed(() => state.xx.toLowerCase()), //计算属性
        })
        const { ctx } = getCurrentInstance();
        onMounted(() => {
            // console.log(ctx)
        });
        // 方法
        let fn = () => { }
        // 组件销毁前
        onBeforeUnmount(() => { })
        return { state }
    },
    watch: {},
    components: {},
};
</script>

<style lang="scss">
.login {
    height: 100%;
    width: 100%;
}
</style>
