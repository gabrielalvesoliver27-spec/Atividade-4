/* ===============================================
--- ETAPA 3B: DADOS (PARA TEMPLATE) ---
=============================================== */

// Nossos dados de projeto, antes "hardcoded" no HTML
const projetosData = [
    {
        id: "educacao",
        titulo: "Educação para Todos",
        badgeTexto: "Educação",
        badgeClasse: "badge-primario",
        imagem: "Imagens/educaçao para todos.webp",
        descricao: "Acreditamos que o talento está em toda parte, mas as oportunidades não. Este projeto existe para mudar isso. Oferecemos reforço escolar e atividades extracurriculares que vão além do básico, ajudando crianças e adolescentes a descobrir seu potencial e construir um futuro brilhante."
    },
    {
        id: "cozinha",
        titulo: "Cozinha Comunitária",
        badgeTexto: "Alimentação",
        badgeClasse: "badge-secundario",
        imagem: "Imagens/cozinha comunitaria.webp",
        descricao: "Nenhum prato deve ficar vazio. Este é o lema da nossa Cozinha Comunitária, que atua na linha de frente contra a fome. Diariamente, distribuímos refeições nutritivas, levando segurança alimentar e esperança para pessoas em situação de rua e famílias em vulnerabilidade."
    },
    {
        id: "capacitacao",
        titulo: "Capacitação Profissional",
        badgeTexto: "Emprego",
        badgeClasse: "badge-primario",
        imagem: "Imagens/capacitaçao profissional.webp",
        descricao: "Mudar a própria história começa com uma oportunidade. Oferecemos cursos e workshops desenhados para empoderar jovens e adultos, dando-lhes a confiança e as habilidades para conquistar seu espaço no mercado de trabalho. Nosso foco é a autonomia financeira, o primeiro passo para uma vida com mais escolhas."
    }
];


/* ===============================================
--- FUNÇÃO PRINCIPAL  ---
=============================================== */

// Salva o elemento que abriu o modal, para devolver o foco
let modalTrigger = null; 

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializa componentes que NUNCA mudam (header, modal)
    initMenuHamburger();
    initDropdown(); // NOVO: Inicializa o dropdown mobile
    initModal();
    
    // 2. Anexa os listeners de link do SPA
    // (Será re-anexado em initPaginaAtual para links carregados dinamicamente)
    anexarLinksSPA(); 

    // 3. Ouve o botão "Voltar" do navegador
    window.addEventListener('popstate', (e) => {
        const path = e.state ? e.state.path : 'index.html';
        carregarPagina(path, false); 
    });
    
    // 4. Inicializa os scripts da página atual
    initPaginaAtual();
});

/**
 * Anexa os listeners de clique para todos os links SPA
 */
function anexarLinksSPA() {
    const linksSPA = document.querySelectorAll('.nav-link-spa');
    linksSPA.forEach(link => {
        // Remove listener antigo para evitar duplicatas
        link.removeEventListener('click', navegar); 
        // Adiciona novo listener
        link.addEventListener('click', navegar);
    });
}

/**
 * Intercepta o clique no link, previne o recarregamento
 * e chama o carregador de página.
 */
function navegar(e) {
    e.preventDefault();
    const url = e.currentTarget.href; // Mudar para currentTarget
    carregarPagina(url);
}

/**
 * Função principal do Roteador SPA.
 */
async function carregarPagina(url, pushState = true) {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error('Não foi possível carregar a página.');
        }
        const textoHTML = await resposta.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(textoHTML, 'text/html');
        
        const novoMain = doc.querySelector('main');
        const novoTitle = doc.querySelector('title');

        if (!novoMain) {
            throw new Error('Conteúdo <main> não encontrado no HTML buscado.');
        }

        document.querySelector('main').innerHTML = novoMain.innerHTML;
        document.title = novoTitle.innerText;
        
        if (pushState) {
            history.pushState({ path: url }, novoTitle.innerText, url);
        }
        
        // RE-INICIALIZA os scripts para o novo conteúdo
        initPaginaAtual();
        
    } catch (error) {
        console.error('Erro ao carregar página:', error);
    }
}

/**
 * Verifica o conteúdo que acabou de ser carregado no <main>
 * e roda os scripts específicos para ele.
 */
function initPaginaAtual() {
    // Re-anexa listeners SPA para links dentro do <main> (ex: "Ver Projetos")
    anexarLinksSPA();

    if (document.getElementById('form-cadastro')) {
        initFormValidation();
    }
    
    if (document.getElementById('projetos-container')) {
        renderizarProjetos();
    }
}


/* ===============================================
--- ETAPA 3B: SISTEMA DE TEMPLATES ---
=============================================== */

function renderizarProjetos() {
    const container = document.getElementById('projetos-container');
    if (!container) return; 

    const htmlProjetos = projetosData.map(projeto => {
        return `
            <div class="col-12 col-md-6 col-lg-4">
                <article class="caixa-destaque" id="${projeto.id}"> 
                    <h3>${projeto.titulo} <span class="badge ${projeto.badgeClasse}">${projeto.badgeTexto}</span></h3>
                    <picture>
                        <source srcset="${projeto.imagem.replace('.png', '.webp')}" type="image/webp">
                        <img src="${projeto.imagem}" alt="Imagem do projeto ${projeto.titulo}" width="300" height="200">
                    </picture>
                    <p>${projeto.descricao}</p>
                </article>
            </div>
        `;
    }).join(''); 
    
    container.innerHTML = htmlProjetos;
}


