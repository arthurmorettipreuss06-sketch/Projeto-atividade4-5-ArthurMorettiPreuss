document.getElementById('ano').textContent = new Date().getFullYear();
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');


const temaSalvo = localStorage.getItem('theme');

if (temaSalvo === 'dark') {
  html.setAttribute('data-theme', 'dark');
  themeToggle.checked = true;
}


themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
});


const cepInput = document.getElementById('cep');
const enderecoInput = document.getElementById('endereco');
const cepStatus = document.getElementById('cepStatus');

cepInput.addEventListener('input', () => {
  let valor = cepInput.value.replace(/\D/g, '').slice(0, 8);
  if (valor.length > 5) valor = valor.slice(0, 5) + '-' + valor.slice(5);
  cepInput.value = valor;
});

cepInput.addEventListener('blur', async () => {
  const cep = cepInput.value.replace(/\D/g, '');

  if (cep.length !== 8) {
    if (cep.length > 0) cepStatus.textContent = 'Informe um CEP válido com 8 dígitos.';
    return;
  }

  cepStatus.textContent = 'Buscando endereço...';
  enderecoInput.value = '';

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      cepStatus.textContent = 'CEP não encontrado.';
      return;
    }

    enderecoInput.value = `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`;
    cepStatus.textContent = 'Endereço encontrado com sucesso.';
  } catch (erro) {
    cepStatus.textContent = 'Não foi possível buscar o CEP agora. Tente novamente.';
  }
});


