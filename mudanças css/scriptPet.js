document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Documento carregado e pronto.');
    const form = document.getElementById('cadastrodiv');
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

        const pet = { id, /*cpf,*/ nomePet, especiePet, racaPet, portePet, corPet, generoPet, pelagemPet, fotoPet, fotoPet64, comentarioPet};
        
        let pets = JSON.parse(localStorage.getItem('pets')) || [];
        pets.push(pet);
        localStorage.setItem('pets', JSON.stringify(pets));
        form.reset();
        alert('Pet cadastrado com sucesso!');
    });
});

function voltar() {
    window.location.href = 'home.html'
}


function mostrarTodos() {
    const perdiFeed = document.getElementById('perdiFeed')
    

perdiFeed.innerHTML = ''
    const pets = JSON.parse(localStorage.getItem('pets')) || [];

        for (i = 0; i < pets.length; i++) {
        perdiFeed.innerHTML +=
            '<div class="card">' +
            '<h2 class="cardh2">' + pets[i].nomePet + '</h2>' +
            '<p class="cardp">' + pets[i].especiePet + '</p>' +
            '<p class="cardp">' + pets[i].racaPet + '</p>' +
            '<p class="cardp">' + pets[i].comentarioPet + '</p>' +
            `<img src="${pets[i].fotoPet64}" alt="" class="cardimg">` +
            // '<p>'+`<button onclick="mostrarMais(${pets[i].id})">Mostrar detalhes</button> `+'</p>' +
            '<p class="cardp">'+`<button onclick="deletarAnimalPerdido(${pets[i].id})" class="cardb">Deletar</button> `+'</p>' +
            '</div>'
    }
}

mostrarTodos()

// function mostrarMais(){
//     // Obtém o modal
//     let modal = document.getElementById("myModal");
//     // Obtém o elemento <span> que fecha o modal
//     let span = document.getElementsByClassName("close")[0];
//     // Quando o usuário clicar no <span> (x), fecha o modal
//     span.onclick = function () {
//         modal.style.display = "none";
//     }
//     // Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
//     window.onclick = function (event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }
//     let id = JSON.parse(localStorage.getItem(Date.now));
//     if(id){
//         // alert('Nenhum usuário cadastrado!')
//         document.getElementById('nomeAnimal').innerHTML = pets.nomePet;
//         document.getElementById('especieAnimal').innerHTML = pets.especiePet;
//         document.getElementById('racaAnimal').innerHTML = pets.racaPet;
//         document.getElementById('corAnimal').innerHTML = pets.corPet;
//         document.getElementById('porteAnimal').innerHTML = pets.portePet;
//         document.getElementById('pelagemAnimal').innerHTML = pets.pelagemPet;
//         // document.getElementById('enderecoLogado').innerHTML = petsAchados.endereco;
//     }
//     modal.style.display = "block";

// }

function deletarAnimalPerdido(id) {
    
    let index = -1
    let pets = JSON.parse(localStorage.getItem('pets'))
    let confirmar = confirm('Deseja realmente deletar?')
    if(confirmar){
        for(i=0; i<pets.length;i++){
            if(pets[i].id === id){
                index = i;
            }
        }
        console.log(index)
        if (index != -1){
            pets.splice(index,1)
            localStorage.setItem('pets',JSON.stringify(pets))
            window.location.reload()
        }
        
    }
}