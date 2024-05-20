const lista_pokemon = document.querySelector('#lista_pokemon');
let url='https://pokeapi.co/api/v2/pokemon/'
botones_header=document.querySelectorAll(".btn-header")
for(let i=1;i <= 151;i++){
    fetch(url+i)
        .then((response) => response.json())
        .then((poke) => mostrar_pokemon(poke));
}
function mostrar_pokemon(poke){
    let tipos=poke.types.map(
        type=>`<p class="${type.type.name} tipo">${type.type.name}</p>`
    );
    tipos=tipos.join('')
    let pokeid= poke.id.toString();
    if (pokeid.length === 1){
        pokeid="00"+pokeid
    }else if(pokeid.length===2){
        pokeid="0"+pokeid
    }

    const div=document.createElement("div")
    div.classList.add("pokemon");
    div.innerHTML=`
    <p class="pokemon_id_back">#${pokeid}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}">
    </div>
    <div class="info_pokemon">
        <div class="info_contenedor">
            <p class="pokemon_id">
            #${pokeid}    
            </p>
            <h2 class="pokemon_nombre">
            ${poke.name} 
            </h2>
        </div>
        <div class="pokemon_tipos">
            ${tipos}                            
        </div>
        <div class="pokemon_stats">
            <p class="stats">${poke.height}m</p>
            <p class="stats">${poke.weight}kg</p>
        </div>
    </div>
    `;
    lista_pokemon.append(div);
    
};
botones_header.forEach(boton=>boton.addEventListener("click",(event)=>{
    const boton_id=event.currentTarget.id;
    
    lista_pokemon.innerHTML="";

    for(let i =1; i <=151;i++){
      fetch(url+i)
        .then((response)=>response.json())
        .then(data=>{
            const tipo=data.types.map(type=>type.type.name);
            if(tipo.some(tipo=>tipo.includes(boton_id))){
                mostrar_pokemon(data)
            }
        })  
    }
}))