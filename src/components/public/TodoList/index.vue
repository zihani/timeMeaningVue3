
<script setup lang="ts">
import { defineComponent ,ref ,onMounted,watch,nextTick  } from 'vue'
import type { Ref } from "vue";
import InlineMessage from 'primevue/inlinemessage';
import Tooltip from 'primevue/tooltip';
import { useTodoListStore } from "@/stores/useTodoListStore"
import { analysisTxt } from './tools/analysis'
import 'primeicons/primeicons.css'
import anime from 'animejs'
import Button from 'primevue/button';
// import { useToast } from "primevue/usetoast";
// const toast = useToast();
const todoListStore = useTodoListStore(); //这是个函数
const removeshow = ref(false);
const todotext:Ref<string> = ref('');
const txtTodolist:Ref<Array<Object>> = ref([]);

const checkboxList = ref([])
const messageShow:Ref<boolean> = ref(false)
const messageText:Ref<string> = ref('仅允许上传.txt文件')
const show = () => {
    // useToast()
    // toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};
// const showToast = ref(false);  
// const message = ref('');  
// const timeout = ref(3000);  
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
   const todoexport = ()=>{
        todoListStore.exportStoragetext("todoList")
   }
   const todoupload = ()=>{
     analysisTxt()
    // todoListStore.uploadTxt()
   }
   nextTick(()=>{
    debugger
    todoListStore.todoList
   })
   
   
</script>
<template>
    <!-- <button @click="show">111</button> -->
    <!-- <Toast /> -->
    <!-- <Toast  :message="message" :timeout="timeout" :show-icon="showToast"></Toast> -->
    <div  class="setup" v-if="todoListStore.todoshow">
        <div class="frame">
            <InlineMessage style="width: 100%;" v-if="todoListStore.InlineMessage.messageShow" :severity="todoListStore.InlineMessage.severity"> {{todoListStore.InlineMessage.messageText}} </InlineMessage>
            <div style="width: 440px;height: 40px;border-bottom: 1px solid;padding-top: 8px;float: left;"> 
               <span  style="color:#ffff;"><i @click='todoedit' class="pi pi-arrow-right-arrow-left"></i> </span>
               <input ref="todoinput" style=" width: 430px;
               width: 260px;
               background-color:rgb(6, 6, 6);
               color:#ffff;
               border:1px solid rgb(6, 6, 6);
               outline:none;
               margin-left: 10px;
               " type="text" placeholder="title" v-model="todoListStore.todotitle" @keyup.enter="addtodo">
               <span  style="color:#ffff; padding-left: 20px;"> <i v-tooltip.left="'导出txt'" @click='todoexport' class="pi pi-download"></i> </span>
               <span  style="color:#ffff; padding-left: 20px;"> <i v-tooltip.left="'上传.txt 文件模板按照导出的格式。'" @click='todoupload' class="pi pi-upload"></i> </span>
               <!-- <input type="file" id="fileUpload" accept=".txt" @change="todoUploadtext">  -->
               <!-- <span @click='todoUploadtext' style="color:#ffff;"> upload </span> -->
            </div>
            <div class="table">
                <div style="padding:2px;" v-for="item in todoListStore.todoList" :key="item.id">
                    <div v-if='!removeshow' class="checkboxAll">
                        <input :class="'checkbox'+item.id" style="float: right; margin-top: 5px; margin-right: 10px;" type="checkbox" :value="item.id" v-model="item.status" @change="ontodoChange(item)">
                        <!-- <input style="float: right; margin-top: 5px; margin-right: 10px;" type="checkbox" :value="item.id" v-model="checkboxList" @change="ontodoChange(item)" > -->
                    </div>
                    <div v-if='removeshow' style="float: right;color:#ffff;" @click="deltodo(item)"><span style="margin-right: 7px;"><i class="pi pi-trash"></i></span></div>
                    <div style="width: 100%; color:#ffff;">
                        <span v-if="item.status === true"  style="text-decoration: line-through;color:rgb(111, 111, 111);"> {{ item.text }} </span> 
                        <span v-if="item.status === false" > {{ item.text }} </span> 
                    </div>
                </div>
            </div>
            <div style=" width:420px; 
            height: 50px;  
            border-top: 0.1px solid;">
                <input ref="todoinput" style=" width: 430px;
                height: 30px;
                background-color:rgb(6, 6, 6);
                color:#ffff;
                border:1px solid rgb(6, 6, 6);
                outline:none;
                margin-left: 20px;
                " type="text" placeholder="insert Enter" v-model="todotext" @keyup.enter="addtodo">
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
.table{
    width:440px; height: 360px; overflow-x:hidden;
}
.table::-webkit-scrollbar {
    width: 8px;
}
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