// Conteúdo extraído de colamisul.inoveweb.com.br (textos e imagens originais)
const U = '/assets/uploads/'; // imagens baixadas do site antigo (src/assets/uploads)
// PDFs dos informativos ainda no servidor antigo (arquivos grandes demais para o repositório)
const PDF = 'https://colamisul.inoveweb.com.br/wp-content/uploads/';

module.exports = {
  U,
  site: {
    name: 'Colamisul',
    fullName: 'Cooperativa de Laticínios de Mimoso do Sul',
    tagline: 'Qualidade que vem do coração',
    slogan: 'Laticínios que vem da cooperação, desde 1954.',
    logo: '/assets/img/logo-colamisul.png',          // texto verde, para fundos claros
    logoBranca: '/assets/img/logo-colamisul-branca.png', // texto branco, para fundos escuros
    seloCoop: '/assets/img/selo-somoscoop.png',
    cnpj: '27.867.936/0001-70',
    phones: ['(28) 3333-1499', '(28) 99923-4485'],
    email: 'contato@colamisul.coop.br',
    address: 'Rodovia Rubens Rangel, Nº 449, Mimoso do Sul - ES, 29.400-000',
    instagram: 'https://www.instagram.com/colamisul.laticinios',
    instagramHandle: '@colamisul.laticinios',
    facebook: 'https://www.facebook.com/profile.php?id=61564164694054', // do PDF de ajustes da agência
    whatsapp: 'https://wa.me/28999234485',
    // Catálogo em PDF (seção na página de produtos). Ex.: '/arquivos/catalogo-colamisul.pdf'.
    // Enquanto estiver vazio, o botão aparece desativado.
    catalogo: '',
    mapEmbed: 'https://www.google.com/maps?q=Rodovia+Rubens+Rangel,+449,+Mimoso+do+Sul+-+ES&output=embed',
  },

  nav: [
    { label: 'A Empresa', children: [
      { label: 'Nossa história', href: '/nossa-historia/' },
      { label: 'Presidentes', href: '/presidentes/' },
      { label: 'Missão, Visão e Valores', href: '/missao-visao-e-valores/' },
      { label: 'Responsabilidade Social e Ambiental', href: '/responsabilidade-social-e-ambiental/' },
    ]},
    { label: 'Informações Gerais', href: '/informacoes-gerais/' },
    { label: 'Produtos', href: '/produtos/' },
    { label: 'Informativo Colamisul', href: '/informativo-colamisul/' },
    { label: 'Pontos de vendas', href: '/pontos-de-vendas/' },
    { label: 'Serviços ao Cooperado', href: '/servicos-ao-cooperado/' },
    { label: 'Receitas', href: '/receitas/' },
    { label: 'Contato', href: '/contato/' },
  ],

  banners: {
    home: { desktop: U + '2026/01/produtos.webp', mobile: U + '2026/01/capa-produtos.mobile-.jpg.jpeg' },
    informacoes: U + '2026/07/Banner-informacoes-gerais.webp',
    contato: U + '2026/01/janela-colamisul-plimper.jpg.jpeg',
    receitas: U + '2026/01/capa-receitas.jpg.jpeg',
    privacidade: U + '2024/09/Banner-produtos-1.jpg',
    pontos: U + '2026/07/Banner-pontos-de-venda.webp',
    mapaPontos: U + '2026/08/Mapa-Pontos-de-Venda.webp',
    servicos: U + '2026/07/Banner-servicos-ao-cooperado.webp',
    produtos: U + '2026/01/Colamisul-produtos-site.jpg.jpeg',
    presidentes: U + '2026/08/Site-fachada-2560.webp',
    mvv: U + '2026/07/Banner-missao-visao-e-valores.webp',
    mvvVertical: U + '2026/07/Banner-Missao-visao-e-valores-vertical.webp',
    responsabilidade: U + '2026/07/Responsabilidade.webp',
    responsabilidade2: U + '2026/01/capa-pontos-de-venda.-mobile-.jpg.jpeg',
    informativos: U + '2026/07/Banner-informativos.webp',
    veterinaria: U + '2026/07/veterinaria-colamisul.webp',
    assistencia: U + '2026/07/banner-Servicos-e-Assistencia-Tecnica.webp',
    erro: U + '2023/07/error-img.png',
    historiaArte: U + '2026/01/capa-abaixo-dos-banners-da-home._Prancheta-1.svg',
  },

  historia: {
    video: 'n13HjpLI0wg', // vídeo do YouTube no topo de /nossa-historia/
    intro: [
      'A Colamisul nasceu do sonho coletivo de produtores agropecuários que acreditavam na força da união para transformar realidades.',
      'Em 24 de janeiro de 1954, em Mimoso do Sul – ES, foi fundada a Cooperativa de Laticínios de Mimoso do Sul com um objetivo claro: fortalecer o setor leiteiro local por meio da organização produtiva, do ganho de escala e da criação de uma estrutura justa, sustentável e próspera para todos.',
    ],
    rest: [
      'Na época, o café ainda dominava a paisagem agrícola da região, mas a vocação leiteira começava a nascer em terras antes pouco aproveitadas. Com o crescimento da pecuária, surgia também a necessidade de dar destino à produção de leite e foi aí que a Colamisul teve sua operação iniciada, investindo em estrutura, logística e industrialização. A primeira usina de laticínios entrou em operação em 1959, marcando o início de uma trajetória que uniu campo e cidade, tradição e futuro.',
      'Com a fundação da cooperativa, veio também o investimento em infraestrutura e logística. Em 1956, a instalação da usina de laticínios já estava quase concluída, e, a partir de 1959, a Colamisul passou a industrializar e comercializar leite e derivados em escala regional. Em pouco tempo, a produção local ganhou mercado no norte fluminense e, em 1961, praticamente todo o leite de Mimoso do Sul já era comercializado pela cooperativa. Desde então, a cooperativa cresceu de forma sólida.',
      'Há mais de 70 anos, somos uma cooperativa, que atua lado a lado com produtores da Região Sul do Espírito Santo, oferecendo suporte técnico, estrutura e valorização justa da produção. Acreditamos que a origem importa, por isso, garantimos qualidade desde a fazenda até o ponto de venda, com rastreabilidade, cuidado e compromisso em cada etapa.',
      'O que nos move é o comprometimento em construir um futuro mais justo, sustentável e saboroso para todos.',
    ],
    marcos: [
      { ano: '1954', txt: 'Fundação da Cooperativa de Laticínios de Mimoso do Sul, em 24 de janeiro.' },
      { ano: '1956', txt: 'Instalação da usina de laticínios quase concluída.' },
      { ano: '1959', txt: 'A primeira usina entra em operação: início da industrialização e comercialização.' },
      { ano: '1961', txt: 'Praticamente todo o leite de Mimoso do Sul já era comercializado pela cooperativa.' },
    ],
  },

  mvv: [
    { n: '1', t: 'Missão', d: 'Industrializar e comercializar leite e derivados com procedência garantida, apoiando o produtor com assistência técnica, preço justo e benefícios sociais, ao mesmo tempo em que entrega ao consumidor alimentos saudáveis, saborosos e de confiança.' },
    { n: '2', t: 'Visão', d: 'Ser referência em cooperativismo agroindustrial no Espírito Santo e no Brasil, reconhecida pela qualidade dos seus produtos, pelo impacto positivo na vida dos cooperados e pela contribuição ao desenvolvimento sustentável da região Sul Capixaba e Norte Fluminense.' },
    { n: '3', t: 'Valores', list: [
      ['Cooperação', 'acreditar na força da união para transformar vidas.'],
      ['Qualidade', 'garantir alimentos seguros, frescos e saborosos, do campo à mesa.'],
      ['Justiça', 'valorizar o trabalho do produtor e oferecer preço justo a todos.'],
      ['Cuidado', 'apoiar cooperados, colaboradores e comunidades com respeito e solidariedade.'],
      ['Sustentabilidade', 'preservar a terra, as tradições e o futuro das próximas gerações.'],
      ['Simplicidade com verdade', 'comunicar e agir de forma transparente e próxima.'],
    ]},
  ],

  responsabilidade: {
    titulo: 'Produzir com qualidade também é cuidar das pessoas, da terra e do futuro',
    ambiental: [
      'Na Colamisul, seguimos rigorosos padrões ambientais em todas as etapas da nossa produção, mantendo o compromisso com uma atuação responsável, sustentável e alinhada aos valores do cooperativismo.',
      'Há décadas, investimos continuamente em práticas que promovem o uso consciente dos recursos naturais, a preservação do meio ambiente e a segurança dos alimentos que chegam à mesa dos consumidores. Entre as nossas iniciativas, contamos com uma Estação de Tratamento de Efluentes, responsável pelo tratamento da água utilizada em nossos processos industriais, contribuindo para a proteção dos recursos hídricos e para uma produção mais sustentável.',
      'Em 2007, construímos um poço artesiano com 90 metros de profundidade para abastecer nosso pátio industrial e realizar o pré-tratamento da água utilizada no processo de fabricação. Toda essa água é monitorada constantemente para garantir qualidade e segurança em cada etapa de produção.',
      'Também adotamos práticas de reuso racional da água e aproveitamento da água da chuva, com a instalação de reservatórios capazes de armazenar até 50 mil litros. Além disso, os resíduos sólidos gerados em nossa produção passam por processos de separação e recebem destinação ambientalmente correta por meio de reciclagem em empresas credenciadas especializadas.',
      'Buscando assegurar ainda mais qualidade e segurança alimentar, implantamos importantes ferramentas de controle e monitoramento da matéria-prima e da produção, como o Autocontrole e o APPCC (Análise de Perigos e Pontos Críticos de Controle), sistema internacionalmente reconhecido por garantir alimentos mais seguros e processos rigorosamente monitorados.',
      'Produzir laticínios com responsabilidade também significa contribuir para o desenvolvimento sustentável da nossa região, respeitando nossas origens, apoiando nossos cooperados e cuidando do futuro das próximas gerações. Afinal, acreditamos que a verdadeira qualidade nasce do cuidado com a vida, com as pessoas e com o meio ambiente.',
    ],
    destaques: [
      { n: '90 m', t: 'Poço artesiano construído em 2007 para abastecer o pátio industrial' },
      { n: '50 mil L', t: 'Capacidade de armazenamento de água da chuva' },
      { n: 'APPCC', t: 'Autocontrole e Análise de Perigos e Pontos Críticos de Controle' },
    ],
    coopTitulo: 'Cooperativismo e compromisso com a sociedade',
    coop: [
      'Cooperar é crescer juntos. Como cooperativa, nosso papel vai além da produção de alimentos: trabalhamos diariamente para fortalecer o desenvolvimento econômico, social e humano das comunidades das quais fazemos parte.',
      'O cooperativismo é um modelo baseado na união de pessoas que compartilham objetivos, responsabilidades e conquistas. Por meio dele, produtores, colaboradores e comunidade caminham lado a lado, construindo relações mais justas, sustentáveis e colaborativas.',
    ],
    principiosIntro: 'Nossa atuação é guiada pelos sete princípios do cooperativismo, que orientam nossas decisões e reforçam nosso compromisso com as pessoas e com a sociedade:',
    principios: ['Adesão voluntária e livre', 'Gestão democrática pelos membros', 'Participação econômica dos cooperados', 'Autonomia e independência', 'Educação, formação e informação', 'Intercooperação', 'Interesse pela comunidade'],
    fechamento: 'Esses princípios fazem parte da nossa essência e estão presentes em cada ação da Colamisul. Apoiamos os produtores rurais, incentivamos o desenvolvimento local, geramos empregos, fortalecemos a economia regional e valorizamos práticas sustentáveis que contribuem para um futuro melhor para todos. Acreditamos que quando uma cooperativa cresce junto com sua comunidade, todos evoluem juntos. Por isso, seguimos construindo relações baseadas na confiança, no cuidado e na força da cooperação.',
  },

  servicos: {
    titulo: 'Cuidar do cooperado é fortalecer o campo e o futuro da nossa região.',
    intro: 'Estamos presentes em diferentes segmentos que apoiam o desenvolvimento, a produtividade e o dia a dia das famílias no campo.',
    loja: {
      t: 'Loja Veterinária Colamisul',
      d: 'Nossa Loja Veterinária oferece medicamentos, suplementos, insumos e produtos agropecuários com condições especiais para cooperados, incluindo descontos e parcelamentos diferenciados.',
      endereco: ['Rua Espírito Santo, nº 260', 'Mimoso do Sul - ES', 'CEP: 29.400-000'],
      contato: ['27.867.936/0005-02', '(28) 3333-1354', '(28) 99917-1636'],
    },
    assistencia: {
      t: 'Serviços e Assistência Técnica',
      d: 'A Colamisul também oferece serviços de trator e retroescavadeira com preço subsidiado, utilizados principalmente para:',
      list: ['Forrageiras para confecção de silagens', 'Limpeza de valas', 'Aração de terra para formação de pastagens'],
      d2: 'Os cooperados também contam com suporte técnico de médicos veterinários, agrônomos e parcerias com o SEBRAE, com parte dos custos subsidiados pela cooperativa. Nosso objetivo é levar mais conhecimento, eficiência e apoio ao produtor rural, contribuindo para o aumento da produtividade e o fortalecimento das famílias no campo.',
    },
  },

  pontos: {
    titulo: 'Pontos de venda',
    d: 'Leve nossos produtos para seu ponto de venda ou rede de distribuição e conquiste seus clientes com alimentos que unem qualidade, origem e propósito.',
  },

  presidentes: [
    ['clarindo-lino-da-silveira', 'Clarindo Lino da Silveira', '2026/06/01-Clarindo-Lino-da-Silveira-25X30-x.jpg'],
    ['alberto-baptista-da-cunha', 'Alberto Baptista da Cunha', '2026/06/02-Alberto-Baptista-da-Cunha-25X30-x.jpg'],
    ['sandoval-reis-portugal', 'Sandoval Reis Portugal', '2026/06/03-Sandoval-Reis-Portugal-25x30-x.jpg'],
    ['dr-olympio-jose-de-abreu', 'Dr Olympio José de Abreu', '2026/06/04-Dr-Olympio-Jose-de-Abreu-25X30-x.jpg'],
    ['cloves-rodrigues-de-barros', 'Cloves Rodrigues de Barros', '2026/06/05-Cloves-Rodrigues-de-Barros-25X30-x.jpg'],
    ['milton-paiva-goncalves', 'Milton Paiva Gonçalves', '2026/06/06-Milton-Paiva-Goncalves-25x30-x.jpg'],
    ['dalton-brum', 'Dalton Brum', '2026/06/07-Dalton-Brum-25x30-x.jpg'],
    ['joao-de-azevedo-lino', 'João de Azevedo Lino', '2026/06/08-Joao-de-Azevedo-Lino-25x30-x.jpg'],
    ['hilton-moulin', 'Hilton Moulin', '2026/06/09-Hilton-Moulin-25x30-x.jpg'],
    ['joaquim-perciano-de-oliveira', 'Joaquim Perciano de Oliveira', '2026/06/10-Joaquim-Perciano-de-Oliveira-25x30-x.jpg'],
    ['assad-nassur', 'Assad Nassur', '2026/06/11-Assad-Nassur-25x30-x.jpg'],
    ['julio-cesar-coimbra-de-resende', 'Julio César Coimbra de Resende', '2026/06/12-Julio-Cesar-Coimbra-de-Resende-25x30-x.jpg'],
    ['nilson-monteiro-da-silva', 'Nilson Monteiro da Silva', '2026/06/13-Nilson-Monteiro-da-Silva-25x30-x.jpg'],
    ['joaquim-p-g-gamboa', 'Joaquim P G Gamboa', '2026/06/14-Joaquim-P-G-Gamboa-25x30-x.jpg'],
    ['elio-mofati', 'Elio Mofati', '2026/06/15-Elio-Mofati-25x30-x.jpg'],
    ['francisco-beredas-gimenes', 'Francisco Beredas Gimenes', '2026/06/16-Francisco-Beredas-Gimenes-25x30-x.jpg'],
    ['silvinho-goncalves-belloti', 'Silvinho Gonçalves Belloti', '2026/06/17-Slvinho-Goncalves-Belloti-25x30-x.jpg'],
    ['jose-luiz-vivas', 'José Luiz Vivas', '2026/06/18-Jose-Luiz-Vivas-25x30-x.jpg'],
    ['jose-antonio-martins-alves', 'José Antonio Martins Alves', '2026/06/19-Jose-Antonio-Martins-Alves-25x30-x.jpg'],
    ['carlos-alberto-vivas-motta', 'Carlos Alberto Vivas Motta', '2026/06/20-Carlos-Alberto-Vivas-Motta-25x30-x.jpg'],
  ].map(([slug, nome, img], i) => ({ slug, nome, img: U + img, ordem: i + 1 })),

  // Diretoria e conselhos (págs. 23–24 do PDF da agência). Fotos em assets/img/diretoria/
  conselho: {
    diretoria: [
      { cargo: 'Presidente', nome: 'Carlos Alberto Vivas Motta', img: '/assets/img/diretoria/carlos-alberto-vivas-motta.webp' },
      { cargo: 'Vice-presidente', nome: 'Silvio Gonçalves Belloti', img: '/assets/img/diretoria/silvio-goncalves-belloti.webp' },
      { cargo: 'Diretor Secretário', nome: 'Marcelo Fonseca Mofati', img: '/assets/img/diretoria/marcelo-fonseca-mofati.webp' },
    ],
    administrativo: ['Flávio Ribeiro Constantino', 'Ildon Terra Lamis', 'Joaquim Adolpho Guedes Vivas', 'Leomárcio Menditi de Souza', 'Sandro de Oliveira Prúcoli'],
    fiscal: {
      efetivos: ['Giordani Carrari Porto', 'Marcos José Matieli da Silva', 'Maurício Elias Bernardes'],
      suplentes: ['Afrânio Barros Nogueira', 'Fernando Prúcoli Paiva', 'Roberto Carlos dos Santos Fontes'],
    },
  },

  // Ata de fundação (Nossa história): galeria "museu". Imagens em assets/img/atas/
  atas: [
    { n: '01', titulo: 'Folha 1', legenda: 'Abertura da Assembleia de Constituição da Sociedade Cooperativa de Laticínios de Mimoso do Sul' },
    { n: '02', titulo: 'Folha 2', legenda: 'Apresentação da proposta e leitura dos estatutos' },
    { n: '03', titulo: 'Folha 3', legenda: 'Aprovação dos estatutos e eleição dos primeiros dirigentes' },
    { n: '04', titulo: 'Folha 4', legenda: 'Encerramento, em 24 de janeiro de 1954, e assinaturas dos cooperados fundadores' },
    { n: '05', titulo: 'Nota da Diretoria', legenda: 'Homenagem da Diretoria Executiva 2025/2027 aos fundadores' },
  ].map(a => ({ ...a, img: `/assets/img/atas/ata-${a.n}.webp`, grande: `/assets/img/atas/ata-${a.n}-grande.webp` })),

  // ordem = ano * 100 + mês (ordenação entre anos). Jan–abr/2026: PDFs ainda no servidor antigo (muito grandes).
  informativos: [
    { slug: 'informativo-abril', t: 'Informativo – Abril 2026', ano: '2026', ordem: 202604, pdf: PDF + '2026/07/INFORMATIVO-ABRIL.pdf', capa: U + '2026/04/INFORMATIVO-ABRIL.jpg' },
    { slug: 'informativo-marco', t: 'Informativo – Março 2026', ano: '2026', ordem: 202603, pdf: PDF + '2026/07/INFORMATIVO-MARCO.pdf', capa: U + '2026/04/INFORMATIVO-MARCO.jpg' },
    { slug: 'informativo-fevereiro', t: 'Informativo – Fevereiro 2026', ano: '2026', ordem: 202602, pdf: PDF + '2026/07/INFORMATIVO-FEVEREIRO.pdf', capa: U + '2026/04/INFORMATIVO-FEVEREIRO.jpg' },
    { slug: 'informativo-janeiro', t: 'Informativo – Janeiro 2026', ano: '2026', ordem: 202601, pdf: PDF + '2026/07/INFORMATIVO-JANEIRO.pdf', capa: U + '2026/04/INFORMATIVO-JANEIRO.jpg' },
    // PDFs em /arquivos/informativos/<ano>/ (na raiz, fora do build, para não duplicar no repositório) e capas (1ª página) em assets/informativos/capas/
    ...[
      ['2026', [5, 6, 7, 8]],
      ['2025', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
    ].flatMap(([ano, meses]) => meses.map(m => {
      const nome = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][m - 1];
      const slug = `informativo-${nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()}-${ano}`;
      return { slug, t: `Informativo – ${nome} ${ano}`, ano, ordem: Number(ano) * 100 + m, pdf: `/arquivos/informativos/${ano}/${slug}.pdf`, capa: `/assets/informativos/capas/${slug}.jpg` };
    })),
  ],

  // Notícia (pág. 21 do PDF da agência): artigo da Plimper. corpo aceita texto (parágrafo),
  // { h } subtítulo, { ul: [...] } lista, { img, alt } imagem e { credito } nota final.
  noticias: [
    {
      slug: 'colamisul-qualidade-que-vem-do-coracao',
      url: '/2026/01/colamisul-qualidade-que-vem-do-coracao/',
      t: 'Colamisul: qualidade que vem do coração',
      data: 'Janeiro de 2026',
      img: '/assets/img/noticias/qualidade-que-vem-do-coracao/capa.webp',
      resumo: 'A força da Colamisul sempre esteve na relação entre cooperados, famílias, consumidores e território. Esse vínculo não é conceitual, é vivido.',
      original: 'https://plimdesign.com.br/blog/colamisul-qualidade-que-vem-do-coracao/',
      corpo: [
        'A Colamisul é uma marca construída a partir do compromisso diário. Antes de qualquer símbolo ou identidade visual, ela nasce do propósito que move pessoas a começarem todos os dias com responsabilidade, pertencimento e orgulho.',
        'Desde 1954, cada cooperado entrega mais do que leite. Entrega constância, cuidado contínuo e uma herança construída ao longo do tempo. Esse valor está no gesto repetido, na relação direta com a terra e nos processos conduzidos com atenção e respeito. A confiança que chega à mesa das famílias não é criada por discurso, mas por prática.',
        'O desafio apresentado à Plimper partiu exatamente desse ponto: como tornar visível aquilo que sempre esteve presente? Como estruturar uma identidade capaz de traduzir cooperação, proximidade e credibilidade em uma linguagem contemporânea, sem descaracterizar a essência da cooperativa?',
        'Mais do que criar uma nova marca, o projeto propõe transformar sentimento em sistema, afeto em estratégia e história em presença clara e consistente.',
        { h: 'Símbolo que nasce da terra' },
        'O ponto de partida do projeto foi o território. O Pico dos Pontões, um dos maiores símbolos de Mimoso do Sul, carrega forte valor cultural, afetivo e identitário para a comunidade local. Ele representa permanência, referência e orgulho coletivo. Era impossível construir a narrativa visual da Colamisul sem considerar esse elemento.',
        'Ao aprofundar o estudo simbólico, o contorno do Pico revelou uma leitura estratégica: além da montanha, ele forma a letra “M” de Mimoso do Sul. Território e identidade se encontram em um único gesto visual, reforçando o posicionamento da marca como uma cooperativa que assume suas raízes e diz, de forma clara: “somos daqui”.',
        'Como reforça Romis Carmo, diretor criativo da Plimper: “A identidade de uma marca não se desenvolve sem entender sua comunidade, seus colaboradores e seus clientes.”',
        { img: '/assets/img/noticias/qualidade-que-vem-do-coracao/doce-de-leite.webp', alt: 'Doce de leite Colamisul servido na colher' },
        { h: 'Design que conecta pessoas, produtos e propósito' },
        'A força da Colamisul sempre esteve na relação entre cooperados, famílias, consumidores e território. Esse vínculo não é conceitual, é vivido. O desafio do design foi dar forma visual a essa rede de relações.',
        'A solução surgiu a partir de um símbolo simples e carregado de significado: um coração formado por fitas. As fitas representam o fluxo contínuo da cooperativa, o caminho que liga quem produz a quem consome, quem cuida da terra a quem confia no produto final.',
        'De forma sutil, essas fitas também constroem as iniciais “C” de cooperativa e “M” de Mimoso. É um detalhe que não exige explicação para funcionar, mas que aprofunda o sentido da marca para quem observa com atenção.',
        'Como dizia Bruno Munari, “para entender o design, basta observar a natureza”. Aqui, o design nasce do movimento natural da cooperação e o traduz em linguagem visual.',
        { h: 'Uma marca preparada para o amanhã' },
        'O rebranding da Colamisul foi estruturado como uma plataforma completa de marca, envolvendo:',
        { ul: ['Reposicionamento estratégico', 'Nova identidade visual e verbal', 'Redesenho das embalagens', 'Estratégia de comunicação', 'Posicionamento digital', 'Construção de plataforma de marca'] },
        'O objetivo foi garantir coerência em todos os pontos de contato. Assim como na lógica cooperativista, nenhuma parte funciona sozinha. Visual, discurso, embalagem e presença digital precisam atuar em conjunto para sustentar percepção, confiança e reconhecimento.',
        { img: '/assets/img/noticias/qualidade-que-vem-do-coracao/marca.webp', alt: 'Aplicações da nova identidade visual da Colamisul' },
        { h: 'Da montanha para o rótulo: embalagens que contam histórias' },
        'A atualização das embalagens teve como foco elevar a percepção de qualidade sem romper o vínculo cultural da marca. Foram adotadas cores que diferenciam as linhas de produto, mantendo unidade visual, além da presença constante do Pico dos Pontões como assinatura territorial.',
        'Elementos gráficos e sensoriais sutis reforçam origem, sabor e proximidade. Cada detalhe foi desenhado para comunicar consistência e fortalecer o reconhecimento da Colamisul no ponto de venda e no cotidiano do consumidor.',
        { img: '/assets/img/noticias/qualidade-que-vem-do-coracao/embalagens.webp', alt: 'Novas embalagens da linha de produtos Colamisul' },
        { h: 'Olhe, Ouça e Sinta: a marca pelos sentidos' },
        'A metodologia da Plimper orientou todo o projeto a partir da percepção.',
        { ul: [
          'Olhe — A origem é o primeiro contato visual. O Pico dos Pontões e o coração formam um símbolo que une território, cooperativismo e cuidado. Simples, direto e carregado de significado.',
          'Ouça — O som da marca é o da cooperação, é a troca constante entre mais de 260 cooperados. O movimento das fitas traduz esse fluxo vivo de relações, onde nada é isolado e tudo se conecta.',
          'Sinta — A Colamisul transmite cuidado real. A sensação é de produto feito com tempo, responsabilidade e compromisso. A identidade visual reforça segurança e humanidade, mostrando que há pessoas de verdade por trás de cada etapa.',
        ] },
        { img: '/assets/img/noticias/qualidade-que-vem-do-coracao/manteiga.webp', alt: 'Criança com a Manteiga Dourada Colamisul' },
        { h: 'Digital que aproxima' },
        'A presença digital da Colamisul foi pensada para refletir o que a marca sempre foi fora das telas: próxima, confiável e presente. O feed passa a ocupar o mesmo espaço simbólico que a marca já ocupa na mesa das pessoas.',
        { credito: 'Texto: Romis Carmo, da Plimper. Publicação e SEO: Brunna Gambarini. Imagens produzidas pela equipe Plimper.' },
      ],
    },
  ],
};
