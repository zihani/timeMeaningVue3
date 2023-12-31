<script setup lang="ts">
    import { onMounted, ref,defineComponent  } from "vue";
    import {useBannerStore ,useBannerSetopStore} from "@/stores/useBannerStore"
    const banner = useBannerStore()
    //   const bannersetop = useBannerSetopStore()
    
    const loading = ref(false)
    const websiteInfo = ref({slogan:"博客"})
    const socials =  ref([])
        // 定义星星数组
    const stars = ref([])
    // 定义星星的最小缩放比例
    const STAR_MIN_SCALE = ref(0.2)
    const width = ref(0)
    const height = ref(0)
    // 定义缩放比例
    const scale = ref(1)
    // 定义速度对象
    const velocity = ref({ x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 })
    // 定义溢出阈值
    const OVERFLOW_THRESHOLD= ref(50)
    // 获取canvas元素
    const canvas = ref(document.querySelector('canvas'))
    // 定义星星的颜色
    const STAR_COLOR = ref('#fff')
    // 定义星星的大小
    const STAR_SIZE = ref(6)
    // 定义星星的数量
    const STAR_COUNT = ref((window.innerWidth + window.innerHeight) / 10)
    // 获取canvas的绘图上下文
    const context = ref(document.querySelector('canvas'))
    // 定义鼠标指针的位置
    const pointerX = ref(0)
    const pointerY = ref(0)
    // 定义触摸输入标志
    const touchInput = ref(false)
    onMounted(()=>{
        initanimation()
        banner.getisHome
    })
    const initanimation = (()=>{
            canvas.value = document.querySelector('canvas')
            context.value = canvas.value.getContext('2d')
            // // 生成星星
            generate();
            // // 调整大小
            resize();
            // // 运行动画
            step();
            // // 当窗口大小改变时，重新调整大小
            window.onresize = resize;
            // // 当鼠标在canvas上移动时，更新鼠标指针位置、
            canvas.value.onmousemove = onMouseMove;
            // // 当触摸屏在canvas上移动时，更新鼠标指针位置
            canvas.value.ontouchmove = onTouchMove;
            // // 当触摸屏离开canvas时，更新鼠标指针位置
            canvas.value.ontouchend = onMouseLeave;
            // // 当鼠标离开文档时，更新鼠标指针位置
            document.onmouseleave = onMouseLeave;
    })
    //生成星星
    const generate = (()=> {
        for (let i = 0; i < STAR_COUNT.value; i++) {
            stars.value.push({
                x: 0,
                y: 0,
                z: STAR_MIN_SCALE.value + Math.random() * (0.5- STAR_MIN_SCALE.value),
            });
        }
    })
    // 将星星放置到随机位置
    const placeStar = ((star:any)=> {
        star.x = Math.random() * width.value;
        star.y = Math.random() * height.value;
    })
    // 调整大小
    const resize=(() =>{
        // 获取设备像素比例
        scale.value = window.devicePixelRatio || 1;
        // // 设置画布的宽度和高度
        width.value = window.innerWidth * scale.value;
        height.value = window.innerHeight * scale.value;
        canvas.value.width = width.value;
        canvas.value.height = height.value;
        // // 将所有星星重新放置到屏幕上
        stars.value.forEach(placeStar);
    })
    // 回收星星并重新放置到新的位置
    const recycleStar=((star:any) =>{
        // 初始化方向为 'z'
        let direction = 'z';
        // 获取速度的绝对值
        let vx = Math.abs(velocity.value.x);
        let vy = Math.abs(velocity.value.y);
        // 如果速度的绝对值大于1，则根据速度的大小随机确定方向
        if (vx > 1 || vy > 1) {
            let axis;
            // 如果水平速度大于垂直速度，则根据水平速度的比例随机确定水平或垂直方向
            if (vx > vy) {
                axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
            } else {
                axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
            }
            // 根据方向确定具体的移动方向
            if (axis === 'h') {
                direction = velocity.value.x > 0 ? 'l' : 'r';
            } else {
                direction = velocity.value.y > 0 ? 't' : 'b';
            }
        }
        // 随机设置星星的缩放比例
        star.z = STAR_MIN_SCALE.value + Math.random() * (1 - STAR_MIN_SCALE.value);
        // 根据方向设置星星的位置
        if (direction === 'z') {
            // 如果方向为 'z'，则将星星放置在屏幕中心
            star.z = 0.1;
            star.x = Math.random() * width.value;
            star.y = Math.random() * height.value;
        } else if (direction === 'l') {
            // 如果方向为 'l'，则将星星放置在屏幕左侧
            star.x = -OVERFLOW_THRESHOLD.value;
            star.y = height.value * Math.random();
        } else if (direction === 'r') {
            // 如果方向为 'r'，则将星星放置在屏幕右侧
            star.x = width.value + OVERFLOW_THRESHOLD.value;
            star.y = height.value * Math.random();
        } else if (direction === 't') {
            // 如果方向为 't'，则将星星放置在屏幕顶部
            star.x = width.value * Math.random();
            star.y = -OVERFLOW_THRESHOLD.value;
        } else if (direction === 'b') {
            // 如果方向为 'b'，则将星星放置在屏幕底部
            star.x = width.value * Math.random();
            star.y = height.value + OVERFLOW_THRESHOLD.value;
        }
    });
    // 动画的每一帧
    const step=(()=> {
        // 清空画布
        context.value.clearRect(0, 0, width.value, height.value);
        // 更新星星的位置和速度
        update();
        // 绘制星星
        render();
        // 请求下一帧动画
        requestAnimationFrame(step);
    })
    // 更新星星的位置和速度
    const update=(()=> {
        // 缓动速度
        velocity.value.tx *= 0.6;
        velocity.value.ty *= 0.6;
        //  更新速度
        velocity.value.x += (velocity.value.tx - velocity.value.x) * 0.8;
        velocity.value.y += (velocity.value.ty - velocity.value.y) * 0.8;
        //  遍历所有星星
        stars.value.forEach((star:any) => {
            // 根据速度和缩放比例更新星星的位置
            star.x += velocity.value.x * star.z;
            star.y += velocity.value.y * star.z;
            // 根据速度和缩放比例更新星星的位置（使星星围绕屏幕中心旋转）
            star.x += (star.x - width.value / 2) * velocity.value.z * star.z;
            star.y += (star.y - height.value / 2) * velocity.value.z * star.z;
            // 更新星星的缩放比例
            star.z += velocity.value.z;
            // 如果星星超出屏幕范围，则重新放置到屏幕上
            if (
                star.x < -OVERFLOW_THRESHOLD.value ||
                star.x > width.value + OVERFLOW_THRESHOLD.value ||
                star.y < -OVERFLOW_THRESHOLD.value ||
                star.y > height.value + OVERFLOW_THRESHOLD.value
            ) {
                recycleStar(star);
            }
        });
    })
    // 绘制星星
    const render=(()=> {
        // 遍历所有星星
        stars.value.forEach((star) => {
            // 设置绘制星星的样式
            context.value.beginPath();
            context.value.lineCap = 'round';
            context.value.lineWidth = STAR_SIZE.value * star.z * scale.value;
            context.value.globalAlpha = 0.5 + 0.5 * Math.random();
            context.value.strokeStyle = STAR_COLOR.value;
            // 绘制星星的路径
            context.value.beginPath();
            context.value.moveTo(star.x, star.y);
            // 计算星星的尾巴坐标
            let tailX = velocity.value.x * 2;
            let tailY = velocity.value.y * 2;
            // 如果尾巴坐标的绝对值小于0.1，则设置为0.5
            if (Math.abs(tailX) < 0.1) tailX = 0.5;
            if (Math.abs(tailY) < 0.1) tailY = 0.5;
            // 绘制星星的尾巴
            context.value.lineTo(star.x + tailX, star.y + tailY);
            context.value.stroke();
        });
    })
    // 移动鼠标指针
    const movePointer=((x:any, y:any)=> {
        // 如果之前有记录鼠标指针的位置，则计算鼠标指针的移动距离，并更新速度
        if (typeof pointerX.value === 'number' && typeof pointerY.value === 'number') {
            let ox = x - pointerX.value;
            let oy = y - pointerY.value;
            velocity.value.tx = velocity.value.tx + (ox / 8) * scale.value * (touchInput.value ? 1 : -1);
            velocity.value.ty = velocity.value.ty + (oy / 8) * scale.value * (touchInput.value ? 1 : -1);
        }
        // 更新鼠标指针的位置
        pointerX.value = x;
        pointerY.value = y;
    })
    // 当鼠标在canvas上移动时的事件处理函数
    const onMouseMove=((event:any)=> {
        touchInput.value = false;
        movePointer(event.clientX, event.clientY);
    })
    // 当触摸屏在canvas上移动时的事件处理函数
    const onTouchMove=((event:any)=> {
        touchInput.value = true;
        movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
        event.preventDefault();
    })
    // 当鼠标离开canvas时的事件处理函数
    const onMouseLeave=(()=> {
        pointerX.value = null;
        pointerY.value = null;
    })
