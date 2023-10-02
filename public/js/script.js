let inputTarefaConcluida = document.querySelectorAll(".inputTarefaConcluida");
let tituloTarefa = document.querySelectorAll(".tituloTarefa");
let descricaoTarefa = document.querySelectorAll(".descricaoTarefa");
let statusTarefa = document.querySelectorAll(".statusTarefa");
let radioSimInsercaoTarefa = document.querySelector("#radioSimInsercaoTarefa");

for (let i = 0; i < tituloTarefa.length; i++) {
    if (inputTarefaConcluida[i].value == "true" || inputTarefaConcluida[i].value == true) {
        tituloTarefa[i].style.textDecoration = "line-through";
        tituloTarefa[i].style.color = "#a7a7a7";
        if (descricaoTarefa.length > 0) {
            descricaoTarefa[i].style.textDecoration = "line-through";
            descricaoTarefa[i].style.color = "#a7a7a7";
            statusTarefa[i].innerText = "Tarefa concluída";
            statusTarefa[i].style.color = "#14A44D";
        }
    }
}

if (inputTarefaConcluida[0].value == "true" || inputTarefaConcluida[0].value == true) {
    radioSimInsercaoTarefa.checked = true;
}