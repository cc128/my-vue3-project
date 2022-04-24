/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="home">
        <div id="player" style="display:none;"></div>
        <div class="tool-box">
            <el-button v-if="state.isOpenRanging == false" type="primary" @click="openRanging">测距</el-button>
            <el-button v-else type="danger" @click="closeRanging">关闭测距</el-button>
            <el-button v-if="state.isOpneLocation == false" type="primary" @click="openLocation">取点</el-button>
            <el-button v-else type="danger" @click="closeLocation">关闭取点</el-button>
            <el-button type="primary" @click="addLocation">显示点位</el-button>
            <el-button type="primary" @click="addTrack">显示轨迹</el-button>
            <el-button type="danger" @click="deleTrack">删除轨迹</el-button>
            <el-button type="primary" @click="addLocationCustom">自定义点位</el-button>
            <el-button type="primary" @click="getModelMsg">高度</el-button>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, reactive, onMounted, computed, onBeforeUnmount } from 'vue'
// import cloudRenderer from "51superapi"
import cloudRenderer from "superapi-51world"
import { ElMessage } from 'element-plus'
export default {
    props: {
        title: {
            type: [Number, String],
            deflert: ""
        }
    },
    setup(props, { emit, slots, attrs }) {
        const state = reactive({
            cloudRender: null, // 云渲染对象
            cloudurl: "http://192.168.2.108:8889",    //云渲染服务地址, 8889:固定端口
            orderID: "dAe83A4C",  //渲染口令, 在云渲染客户端上获得
            isOpenRanging: false, // 测距开关
            isOpneLocation: false, // 取点开关
            points: [], //点位集合
            // lowerCaseUsername: computed(() => state.username.toLowerCase()), //计算属性
        })
        const { ctx } = getCurrentInstance();
        onMounted(() => {
            console.log(ctx)
            addScene(); // 加载场景
        });
        // 加载场景
        let addScene = () => {
            state.cloudRender = new cloudRenderer("player", 0);
            fetch(`${state.cloudurl}/Renderers/Any/order`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ order: state.orderID, width: window.innerWidth, height: window.innerHeight })
                //① order 渲染口令必填; ② width, height: 设置云渲染输出分辨率(此设置为固定分辨率,可选; 默认以云渲染客户端设置的分辨率输出)
            }).then(res => {
                if (!res.ok) { throw Error(res.statusText) }
                return res.json()
            }).then(json => {
                console.log(json)
                if (json.url) {
                    //启动云渲染
                    state.cloudRender.SuperAPI("StartRenderCloud", json.url, "keyboard");
                    //事件注册
                    state.cloudRender.SuperAPI("RegisterCloudResponse", myHandleResponseFunction);
                    //场景中心点坐标(适用于wdp4.0)
                    if (json.mapPin) {
                        var SetCameraInfo_center_coord = `${json.mapPin.longitude},${json.mapPin.latitude}`;
                        console.log(SetCameraInfo_center_coord, 222222222)
                    }
                    //在事件注册函数中收到"APIAlready"后执行: 设置场景镜头API "SetCameraInfo", 设置场景镜头视角所用坐标点
                } else {
                    $message({
                        showClose: true,
                        message: 'Oops, this is a error message.',
                        type: 'error',
                    })
                }
            }).catch((error) => {
                console.error('Error: ', error);
            });
        }
        // 绑定事件
        let myHandleResponseFunction = (data) => {
            console.log('收到的事件: ' + data);
            const jsonObject = typeof data === 'object' ? JSON.parse(JSON.stringify(data)) : JSON.parse(data)
            switch (jsonObject.func_name) {
                case "beginPlay":
                    // 云渲染连接成功 do Something
                    break;
                case "APIAlready":
                    // 3D世界加载完成 do Something
                    break;
                case "OnAddPathSuccess":
                    // 添加路径成功 do Something
                    break;
                case "OnAddPathFailed":
                    // 添加路径失败 do Something
                    break;
                case "OnUpdatePathCoordSuccess":
                    // 更新路径数据点成功 do Something
                    break;
                case "OnUpdatePathCoordFailed":
                    // 更新路径数据点失败 do Something
                    break;
                case "OnFocusPathEnd":
                    // 聚焦路径结束 do Something
                    break;
                case "OnPathClick":
                    // 点击路径 do Something
                    break;
                case "OnSuperAPI_Error_Catch":
                    // 错误捕捉 do Something
                    // "args": {
                    //   "error_type": "SuperAPI JSon Body Field Error",
                    //   "error_information": "id"
                    // }
                    break;
                //更多func_name类型 回调通知, 详见各API事件
            }
            return data;
        }
        // 开启测距
        let openRanging = () => {
            state.isOpenRanging = true;
            let jsondata = {
                "coord_type": 1, //坐标类型(0:经纬度, 1:cad)
                "cad_mapkey": 'default' //CAD基准点Key值, 项目中约定
            }
            state.cloudRender.SuperAPI('StartMeasureTool', jsondata, (e) => {
                let data = JSON.parse(e)
                console.log(JSON.stringify(data, null, 2));
            })
        }
        // 关闭测距
        let closeRanging = () => {
            state.isOpenRanging = false;
            state.cloudRender.SuperAPI('EndMeasureTool')
        }
        // 开启取点
        let openLocation = () => {
            state.isOpneLocation = true;
            let jsondata = {
                "coord_type": 1, //坐标类型(0:经纬度, 1:cad)
                "cad_mapkey": 'default', //CAD基准点Key值, 项目中约定
                "coord_z_type": 0 //坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
            }
            state.cloudRender.SuperAPI('StartGetCoord', jsondata, (e) => {
                let data = JSON.parse(e)
                console.log(JSON.stringify(data, null, 2));
                state.points = data.coord_result; //点位信息
            })
        }
        // 关闭取点
        let closeLocation = () => {
            state.isOpneLocation = false;
            state.cloudRender.SuperAPI('EndGetCoord')
        }
        // 显示点位
        let addLocation = () => {
            let jsondata = {
                "coord_type": 1, //坐标类型(0:经纬度, 1:cad)
                "cad_mapkey": 'default', //CAD基准点Key值, 项目中约定
                "coord_z_type": 0, //坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
                "points": [
                    {
                        "index": 1, //索引
                        "coord": "-1748443.875,3686.859131",
                        "coord_z": 0
                    },
                    {
                        "index": 2,
                        "coord": "-699818.75,-525514.4375",
                        "coord_z": 0
                    },
                    {
                        "index": 3,
                        "coord": "-225591.5,398177.1875",
                        "coord_z": 0
                    }
                ]
            }
            state.cloudRender.SuperAPI('StartShowCoord', jsondata)
        }
        // 显示轨迹
        let addTrack = () => {
            let jsondata2 = {
                "id": "Path_id", //路径id
                "coord_type": 1, //路径中坐标类型(0:经纬度坐标, 1:cad坐标)
                "cad_mapkey": "default", //CAD基准点Key值, 项目中约定
                "coord_z_type": 0, //坐标高度类型(0:相对3D世界表面; 1:相对3D世界地面; 2:相对3D世界海拔; 注:cad坐标无效)
                "type": "arrow", //路径样式类型(类型:none, solid, arrow, arrow_dot, dashed_dot, arrow_dashed, flash, scan_line)
                "color": "00FA9A", //路径颜色(HEX颜色值, "color": "" 透明路径)
                "pass_color": "ff0000", //覆盖物移动经过路径颜色(HEX颜色值)
                "width": 35, //路径宽度(单位:米)
                "points": state.points.length ? state.points : [ //路径点数据(必须有顺序)
                    {
                        "coord": "-1748443.875,3686.859131", //路径点的坐标
                        "coord_z": 20 //路径点高度(单位:米)
                    },
                    {
                        "coord": "-699818.75,-525514.4375",
                        "coord_z": 20
                    },
                    {
                        "coord": "-225591.5,398177.1875",
                        "coord_z": 20
                    }
                ]
            }
            state.cloudRender.SuperAPI('AddPath', jsondata2)
            setTimeout(() => state.cloudRender.SuperAPI('FocusAllCovering', { "covering_type": "path" }), 5e2);
        }
        // 删除轨迹
        let deleTrack = () => {
            state.cloudRender.SuperAPI('RemoveAllCovering', { "covering_type": "path" });
        }
        let addVidoe = () => {
            let jsondata = {
                "id": "customPOI_ID",
                "window": {
                    "url": "http://superapi.51hitech.com/doc-static/images/static/video.html?time=1637826087074",
                    "size": "520,410",
                    "offset": "100,180"
                }
            }
            state.cloudRender.SuperAPI('UpdateCustomPOIWindow', jsondata)
        }
        // 自定义点位
        let addLocationCustom = () => {
            let jsondata = {
                "id": "customPOI_ID", //POI id
                "coord_type": 1, //坐标类型(0:经纬度坐标, 1:cad坐标)
                "cad_mapkey": "default", //CAD基准点的Key值, 项目中约定
                "coord": "182078.5625,752508.5", //POI点的坐标
                "coord_z": 0, //高度(单位:米)
                "coord_z_type": 0, //坐标高度类型(0:相对3D世界表面; 1:相对3D世界地面; 2:相对3D世界海拔; 注:cad坐标无效)
                "always_show_label": true, //是否永远显示label, true:显示label(默认), false:不显示label
                "show_label_range": "0,6000", //此POI点显示label的摄像机距离范围(单位米, 范围最小距离, 范围最大距离; 在此范围内显示, 超出范围隐藏label;注意:always_show_label 属性优先于此属性)
                "sort_order": false, //是否开启遮挡排序(根据POI真实3D位置开启遮挡排序,注:只与其他开启排序的POI之间进行排序, 开启此排序会消耗性能(最多60个POI同时开启排序)
                "state": "state_1", //与marker之中images中的define_state对应
                "marker": {
                    "size": "100,228", //Marker大小(宽, 高 单位:像素)
                    "images": [
                        {
                            "define_state": "state_1",
                            "normal_url": "http://superapi.51hitech.com/doc-static/images/static/markerNormal.png", //默认时图片url地址
                            "activate_url": "http://superapi.51hitech.com/doc-static/images/static/markerActive.png" //高亮时图片url地址
                        },
                        {
                            "define_state": "state_2",
                            "normal_url": "http://superapi.51hitech.com/doc-static/images/static/markerNormal2.png",
                            "activate_url": "http://superapi.51hitech.com/doc-static/images/static/markerActive2.png"
                        }
                    ]
                },
                "label": {
                    "bg_image_url": "http://superapi.51hitech.com/doc-static/images/static/LabelBg.png",
                    "bg_size": "200,80", //label大小(宽, 高 单位:像素)
                    "bg_offset": "50,200", //整个label左上角相对于marker的中心点(coord坐标中心)的偏移(x,y 单位:像素), 注:x为正向右, y为正向上
                    "content": [
                        {
                            "text": ["文本内容A", "ff0000ff", "30"], //[文本内容, HEXA颜色, 文本大小]
                            "text_offset": "10,5" //文本框左上角相对于label中bg_offset左上角的margin偏移(x,y 单位:像素), 注:x为正向右, y为正向下
                        },
                        {
                            "text": ["文本内容B", "00ff00ff", "20"],
                            "text_offset": "10,45"
                        }
                    ]
                },
                "window": {
                    "url": "http://superapi.51hitech.com/doc-static/images/static/video.html?time=1637826087074",
                    "size": "520,410",
                    "offset": "100,180"
                }
            };
            state.cloudRender.SuperAPI('RemoveAllCovering', { "covering_type": "poi" });
            state.cloudRender.SuperAPI('AddCustomPOI', jsondata);
            setTimeout(() => state.cloudRender.SuperAPI('FocusCovering', { 'id': 'customPOI_ID', 'covering_type': 'poi', 'distance': 2000 }), 5e2);
        }
        let getModelMsg = () => {
            alert(1)
            let jsondata = {
                "state": true,         //true:开启获取EID; false:关闭获取EID
                "highlight": true      //true:点击元素高亮; false:点击元素不高亮
            }
            state.cloudRender.SuperAPI("StartGetEID", jsondata, (e) => {
                console.log(e);
            })
        }

        onBeforeUnmount(() => {
            state.cloudRender.SuperAPI("StopRenderCloud") //关闭云渲染, 释放资源 (此处是关键。单页应用释放资源请注意)
        })
        return { state, openRanging, closeRanging, openLocation, closeLocation, addLocation, addTrack, deleTrack, addVidoe, addLocationCustom, getModelMsg }
    },
    watch: {},
    components: {},
};
</script>

<style lang="scss">
.home {
    height: 100%;
    width: 100%;
    .tool-box {
        position: absolute;
        top: 100px;
        right: 100px;
    }
}
</style>
