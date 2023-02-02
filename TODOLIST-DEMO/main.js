//유저가 값을 입력한다
// +버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. chech 버튼을 클릭하는 순간 true fasle
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로


//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝남댑은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList = []

addButton.addEventListener("click",addTask)

function addTask(){
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false,
    };
    taskList.push(task)
    console.log(taskList)
    render();
}

function render(){
    let resultHTML = '';
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
        </div>`
        }else{
            resultHTML+=`<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
        </div>`;
        }

    }

    document.getElementById("task-board").innerHTML = resultHTML
    
}

function toggleComplete(id){
    console.log(id)
    for(let i = 0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList);
}

function deleteTask(id){
    console.log("삭제하자",id)
    for(let i = 0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(taskList.indexOf(taskList[i]),1);
            
        }
    }
    render()
    console.log(taskList);
}
function randomIDGenerate(){
    return '-'+Math.random().toString(36).substr(2, 9);
}