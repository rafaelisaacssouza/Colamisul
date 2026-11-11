const U = '/assets/uploads/'; // imagens baixadas do site antigo (src/assets/uploads)
const FOOT = '*Percentual de valores diários fornecidos pela porção.';
const PESAR = 'OBS: Deve ser pesado na presença do consumidor.';

const queijoTxt = 'Nossos queijos são produzidos com leite fresco, seguindo receitas tradicionais que garantem sabor e derretimento ideais. Perfeito para o café da manhã, sanduíches quentes ou para gratinar receitas especiais, trazendo a qualidade que sua família merece.';
const mussarelaRows = [
  ['Valor energético (kcal)', '334', '100', '5'], ['Carboidratos (g)', '0,5', '0,2', '0'], ['Açúcares totais (g)', '0,5', '0,2', '—'],
  ['Açúcares adicionados (g)', '0', '0', '0'], ['Proteínas (g)', '27', '8', '16'], ['Gorduras totais (g)', '25', '7,5', '12'],
  ['Gorduras saturadas (g)', '15', '4,5', '23'], ['Gorduras trans (g)', '0', '0', '0'], ['Fibra alimentar (g)', '0', '0', '0'], ['Sódio (mg)', '354', '106', '5'],
];
const iogurteRows = [
  ['Valor energético (kcal)', '100', '200', '10'], ['Carboidratos (g)', '14', '28', '9'], ['Açúcares totais (g)', '14', '28', '—'],
  ['Açúcares adicionados (g)', '11', '22', '44'], ['Proteínas (g)', '3', '6', '13'], ['Gorduras totais (g)', '3,2', '6,4', '10'],
  ['Gorduras saturadas (g)', '1,9', '3,8', '19'], ['Gorduras trans (g)', '0', '0', '0'], ['Fibra alimentar (g)', '0', '0', '0'], ['Sódio (mg)', '49', '98', '5'],
];
const doceIng = 'Leite, açúcar, glicose, amido e conservante sorbato de potássio.';

