/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="three-box"></div>
</template>

<script>
import { getCurrentInstance, reactive, onMounted, computed } from 'vue'
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export default {
    props: {
        title: {
            type: [Number, String],
            deflert: ""
        }
    },
    setup(props, { emit, slots, attrs }) {
        const state = reactive({
            username: "FAEFAEG",
            scene: null, // 场景
            camera: null, // 相机
            renderer: null, // 渲染器
            lowerCaseUsername: computed(() => state.username.toLowerCase()), //计算属性
        })
        const { ctx } = getCurrentInstance();
        onMounted(() => {
            initTree(); //初始化场景
            // controls(); //控制器
        })
        //初始化场景
        const initTree = () => {
            //  创建场景对象Scene
            let scene = new THREE.Scene();
            state.scene = scene; // 场景

            // 相机设置
            let camera = new THREE.PerspectiveCamera(45, ctx.$el.clientWidth / ctx.$el.clientHeight, 0.01, 10000);
            camera.position.set(10, 10, 10) //x,y,z 眼睛/相机的位置
            // camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

            camera.position.z = 1;
            state.camera = camera;

            // 创建渲染器对象
            let renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(ctx.$el.clientWidth, ctx.$el.clientHeight);
            ctx.$el.appendChild(renderer.domElement);
            renderer.render(scene, camera);
            state.renderer = renderer;

            //网格模型添加到场景中
            let geometry = new THREE.BoxGeometry(1, 1, 1);
            let material = new THREE.MeshNormalMaterial({
                color: "white"
            });
            let mesh = new THREE.Mesh(geometry, material);
            state.scene.add(mesh);
            renderer.render(scene, camera);

            let controls = new OrbitControls(camera, renderer.domElement);
            //惯性滑动
            controls.enableDamping = true
            // controls.dampingFactor = 0.1;
            // //滚轮是否可控制zoom,zoom速度默认1
            // controls.enableZoom = true
            // controls.zoomSpeed = 0.5;
            // //最大最小相机移动距离(景深相机)
            // controls.minDistance = 100
            // controls.maxDistance = 800
            // // 最大俯视角和仰视角
            // // controls.minPolarAngle = 0.8
            // controls.maxPolarAngle = 1.5
            // //是否可平移，默认移动速度为7px
            // controls.enablePan = true
            // //是否可旋转，旋转速度
            // controls.enableRotate = parent.isShowThreeD;
            // controls.rotateSpeed = 0.1;
            controls.minDistance = 0.5;
            // controls.maxDistance = 200;
            controls.addEventListener("change", () => {
                renderer.render(scene, camera);
            }); //监听鼠标、键盘事件

            const animate = () => {
                requestAnimationFrame(animate);
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.02;
                renderer.render(scene, camera);
            }
            // animate()
            reSize(); // 更新
        }
        // 更新
        const reSize = () => {
            window.addEventListener('resize', () => {
                state.camera.aspect = ctx.$el.clientWidth / ctx.$el.clientHeight;
                state.camera.updateProjectionMatrix();
                state.renderer.setSize(ctx.$el.clientWidth, ctx.$el.clientHeight);
            });
        }

        return { state }
    },
    watch: {},
    components: {},
};
</script>

<style lang="scss">
.three-box {
    height: 100%;
    width: 100%;
}
</style>
