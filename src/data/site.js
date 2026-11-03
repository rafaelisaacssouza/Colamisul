// Conteúdo extraído de colamisul.inoveweb.com.br (textos e imagens originais)
const U = 'https://colamisul.inoveweb.com.br/wp-content/uploads/';

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
    whatsapp: 'https://wa.me/28999234485',
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

  informativos: [
    { slug: 'informativo-abril', t: 'Informativo – Abril', ano: '2026', ordem: 4, pdf: U + '2026/07/INFORMATIVO-ABRIL.pdf', capa: U + '2026/04/INFORMATIVO-ABRIL.jpg' },
    { slug: 'informativo-marco', t: 'Informativo – Março', ano: '2026', ordem: 3, pdf: U + '2026/07/INFORMATIVO-MARCO.pdf', capa: U + '2026/04/INFORMATIVO-MARCO.jpg' },
    { slug: 'informativo-fevereiro', t: 'Informativo – Fevereiro', ano: '2026', ordem: 2, pdf: U + '2026/07/INFORMATIVO-FEVEREIRO.pdf', capa: U + '2026/04/INFORMATIVO-FEVEREIRO.jpg' },
    { slug: 'informativo-janeiro', t: 'Informativo – Janeiro', ano: '2026', ordem: 1, pdf: U + '2026/07/INFORMATIVO-JANEIRO.pdf', capa: U + '2026/04/INFORMATIVO-JANEIRO.jpg' },
  ],

  noticias: [
    {
      slug: 'colamisul-em-foco',
      url: '/2025/12/colamisul-em-foco/',
      t: 'Colamisul em foco',
      data: 'Dezembro de 2025',
      img: U + '2025/12/634.webp',
      resumo: 'Em 2022 comemoramos o bicentenário de nossa Independência. Como parte das comemorações deste …',
      corpo: [
        'Mais um ponto para a longeva Cooperativa de Laticínios de Mimoso do Sul (ES), com mais de sessenta anos em funcionamento ininterrupto, mais conhecida pelos populares como COLAMISUL pelo cuidado na área ambiental. Ela construiu um poço artesiano em 2007 com 90 metros de profundidade para abastecer o pátio industrial e realizar pré tratamento da água a ser utilizada no processo de fabricação.',
        'Essa água é monitorada para garantir boa qualidade, ao entrar em contato direto com os PRODUTOS DOURADO. A COLAMISUL, dentro da responsabilidade ambiental e social, está fazendo reuso racional da água saudável. Aproveita-se também a água da chuva. Para isso foi instalada 3 caixas para armazenar 50.000 litros de água da chuva. Os resíduos sólidos (lixo) produzidos pela COLAMISUL são separados e destinados para a reciclagem. Outros resíduos são destinados para empresas credenciadas, para dar o destino ambiental correto. Exemplo disso são os materiais ou vasilhames com resíduos de graxas, óleos, lama do lavador.',
        'A Cooperativa é proativa na busca de alternativas para assegurar aos produtos o padrão de excelência qualitativa, destinada ao consumidor final. Acrescenta-se que foi implantado as mais novas ferramentas para controlar a matéria-prima (leite) e da produção como o AUTOCONTROLE e o APPCC – Análise de Perigo e Pontos Críticos de Controle. O APPCC foi um procedimento desenvolvido pela NASA – Administração Nacional do Espaço e Aeronáutica, para garantir alimento seguro para os astronautas. Atualmente serve de base para a fabricação de alimentos seguros. Somente a partir da implantação do APPCC, são identificados os pontos críticos de controle de um determinado perigo, e são estabelecidos limites críticos, realizando-se um rígido acompanhamento e verificação, registrando-se os procedimentos a fim de subsidiar possíveis ações corretivas.',
        'Em suma, a COLAMISUL é genuinamente mimosense, e geradora de emprego, renda e de produtos de qualidade, apreciados além das fronteiras. A Diretoria atual é capitaneada por Silvio G. Beloti, Carlos Alberto V. Motta e José Augusto Posse.',
      ],
    },
  ],
};
