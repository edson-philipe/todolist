// Selecionando os elementos relevantes
const inputStatusTask = document.querySelectorAll(".inputStatusTask");
const checkBoxStatus = document.querySelectorAll(".checkBoxStatus");
const statusTask = document.querySelector("#statusTask");
const titleTask = document.querySelectorAll(".titleTask");
const descriptionTask = document.querySelector(".descriptionTask");

for (let element = 0; element < inputStatusTask.length; element++) {
    if (inputStatusTask[element].value == 1) {
        titleTask[element].style.textDecoration = "line-through";
        titleTask[element].style.color = "#a7a7a7";
        checkBoxStatus[element].innerHTML = "select_check_box";
    }
}

if (statusTask) {
    if(descriptionTask.innerText != ""){
        titleTask[0].style.marginBottom = "0.5rem"; 

    }
    if (inputStatusTask[0].value == 1 || inputStatusTask[0].value == "true") {
        statusTask.innerText = "Tarefa concluída!";
        statusTask.style.color = "#14A44D";
        titleTask[0].style.textDecoration = "line-through";
        titleTask[0].style.color = "#a7a7a7";
        descriptionTask.style.textDecoration = "line-through";
        descriptionTask.style.color = "#a7a7a7";
    } else {
        statusTask.innerText = "Tarefa pendente!";
        statusTask.style.color = "#DC4C64";
    }
}


//tituloTarefa[i].style.textDecoration = "line-through";
//       tituloTarefa[i].style.color = "#a7a7a7";