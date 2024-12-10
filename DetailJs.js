
function show_text(event) {

    //const filter = document.getElementById('todo-filter').value;
    const createLi = document.createElement('li');
    const setInput = document.getElementsByClassName('todo-input')[0].value;
    const checkBox = document.createElement("input");
    checkBox.type ="checkbox";
    
        if(event.keyCode == 13){
            createLi.append(checkBox)
            createLi.append(setInput.innerHTML = setInput)
            document
                .getElementById('todo-list')
                .appendChild(createLi)
        }

    }

    function todoFilter(value) {


        // li 개수
        const todoList = document.querySelectorAll('#todo-list li');   
        // filter 확인
        const checkValues = document.getElementById("todo-filter").value;
    
        if (checkValues == "all") {
            
        } 
        else if (checkValues == "todo") {
            for (let i = 0; i < todoList.length; i++) {
                
              
                    


                console.log(todoList[i].value(checked));
              } 


            alert("123123123");
        }
        else {
            alert("1asdasdasdas");
         }
    
    
    
    }







