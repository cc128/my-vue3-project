<template>
    <div class="chat-room">
        <div class="msg-list">
            <ul v-for="(item, i) in state.list" :key="i">
                <li class="photo">
                    <el-avatar v-if="state.userKey !== item.userKey" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </li>
                <li class="msg">
                    <p>{{ item.text }}</p>
                    <div class="time-txt">{{ item.userName }}：{{ item.sendTime }}</div>
                </li>
                <li class="photo">
                    <el-avatar v-if="state.userKey === item.userKey" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </li>
            </ul>
        </div>
        <div class="bottom-box">
            <el-input v-model="state.text" placeholder="请输入内容"  @keyup.enter="sendMsg"/>
            <svg @click="sendMsg" t="1651072705410" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1272" width="32" height="32">
                <path d="M925.6 559.2L152 145.6c-11.2-5.6-24.8 3.2-23.2 15.2l60 714.4c0.8 11.2 12 17.6 22.4 13.6L460.8 784l136.8 155.2c8.8 9.6 24 5.6 27.2-6.4l65.6-245.6 235.2-99.2c11.2-5.6 12-22.4 0-28.8z m-328 305.6l-72-128-368-568 488 504-48 192z" p-id="1273" fill="#d4237a"></path>
            </svg>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, inject } from 'vue'
export default {
    props: {
        title: {
            type: [Number, String],
            deflert: ""
        }
    },
    setup(props, { emit, slots, attrs }) {
        const state = reactive({
            list: [], // 聊天记录
            userKey: localStorage.getItem("userKey"),
            text: "", // 消息内容
            // lowerCaseUsername: computed(() => state.username.toLowerCase()), //计算属性
        })
        const _this = inject("G");
        onMounted(() => {
            // 获取聊天记录
            _this.axios.get("/chatList").then(res => {
                let { code, data } = res.data;
                if (code == "ok") {
                    state.list = [...state.list, ...data];
                    toBottom(); // 回到底部
                }
            });
            getMsg();// 启动接收消息
        });
        // 组件销毁前
        onBeforeUnmount(() => {
        })
        // 发送消息
        let sendMsg = () => {
            if(state.text === "") return;
            let data = {
                text: state.text,
                socketId: localStorage.getItem("socketId"),
                userName: localStorage.getItem("userName"),
                userKey: localStorage.getItem("userKey"),
            }
            socket.emit("chatMsg", data);
            state.list.push(data);
            state.text = "";
            toBottom(); // 回到底部
        }
        // 启动接收消息
        let getMsg = () => {
            socket.on("chatMsg", data => {
                state.list.push(data);
                toBottom(); // 回到底部
            })
        }
        // 回到底部
        let toBottom = () => {
            setTimeout(() => {
                document.getElementsByClassName("msg-list")[0].scrollTop = 999999999;
            });
        }
        let fn = { sendMsg }
        return { state, ...fn }
    },
    watch: {},
    components: {},
};
</script>

<style lang="scss">
.chat-room {
    height: calc(100% - 60px);
    .msg-list {
        padding: 20px 0;
        height: calc(100% - 110px);
        overflow-y: auto;
        ul {
            display: flex;
            margin-bottom: 10px;
            justify-content: space-between;
            .photo {
                width: 40px;
                height: 40px;
                margin: 10px 15px;
            }
            .msg {
                flex: 1;
                padding: 10px;
                box-shadow: 0px 2px 12px 0 rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                p {
                    margin-bottom: 5px;
                }
                .time-txt {
                    color: #ccc;
                    font-size: 12px;
                }
            }
        }
    }
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