module.exports = [
  {
    slug: 'requeijao', nome: 'Requeijão Colamisul', cat: 'Requeijão',
    img: '/assets/img/produtos/requeijao.webp', alt: 'Requeijao Colamisul em barra',
    chamada: 'Cremosidade que conquista.',
    desc: 'Com textura aveludada e sabor equilibrado, nosso requeijão em barra é versátil e delicioso. Indispensável no café da manhã e em lanches, ele também é o segredo culinário para dar um toque especial de cremosidade nas receitas dos melhores chefs.',
    tabela: {
      titulo: 'Requeijão',
      ingredientes: 'Massa para produtos lácteos fundidos (leite desnatado e ácido lático), creme de leite, cloreto de sódio (sal), regulador de acidez bicarbonato de sódio (INS 500ii) e conservante sorbato de potássio (INS 292).',
      embalagem: 'Peça com aprox. 500 g · Porção: 30 g (1 fatia)',
      cols: ['100 g', '30 g'],
      rows: [
        ['Valor energético (kcal)', '330', '99', '5'], ['Carboidratos (g)', '5,3', '1,6', '1'], ['Açúcares totais (g)', '5,3', '1,6', '—'],
        ['Açúcares adicionados (g)', '0', '0', '0'], ['Proteínas (g)', '27', '6,3', '13'], ['Gorduras totais (g)', '25', '7,5', '12'],
        ['Gorduras saturadas (g)', '15', '4,2', '21'], ['Gorduras trans (g)', '0', '0', '0'], ['Fibra alimentar (g)', '0', '0', '0'], ['Sódio (mg)', '315', '95', '5'],
      ],
      notas: [FOOT, PESAR],
    },
  },
  {
    slug: 'queijo-mussarela-500g', nome: 'Queijo Mussarela 500 g', cat: 'Queijos',
    img: '/assets/img/produtos/queijo-mussarela-500g.webp', alt: 'Queijo Mussarela Colamisul 500 g',
    chamada: 'Cooperação em cada fatia.', desc: queijoTxt,
    tabela: {
      titulo: 'Queijo Mussarela 500 g',
      ingredientes: 'Leite pasteurizado, cloreto de sódio (sal), cloreto de cálcio, coagulante e fermento lático.',
      embalagem: 'Peça com aprox. 500 g · Porção: 30 g (1 fatia)',
      cols: ['100 g', '30 g'], rows: mussarelaRows, notas: [FOOT, PESAR],
    },
  },
  {
    slug: 'queijo-mussarela-2-800kg', nome: 'Queijo Mussarela 2,8 kg', cat: 'Queijos',
    img: '/assets/img/produtos/queijo-mussarela-2-800kg.webp', alt: 'Queijo Mussarela Colamisul 2,8 kg',
    chamada: 'Cooperação em cada fatia.', desc: queijoTxt,
    tabela: {
      titulo: 'Queijo Mussarela 2,8 kg',
      ingredientes: 'Leite pasteurizado, cloreto de sódio (sal), cloreto de cálcio, coagulante e fermento lático.',
      embalagem: 'Peça com aprox. 2,8 kg · Porção: 30 g (1 fatia)',
      cols: ['100 g', '30 g'], rows: mussarelaRows, notas: [FOOT, PESAR],
    },
  },
  {
    slug: 'queijo-minas-padrao', nome: 'Queijo Minas Padrão', cat: 'Queijos',
    img: '/assets/img/produtos/queijo-minas-padrao.webp', alt: 'Queijo Minas Padrao Colamisul',
    chamada: 'Cooperação em cada fatia.',
    desc: 'Nossos queijos são produzidos com leite fresco e seguem receitas tradicionais, resultando em um sabor inconfundível. Perfeitos para o café da manhã, receitas dos melhores chefs ou tábuas especiais, unindo a tradição do campo com a qualidade Colamisul.',
    tabela: {
      titulo: 'Queijo Minas Padrão',
      ingredientes: 'Leite pasteurizado, cloreto de sódio (sal), cloreto de cálcio, coagulante e fermento lático.',
      embalagem: 'Peça com aprox. 500 g · Porção: 30 g (1 fatia)',
      cols: ['100 g', '30 g'],
      rows: [
        ['Valor energético (kcal)', '302', '91', '5'], ['Carboidratos (g)', '3,5', '1,1', '0'], ['Açúcares totais (g)', '3,5', '1,1', '—'],
        ['Açúcares adicionados (g)', '0', '0', '0'], ['Proteínas (g)', '20', '6,1', '12'], ['Gorduras totais (g)', '23', '6,9', '11'],
        ['Gorduras saturadas (g)', '13', '3,9', '20'], ['Gorduras trans (g)', '0', '0', '0'], ['Fibra alimentar (g)', '0', '0', '0'], ['Sódio (mg)', '767', '230', '12'],
      ],
      notas: [FOOT, PESAR],
    },
  },
  {
    slug: 'queijo-minas-frescal', nome: 'Queijo Minas Frescal', cat: 'Queijos',
    img: '/assets/img/produtos/queijo-minas-frescal.webp', alt: 'Queijo Minas Frescal Colamisul',
    chamada: 'Cooperação em cada fatia.',
    desc: 'Nossos queijos são produzidos com leite fresco e seguem receitas tradicionais, garantindo leveza e frescor. Perfeitos para o café da manhã, dietas equilibradas, receitas dos melhores chefs ou tábuas especiais, oferecendo sabor suave para todos os momentos.',
    tabela: {
      titulo: 'Queijo Minas Frescal',
      ingredientes: 'Leite pasteurizado, cloreto de sódio (sal), cloreto de cálcio, coagulante.',
      embalagem: 'Peça com aprox. 500 g · Porção: 50 g (1 fatia)',
      cols: ['100 g', '50 g'],
      rows: [
        ['Valor energético (kcal)', '207', '104', '3'], ['Carboidratos (g)', '2,1', '1,1', '0'], ['Açúcares totais (g)', '2,1', '1,1', '—'],
        ['Açúcares adicionados (g)', '0', '0', '0'], ['Proteínas (g)', '16', '8', '16'], ['Gorduras totais (g)', '15', '7,5', '12'],
        ['Gorduras saturadas (g)', '8', '4', '20'], ['Gorduras trans (g)', '0', '0', '0'], ['Fibra alimentar (g)', '0', '0', '0'], ['Sódio (mg)', '394', '197', '10'],
      ],
      notas: [FOOT, PESAR],
    },
  },
  {
    slug: 'manteiga-com-sal-200g', nome: 'Manteiga Comum com Sal 200 g', cat: 'Manteiga',
    img: '/assets/img/produtos/manteiga-com-sal-200g.webp', alt: 'Manteiga Dourada com Sal Colamisul 200 g',
    chamada: 'Tradição que você reconhece no sabor.',
    desc: 'A tradicional Manteiga Dourada Colamisul conquista gerações com seu sabor autêntico e cremosidade única. A escolha certa para padarias, cafés, restaurantes e lares que valorizam qualidade superior e aquele toque de tradição indispensável em cada receita.',
    tabela: {
      titulo: 'Manteiga Comum com Sal 200 g',
      ingredientes: 'Creme de leite pasteurizado e cloreto de sódio.',
      embalagem: 'Pote com 200 g · Porção: 10 g (1 colher de sopa)',
      cols: ['100 g', '10 g'],
      rows: [['Valor energético (kcal)', '767', '77', '4'], ['Gorduras totais (g)', '85', '8,5', '13'], ['Gorduras saturadas (g)', '48', '4,8', '24'], ['Sódio (mg)', '433', '43', '2']],
      notas: [FOOT],
    },
  },
  {
    slug: 'leite-pasteurizado-integral', nome: 'Leite Pasteurizado Integral', cat: 'Leites',
    img: '/assets/img/produtos/leite-pasteurizado-integral.webp', alt: 'Leite Pasteurizado Integral Colamisul 1 L',
    chamada: 'A escolha natural de quem entende de sabor.',
    desc: 'Nosso leite vem direto de famílias produtoras da região, passando por rigorosos padrões de qualidade e controle. É a fonte ideal de nutrição para quem busca sabor verdadeiro, frescor garantido e total confiança para o consumo no dia a dia.',
    tabela: {
      titulo: 'Leite Pasteurizado Integral',
      embalagem: 'Sachê 1 l · Porção: 200 ml (1 copo)',
      cols: ['100 ml', '200 ml'],
      rows: [
        ['Valor energético (kcal)', '61', '121', '6'], ['Carboidratos totais (g)', '4,7', '9,4', '3'], ['Açúcares totais (g)', '4,7', '9,4', '—'],
        ['Açúcares adicionados (g)', '0', '0', '0'], ['Proteínas (g)', '3,5', '7', '14'], ['Gorduras totais (g)', '3,1', '6,2', '10'],
        ['Gorduras saturadas (g)', '1,8', '3,6', '18'], ['Gorduras trans (g)', '0', '0', '0'], ['Fibra alimentar (g)', '0', '0', '0'],
        ['Sódio (mg)', '59', '118', '6'], ['Cálcio (mg)', '121', '242', '24'],
      ],
      notas: [FOOT],
    },
  },
  {
    slug: 'leite-desnatado-pasteurizado', nome: 'Leite Pasteurizado Desnatado', cat: 'Leites',
    img: '/assets/img/produtos/leite-desnatado-pasteurizado.webp', alt: 'Leite Pasteurizado Desnatado Colamisul 1 L',
    chamada: 'A escolha natural de quem entende de sabor.',
    desc: 'Nosso leite vem direto de famílias produtoras da região, com rigorosos padrões de qualidade e controle. A opção perfeita para quem busca leveza sem abrir mão do sabor e da confiança, ideal para dietas balanceadas e consumo diário com saúde.',
    tabela: {
      titulo: 'Leite Pasteurizado Desnatado',
      embalagem: 'Sachê 1 l · Porção: 200 ml (1 copo)',
      cols: ['100 ml', '200 ml'],
      rows: [
        ['Valor energético (kcal)', '35', '70', '4'], ['Carboidratos (g)', '4,5', '9', '3'], ['Açúcares totais (g)', '4,5', '9', '—'],
        ['Açúcares adicionados (g)', '0', '0', '0'], ['Proteínas (g)', '3,6', '7,2', '14'], ['Gorduras totais (g)', '0,3', '0,6', '1'],
        ['Gorduras saturadas (g)', '0,1', '0,2', '1'], ['Gorduras trans (g)', '0', '0', '0'], ['Fibra alimentar (g)', '0', '0', '0'],
        ['Sódio (mg)', '44', '88', '4'], ['Cálcio (mg)', '121', '242', '24'],
      ],
      notas: [FOOT],
    },
  },
  {
    slug: 'iogurte-integral-morango', nome: 'Iogurte Integral com Preparado de Morango', cat: 'Iogurtes',
    img: '/assets/img/produtos/iogurte-integral-morango.webp', alt: 'Iogurte Integral com Preparado de Morango Colamisul 850 g',
    chamada: 'Tem fruta de verdade. E isso muda tudo.',
    desc: 'Nossos iogurtes entregam autenticidade no sabor e confiança desde sua origem. Feitos com leite fresco de produtores locais e frutas de verdade, eles oferecem uma experiência de consumo única que fideliza clientes e valoriza sua loja ou sua mesa.',
    tabela: {
      titulo: 'Iogurte Integral com Preparado de Morango',
      ingredientes: 'Leite, açúcar, preparado de morango (água, açúcar, morango, amido modificado, aroma idêntico ao natural de morango, acidulante ácido cítrico INS 330, goma Guar INS 412, carboximetilcelulose INS 466, conservante sorbato de potássio INS 202, corante natural carmim de cochonilha INS 120), fermento lático e estabilizante (amido modificado, gelatina INS 428 e goma Guar INS 412).',
      embalagem: 'Frasco com 850 g · Porção: 200 g (1 copo)',
      cols: ['100 g', '200 g'], rows: iogurteRows, notas: [FOOT],
    },
  },
  {
    slug: 'iogurte-integral-granulado', nome: 'Iogurte Integral com Granulado Sabor Chocolate', cat: 'Iogurtes',
    img: '/assets/img/produtos/iogurte-integral-granulado.webp', alt: 'Iogurte Integral com Granulado Sabor Chocolate Colamisul 850 g',
    chamada: 'Cremoso, saboroso e cheio de textura.',
    desc: 'Nosso iogurte de flocos combina a cremosidade do iogurte com o sabor do chocolate em uma experiência que conquista. Feito com leite fresco de produtores locais, une qualidade e sabor para valorizar sua loja ou sua mesa.',
    tabela: {
      titulo: 'Iogurte Integral com Granulado Sabor Chocolate',
      // Texto da agência (pág. 15) com "lecitina" e "glaceante" corrigidos (vieram como "lectina" e "claceante")
      ingredientes: 'Leite, açúcar, granulado sabor chocolate (açúcar, gordura vegetal hidrogenada, cacau em pó, amido de milho, estabilizantes lecitina de soja e mono e diglicerídeo de ácidos graxos, sal, glaceante, talco, xarope de glicose, conservante sorbato de potássio e aroma artificial de baunilha), fermento lático e estabilizante (amido modificado, gelatina INS 428 e goma Guar INS 412).',
      embalagem: 'Frasco com 850 g · Porção: 200 g (1 copo)',
      cols: ['100 g', '200 g'], rows: iogurteRows, notas: [FOOT],
    },
  },
  {
    slug: 'doce-de-leite-tablet', nome: 'Doce de Leite Tablete', cat: 'Doce de Leite',
    img: '/assets/img/produtos/doce-de-leite-tablet.webp', alt: 'Doce de Leite Colamisul em tablete',
    chamada: 'Doce de leite com sabor que conta nossa história.',
    desc: 'Feito com ingredientes selecionados, o Doce de Leite Colamisul tem textura firme e sabor caseiro que remetem à infância. Perfeita para compartilhar momentos doces ou para compor a mesa de quem não abre mão da tradição.',
    tabela: {
      titulo: 'Doce de Leite Tablete',
      ingredientes: 'Leite, açúcar, glicose de milho e conservante sorbato de potássio.',
      embalagem: 'Tablete com 230 g · Porção: 40 g (1 e ½ fatias)',
      cols: ['100 g', '40 g'],
      rows: [
        ['Valor energético (kcal)', '385', '154', '8'], ['Carboidratos (g)', '74', '30', '10'], ['Açúcares totais (g)', '12', '4,8', '—'],
        ['Açúcares adicionados (g)', '72', '29', '58'], ['Proteínas (g)', '6,5', '2,6', '5'], ['Gorduras totais (g)', '7,0', '2,8', '4'],
        ['Gorduras saturadas (g)', '1,8', '1,7', '4'], ['Gorduras trans (g)', '0', '0', '0'], ['Fibra alimentar (g)', '0', '0', '0'], ['Sódio (mg)', '158', '63', '3'],
      ],
      notas: [FOOT],
    },
  },
  {
    slug: 'doce-de-leite-pastoso', nome: 'Doce de Leite Pastoso 300 g', cat: 'Doce de Leite',
    img: '/assets/img/produtos/doce-de-leite-pastoso.webp', alt: 'Doce de Leite Pastoso Colamisul pote 300 g',
    chamada: 'Doce de leite com sabor que conta nossa história.',
    desc: 'Feito com ingredientes selecionados, o Doce de Leite Colamisul tem textura cremosa e sabor caseiro que remetem à infância. Para comer de colher, passar no pão ou rechear bolos e tortas, trazendo doçura na medida certa para o seu dia.',
    tabela: {
      titulo: 'Doce de Leite Pastoso 300 g',
      ingredientes: doceIng,
      embalagem: 'Pote com 300 g · Porção: 20 g (1 e ½ colher de sopa)',
      cols: ['100 g', '20 g'],
      rows: [
        ['Valor energético (kcal)', '323', '65', '3'], ['Carboidratos (g)', '60', '12', '4'], ['Açúcares totais (g)', '10', '2', '—'],
        ['Açúcares adicionados (g)', '51', '10', '20'], ['Proteínas (g)', '5,8', '1,2', '2'], ['Gorduras totais (g)', '6,5', '1,3', '2'],
        ['Gorduras saturadas (g)', '1,5', '0,3', '2'], ['Gorduras trans (g)', '0', '0', '0'], ['Fibra alimentar (g)', '0', '0', '0'], ['Sódio (mg)', '118', '24', '1'],
      ],
      notas: [FOOT],
    },
  },
  {
    slug: 'doce-de-leite-balde-48kg', nome: 'Doce de Leite Balde 4,8 kg', cat: 'Doce de Leite',
    img: '/assets/img/produtos/doce-de-leite-balde-48kg.webp', alt: 'Doce de Leite Pastoso Colamisul - balde 4,8 kg',
    chamada: 'Doce de leite com sabor que conta nossa história.',
    desc: 'Feito com ingredientes selecionados, o Doce de Leite Colamisul tem aquela textura cremosa e sabor caseiro que remetem à infância. Ideal para comer de colher, passar no pão ou rechear bolos e tortas, trazendo doçura na medida certa para o seu dia.',
    tabela: {
      titulo: 'Doce de Leite Balde 4,8 kg',
      ingredientes: doceIng,
      embalagem: 'Balde com 4,8 kg · Porção: 20 g (1 e ½ colher de sopa)',
      cols: ['100 g', '20 g'],
      rows: [
        ['Valor energético (kcal)', '323', '65', '3'], ['Carboidratos (g)', '60', '12', '4'], ['Açúcares totais (g)', '51', '10', '—'],
        ['Açúcares adicionados (g)', '10', '2', '4'], ['Proteínas (g)', '5,8', '1,2', '2'], ['Gorduras totais (g)', '6,5', '1,3', '2'],
        ['Gorduras saturadas (g)', '1,5', '0,3', '2'], ['Gorduras trans (g)', '0', '0', '0'], ['Fibra alimentar (g)', '0', '0', '0'], ['Sódio (mg)', '118', '24', '1'],
      ],
      notas: [FOOT],
    },
  },
];
