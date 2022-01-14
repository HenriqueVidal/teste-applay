// Deixa os inputs vermelhos temporariamente
redInputs = () => {
    let cpf = document.getElementById("cpf");
    let nome = document.getElementById("nome");
    let celular = document.getElementById("celular");
    let email = document.getElementById("email");
    let nascimento = document.getElementById("nascimento");        
    let skillHtml = document.getElementById("skillHtml");
    let skillCss = document.getElementById("skillCss");
    let skillJs = document.getElementById("skillJs");
    let skillBootStrap = document.getElementById("skillBootStrap");
    cpf.classList.add("invalidInput");
    nome.classList.add("invalidInput");
    nascimento.classList.add("invalidInput");
    celular.classList.add("invalidInput");
    email.classList.add("invalidInput");
    skillHtml.classList.add("invalidInput");
    skillCss.classList.add("invalidInput");
    skillJs.classList.add("invalidInput");
    skillBootStrap.classList.add("invalidInput");
  
    setTimeout(()=>{
      cpf.classList.remove("invalidInput");
      nome.classList.remove("invalidInput");
      nascimento.classList.remove("invalidInput");
      celular.classList.remove("invalidInput");
      email.classList.remove("invalidInput");      
      skillHtml.classList.remove("invalidInput");
      skillCss.classList.remove("invalidInput");
      skillJs.classList.remove("invalidInput");
      skillBootStrap.classList.remove("invalidInput");
    },4000);
  }
cpfRed = () => {
    let cpf = document.getElementById("cpf");
    cpf.classList.add("invalidInput"); 
    setTimeout(()=>{
      cpf.classList.remove("invalidInput");
    },4000);
};
nomeRed = () => {
    let nome = document.getElementById("nome");
    nome.classList.add("invalidInput"); 
    setTimeout(()=>{
      nome.classList.remove("invalidInput");
    },4000);
};
celularRed = () => {
    let celular = document.getElementById("celular");
    celular.classList.add("invalidInput"); 
    setTimeout(()=>{
      celular.classList.remove("invalidInput");
    },4000);
};
emailRed = () => {
    let email = document.getElementById("email");
    email.classList.add("invalidInput"); 
    setTimeout(()=>{
      email.classList.remove("invalidInput");
    },4000);
};
nascimentoRed = () => {
    let nascimento = document.getElementById("nascimento");
    nascimento.classList.add("invalidInput"); 
    setTimeout(()=>{
      nascimento.classList.remove("invalidInput");
    },4000);
};
skillRed = () => {    
    let skillHtml = document.getElementById("skillHtml");
    let skillCss = document.getElementById("skillCss");
    let skillJs = document.getElementById("skillJs");
    let skillBootStrap = document.getElementById("skillBootStrap");
    skillHtml.classList.add("invalidInput");
    skillCss.classList.add("invalidInput");
    skillJs.classList.add("invalidInput");
    skillBootStrap.classList.add("invalidInput");
    setTimeout(()=>{
        skillHtml.classList.remove("invalidInput");
        skillCss.classList.remove("invalidInput");
        skillJs.classList.remove("invalidInput");
        skillBootStrap.classList.remove("invalidInput");
    },4000);
}