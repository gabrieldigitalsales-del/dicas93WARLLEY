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

## Alterações feitas

- Corrigido o campo de data: agora usa seletor nativo de data (`type="date"`) e não quebra a tela caso a data esteja vazia/inválida.
- Lista de campeonatos expandida com os campeonatos enviados nas capturas, mantendo país/região e bandeira correspondente.
- Mantida a opção de digitar times manualmente em campeonatos sem lista de clubes cadastrada.

## Rodar no Termux

Salve o ZIP em Downloads e rode:

```bash
pkg update -y
pkg install -y unzip nodejs
ZIP="$HOME/storage/downloads/dicas93WARLLEY-modificado.zip"
DEST="$HOME/dicas93tv"
rm -rf "$DEST"
mkdir -p "$DEST"
unzip -q "$ZIP" -d "$DEST"
cd "$DEST/dicas93WARLLEY-main"
npm install
npm run dev -- --host 0.0.0.0
```

Depois abra no navegador:

```text
http://localhost:5173
```

Se o arquivo estiver em outra pasta, ajuste apenas o caminho da variável `ZIP`.
