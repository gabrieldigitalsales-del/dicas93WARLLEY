# Dicas93 na TV - Gerador de Feed

Versao corrigida da exportacao PNG.

## O que foi corrigido

- O botao Exportar PNG nao usa mais a previa visual da tela.
- A imagem e desenhada em um canvas real de 1080 x 1350 px.
- Isso evita texto sobreposto, escala errada e area vazia no PNG final.
- Mantem o layout com paleta verde/amarela inspirada em casas de odds.
- Mantem campeonato pesquisavel, rodada pesquisavel, horario pesquisavel, odds e transmissao digitavel.

## Rodar localmente

```bash
npm install
npm run dev
```

## Gerar build

```bash
npm run build
```

## Vercel

- Framework Preset: Vite
- Build Command: npm run build
- Output Directory: dist

## Observacao

A exportacao PNG e feita via Canvas API nativa do navegador, sem depender de html2canvas ou html-to-image.
