<template>
    <div class="chat-room">
        <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                    <h4>{{ }}</h4>
                    <p>Tom committed 2018/4/12 20:46</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/3 20:46</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/2 20:46</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <div class="bottom-box">
            <el-input v-model="state.text" placeholder="请输入内容" />
            <svg @click="sendMsg" t="1651072705410" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1272" width="32" height="32">
                <path d="M925.6 559.2L152 145.6c-11.2-5.6-24.8 3.2-23.2 15.2l60 714.4c0.8 11.2 12 17.6 22.4 13.6L460.8 784l136.8 155.2c8.8 9.6 24 5.6 27.2-6.4l65.6-245.6 235.2-99.2c11.2-5.6 12-22.4 0-28.8z m-328 305.6l-72-128-368-568 488 504-48 192z" p-id="1273" fill="#d4237a"></path>
            </svg>
        </div>
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
            text: ""
            // lowerCaseUsername: computed(() => state.username.toLowerCase()), //计算属性
        })
        onMounted(() => {
            // console.log(ctx)
        });
        // 组件销毁前
        onBeforeUnmount(() => {
        })
        // 发送消息
        let sendMsg = () => {
            socket.emit("sendMsg", {
                text: state.text,
                socketId: localStorage.getItem("socketId"),
                nserName: localStorage.getItem("nserName"),
                userKey: localStorage.getItem("userKey"),
            })
            state.text = "";
        }
        const { ctx } = getCurrentInstance();
        let handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
        }
        let fn = { handleSelect, sendMsg }
        return { state, ...fn }
    },
    watch: {},
    components: {},
};
</script>

<style lang="scss">
.chat-room {
    padding: 20px;
    .bottom-box {
        width: 98%;
        height: 50px;
        position: absolute;
        padding: 1%;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        svg {
            cursor: pointer;
        }
    }
}
</style>