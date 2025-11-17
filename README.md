Projeto Website - ONG Corrente do Bem (Versão SPA Avançada)
Este repositório contém o código-fonte de um site completo, responsivo e de alta performance para a "ONG Corrente do Bem".

Este projeto foi construído do zero, sem o uso de frameworks (como React ou Bootstrap), para demonstrar uma arquitetura front-end robusta usando apenas tecnologias web puras. O site funciona como uma Single Page Application (SPA), onde a navegação é instantânea e o conteúdo da página é carregado dinamicamente.

🚀 Destaques Técnicos
Este projeto vai além de um simples site estático; é um sistema front-end coeso que demonstra vários conceitos avançados:

1. Roteador SPA (Single Page Application)
O launch.js implementa um roteador SPA completo em JavaScript puro:

Navegação Instantânea: Intercepta cliques nos links (.nav-link-spa) e usa fetch() para buscar o HTML da página de destino.

DOM Dinâmico: Utiliza DOMParser() para extrair o <main> e o <title> da página buscada e os injeta no DOM atual, sem recarregar a página.

Histórico do Navegador: Gerencia o histórico de navegação com history.pushState e o evento popstate, permitindo que os botões "voltar" e "avançar" do navegador funcionem perfeitamente.

Ciclo de Vida: Possui uma função initPaginaAtual() que "reinicializa" os scripts necessários (como validação de formulário ou renderização de templates) toda vez que um novo conteúdo é carregado.

2. Design System & Grid System (styles.css)
O styles.css foi estruturado como um "framework" interno:

Design System: Define toda a base visual do projeto (paleta de cores, tipografia, espaçamento, sombras) usando Variáveis CSS (:root).

Modo Escuro (Dark Mode): Suporte nativo a modo escuro usando a media query (prefers-color-scheme: dark).

Grid System Próprio: Um sistema de grid de 12 colunas, "mobile-first" e totalmente responsivo, construído com Flexbox. Ele suporta 5 breakpoints (sm, md, lg, xl, xxl) para layouts complexos.

3. Componentes Reutilizáveis (JS + CSS)
O projeto é construído com componentes interativos e reutilizáveis:

Menu Responsivo (com Dropdown): Um menu hambúrguer para mobile que se transforma em um menu desktop. O submenu "Projetos" funciona com clique no mobile e com hover no desktop.

Modal (Popup): Um componente de modal genérico, ativado por atributos data-modal-alvo, usado para a chamada de doação.

Sistema de Templates: A página Projetos.html é renderizada dinamicamente. Um array projetosData no launch.js é usado pela função renderizarProjetos para gerar os cards de projeto.

Componentes de UI: Inclui outros componentes como Alert, Badge e Button com estados definidos.

4. Validação de Formulário Avançada
O cadastro.html usa um sistema de validação robusto em JavaScript:

O novalidate no HTML desativa a validação do navegador, passando o controle para o JS.

Scripts verificam campos obrigatórios e formatos específicos (Email e CPF) via Regex.

Fornece feedback visual instantâneo ao usuário, alternando classes .valid/.invalid (CSS) e exibindo mensagens de erro (.error-message.visivel).

5. Foco em Acessibilidade (A11y)
Um esforço consciente foi feito para tornar o site acessível:

HTML Semântico: Uso correto de tags como <main>, <nav>, <article>, <fieldset>.

ARIA (Accessible Rich Internet Applications): Uso extensivo de atributos ARIA para componentes dinâmicos, como aria-expanded, aria-controls, aria-hidden, aria-modal e role="alert".

Gerenciamento de Foco: O JavaScript gerencia ativamente o foco do usuário. Por exemplo, ao abrir um modal ou o menu, o foco é movido para dentro do componente e, ao fechar, ele retorna para o elemento que o acionou.

Contraste de Cores: O CSS foi corrigido para garantir um contraste de cores acessível, conforme anotado no próprio arquivo (CORRIGIDO: Contraste...).

💻 Como Visualizar o Projeto
Importante: Este projeto é uma SPA e usa fetch() para carregar arquivos HTML. Devido às políticas de segurança (CORS) dos navegadores, ele não funcionará se você apenas abrir o index.html diretamente do seu computador.

Ele precisa ser executado a partir de um servidor local.

A forma mais fácil de fazer isso é:

Abra a pasta do projeto no Visual Studio Code.

Instale a extensão Live Server.

Clique com o botão direito no arquivo index.html.

Selecione "Open with Live Server".

Isso iniciará um servidor local e abrirá o projeto no seu navegador, permitindo que o roteador SPA funcione corretamente.

Feito por Gabriel Alves.
