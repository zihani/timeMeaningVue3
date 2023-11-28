<template>
    <div>
        <div  class="setup" v-if="$store.getters.todoshow">
            <div class="frame">
                <div style="width: 440px;height: 40px;border-bottom: 1px solid;padding-top: 8px;float: left;padding-right: 360px;"> 
                   <span @click='todoedit' style="color:#ffff;"> edit </span>
                </div>
                <div style="width:440px; height: 360px; overflow-x:hidden;">
                    <div style="padding:2px;" v-for="item in todolist" :key="item.id">
                        <input v-if='!removeshow' style="float: right; margin-top: 5px; margin-right: 10px;" type="checkbox" :value="item.id" v-model="checkboxList" @change="ontodoChange(item)">
                        <div v-if='removeshow' style="float: right;color:#ffff;" @click="deltodo(item)"><span>remove</span></div>
                        <div style="width: 100%; border-bottom: 1px solid; color:#ffff;">
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
                         removeALL
                    </div>
                </div>
            </div>
            <div class="btn-todo"  @click="todoshow">
                 <strong style="color:#ffff;"> To Do </strong>
            </div>
        </div>
        <div v-show="tooltiptextshow" class="tooltiptext">
            Ctrl + Alt + T
       </div>
       <div class="btn-todo" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="todoshow">
            <strong>  To Do </strong>
       </div>
    </div>
</template>
<script>
import { setStorage,getStorage } from "@/utils/localforage"
import anime from 'animejs'
export default {
        name: "todo",
        components: {},
        data() {
            return{
                removeshow:false,
                imgPath: require("../../assets/img/setup.svg"),
                show:false,
                todolist:[], //status 0 删除 1 正常
                todotext:'',
                checkboxList:[],
                tooltiptextshow:false
            }
        },
        computed:{
            toshow(){
                return this.$store.getters.todoshow
            }
        },
        watch:{
            toshow:{
              handler(nval,oval){
                if(nval){
                    this.$nextTick(()=>{
                        this.$refs.todoinput.focus();
                   })
                }
              },
              deep:true,
              immediate:true
            }
        },
                // this.$refs.todoinput.focus();
        methods:{
            handleMouseLeave(){
              this.tooltiptextshow = false
              anime({
                targets:'.tooltiptext',
                translateX:0,
                delay: anime.stagger(100)
              })
            },
            handleMouseEnter(){
              this.tooltiptextshow = true
              anime({
                targets:'.tooltiptext',
                translateX:-20,
                delay: anime.stagger(100)
              })
            },
            removeAll(){
               this.todolist = []
               setStorage("todoList",this.todolist)
            },
            todoedit(){
                this.removeshow = !this.removeshow
            },
            inittodolist(){
                getStorage("todoList").then(res =>{
                    this.todolist = res
                    this.checkboxList = res.filter(
                        (row) => row.status === 0
                    ).map(item =>{
                        return item.id;
                    });
                })
            },
            addtodo(){
                if(!this.todotext){
                    return
                }
                let id = 1
                this.todolist = this.todolist ?? []
                if(this.todolist.length > 0){
                    id = this.todolist[this.todolist.length - 1].id + 1
                }
                this.todolist.push({id:id,text:this.todotext,status:1})
                setStorage("todoList",this.todolist)
                this.todotext = ""
            },
            deltodo(item){
                this.todolist = this.todolist.filter(
                (row) => row.id != item.id
                );
                setStorage("todoList",this.todolist)
            },
            ontodoChange(item){
                for (const row of this.todolist) {
                    if(row.id === item.id){
                        item.status = item.status == 0?1:0
                    }
                }
                setStorage("todoList",this.todolist)
            },
            todoshow(){
              
                this.$store.dispatch('updateToDoShow')
            }
        },
        mounted(){
            this.inittodolist();
        }
           
    }
</script>
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