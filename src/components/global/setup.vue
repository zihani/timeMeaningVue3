<template>
    <div  class="setup" >
         <!-- <div class="bubble"> 气泡</div> -->
        <!-- <div class="bubble" v-if="show" >
            添加定时时间
            <span class="triangle"></span>
        </div> -->
        <div class="frame"  v-if="show">
            定时设置：
            显示桌宠：
            切换桌宠：
            <span class="triangle"></span>
        </div>
        <img class="imgico" style="width: 25px; height: 25px;" :src="imgPath" alt="" @click="setup">
    </div>
</template>
<script>
    export default {
        name: "setup",
        components: {},
        data() {
            return{
                imgPath: require("../../assets/img/setup.svg"),
                show:false
            }
        },
        methods:{
            setup(){
                this.show = !this.show
            }
        }
           
    }
</script>
<style scoped lang="less">

.setup {
    position: fixed;
    width: 520px;
    height: 500px;
    right: -5rem;
    bottom: -3rem;
    border-radius: 25px;
    cursor: pointer;
    transition: .3s;
    text-align: center;
    z-index: 99;
    img{
        width: 60px;
        height: 60px;
    }
    .imgico{
        position: fixed;
        bottom: 0.7rem;
        right: 1.7rem;
    }
    .bubble {
        position: fixed;
        width: 100%;
        height: 100px;
        background-color: rgb(0, 0, 0);
        color: #1f0404;
        opacity:0.9;
    }
    .frame{
        width:440px;
        height: 500px;
        background-color: rgb(6, 6, 6);
        border-radius: 10px;
        position: fixed;
        opacity:0.8;
    }
    .triangle{
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        bottom: -10px;
        right: 30px;
        background-color:rgb(158, 154, 154);
        opacity:0.8;
        transform:rotate(225deg);
        -ms-transform: rotate(225deg);
        -moz-transform: rotate(225deg);
        -webkit-transform: rotate(225deg);
        -o-transform: rotate(225deg);
    }
    .img2{
        display: none;
    }
    &:hover img.img1{
        display: none;
    }
    &:hover img.img2{
        display: unset;
    }
}
@media (max-width: 600px){
    .setup{
        display: none;
    }
}
</style>