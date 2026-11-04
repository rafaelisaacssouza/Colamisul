# Colamisul — site em HTML/CSS/JS puro

Recriação completa do site com os mesmos textos e imagens, sobre um grid de 12 colunas.

## Estrutura
- **Raiz** — o site pronto (index.html, páginas, assets/). É o que o GitHub Pages publica direto da branch main.
- `_fonte/src/data/` — todo o conteúdo (páginas, produtos, receitas, presidentes, informativos, notícia, política)
- `_fonte/src/assets/` — CSS, JS, fontes, logos, bibliotecas (Lenis, GSAP) e imagens em `uploads/`
- `_fonte/build.js` — gera o site na raiz. Apaga só o que ele mesmo gerou (lista em `_fonte/.gerados.json`).

**Não edite os HTML da raiz à mão:** altere `_fonte/` e rode `npm run build`.

## Comandos
- `npm run build` → gera o site na raiz com links relativos (GitHub Pages e abrir direto do disco)
- `npm run build:servidor` → URLs limpas (`/produtos/`) para servidor na raiz do domínio
- `npm run dev` → build + servidor local

Para publicar: `npm run build`, commit e push.

## Grid
| Faixa | Colunas | Gutter | Margem |
|---|---|---|---|
| Mobile < 768 | 4 | 16px | 20px |
| Tablet ≥ 768 | 8 | 24px | 32px |
| Desktop ≥ 1024 | 12 | 24px | container 1280px |

`<div class="grid"><div class="s-4 m-4 l-6 l-start-7">…</div></div>` — `s-*` mobile, `m-*` tablet, `l-*` desktop, `*-start-N` coluna inicial. Sem classe = linha inteira. Adicione `?grid` na URL para ver a grade sobreposta.

## Pendências
- Imagens são locais (_fonte/src/assets/uploads). Os 4 PDFs dos informativos ainda vêm do servidor antigo (inoveweb), por serem grandes demais (142 MB).
- Formulário abre o e-mail (mailto). Ligar a um backend/serviço de formulário se quiser envio direto.
- `.htaccess` redireciona as URLs antigas de `/_produtos/`, `/_presidente/` e `/informativos/`.

## Cores e contraste
- `--green` (#007A2F) é o verde de texto/botões: 5,5:1 com branco. O verde original (#009E3D) virou `--green-brand`, só decorativo.
- `--lime` (#82BB26) é só decorativo; títulos "limão" usam `--lime-ink` (#5C8A12).
- Animações e Lenis desligam sozinhos com "reduzir movimento" ativado no sistema.
