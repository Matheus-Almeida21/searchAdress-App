const form = document.querySelector('#cep')
const searchButton = document.querySelector('button')
const boxAdress = document.querySelector('#adress-container')
const validity = document.querySelector('.erro')

function getCep(event){
  validity.innerText = ''
  if (form.value.length < 8){
    validity.innerText = 'Quantidade de caracteres insulficiente'
    return undefined
  } else if (form.value.length > 8) {
    validity.innerText = 'Quantidade de caracteres muito grande'
    return undefined
  } else {
    return form.value
  }
}

async function searchAdress(event){
  boxAdress.classList.remove('active')
  event.preventDefault()
  const cepValue = getCep()
  console.log(cepValue)

try{
  if (cepValue === undefined) {
    alert('Preencha o campo primeiro')
  } else {
    let adress = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
    adress = await adress.json()
    showAdress(adress)
  }
} catch(err){
  console.log(err)
  validity.innerText = 'Erro, CEP não localizado, verifique se o mesmo existe'
}
}

function showAdress(adress){
  boxAdress.classList.add('active')
  itens = document.querySelectorAll('li span')
  itens.forEach((item) => {
    if (adress[item.classList.value] == ''){
      item.innerText = 'Não possui'
    } else {
      item.innerText = ' ' + adress[item.classList.value]
    }
  })
}

searchButton.addEventListener('click', searchAdress)
form.addEventListener('change', getCep)