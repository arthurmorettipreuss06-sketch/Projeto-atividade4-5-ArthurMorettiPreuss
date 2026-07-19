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


const numeroWhatsApp = '555191569836'; 

const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const cep = document.getElementById('cep').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !mensagem) {
    formFeedback.textContent = 'Preencha nome, e-mail e mensagem antes de enviar.';
    return;
  }

  let texto = `Olá! Vim pelo seu portfólio.\n\n`;
  texto += `*Nome:* ${nome}\n`;
  texto += `*E-mail:* ${email}\n`;
  if (cep) texto += `*CEP:* ${cep}\n`;
  if (endereco) texto += `*Endereço:* ${endereco}\n`;
  texto += `\n*Mensagem:*\n${mensagem}`;

  const textoCodificado = encodeURIComponent(texto);
  const url = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

  formFeedback.textContent = 'Redirecionando para o WhatsApp...';
  window.open(url, '_blank');
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


