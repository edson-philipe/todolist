let inputTarefaConcluida = document.querySelectorAll(".inputTarefaConcluida");
let tituloTarefa = document.querySelectorAll(".tituloTarefa");
let descricaoTarefa = document.querySelectorAll(".descricaoTarefa");
let statusTarefa = document.querySelectorAll(".statusTarefa");


for (let i = 0; i < tituloTarefa.length; i++) {
    console.log(i)
    console.log(tituloTarefa[i].innerText)
    console.log(inputTarefaConcluida[i].value)
    if (inputTarefaConcluida[i].value == "true" || inputTarefaConcluida[i].value == true) {
        tituloTarefa[i].style.textDecoration = "line-through";
        tituloTarefa[i].style.color = "#a7a7a7";
        if (descricaoTarefa.length > 0) {
            descricaoTarefa[i].style.textDecoration = "line-through";
            descricaoTarefa[i].style.color = "#a7a7a7";
        }
        statusTarefa[i].innerText = "Tarefa concluída";
        statusTarefa[i].style.color = "#14A44D";
    }
}
