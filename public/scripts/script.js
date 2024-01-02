function mensagemErro(texto) {
    Toastify({
        text: texto,
        duration: 10000,
        close: false,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#fff3cd",
            color: "#856404",
            boxShadow: "none",
        }
    }).showToast();
}

window.addEventListener('DOMContentLoaded', function () {
    const urlInput = document.getElementById('urlInput');
    if (urlInput) {
        if ((window.location.href).split('?')[1]) {
            urlInput.value = window.location.pathname + "?" + ((window.location.href).split('?')[1]);
        } else {
            urlInput.value = window.location.pathname;
        }
        const modoAtual = document.querySelector("#modoAtual");
        if (modoAtual.value == "dark") {
            document.documentElement.setAttribute(
                'data-bs-theme',
                'dark');
            document.querySelector(".navbar").style
                .backgroundColor = "#272B2F";
            document.querySelector(".navbar").style
                .borderBottom =
                "1px solid #424549";
        } else {
            document.documentElement.setAttribute(
                'data-bs-theme',
                'light');
            document.querySelector(".navbar").classList.add(
                "bg-success");
            document.body.style.backgroundColor = "#e6ecf0";
        }
    }

    const respostaSistema = document.querySelector(
        "#respostaSistema");
    if (respostaSistema.value) {
        mensagemErro(respostaSistema.value);
    }

    const inputsDate = document.querySelectorAll(
        'input[type="date"]');
    function definirDataAtual() {
        const dataAtual = new Date().toISOString().split('T')[
            0];
        inputsDate.forEach(input => {
            if (!input.value) {
                input.value =
                    dataAtual;
            }
        });
    }
    if (inputsDate.length > 0) {
        definirDataAtual();
    }
});

function verificarCampos(event, form) {
    event.preventDefault();
    if (form.querySelectorAll('input, textarea')) {
        var camposVazios = [];
        form.querySelectorAll('input, textarea').forEach(function (campo) {
            if (!campo.value.trim()) {
                camposVazios.push(campo);
            }
        });
        if (camposVazios.length > 0) {
            mensagemErro("Por favor, preencha todos os campos.");
        } else {
            form.submit();
        }
    }
}

// Função para formatar o valor como uma string monetária com o símbolo do euro (€)
function formatarValor(valor) {
    return `€ ${(parseFloat(valor).toFixed(2)).replace('.', ',')}`;
}

// Função para formatar a data no formato dd/mm/aaaa
function formatarData(data) {
    const partesData = data.split('-'); // Divide a string da data em partes (ano, mês, dia)
    return `${partesData[2].trim()}/${partesData[1].trim()}/${partesData[0].trim()}`; // Formata a data no formato dd/mm/aaaa
}

function formatarHora(hora) {
    return (hora.trim()).slice(0, -3);
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.precos').forEach((elemento) => {
        elemento.textContent = formatarValor(elemento.textContent);
    });

    document.querySelectorAll('.datas').forEach((elemento) => {
        elemento.textContent = formatarData(elemento.textContent);
    });

    document.querySelectorAll('.horas').forEach((elemento) => {
        elemento.textContent = formatarHora(
            elemento.textContent);
    });

    if (document.getElementById('download-to-pdf')) {
        document.getElementById('download-to-pdf').addEventListener('click', () => {
            window.print();
        });
    }
});
function cofirmEndSession(event, form) {
    event.preventDefault();
    if (window.confirm("Deseja realmente terminar a sessão?")) {
        form.submit();
    }
}
function confirmDelete(event, form) {
    event.preventDefault();
    if (window.confirm("Deseja realmente excluir?")) {
        form.submit();
    }
}