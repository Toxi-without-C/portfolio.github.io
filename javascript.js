const track = document.getElementById("track")
const section = document.getElementById("section")
const cards = document.querySelectorAll(".card")
const categories = document.querySelectorAll(".categorie")

categories.forEach(element => {
  element.style.display = "None"
}); /* on fait disparaitre les section*/

console.log(cards)
let flag = false
let viewingX = 0
let xOffset = 0
function smooth(){
  viewingX = viewingX+(xOffset-viewingX)*0.1
  track.style.transform = "translateX(-"+viewingX+"px)"
  requestAnimationFrame(smooth)
} /*  la fonction qui permet de rendre le mouvement fluide et non saccadé ça marche avec un calcul qui rapproche la valeur petit a petit*/
let dico = new Map
let incremente = 4
let old = incremente
cards.forEach((element,i) => {
  dico.set(i,element)
}); /* on créer un dico avec toutes les thèmes */
function centerCard(){
  incremente = Math.max(0,Math.min(dico.size-1,incremente))
  console.log(dico.get(incremente))
  
  console.log(xOffset)
  dico.get(old).style.boxShadow = ""
  dico.get(old).style.zIndex = "1"
  if (old==0){
    dico.get(old).style.marginLeft = "3rem"
  } else{
    dico.get(old).style.marginLeft = "0rem"
  }

  dico.get(old).style.marginRight = "0rem"
  dico.get(old).style.transform = "scale(1, 1)"
  dico.get(incremente).style.transform= "scale(1.2, 1.2)"
  dico.get(incremente).style.boxShadow = "#ffce1f 0.25rem 0.25rem 0rem 0.25rem,#ffce1f -0.25rem -0.25rem 0rem 0.25rem"
  if (incremente== 0){ //evite que la première carte soit dans le cotè gauche
    dico.get(incremente).style.marginLeft = "8rem"
  } else{
    dico.get(incremente).style.marginLeft = "2rem"
  }
  dico.get(incremente).style.marginRight = "2rem"
  dico.get(incremente).style.zIndex = "2"
  xOffset = dico.get(incremente).offsetLeft-(window.innerWidth/2-cards[incremente].offsetWidth/2)
  categories[old].style.display = "None"
  categories[incremente].style.display = "flex"
  old = incremente
}// cette fonction permet de gérer l'apparition et disparition des sections 
centerCard(incremente)
console.log(dico)
section.addEventListener("mouseenter",(event)=>flag = true)
section.addEventListener("mouseleave",()=>flag = false)
track.addEventListener("wheel",(event)=>
    {
      
      if (flag===true){
        event.preventDefault()
        if (event.deltaY>0){
          incremente+=1

        } else{
          incremente-=1
        }
        centerCard(incremente)
      }
    },{passive:false}
)// gère le scroll horizontal quand on est  dessus c'est un peu comme les slotes d'un jeu

document.addEventListener("keydown",(event)=>{
  if (flag){
    if (event.key==="ArrowLeft"){
      incremente -=1
      centerCard()
      
    } else if(event.key==="ArrowRight"){
      incremente +=1
      centerCard()
    }

  }
  
})// je voulais aussi que ça marche avec les fleches directionelles

smooth()


/////////////////////////////////////////////////////////////////////////////////////
// le formulaire
const form = document.querySelector(".form")
const nameInput = document.getElementById("name-input")
const emailInput = document.getElementById("email-input")
const messageInput = document.getElementById("message-input")
const submit = document.getElementById("button-submit")

const nameError = document.getElementById("error-name")
const emailError = document.getElementById("error-email")
const messageError = document.getElementById("error-message")

form.addEventListener("submit",(event) => {
  event.preventDefault()
  let caPASSE = true
  
  if (nameInput.value.trim()==""){
    nameError.classList.remove("hidden")
    caPASSE= false
  }else{
    nameError.classList.add("hidden")
  }
  if (emailInput.value.trim()==""){
    emailError.classList.remove("hidden")
    caPASSE= false
  }else{
    emailError.classList.add("hidden")
  }
  if (messageInput.value.trim()==""){
    messageError.classList.remove("hidden")
    caPASSE= false
  }else{
    messageError.classList.add("hidden")
  }
  if (caPASSE){
    nameInput.value = ""
    nameInput.placeholder = ""
    emailInput.value = ""
    emailInput.placeholder = ""
    messageInput.value = ""
    messageInput.placeholder = ""
    submit.value = "Submited"
    submit.style.backgroundColor = "#059862"
    submit.style.color = "White"

  }
})
