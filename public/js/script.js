let inputTarefaConcluida = document.querySelectorAll(".inputTarefaConcluida");
for (let i = 0; i < inputTarefaConcluida.length; i++) {
    if (inputTarefaConcluida[i].value == 1) {
        inputTarefaConcluida[i].checked = true;
    } else {
        inputTarefaConcluida[i].checked = false;
    }
}
