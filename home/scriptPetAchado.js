document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Documento carregado e pronto.');
    const form = document.getElementById('PetsAchadosForm');
    const fotoPet = document.getElementById('fotoPet');
    let fotoPet64 = null;
    
    fotoPet.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64String = e.target.result;
                
                fotoPet64 = base64String;
                
            };
            reader.readAsDataURL(file);
        }
    });
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const id = Date.now();
        const nomePet = document.getElementById('nomePet').value;
        const especiePet = document.getElementById('especiePet').value;
        const racaPet = document.getElementById('racaPet').value;
        const portePet = document.getElementById('portePet').value;
        const corPet = document.getElementById('corPet').value;
        const generoPet = document.getElementById('generoPet').value;
        const pelagemPet = document.getElementById('pelagemPet').value;
        const comentarioPet = document.getElementById('comentarioPet').value;

        const petAchado = { id, nomePet, especiePet, racaPet, portePet, corPet, generoPet, pelagemPet, fotoPet, fotoPet64, comentarioPet};

        let petsAchados = JSON.parse(localStorage.getItem('petsAchados')) || [];
        petsAchados.push(petAchado);
        localStorage.setItem('petsAchados', JSON.stringify(petsAchados));
        alert('Pet cadastrado com sucesso!');
        form.reset();
    });
});

function voltar() {
    window.location.href = 'home.html'
}

function mostrarTodos() {
    const encontreiFeed = document.getElementById('encontreiFeed')

    encontreiFeed.innerHTML = ''
    const petsAchados = JSON.parse(localStorage.getItem('petsAchados')) || [];

    for (i = 0; i < petsAchados.length; i++) {
        encontreiFeed.innerHTML +=
            '<div class="card">' +
            '<h2>' + petsAchados[i].nomePet + '</h2>' +
            '<p>' + petsAchados[i].especiePet + '</p>' +
            '<p>' + petsAchados[i].racaPet + '</p>' +
            '<p>' + petsAchados[i].comentarioPet + '</p>' +
            `<button onclick="mostrarMais(${petsAchados[i].id})">Mostrar detalhes</button>`+
            `<img src="${petsAchados[i].fotoPet64}" alt="">`
        '<div>'
    }
}

mostrarTodos()

function mostrarMais() {
    // Obtém o modal
    let modal = document.getElementById("myModal");
    // Obtém o elemento <span> que fecha o modal
    let span = document.getElementsByClassName("close")[0];
    // Quando o usuário clicar no <span> (x), fecha o modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    // Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    let id = JSON.parse(localStorage.getItem(Date.now));
    if(id){
        // alert('Nenhum usuário cadastrado!')
        document.getElementById('nomeAnimal').innerHTML = petsAchados.nomePet;
        document.getElementById('especieAnimal').innerHTML = petsAchados.especiePet;
        document.getElementById('racaAnimal').innerHTML = petsAchados.racaPet;
        document.getElementById('corAnimal').innerHTML = petsAchados.corPet;
        document.getElementById('porteAnimal').innerHTML = petsAchados.portePet;
        document.getElementById('pelagemAnimal').innerHTML = petsAchados.pelagemPet;
        // document.getElementById('enderecoLogado').innerHTML = petsAchados.endereco;
    }
    modal.style.display = "block";
}