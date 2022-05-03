<template>
    <router-view></router-view>
</template>
<script>
import { reactive, onMounted, computed, onBeforeUnmount, inject } from 'vue'
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
export default {
    props: {
        title: {
            type: [Number, String],
            deflert: ""
        }
    },
    setup(props, { emit, slots, attrs }) {
        const _this = inject("G");
        onMounted(() => {
        });
        // 组件销毁前
        onBeforeUnmount(() => { })
        window.socket = io.connect(`http://${location.hostname}:7005`);
        let socketId;
        let userName;
        let userKey;
        let userList;
        //获取自己的id
        socket.on("socketId", data => {
            socketId = data.socketId;
            localStorage.setItem("socketId", socketId);
            if (!localStorage.getItem("userName")) {
                localStorage.setItem("userName", data.socketId);
            }
            userName = localStorage.getItem("userName");

            if (!localStorage.getItem("userKey")) {
                localStorage.setItem("userKey", socketId);
            }
            userKey = localStorage.getItem("userKey");
            sendLink(socketId); // 发送连接
        });
        let getUserList = () => {
            socket.on("userList", data => {
                this.userList = userList;
            })
        }

        // 修改名字
        let setName = () => {
            let name = prompt("请输入你的名字", "王老五");
            if (name != null && name != "") {
                localStorage.setItem("name", name);
                sendLink(); // 发送连接
            } else {
            }
        }
        // 发送连接
        let sendLink = () => {
            socket.emit("linkUser", {
                socketId: socketId,
                name: userName,
            })
        }

        const state = reactive({
            three: null,
            activeIndex2: "chatRoom",
            // lowerCaseUsername: computed(() => state.username.toLowerCase()), //计算属性
        })
        let handleSelect = (key, keyPath) => {
            // console.log(key, keyPath)
        }

        let fn = { handleSelect }
        return { state, ...fn }
    },
    watch: {},
    components: {},
};
</script>

<style lang="scss">
@import url("./styles/public.module.css");
#app {
    width: 100%;
    height: 100%;
}
</style>
