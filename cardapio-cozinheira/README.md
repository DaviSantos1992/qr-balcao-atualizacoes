# Cardápio da Cozinha

Protótipo visual (pt-BR) para cozinheira que vende marmitas, bebidas, doces e outros produtos.

## O que faz

- **Produtos** — CRUD com nome, preço, foto (upload ou URL) e categoria
- **Cardápio** — seleção semanal por categoria
- **Enviar** — prévia formatada + WhatsApp (`wa.me`) e copiar texto

Dados ficam no `localStorage` (sem backend). Na primeira abertura, produtos de exemplo são carregados.

## Como rodar

```bash
cd cardapio-cozinheira
npm install
npm run dev
```

Abra o endereço do Vite (geralmente `http://localhost:5173`).

```bash
npm run build   # build de produção
npm run preview # prévia do build
```

## Stack

Vite + React + TypeScript
