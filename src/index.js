const api = 'https://api.themoviedb.org/3/movie/550?api_key=1169736de0a89a110502614a7dd23488&query=Jack+Reacher';
const buscador = document.querySelector('#buscador');
const btnBucador = document.querySelector('#btnBucador')
const contenedor = document.querySelector('#contenedor')
const flechaD = document.querySelector('#flecha-derecha');
const flechaI = document.querySelector('#flecha-izquierda');
const nombrePeli = document.querySelector('#nombrePeli')
const descriPeli = document.querySelector('#descriPeli')
const contVacio = document.querySelector('#cont-vacio');
let peliculas ;
let pelifocus = 0;



function buscar () // funcion que controla las peticiones a la apo
{
    
    contVacio.style.opacity = "0";
    flechaD.style.opacity ="1";
    flechaI.style.opacity = "1";

       if(buscador.value === "")
       {
           alert("consulta no encontrada")
       }else
       {
          if(contenedor.children.length == 0){
            solicitudApi() //funcion que manda la peticion a la api
          }else{
              contenedor.innerHTML = ""
              pelifocus = 0;
              solicitudApi()
          } 
           
       }
}

function solicitudApi()
{
    let nombre = buscador.value
    
    for(let i = 0; i <= nombre.length  ;i++){
        
         if(nombre[i] == " ")
         {
             nombre = nombre.replace(" ", "+");
             
         }
    }
 
    fetch(`${api}`).then((res) =>{
     const valores = res.json()
     
     }).then(()=>{
     
     fetch(`https://api.themoviedb.org/3/search/movie?api_key=1169736de0a89a110502614a7dd23488&query=${nombre}`).then(async (res) =>{
         let i = 0;
         const data = await res.json()
         let resultado = data.results;
         const caja = resultado.map( (user) =>{

         let elementImage = document.createElement('div');
         let portada = document.createElement('img')
         

         portada.setAttribute('id',`${i}`);
         portada.setAttribute('class', 'imagenes')
         elementImage.setAttribute("class","contenedor_imagen")
         elementImage.appendChild(portada);
         contenedor.appendChild(elementImage);   

         fetch(`https://image.tmdb.org/t/p/w500/${user.poster_path}`).then( async (res)=>{
             const data1 =  res
             portada.setAttribute('src',res.url)
         })
             
         peliculas = resultado;                
         i= i +1;

         })

         let focusImg = document.getElementById('0');
         focusImg.style.height = '400px';
         focusImg.style.width = '320px';
         focusImg.style.opacity = '1';

         nombrePeli.innerText = resultado[0].original_title
         descriPeli.innerText =resultado[0].overview 


     })
     })
}



function movDerecha() 
{
    if(pelifocus < peliculas.length-1){
        let focusImg = document.getElementById(`${pelifocus}`);
        focusImg.style.height = '340px';
        focusImg.style.width = '270px';
        focusImg.style.opacity = '0.3';
        pelifocus = pelifocus + 1;
        focusImg = document.getElementById(`${pelifocus}`);
    
        contenedor.style.left = `${contenedor.offsetLeft - 270}px`
        contenedor.style.transition ='left 2s'
        focusImg.style.height = '400px';
        focusImg.style.width = '320px';
        focusImg.style.opacity = '1';
        nombrePeli.innerText = peliculas[pelifocus].original_title
        descriPeli.innerText =peliculas[pelifocus].overview 
    }
    
    
}
function movIzquierda(){
    if(pelifocus == 0){}
    else{
        let focusImg = document.getElementById(`${pelifocus}`);
    focusImg.style.height = '340px';
    focusImg.style.width = '270px';
    focusImg.style.opacity = '0.3';
    pelifocus = pelifocus - 1;

    focusImg = document.getElementById(`${pelifocus}`);
    contenedor.style.left = `${contenedor.offsetLeft + 270}px`
    contenedor.style.transition ='left 2s'
    focusImg.style.height = '400px';
    focusImg.style.width = '320px';
    focusImg.style.opacity = '1';

    nombrePeli.innerText = peliculas[pelifocus].original_title
    descriPeli.innerText =peliculas[pelifocus].overview 
    }
}


flechaD.addEventListener('click' , movDerecha)
flechaI.addEventListener('click' , movIzquierda)
btnBucador.addEventListener('click', buscar)