</script>
<template>
    <div id="banner" :class="{'home-banner':banner.isHome}">
        <div  class="banner-img">
            <template v-if="banner.isHome">
                <div class="focusinfo">
                    <!-- <div class="header-tou">
                        <router-link to="/"></router-link> -->
                        <!-- <img :src="websiteInfo.avatar"> -->
                    <!-- </div> -->
                    <div class="top-social">
                       <span style="color:#ffffff;">社交信息</span> 
                       <!-- <button @click="ann">按钮</button> -->

                       <!-- <div v-for="item in socials" :key="item.id" :title="item.title">
                            <a :href="item.href" target="_blank" :style="{'color':item.color}">
                                <i class="iconfont" :class="item.icon"></i>
                            </a>
                        </div> -->
                    </div>
                </div>
                <!--左右倾斜-->
                <div class="slant-left"></div>
                <div class="slant-right"></div>
            </template>
            <canvas></canvas>
        </div>
    </div>
</template>
<style scoped lang="less">
#banner {
    position: relative;
    width: 100%;
    height: 100vh;
    .banner-img{
        transition: all 0.2s linear;
        overflow: hidden;
        width: 100%;
        height: 100%;
        /* 背景渐变 */
        background-image: linear-gradient(-225deg, rgb(207, 202, 211) 40%,
        #2d2633 80%,  #35343b 100%);
        canvas {
            width: 100%;
            height: 100%;
        }
        &:hover {
            transform: scale(1.1, 1.1);
            filter: contrast(130%);
        }
    }
    &.home-banner {
        height: 400px;
        .banner-img{
            z-index: -1;
            transition: all 0.2s linear;
            width: 100%;
            height: 100%;
            /* 背景渐变 */
            background-image: linear-gradient(-225deg, rgb(207, 202, 211) 40%,
        #2d2633 80%,  #35343b 100%);
            &:hover {
                transform: unset;
                filter: unset;
            }
        }
        .slant-left {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            border-bottom: 100px solid #FFF;
            border-right: 800px solid transparent;
            left: 0;
            bottom: 0;
        }
        .slant-right {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            border-bottom: 100px solid #FFF;
            border-left: 800px solid transparent;
            right: 0;
            bottom: 0;
        }
    }
}
.focusinfo {
    position: relative;
    max-width: 800px;
    padding: 0 10px;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    text-align: center;
    img {
        width: 80px;
        height: auto;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.3);
    }
    .top-social {
        height: 50px;
        margin-left: 10px;
    }
}
@media (max-width: 960px){
    #banner {height: 400px;}
}
@media (max-width: 800px){
    #banner {display: none;}
} 
@media (max-wodth: 800px) {
    
}
</style>
