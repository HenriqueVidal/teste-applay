/*let candidatos = [
  { id: "1", cpf: "44948842869", nome: "Henrique Pardinho Vidal", celular: "15998101782", email: "henriquevidal@outlook.com", sexo: "Masculino", nascimento: "01/12/1995", skills: { html: true, css: true, js: true, bootstrap: true } },
    { id: "2", cpf: "42604610876", nome: "Lucas Vieira Dias", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
    { id: "3", cpf: "42604610876", nome: "Nelson Santana", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
  ]; */

// Local Storage
const localStorageData = JSON.parse(localStorage.
  getItem("candidatos"));
 let candidatos = localStorage.
  getItem("candidatos") !== null ? localStorageData : [];
const updateLocalStorage = () => localStorage.
  setItem("candidatos", JSON.stringify(candidatos));

updateLocalStorage();

function abrirModal(candidato) {
  if (candidato) {
    document.getElementById("id").value = candidato.id;
    document.getElementById("cpf").value = candidato.cpf;
    document.getElementById("nome").value = candidato.nome;
    document.getElementById("celular").value = candidato.celular;
    document.getElementById("email").value = candidato.email;
    if(candidato.sexo=='Masculino'){
      document.getElementById("sexoMasculino").checked = true;
    } else{
      document.getElementById("sexoFeminino").checked = true;
    }
    document.getElementById("nascimento").value = candidato.nascimento.split('/').reverse().join('-');
    document.getElementById("skillHtml").checked = candidato.skills.html;
    document.getElementById("skillCss").checked = candidato.skills.css;
    document.getElementById("skillJs").checked = candidato.skills.js;
    document.getElementById("skillBootStrap").checked = candidato.skills.bootstrap;
  }

  $('#candidatoModal').modal('show');
}

function fecharModal() {
  $('#candidatoModal').modal('hide');
  $('body').removeClass('modal-open');
  $('body').removeAttr('style');
  $('.modal-backdrop').remove();

  document.getElementById("id").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("email").value = "";
  document.getElementById("sexoMasculino").checked = true;
  document.getElementById("nascimento").value = '';
  document.getElementById("skillHtml").checked = false;
  document.getElementById("skillCss").checked = false;
  document.getElementById("skillJs").checked = false;
  document.getElementById("skillBootStrap").checked = false;
}


function salvar() {
  let id = document.getElementById("id").value;
  let cpf = document.getElementById("cpf").value;
  let nome = document.getElementById("nome").value;
  let celular = document.getElementById("celular").value;
  let email = document.getElementById("email").value;
  let nascimento = document.getElementById("nascimento").value.split('-').reverse().join('/');
  let sexo = document.getElementById("sexoMasculino").checked;
  let skillHtml = document.getElementById("skillHtml").checked;
  let skillCss = document.getElementById("skillCss").checked;
  let skillJs = document.getElementById("skillJs").checked;
  let skillBootStrap = document.getElementById("skillBootStrap").checked;

  // Funções de Validação
  validarInputs = (...allInputs) => {
    if (allInputs.includes("")) return false;
    return true;
  };
  validarCpf = (cpf) => {
    if(typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[^\d]+/g, '');
    if(cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    cpf = cpf.split('').map(el => +el);
    /*const rest = (count) => (cpf.slice(0, count-12)
      .reduce( (soma, el, index) => (soma + el * (count-index)), 0 )*10) % 11 % 10; 
    return rest(10) === cpf[9] && rest(11) === cpf[10];*/
    return true;
  };
  validarNome = (nome) => {
    let regexNome0 = /^[a-zA-Z]+ [a-zA-Z ]+$/;
    if(typeof nome !== 'string') return false;
    if(nome.length < 4) return false;
    if (!regexNome0.test(nome)) return false;
    return true;
  };
  validarCelular = (celular) => {
    if (celular.length < 15) return false;
    return true;
  };
  validarEmail = (email) => {
    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(regexEmail)) return false;
    return true;
  };
  validarIdade = () => {
    const idadeMinima = 16;
    calculaIdade = () => {
     let date = new Date(document.getElementById("nascimento").value);
     let hoje = new Date();
     let timeDiff = Math.abs(hoje.getTime() - date.getTime());
     let idade0 = Math.ceil(timeDiff / (1000 * 3600 * 24)) / 365;
     return idade0;
    };
    let idade = calculaIdade();
    if (idade < idadeMinima) {
      return false;
    } else
      return true;
  };
  validarSkill = () => {
    let cbSkills = document.querySelector('input[name="skills"]:checked');
    if (!cbSkills) return false;
    return true;
  };
  
  // Validações
  if (!validarInputs(cpf,nome,nascimento,celular,email)) {
    redInputs();
    Swal.fire('', 'Por favor preencha todos os campos.', 'error');
  } else if(!validarCpf(cpf)) {
    cpfRed();
    Swal.fire('CPF inválido!', 'Por favor verifique o CPF digitado.', 'error');
  } else if (!validarNome(nome)) {
    nomeRed();
    Swal.fire('Nome inválido!', 'Por favor digite seu nome completo.', 'error');
  } else if (!validarCelular(celular)) {
    celularRed();
    Swal.fire('Número inválido', 'Por favor digite o número de telefone corretamente.', 'error');
  } else if (!validarEmail(email)) {
    emailRed();
  Swal.fire('E-mail inválido', 'Por favor digite o E-mail corretamente.', 'error');
  } else if (!validarIdade()) {
    nascimentoRed();
    Swal.fire('', 'O candidato deve ter mais de 16 anos de idade.', 'error');
  } else if (!validarSkill()) {
    skillRed();
    Swal.fire('', 'O candidato precisa ter pelo menos uma habilidade.', 'error');
  } else {

  let candidato = {
    id: id!=''?id:new Date().getTime(),
    cpf: cpf,
    nome: nome,
    celular: celular,
    email: email,
    sexo: sexo?'Masculino':'Feminino',
    nascimento: nascimento,
    skills: {
      html: skillHtml,
      css: skillCss,
      js: skillJs,
      bootstrap: skillBootStrap
    }
  };

  if(id!=''){
    let checkCandidato = candidatos.find(e=>e.id == candidato.id);
    checkCandidato.cpf = candidato.cpf;
    checkCandidato.nome = candidato.nome;
    checkCandidato.celular = candidato.celular;
    checkCandidato.email = candidato.email;
    checkCandidato.sexo = candidato.sexo;
    checkCandidato.nascimento = candidato.nascimento;
    checkCandidato.skills = candidato.skills;
  }else{
    candidatos.push(candidato);
  }

  Swal.fire('Candidato adicionado com sucesso!', '', 'success');

  fecharModal();
  listarCandidatos();
 }
}

