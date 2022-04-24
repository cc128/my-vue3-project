<template>
    <div class="chat-room">
        <!-- <ul>
            <li class="photo">
                <img src="" alt="" srcset="">
            </li>
            <li class="content">内容</li>
        </ul> -->
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
    // ul {
    //     display: flex;
    //     align-items: center;
    //     .photo {
    //         width: 50px;
    //         height: 50px;
    //         border-radius: 50%;
    //         background: #ccc;
    //         margin-right: 10px;
    //     }
    //     .content {
    //         border-radius: 5px;
    //         background: #ddd;
    //         padding: 10px;
    //         flex: 1;
    //     }
    // }
}
</style>