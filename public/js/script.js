// Selecionando os elementos relevantes
const inputTarefaConcluida = document.querySelectorAll(".inputTarefaConcluida");
const tituloTarefa = document.querySelectorAll(".tituloTarefa");
const descricaoTarefa = document.querySelectorAll(".descricaoTarefa");
const statusTarefa = document.querySelectorAll(".statusTarefa");
const radioSimInsercaoTarefa = document.querySelector("#radioSimInsercaoTarefa");
const checkBoxTask = document.querySelectorAll(".material-symbols-outlined");

// Iterando sobre os elementos de título da tarefa
for (let i = 0; i < tituloTarefa.length; i++) {
    // Verificando se a tarefa está marcada como concluída
    if (inputTarefaConcluida[i].value == "true" || inputTarefaConcluida[i].value == true) {
        // Aplicando estilo de texto riscado e cor cinza
        tituloTarefa[i].style.textDecoration = "line-through";
        tituloTarefa[i].style.color = "#a7a7a7";
        
        // Verificando se há descrição da tarefa
        if (descricaoTarefa.length > 0) {
            // Aplicando estilo de texto riscado e cor cinza
            descricaoTarefa[i].style.textDecoration = "line-through";
            descricaoTarefa[i].style.color = "#a7a7a7";
            
            // Atualizando o status da tarefa e a cor do texto
            statusTarefa[i].innerText = "Tarefa concluída";
            statusTarefa[i].style.color = "#14A44D";
        }
        
        // Verificando se há checkbox e alterando seu ícone
        if (checkBoxTask[i]) {
            checkBoxTask[i].innerHTML = "select_check_box";
        }
    }
}

// Verificando se a primeira tarefa está concluída e marcando o radio button correspondente
if (inputTarefaConcluida[0] && radioSimInsercaoTarefa) {
    if (inputTarefaConcluida[0].value == "true" || inputTarefaConcluida[0].value == true) {
        radioSimInsercaoTarefa.checked = true;
    }
}
