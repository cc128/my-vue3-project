/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="home">
        <el-menu :default-active="state.activeIndex2" :router="true" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
            <el-menu-item index="chatRoom" route="/chatRoom">聊天室</el-menu-item>
            <el-menu-item index="three" route="/three">模型</el-menu-item>
            <!-- <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3" disabled>Info</el-menu-item>
            <el-menu-item index="4">Orders</el-menu-item> -->
        </el-menu>
        <router-view></router-view>
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
            three: null,
            activeIndex2: "chatRoom",
            // lowerCaseUsername: computed(() => state.username.toLowerCase()), //计算属性
        })
        const { ctx } = getCurrentInstance();
        let handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
        }
        onMounted(() => {
            // console.log(ctx)
        });
        // 组件销毁前
        onBeforeUnmount(() => {
        })
        let fn = { handleSelect }
        return { state, ...fn }
    },
    watch: {},
    components: {},
};
</script>

<style lang="scss">
.home {
    height: 100%;
    width: 100%;
}
</style>
