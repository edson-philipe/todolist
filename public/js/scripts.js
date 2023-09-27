let titulo_tarefa = document.querySelectorAll(".titulo_tarefa");
let concluido_tarefa = document.querySelectorAll(".concluido_tarefa");
let descricao_tarefa = document.querySelectorAll(".descricao_tarefa");

for (let item = 0; item < titulo_tarefa.length; item++) {
    if (concluido_tarefa[item].value == "true") {
        titulo_tarefa[item].style.textDecoration = "line-through";
        if (descricao_tarefa[item]) {
            descricao_tarefa[item].style.textDecoration = "line-through";
        }
    }
};