/* ===============================================
--- INICIALIZADORES DE COMPONENTES ---
=============================================== */

/**
 * ATUALIZADO: Inicializa a lógica do menu hambúrguer com ARIA.
 */
function initMenuHamburger() {
    const botaoAbrir = document.getElementById('btn-hamburger');
    const botaoFechar = document.getElementById('btn-fechar');
    const menu = document.getElementById('nav-menu');

    if (botaoAbrir && botaoFechar && menu) {
        botaoAbrir.addEventListener('click', () => {
            menu.classList.add('aberto');
            botaoAbrir.setAttribute('aria-expanded', 'true');
            menu.setAttribute('aria-hidden', 'false');
            botaoFechar.focus(); // Move o foco para o botão de fechar
        });
        
        botaoFechar.addEventListener('click', () => {
            menu.classList.remove('aberto');
            botaoAbrir.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
            botaoAbrir.focus(); // Devolve o foco para o botão que abriu
        });
    }
}

/**
 * NOVO: Inicializa a lógica do dropdown mobile com ARIA.
 */
function initDropdown() {
    document.querySelectorAll('#nav-menu li').forEach(item => {
        const seta = item.querySelector('.seta-dropdown');
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');

        if (seta && link && submenu) {
            seta.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Impede o clique de fechar o menu
                
                const isAberto = item.classList.toggle('submenu-aberto');
                
                // Atualiza ARIA
                link.setAttribute('aria-expanded', isAberto);
                submenu.setAttribute('aria-hidden', !isAberto);
            });
        }
    });
}


/**
 * ATUALIZADO: Inicializa a lógica dos Modais com ARIA e foco.
 */
function initModal() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-modal-alvo]')) {
            const alvo = e.target.dataset.modalAlvo; 
            const modal = document.querySelector(alvo);
            if (modal) {
                modalTrigger = e.target; // Salva quem abriu
                modal.classList.add('aberto');
                modal.setAttribute('aria-hidden', 'false');
                
                // Move o foco para dentro do modal
                const fecharBtn = modal.querySelector('.modal-fechar');
                if (fecharBtn) {
                    fecharBtn.focus();
                }
            }
        }
        
        if (e.target.matches('.modal-fechar') || e.target.matches('.modal-overlay')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('aberto');
                modal.setAttribute('aria-hidden', 'true');
                
                // Devolve o foco para quem abriu
                if (modalTrigger) {
                    modalTrigger.focus();
                    modalTrigger = null;
                }
            }
        }
    });
}

/**
 * Inicializa a lógica de validação do formulário.
 */
function initFormValidation() {
    const form = document.getElementById('form-cadastro');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const isFormValid = validarFormulario();
            
            if (isFormValid) {
                console.log('Formulário válido! Enviando...');
                alert('Cadastro enviado com sucesso!');
                // form.submit(); 
            } else {
                console.log('Formulário contém erros.');
                // Foca no primeiro campo inválido
                const primeiroErro = form.querySelector('.invalid');
                if(primeiroErro) {
                    primeiroErro.focus();
                }
            }
        });
    }
}


/* ===============================================
--- LÓGICA DE VALIDAÇÃO (Etapa 3A) ---
=============================================== */

function validarFormulario() {
    let isFormValid = true;
    
    // Valida todos os campos 'required' de forma genérica
    const inputs = document.querySelectorAll('#form-cadastro [required]');
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            mostrarErro(input, 'Este campo é obrigatório.');
            isFormValid = false;
        } else {
            // Se não for um dos campos especiais, é válido
            if (!['email', 'cpf'].includes(input.id)) {
                mostrarSucesso(input);
            }
        }
    });

    // Validações Específicas
    const email = document.getElementById('email');
    if (email.value.trim() !== '' && !isEmailValido(email.value)) {
        mostrarErro(email, 'Por favor, insira um email válido.');
        isFormValid = false;
    } else if (email.value.trim() !== '') {
        mostrarSucesso(email);
    }
    
    const cpf = document.getElementById('cpf');
    if (cpf.value.trim() !== '' && !isCPFValido(cpf.value)) {
        mostrarErro(cpf, 'Formato de CPF inválido. Use 111.222.333-44.');
        isFormValid = false;
    } else if (cpf.value.trim() !== '') {
        mostrarSucesso(cpf);
    }

    return isFormValid;
}

function mostrarErro(input, mensagem) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    const errorSpan = document.getElementById('error-' + input.id);
    if (errorSpan) {
        errorSpan.textContent = mensagem;
        errorSpan.classList.add('visivel');
    }
}

function mostrarSucesso(input) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    const errorSpan = document.getElementById('error-' + input.id);
    if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.classList.remove('visivel');
    }
}

function isEmailValido(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isCPFValido(cpf) {
    const re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    return re.test(String(cpf));
}