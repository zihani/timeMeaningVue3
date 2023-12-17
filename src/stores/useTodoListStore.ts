import { defineStore } from "pinia";
import { reactive, ref ,computed} from "vue";
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
    const todoList: Ref<Array<object>> = ref([])
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
    //写入本地仓库
    function setStorageList(key:string,todotext:Ref<string>){
      if(key === 'todoList'){
        debugger
        todotext
        let id:Number = 1
        if(todoList.value.length > 0){
            id = todoList.value[todoList.value.length - 1].id + 1
        }
        todoList.value.push({id:id,text:todotext.value,status:1})
        console.log(todoList._rawValue)
      }
      setStorage(key,todoList._rawValue)
    };
    function setUpdateStorageListState(key:string,id:Number){
      if(key === 'todoList'){
        for (const row of todoList.value) {
          debugger
            if(row.id === id){
                row.status = row.status == 0?1:0
            }
        }
        debugger
        todoList.value
      }
      setStorage(key,todoList._rawValue)
    };
    //通过id 来remove item
    function removeStorageitem(key:string,id:any){
      if(key === 'todoList'){
        todoList.value = todoList.value.filter(
          (row:any) => row.id != id);
      }
      console.log(todoList._rawValue)
      setStorage(key,todoList._rawValue)
    };
    //remove all
    function removeAllStorage(key:string){
      if(key === 'todoList'){
        setStorage(key,[])
        todoList.value = []
      }
    };
    return {todoshow,todoList,updatetodoShow,getStorageList,setStorageList,removeStorageitem,removeAllStorage,setUpdateStorageListState}
});
