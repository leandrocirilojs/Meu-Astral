# ✨ Oráculo Astral — PWA

App de consulta astral com IA (Mistral), instalável como app nativo.

## 📁 Estrutura

```
oraculo-astral-pwa/
├── index.html        ← App principal
├── manifest.json     ← Manifesto PWA
├── sw.js             ← Service Worker (cache offline)
└── icons/            ← Ícones para todos os dispositivos
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

## 🚀 Como hospedar (OBRIGATÓRIO para PWA funcionar)

PWA **não funciona** aberto como arquivo local. Precisa de HTTPS.

### Opção 1 — Netlify (gratuito, mais fácil)
1. Acesse https://netlify.com e crie uma conta
2. Arraste a pasta `oraculo-astral-pwa` para o painel
3. Pronto! Você receberá uma URL https://xxx.netlify.app

### Opção 2 — Vercel (gratuito)
1. Acesse https://vercel.com
2. Clique em "Add New → Project"
3. Faça upload da pasta ou conecte ao GitHub
4. Deploy automático com HTTPS

### Opção 3 — GitHub Pages (gratuito)
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings → Pages → Branch: main
4. URL: https://seuusuario.github.io/oraculo-astral

### Opção 4 — Firebase Hosting (gratuito)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📱 Como instalar no celular

### Android (Chrome):
- Acesse a URL do app
- Chrome mostra banner "Adicionar à tela inicial"
- Ou: menu ⋮ → "Adicionar à tela inicial"

### iPhone (Safari):
- Acesse a URL no Safari
- Toque em Compartilhar (□↑)
- "Adicionar à Tela de Início"
- Toque em "Adicionar"

## ⚙️ Personalização

Para trocar a chave da API Mistral, edite no `index.html`:
```js
const MISTRAL_KEY = "sua-chave-aqui";
```

---
Feito com ✨ Mistral AI + Canvas API
