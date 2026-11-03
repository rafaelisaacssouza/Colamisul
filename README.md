# Colamisul — site em HTML/CSS/JS puro

Recriação completa do site com os mesmos textos e imagens, sobre um grid de 12 colunas.

## Estrutura
- `src/data/` — todo o conteúdo (páginas, 13 produtos com tabela nutricional, 8 receitas, 20 presidentes, 4 informativos, notícia, política)
- `src/assets/css/style.css` — estilos e componentes
- `src/assets/js/main.js` — menu, dropdown, filtros, formulário, smooth scroll (Lenis) e animações (GSAP + ScrollTrigger)
- `src/assets/vendor/` — Lenis 1.1.13 e GSAP 3.12.5 servidos localmente
- `src/assets/img/` — logo (texto verde p/ fundo claro, branca p/ fundo escuro) e selo Coop
- `src/assets/fonts/` — fonte Brume (local, evita bloqueio de CORS)
- `build.js` — gera `dist/` (e o `grid.css`)
- `dist/` — site pronto para subir

## Comandos
- `npm run build` → URLs limpas (`/produtos/`), para servidor
- `npm run build:local` → links relativos, abre direto do disco
- `npm run dev` → build + servidor local

## Grid
| Faixa | Colunas | Gutter | Margem |
|---|---|---|---|
| Mobile < 768 | 4 | 16px | 20px |
| Tablet ≥ 768 | 8 | 24px | 32px |
| Desktop ≥ 1024 | 12 | 24px | container 1280px |

`<div class="grid"><div class="s-4 m-4 l-6 l-start-7">…</div></div>` — `s-*` mobile, `m-*` tablet, `l-*` desktop, `*-start-N` coluna inicial. Sem classe = linha inteira. Adicione `?grid` na URL para ver a grade sobreposta.

## Pendências
- Logo, selo e fonte Brume já são locais. As demais imagens ainda apontam para `colamisul.inoveweb.com.br/wp-content/uploads/` — baixar para `assets/img` antes de desligar o WordPress.
- Formulário abre o e-mail (mailto). Ligar a um backend/serviço de formulário se quiser envio direto.
- `.htaccess` redireciona as URLs antigas de `/_produtos/`, `/_presidente/` e `/informativos/`.

## Cores e contraste
- `--green` (#007A2F) é o verde de texto/botões: 5,5:1 com branco. O verde original (#009E3D) virou `--green-brand`, só decorativo.
- `--lime` (#82BB26) é só decorativo; títulos "limão" usam `--lime-ink` (#5C8A12).
- Animações e Lenis desligam sozinhos com "reduzir movimento" ativado no sistema.
