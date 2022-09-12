var URI = "https://rickandmortyapi.com/api/character?page=1"

const divCards = document.getElementById('cards-container')
const btnPrev = document.getElementById('prev')
const btnNext = document.getElementById('next')
const inputSearch = document.getElementById('search')
const btnUp = document.getElementById('up')
const btnDown = document.getElementById('down')
const btnReset = document.getElementById('reset')
const female = document.getElementById('female')
const male = document.getElementById('male')
const other = document.getElementById('other')
const table = document.getElementById('table')

var urlPrev = null
var urlNext = null

var personajes = []



if(divCards){
    btnPrev.disabled = true
    btnNext.disabled = true
    btnUp.addEventListener('click',()=>{
        ordernarPersonajes('up')
        pintarPersonajes(personajes)
    })
    btnReset.addEventListener('click',()=>{
        ordernarPersonajes('reset')
        pintarPersonajes(personajes)
    })
    btnDown.addEventListener('click',()=>{
        ordernarPersonajes('down')
        pintarPersonajes(personajes)
    })
    
    btnPrev.addEventListener('click',()=>{
        cargarDatos(urlPrev)
    })
    
    btnNext.addEventListener('click',()=>{
        cargarDatos(urlNext)
    })
    
    inputSearch.addEventListener('keyup',()=>{
        let arrayFiltrado = filtrarPorInput(personajes,inputSearch.value)
        pintarPersonajes(arrayFiltrado)
    })
}

cargarDatos(URI)

function cargarDatos(URL){
    fetch(URL).then(respuesta => respuesta.json()).then(data =>{
        console.log(data)
        personajes = data.results
        if(divCards){
            pintarPersonajes(personajes)
            if(data.info.prev != null){
                urlPrev = data.info.prev
                btnPrev.disabled = false
            } else {
                btnPrev.disabled = true
            }
            if(data.info.next != null){
                urlNext = data.info.next
                btnNext.disabled = false
            } else {
                btnNext.disabled = true
            }
        }
        if(male){
            rellenarTabla()
        }
    })
}

function pintarPersonajes(arrayPersonajes){
    divCards.innerHTML = ''
    arrayPersonajes.forEach(personaje =>{
        let card = document.createElement('div')
        card.className = 'card p-0 bg-dark text-light'
        card.style.width = '18rem'
        card.innerHTML = `<img src=${personaje.image} class="card-img-top" alt="...">
                            <div class="card-body">
                            <p class="card-text"><strong>${personaje.id}</strong> Nombre: ${personaje.name}</p>
                        </div>`
        divCards.appendChild(card)
    })
}

function filtrarPorInput(arrayData,text){
    let arrayFiltrado = arrayData.filter(elemento => elemento.name.toLowerCase().includes(text.toLowerCase().trim()))
    return arrayFiltrado
}

function ordernarPersonajes(direction){
    if(direction == 'up'){
        personajes.sort((a,b)=>{
            if(a.name>b.name)
            {return 1}
            if(a.name<b.name)
            {return -1}
            return 0
        })
    } else if(direction == 'down'){
        personajes.sort((a,b)=>{
            if(a.name<b.name)
            {return 1}
            if(a.name>b.name)
            {return -1}
            return 0
        })
    } else {
        personajes.sort((a,b)=>{
            if(a.id<b.id)
            {return -1}
            if(a.id>b.id)
            {return 1}
            return 0
        })
    }
}

function rellenarTabla(){
    let maleCount = 0,femaleCount = 0,otherCount = 0
    personajes.forEach(personaje =>{
        if(personaje.gender == 'Male'){
            maleCount++
        } else if(personaje.gender == 'Female'){
            femaleCount++
        } else {
            otherCount++
            console.log(personaje.gender+' '+personaje.name)
        }
    })
    female.innerText = femaleCount
    male.innerText = maleCount
    other.innerText = otherCount
}