remover = (candidato) => {  
  document.getElementById("id").value = candidato.id;
  let CId = document.getElementById("id").value;  
  
  for (let i = 0; i < candidatos.length; i++) {
    if (candidatos[i].id == CId) {
      candidatos.splice(i, 1);
      console.log(`Candidato ${candidato.nome} - ID: ${CId} removido!`);      
      break;
    }
  }


  updateLocalStorage();
  listarCandidatos();
}

function listarCandidatos() {
  let tabela = document.getElementById("table-body");
  tabela.innerHTML = '';
  for (let candidato of candidatos) {
    let linha = document.createElement("tr");

    let colunaCpf = document.createElement("td");
    let colunaNome = document.createElement("td");
    let colunaCelular = document.createElement("td");
    let colunaEmail = document.createElement("td");
    let colunaSexo = document.createElement("td");
    let colunaNascimento = document.createElement("td");
    let colunaSkills = document.createElement("td");
    let colunaEditar = document.createElement("td");
    let colunaRemover = document.createElement("td");

    // Funcionalidades botão editar
    let botaoEditar = document.createElement("button");
    botaoEditar.classList.add("btn", "btn-secondary", "btn-new");
    botaoEditar.innerHTML = '<i class="fas fa-edit"></i>';
    botaoEditar.onclick = function () {
      abrirModal(candidato);
    }

    // Funcionalidades botão remover
    let botaoRemover = document.createElement("button");
    botaoRemover.classList.add("btn", "btn-danger", "btn-new");
    botaoRemover.innerHTML = '<i class="fas fa-user-times"></i>';
    botaoRemover.onclick = function () {
      
      Swal.fire({
        title: `Deseja remover o candidato <strong>${candidato.nome}</strong>?`,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: `Não`,
      }).then((result) => {
        if (result.isConfirmed) {
          remover(candidato);
          Swal.fire('Candidato removido!', '', 'success')
        }
      })
    }

    let arrSkills = [];
    if(candidato.skills.html){
      arrSkills.push('HTML');
    }
    if(candidato.skills.css){
      arrSkills.push('CSS');
    }
    if(candidato.skills.js){
      arrSkills.push('JS');
    }
    if(candidato.skills.bootstrap){
      arrSkills.push('BOOTSTRAP');
    }

    colunaCpf.appendChild(document.createTextNode(candidato.cpf));
    colunaNome.appendChild(document.createTextNode(candidato.nome));
    colunaCelular.appendChild(document.createTextNode(candidato.celular));
    colunaEmail.appendChild(document.createTextNode(candidato.email));
    colunaSexo.appendChild(document.createTextNode(candidato.sexo));
    colunaNascimento.appendChild(document.createTextNode(candidato.nascimento));
    colunaSkills.appendChild(document.createTextNode(arrSkills.join(', ')));
    colunaEditar.appendChild(botaoEditar);
    colunaRemover.appendChild(botaoRemover);

    linha.appendChild(colunaCpf);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaCelular);
    linha.appendChild(colunaEmail);
    linha.appendChild(colunaSexo);
    linha.appendChild(colunaNascimento);
    linha.appendChild(colunaSkills);
    linha.appendChild(colunaEditar);
    linha.appendChild(colunaRemover);
    linha.classList.add("tr-control");

    tabela.appendChild(linha);
  }
}

listarCandidatos();


// Trecho responsável pelo filtro da tabela
$(document).ready(function () {
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#candidatos tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

// JQUERY MASK
let maskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
options = {onKeyPress: function(val, e, field, options) {
        field.mask(maskBehavior.apply({}, arguments), options);
    }
};
$(document).ready(() => {
  $('.cpf').mask('000.000.000-00', {reverse: true});
  $('.celular').mask(maskBehavior, options);
});
