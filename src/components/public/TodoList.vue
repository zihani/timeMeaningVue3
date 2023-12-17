
<script setup lang="ts">
import { defineComponent ,ref ,onMounted,watch } from 'vue'
import type { Ref } from "vue";
import { useTodoListStore } from "@/stores/useTodoListStore"
import anime from 'animejs'
const todoListStore = useTodoListStore() //这是个函数
const removeshow = ref(false)
const todotext:Ref<string> = ref('')
const checkboxList = ref([])
const tooltiptextshow = ref(false)
    onMounted(()=>{
        inittodolist()
    })
   //编辑todolist
   const todoedit = ()=>{
        removeshow.value = ! removeshow.value
   }
   //添加todoList
   const addtodo = ()=>{
        if(!todotext.value){
            return
        }
        todoListStore.setStorageList("todoList",todotext)
        todotext.value = ""
   }
   //移除全部table
   const removeAll = ()=>{
        todoListStore.removeAllStorage("todoList")
   }
   const handleMouseLeave = ()=>{
        tooltiptextshow.value = false
        anime({
            targets:'.tooltiptext',
            translateX:0,
            delay: anime.stagger(100)
        })
   }
   const handleMouseEnter = ()=>{
        tooltiptextshow.value = true
        anime({
            targets:'.tooltiptext',
            translateX:-20,
            delay: anime.stagger(100)
        })
   }
   const inittodolist = ()=>{
        todoListStore.getStorageList("todoList")
   }
   //移除todo item
   const deltodo = (item:any)=>{
        todoListStore.removeStorageitem("todoList",item.id)
   }
   const ontodoChange = (item:any)=>{
        todoListStore.setUpdateStorageListState('todoList',item.id)
   }
   const istodoshow = ()=>{
        todoListStore.updatetodoShow()
   }
</script>
<template>
    <div  class="setup" v-if="todoListStore.todoshow">
        <div class="frame">
            <div style="width: 440px;height: 40px;border-bottom: 1px solid;padding-top: 8px;float: left;padding-right: 360px;"> 
               <span @click='todoedit' style="color:#ffff;"> edit </span>
            </div>
            <div style="width:440px; height: 360px; overflow-x:hidden;">
                <div style="padding:2px;" v-for="item in todoListStore.todoList" :key="item.id">
                    <input v-if='!removeshow' style="float: right; margin-top: 5px; margin-right: 10px;" type="checkbox" :value="item.id" v-model="checkboxList" @change="ontodoChange(item)">
                    <div v-if='removeshow' style="float: right;color:#ffff;" @click="deltodo(item)"><span>remove</span></div>
                    <div style="width: 100%; color:#ffff;">
                        <span v-if="item.status == 0"  style="text-decoration: line-through;color:rgb(111, 111, 111);"> {{ item.text }} </span> 
                        <span v-if="item.status == 1" > {{ item.text }} </span> 
                    </div>
                </div>
            </div>
            <div style="width:420px; height: 50px;  border-top: 0.1px solid;">
                <input ref="todoinput" style=" width: 430px;
                height: 30px;
                background-color:rgb(6, 6, 6);
                color:#ffff;
                border:1px solid rgb(6, 6, 6);
                outline:none;
                margin-left: 20px;
                " type="text" placeholder="insertToDo Enter" v-model="todotext" @keyup.enter="addtodo">
                <div v-if='!removeshow' style="width: 440px; color:#ffff;" @click="addtodo"> 确定 </div>
                <div v-if='removeshow' style="width: 440px; color:#ffff;" @click="removeAll" >
                     removeAll
                </div>
            </div>
        </div>
        <div class="btn-todo"  @click="istodoshow">
             <strong style="color:#ffff;"> To Do </strong>
        </div>
    </div>
    <div v-show="tooltiptextshow" class="tooltiptext">
        Ctrl + Alt + T
   </div>
   <div class="btn-todo" v-shortkey="['ctrl', 'alt' , 't']" @shortkey="istodoshow"  @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="istodoshow">
        <strong>  To Do  </strong>
   </div>
</template>
<style scoped lang="less">
.btn-todo{
    position: fixed; 
    bottom: 0.7rem; 
    right: 1.7rem; 
    width: 55px; 
    height: 25px;
}
.tooltiptext{
    position: fixed; 
    width: 150px;
    bottom:0.7rem; 
    right: 3.7rem; 
    height: 25px;
}
.btn-todo:hover .tooltiptext{
    visibility: visible;
    position: fixed; 
    bottom:3.7rem; 
    right: 1.7rem; 
    width: 55px; 
    height: 25px;
}
.setup {
    position: fixed;
    width: 520px;
    height: 550px;
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