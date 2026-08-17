
# LV Concierge - MVP de Viagens Ultraluxo

## Visão Geral
Um aplicativo de viagens ultraluxo com estética "Quiet Luxury" - minimalista, elegante e exclusivo. Interface em tons de dourado champagne, preto fosco e muito espaço em branco, com tipografia sans-serif moderna.

---

## 🎨 Design System

**Cores:**
- Dourado Champagne (#C9A962) - Acentos e detalhes premium
- Preto Fosco (#1A1A1A) - Textos principais e backgrounds elegantes
- Branco Neve (#FAFAFA) - Espaços negativos
- Cinza Seda (#8B8B8B) - Textos secundários

**Tipografia:**
- Fonte principal: Inter (sans-serif moderna)
- Títulos com peso light/regular para elegância
- Espaçamento generoso entre letras

**Efeitos:**
- Glassmorphism sutil em menus e cards
- Animações suaves de hover (escala e opacidade)
- Transições fluidas entre páginas (fade/slide)

---

## 📱 Telas do MVP

### 1. Tela de Login (Estilo Convite VIP)
- Design minimalista tipo "convite exclusivo"
- Logo LV Concierge com animação sutil de entrada
- Opções: Email/senha e Google Sign-In
- Texto de boas-vindas: "Você foi convidado"
- Fundo escuro com detalhes dourados

### 2. Dashboard Principal
- Header clean com logo e avatar do usuário
- **Bottom Navigation Bar** com 4 abas:
  - Transportes ✈️
  - Concierge 💬
  - Hospedagem 🏨
  - The Vault 🔐

### 3. Transportes (Jatinhos & Helicópteros)
- Cards elegantes com fotos das aeronaves
- Seletor de origem/destino minimalista
- Filtros: tipo de aeronave, capacidade
- Visualização de modelos disponíveis (Gulfstream, Sikorsky, etc.)
- Botão "Solicitar Cotação"

### 4. IA Concierge (Chat)
- Interface de chat elegante e espaçosa
- Avatar minimalista do assistente
- Mensagens com fundo glassmorphism
- Input fixo no rodapé
- Sugestões rápidas: "Criar roteiro", "Reservar experiência"
- **Integração real com Lovable AI**

### 5. Hospedagem High-End
- Grid de propriedades exclusivas
- Cards com galeria de fotos (carousel)
- Localização, capacidade, preço por noite
- Badges: "Members Only", "New", "Top Rated"

### 6. The Vault (Comunidade)
- Feed vertical estilo social exclusivo
- Posts anônimos com pseudônimos elegantes (ex: "The Collector", "Azure Nomad")
- Destinos em destaque: Aspen, St. Tropez, Maldives
- Botão flutuante para criar novo insight
- Interações: like (ícone discreto) e comentários

---

## ⚙️ Funcionalidades Técnicas

**Backend (Lovable Cloud):**
- Autenticação via Supabase Auth (email + Google)
- Banco de dados para posts do The Vault
- Perfis de usuário com pseudônimos

**IA Concierge:**
- Integração com Lovable AI (Gemini)
- Chat streaming em tempo real
- Contexto de viagens luxury

**Interatividade:**
- Animações de hover em todos os botões
- Transições de página com fade
- Estados de loading elegantes (skeleton com gradiente)
- Pull-to-refresh no feed

---

## 📋 Ordem de Implementação

1. **Setup do Design System** - Cores, fontes, componentes base
2. **Tela de Login VIP** - Layout + autenticação funcional
3. **Layout Principal** - Bottom navigation + estrutura
4. **Dashboard de Transportes** - Cards e seletor de rotas
5. **The Vault** - Feed + criação de posts
6. **IA Concierge** - Interface de chat + integração IA
7. **Hospedagem** - Cards e galerias

---

## 📊 Dados Iniciais

O app virá com dados de exemplo para demonstração:
- 6 aeronaves (jatinhos e helicópteros)
- 8 propriedades de luxo
- 10 posts iniciais no The Vault com pseudônimos elegantes
