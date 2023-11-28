<template>
    <div  class="menu-left"  @click.stop="tag">
    </div>
</template>
<script>
    import anime from 'animejs'
    export default {
        name: "menu-left",
        components: {
        },
        data() {
            return{
                
            }
        },
        methods: {
            newdatetime(){
              
            },
            listAnimate(bool){
              
            },
            scroll() {
           
            },
            tag() {
              
            }
        },
        mounted () {
        
            this.newdatetime()
            window.addEventListener('scroll', this.scroll)
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.scroll)
        }
    }
</script>
<style scoped lang="less">
.menu-left {
    position: fixed;
    width: 220px;
    height: 300px;
    left: 1rem;
    bottom: 30rem;
    border-radius: 25px;
    cursor: pointer;
    transition: .3s;
    text-align: center;
    z-index: 99;
    img{
        width: 60px;
        height: 60px;
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
    .back-top{
        display: none;
    }
}
</style>