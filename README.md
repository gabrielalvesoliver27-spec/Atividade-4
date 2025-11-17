# ONG Corrente do Bem – Atividade 4 (Entrega Final)

---

## Objetivo
Entrega final do projeto, consolidando práticas profissionais de desenvolvimento web. O foco foi a criação de uma **Single Page Application (SPA)** robusta, um **Design System** completo e a implementação de diretrizes de **Acessibilidade (WCAG)** e **Otimização**, tudo com JavaScript, CSS e HTML puros.

---

## Deploy e Estrutura
- Repositório público hospedado no GitHub (GitHub Pages):  
  https://gabrielalvesoliver27-spec.github.io/Atividade-4/

- Branch principal: `main`  
- Versão atual: **v4.0.0**

---

## Requisitos e Destaques Técnicos

### 1. Arquitetura SPA (Single Page Application)
- **Roteador SPA** completo em JavaScript puro (`launch.js`) que intercepta links e atualiza o DOM.
- Navegação instantânea sem recarregar a página, usando `fetch()` para buscar conteúdo.
- Gerenciamento do histórico do navegador com `history.pushState` e `popstate` (botões de voltar/avançar).
- **Sistema de Templates** dinâmico (`renderizarProjetos`) que gera o HTML a partir de um array de dados.

### 2. Design System & Grid System (CSS)
- **Design System** completo (`styles.css`) baseado em Variáveis CSS (`:root`) para cores, tipografia e espaçamento.
- **Grid System** de 12 colunas, responsivo e "mobile-first", construído do zero com Flexbox.
- Suporte nativo a **Modo Escuro (Dark Mode)** (`prefers-color-scheme: dark`).
- Componentização de UI (Modals, Alerts, Badges, Botões) com estados definidos.

### 3. Acessibilidade (WCAG 2.1 Nível AA)
- **Navegação completa por teclado** garantida em todos os elementos interativos.
- **Gerenciamento de Foco** ativo: o foco é movido para o Modal/Menu ao abrir e devolvido ao gatilho ao fechar.
- **Uso extensivo de ARIA** (`aria-expanded`, `aria-hidden`, `aria-modal`, `role="alert"`) para componentes dinâmicos.
- Contraste de cores corrigido e validado (mínimo de 4.5:1).
- Estrutura HTML 100% semântica (`<main>`, `<nav>`, `<article>`, `<fieldset>`).

### 4. Validação e Otimização
- **Validação de Formulário** avançada (client-side) com Regex para Email/CPF e feedback de erro em tempo real.
- **Otimização de Imagens:** Uso da tag `<picture>` e formato `.webp` para performance.
