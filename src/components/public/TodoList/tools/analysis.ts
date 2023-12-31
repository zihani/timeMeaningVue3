import { computed } from 'vue'
import { useTodoListStore } from "@/stores/useTodoListStore"
export function analysisTxt()  {
        // // loding 
        // debugger
        // const todoListStore = useTodoListStore() 
        // debugger
        // var input = document.createElement('input');  
        // input.type = 'file';  
        // input.name = 'myFile';  
        // input.accept = '.txt'; 
        // input.addEventListener('change', function(event) {  
        //     var file = event.target.files[0];  
        //     const reader = new FileReader();  
        //     if(file.type === "text/plain"){
        //         reader.onload = function(e) {
        //             let listtable = []
        //             const text = e.target.result;  
        //             let lines = text.split(/\r\n|\r|\n/);  
        //             if(lines.length > 0){
        //                 for (const item of lines) {
        //                     let _item =  item.split('.')
        //                     if( _item && _item.length === 2){
        //                         _item[0] //序号id
        //                         _item[1] //text
        //                         listtable.push({id:Number(_item[0]),text:_item[1],status:1 })
        //                     }else{
        //                         console.log("格式不正确无法导入")
        //                     }
        //                 }
        //             }
        //             todoListStore.importTodoList('todoList',listtable)
        //         };  
        //         reader.readAsText(file);  
        //     }else{
        //         // messageShow.value = true
        //       // 仅允许上传.txt文件
        //     }
        // });  
        // input.click();  
}
