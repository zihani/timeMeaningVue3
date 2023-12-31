import { defineStore } from "pinia";
import { reactive, ref ,computed,watchEffect } from "vue";
import type { Ref } from "vue";
import localforage from 'localforage'
//创建一个 indexedDB
const myIndexedDB = localforage.createInstance({
  name: 'myIndexedDB',
})
async function getStorage(key:string) {
  try {
    const value = await myIndexedDB.getItem(key);
    return value
  } catch (error) {
    console.log(error)
  }
}
function setStorage(key:string,value:Array<any>) {
  myIndexedDB.setItem(key, value)
}

// 定义用户状态仓库
export const useTodoListStore = defineStore(
  'todoList', () => {
    const todoshow = ref(false)
    const todotitle: Ref<string> = ref("待办")
    const todoList: Ref<Array<object>> = ref([])
    debugger
    const capacity: Ref<Number> = ref(50)
    const InlineMessage: Ref<Object> =ref({
      messageShow: false,
      messageText:"仅允许上传.txt文件",
      severity:"warn",
      select:'' //err success
    })
    function updatetodoShow (){
      todoshow.value = !todoshow.value
    }
    //读取本地仓库
    async function getStorageList(name:string){
      return await getStorage(name).then((res)=>{
        if(res){
          todoList.value = res
          return res
        }
      })
    };
    //写入一条text本地仓库
    function setStorageList(key:string,todotext:Ref<string>){
      if(key === 'todoList'){
        debugger
        todotext
        let id:Number = 1
        if(todoList.value.length > 0){
            id = todoList.value[todoList.value.length - 1].id + 1
        }
        todoList.value.push({id:id,text:todotext.value,status:false})
        console.log(todoList._rawValue)
      }
      setStorage(key,todoList._rawValue)
    };
      //更新Storage
    function newStorageListState(key:string){
      if(key === 'todoList'){
        setStorage(key,todoList._rawValue)
      }
    };
    function setUpdateStorageListState(key:string,id:Number){
      if(key === 'todoList'){
        // let checkbox = document.getElementsByClassName(".checkbox")
        for (const row of todoList.value) {
            if(row.id === id){
                row.status = !row.status
            }
        }
      }
      todoList.value = todoList._rawValue
      setStorage(key,todoList._rawValue)
    };
    //通过id 来remove item
    function removeStorageitem(key:string,id:any){
      if(key === 'todoList'){
        todoList.value = todoList.value.filter((row:any) => row.id != id);
        //排序id
        todoList.value = idsort("todoList",todoList._rawValue)
      
      }
      setStorage(key,todoList._rawValue)
    };
    //remove all
    function removeAllStorage(key:string){
      if(key === 'todoList'){
        setStorage(key,[])
        todoList.value = []
      }
    };
    function exportStoragetext(key:string){
      if(key === "todoList"){
        let test:string = `todoList: ${todotitle.value}`
        if(todoList._rawValue.length > 0){
            for (const item of todoList._rawValue) {
              if(item.status === true){
                test +=  "\n"+item.id+'. '+ item.text + '   √'
              }else{
                test +=  "\n"+item.id+'. '+ item.text
              }
            }
        }
        download('todoList.txt',test)
      }
    };
    //创建 a 标签出触发事件下载为文本
    function download(filename:string, text:string) {  
      var element = document.createElement('a');  
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));  
      element.setAttribute('download', filename);  
      element.style.display = 'none';  
      document.body.appendChild(element);  
      element.click();  
      document.body.removeChild(element);  
    }
    //导入list
    function importTodoList (key:string,todolist:Ref<Array<object>>){
      const mergelength =  todoList._rawValue.length  + todolist.length
      if(mergelength > capacity.value){
         alert("todoList 长度超出")
        return
      }
      if(key === 'todoList'){
        InlineMessage.value.messageShow = true
        InlineMessage.value.messageText = "导入文档是否覆盖"
        InlineMessage.value.severity = "success"
        setTimeout(function(){
          InlineMessage.value.messageShow = false
        },2000)
        // InlineMessage.value.select
        //最大数量
        debugger
        //severity 属性
        //warn 警告
        //success 成功
        //error 错误
        //info 基础
        // 导入是否覆盖
        // 导入是否追加
        // 超过一定条数后给出提示并回滚
      }
      todoList.value = todolist
      setStorage(key,todolist)
    };
    //排序id
    function idsort (key:string,todolist:Ref<Array<object>>){
      let id = 0
      if(key === 'todoList'){
        for (const item of todolist) {
          id ++
          item.id = id
        } 
      }
      return todolist
    };

    return {todoshow,todotitle,todoList,
      updatetodoShow,getStorageList,setStorageList,
      removeStorageitem,removeAllStorage,setUpdateStorageListState,
      exportStoragetext,importTodoList,InlineMessage,newStorageListState}
});
