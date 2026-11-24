# Site da A.R Systems

Site institucional de uma tela só (`arsystems.com.br`), que mostra quem é o João e os serviços: sistema de agendamento, emissor de fluxograma, automações e landing pages. HTML, CSS e JavaScript puro, sem build. Responda em português do Brasil, num tom direto e informal.

## Arquivos

| Arquivo | Papel |
| --- | --- |
| `index.html` | A página inteira. Os contatos e as janelas já vêm escritos no HTML, para funcionar sem JavaScript |
| `config.js` | **Contatos** (WhatsApp, mensagem pronta, Instagram e GitHub). Mudou aqui, troque também no `index.html` (busque `PREENCHER`) |
| `estilo.css` | Visual. Cores, tamanhos de letra e a velocidade do deslize (`--deslize`) ficam nos tokens do `:root` |
| `site.js` | Preenche os contatos, abre e fecha as janelas (guardando a aberta no endereço) e amplia os prints num `<dialog>` |
| `imagens/` | Prints reais: agenda da Santiago (`painel-agenda`, `agendar-capa`, com dados de exemplo num banco rascunho), emissor de fluxograma (`fluxograma-*`, com o processo de exemplo que vem no sistema) e página de links (`links-*`, o modelo do `../link_page` com a cliente fictícia Maria Souza, em 4 temas) |

## Como está montado

- Começou do protótipo do João (`~/Desenhos/Prototipo_arsystems.vectorcraft`, 22/11/2026) e, no mesmo dia, ele pediu mais moderno e chamativo, **roxo no lugar do laranja** (é a cor favorita dele) e as seções como **janelas que deslizam**.
- **Janelas** (`.janela`, `data-janela`): dois níveis. Em cima, "Quem somos" (`sobre`) e "Nossos serviços" (`servicos`, o grupo); dentro do grupo, `agendamento`, `fluxograma`, `automacoes` e `sites`. Em cada nível fica **uma aberta só**. Fechada, a janela é uma faixa com o nome; aberta, ocupa o resto.
  - **Computador (≥900px)**: faixas em pé, lado a lado; a janela desliza na horizontal (anima o `flex`) e tudo cabe numa tela (`100svh`); o conteúdo rola por dentro.
  - **Celular e tablet (<900px)**: as mesmas janelas empilhadas, abrindo para baixo (anima `grid-template-rows` de `0fr` a `1fr`).
  - O `site.js` marca `.aberta`, `aria-expanded` e `inert` (o que está fechado não pega foco) e guarda a janela no endereço (`#sobre`, `#fluxograma`...). Os nomes do endereço **não** são `id` de elemento de propósito, para o navegador não rolar as janelas sozinho.
  - Sem JavaScript (ou se o `site.js` não confirmar com a classe `janelas-ok` em 3 s), tudo aparece aberto e empilhado.
- **Sem cara de IA** (22/11/2026, passado pela skill `design-taste-frontend`, `lint.mjs` e `inspect.mjs` com `--allow purple` porque o roxo é a marca): nada de degradê, brilho/sombra, contorno fino, numeração 01/02, selo em pílula, texto em degradê, cantos arredondados ou quadro "em breve". Superfícies se separam por degrau de tom. Antes de mexer no visual, rode os dois de novo.
- Cores (chapadas, no `:root`): roxo `#5a17d6` (marca, de propósito diferente do violeta padrão do Tailwind), tinta `#150d22`, fundo `#f1eff4`, folha branca, faixa fechada `#e1dce9`. Fonte Schibsted Grotesk, cinco tamanhos.
- Faixa aberta: serviço = roxo, com o conteúdo na folha branca; "Nossos serviços" aberto = tinta; "Quem somos" aberto = a janela inteira vira campo roxo.
- Cada serviço tem a sua vitrine (`.vitrine--agenda`: painel largo que passeia devagar + celular; `--fluxo`: tela inteira + três painéis; `--sites`: quatro celulares). Automações não tem print (o monitor é do Sicredi): é só frase grande e um botão para o WhatsApp. Vitrine estreita se rearruma por container query no `.janela__miolo`.
- Movimento: as janelas e o topo entram em sequência na carga (`--i`), as peças `.entra` sobem uma depois da outra quando a janela abre (`--n`, posto pelo `site.js`). Tudo com `prefers-reduced-motion`.
- Topo: logo, "A.R Systems", ícones de Instagram e GitHub (Simple Icons, CC0, num `<svg>` sprite no começo do `<body>`) e o botão roxo "Entre em contato" (WhatsApp). No celular o botão desce para uma linha inteira.
- Para pôr um print: `<li class="entra"><a class="quadro" href="imagens/x.jpg" data-ampliar><img src="imagens/x.jpg" width=".." height=".." loading="lazy" alt="O que aparece no print"></a></li>` dentro da vitrine. O `alt` vira a legenda do print ampliado. Print com nome de gente precisa ser de exemplo e dizer isso numa `.servico__nota`.
- Sem formulário e sem cookie: o contato é por WhatsApp e Instagram.
- **O João quer o site enxuto** (15/11/2026: "muita informação"). Antes de acrescentar seção ou texto, pergunte.
- A versão de 15/11 (página branca e laranja que rolava, com a caixa "Escreva o nome do seu negócio", o caso Santiago e as dúvidas) está guardada em `../ar_systems-versao-2026-11-15/`.

## Para ver

```bash
python3 -m http.server 8079   # e abra http://127.0.0.1:8079
```

O `inspect.mjs` da skill não acha o Brave do Flatpak sozinho: crie um script com `exec flatpak run --filesystem=/tmp com.brave.Browser "$@"` e passe o caminho dele em `CHROME_PATH`.

## Pendências antes de pôr no ar

- WhatsApp e Instagram reais no `config.js` e no `index.html` (hoje estão provisórios).
- Foto do João (`imagens/joao.jpg`) e o logo de verdade no lugar dos blocos "JG" e "AR" (busque `PREENCHER` no `index.html`).
- Prints de automações: só de projeto que possa ser mostrado (o monitor do Sicredi só com autorização de lá).
- Conferir os dois parágrafos de "Quem somos" (marcados como RASCUNHO) e a linha de cada serviço.
- A fonte vem do Google Fonts (o navegador do visitante fala com o Google). Se quiser zero terceiros, baixar a fonte para uma pasta local.
- Publicar no domínio raiz `arsystems.com.br` (hoje o DNS tem só o curinga dos clientes apontando para a VPS).
