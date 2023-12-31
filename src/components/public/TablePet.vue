<script lang="ts">
   import { defineComponent ,ref ,onMounted,onBeforeUnmount} from 'vue'
   import {useTablePetStore} from "@/stores/useTablePetStore"
   import anime from 'animejs'
   export default defineComponent({  
        setup() {  
            let TablePetStore = useTablePetStore()
            TablePetStore.show
            let show:Boolean = ref(false)
            let dialogueshow:Boolean = ref(false)
            const newdate = ""
            const dialogue = "hell"
            onMounted(() => {
                window.addEventListener('scroll', scroll)
            });  
            onBeforeUnmount(() => {  
                window.removeEventListener('scroll', scroll)
            });  
            const tag = () => {
                dialogueshow.value = !dialogueshow.value
            };  
            const scroll = () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop > 150) {
                    show = true
                    listAnimate(show)
                } else {
                    show = false
                    listAnimate(show)
                };   
            };
           const listAnimate = (bool:Boolean)=> {
                if(bool === true){
                    anime(
                        {
                            targets:'.table-pet',
                            translateY:150,
                            delay: anime.stagger(100)
                        }
                    )
                }
                if(bool === false){
                    anime(
                        {
                            targets:'.table-pet',
                            translateY:0,
                            // rotate: anime.stagger([-260, 360]),
                        }
                    )
                }
                // anime.reverse();
            };
            return { tag ,show,dialogueshow,newdate,dialogue }
        }  
    });  
</script>
<template>
    <div  class="table-pet"  v-show="show" @click.stop="tag">
        <div>
            <i class="nes-mario" style="margin-top: 90px;"></i>
            <div v-if="dialogueshow" style="position: fixed;float: right;" class="nes-balloon from-left">
                <p>{{dialogue}} </p>
            </div>
        </div>
        <!-- <span>{{newdate}}</span>  -->
        <!-- <FlipClock></FlipClock> -->
    </div>
</template>
<style scoped lang="less">
@media (max-width: 800px) {
    .table-pet {
        display: none;
    }
}
.table-pet {
    position: fixed;
    width: 220px;
    height: 300px;
    left: 1rem;
    bottom: 8rem;
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