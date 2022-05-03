/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="home">
        <!-- <ul class="menu-box">
            <li>聊天室</li>
        </ul> -->
        <!-- <el-menu :default-active="state.activeIndex2" :router="true" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
            <el-menu-item index="chatRoom" route="/chatRoom">聊天室</el-menu-item>
            <el-menu-item index="three" route="/three">模型</el-menu-item>
            
        </el-menu> -->
        <!-- <router-view></router-view> -->
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
    .menu-box {
        height: 60px;
        border-bottom: 1px solid #eee;
        display: flex;
        padding: 0 60px;
    }
}
</style>
