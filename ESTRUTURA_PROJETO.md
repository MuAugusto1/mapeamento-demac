# Estrutura do Projeto React - Mapeamento DEMAC

## 📁 Estrutura de Pastas

```
src/
├── components/           # Componentes React
│   ├── InicioPage.js    # Tela inicial (splash screen)
│   ├── HomePage.js      # Tela principal com sidebar
│   ├── AboutPage.js     # Tela "Sobre"
│   ├── HelpPage.js      # Tela "Ajuda"
│   └── HelpCard.js      # Componente de card reutilizável
├── styles/              # Arquivos CSS
│   └── App.css          # Estilos principais da aplicação
├── App.js               # Componente raiz com gerenciamento de rotas
├── index.js             # Ponto de entrada da aplicação
└── index.css            # Estilos globais básicos
```

## 🔧 Componentes

### App.js
- **Responsabilidade**: Gerencia o estado da aplicação e navegação entre telas
- **Estado**: `telaAtual` - controla qual tela está sendo exibida
- **Função**: `navegarPara(tela)` - navega entre as telas

### InicioPage.js
- **Responsabilidade**: Tela inicial (splash screen) com botão "Continuar"
- **Props**: 
  - `aoContinuar`: callback executado ao clicar em "Continuar"

### HomePage.js
- **Responsabilidade**: Tela principal com header, sidebar e área de conteúdo
- **Props**: 
  - `navegarPara`: função para navegar para outras telas
- **Estado Interno**:
  - `sidebarExpanded`: controla se o sidebar está expandido
  - `activeMenuItem`: item ativo do menu
  - `sidebarMode`: modo do sidebar ('main', 'search', 'categories')
  - `searchTerm`: termo de busca
  - `activeSearchItem`: item ativo na busca
  - `activeCategoryItem`: categoria ativa

### AboutPage.js
- **Responsabilidade**: Tela "Sobre" com timeline de informações
- **Props**: 
  - `navegarPara`: função para voltar à tela home

### HelpPage.js
- **Responsabilidade**: Tela "Ajuda" com cards informativos
- **Props**: 
  - `navegarPara`: função para voltar à tela home
- **Componentes internos**: Define ícones SVG para os cards

### HelpCard.js
- **Responsabilidade**: Card reutilizável para a tela de ajuda
- **Props**: 
  - `icon`: componente de ícone SVG
  - `color`: cor do card
  - `title`: título do card
  - `text`: texto descritivo

## 🎨 Estilos

### Variáveis CSS (App.css)
```css
--cor-primaria: #1DADEE      /* Azul principal */
--cor-secundaria: #000000    /* Preto */
--cor-texto: #FFFFFF         /* Branco */
--cor-menu-ativo: #2E2E48    /* Cinza escuro para item ativo */
--cor-fundo-ativo-claro: rgba(0, 0, 0, 0.1)
```

### Principais Classes CSS
- `.inicio-page-root`: Container da tela inicial
- `.home-page-root`: Container da tela home
- `.sidebar`: Menu lateral (expansível)
- `.content-area`: Área de conteúdo principal
- `.about-timeline`: Timeline da página Sobre
- `.help-card`: Card da página Ajuda

## 🚀 Como Usar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**:
   ```bash
   npm start
   ```

3. **Build para produção**:
   ```bash
   npm run build
   ```

## 📋 Funcionalidades

### Navegação
- **Tela Inicial → Home**: Botão "Continuar"
- **Home → Sobre/Ajuda**: Itens do sidebar
- **Sobre/Ajuda → Home**: Botão "Voltar"

### Sidebar (HomePage)
- **Recolhido**: Mostra apenas ícones (80px)
- **Expandido**: Mostra ícones + texto (200px)
- **Modo Busca**: Expandido com campo de busca (250px)
- **Modo Categorias**: Expandido com campo de categorias (250px)

### Interações
- Clicar no sidebar recolhido o expande
- Clicar em "Buscar" ou "Categorias" ativa modos especiais
- Botão de voltar retorna ao modo principal mantendo sidebar expandido