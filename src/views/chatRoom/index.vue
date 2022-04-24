<template>
    <div class="chat-room">
        聊天室
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
            activeIndex2: "three",
            // lowerCaseUsername: computed(() => state.username.toLowerCase()), //计算属性
        })
        const { ctx } = getCurrentInstance();
        let handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
        }
        onMounted(() => {
            console.log(ctx)
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
.chat-room {
    padding: 20px;
}
</style>