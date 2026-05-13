import { useState, useMemo, useEffect, useCallback, useRef } from "react";

const LP={cream:"#F7EFE0",gold:"#C8973A",goldLight:"#E8C97A",burgundy:"#5C1A2E",burgundyDeep:"#3B0F1D",warm:"#9B6B3A",warmLight:"#D4A574",text:"#2C1810",textMuted:"#7A5C40",white:"#FFFDF8",card:"#FFFDF8",shadow:"#0001"};
const DP={cream:"#170C0F",gold:"#C8973A",goldLight:"#E8C97A",burgundy:"#E89AAE",burgundyDeep:"#F0C8D8",warm:"#C89060",warmLight:"#6A4820",text:"#F0DED8",textMuted:"#A07868",white:"#231318",card:"#2A1520",shadow:"#0004"};

// ── localStorage storage (Vercel-ready) ─────────────────────────────────────
function sGet(k){try{const r=localStorage.getItem(k);return r!==null?JSON.parse(r):null;}catch{return null;}}
function sSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}
function useStorage(key,def){
  const[v,sv]=useState(()=>{const r=sGet(key);return r!==null?r:def;});
  const init=useRef(false);
  const set=useCallback((nv)=>{const val=typeof nv==="function"?nv(v):nv;sv(val);sSet(key,val);},[key,v]);
  return[v,set];
}

// ── 7 THEMES ─────────────────────────────────────────────────────────────────
const THEMES=[
  {id:"fe",title:"Renovar a Fé",subtitle:"Fortalecer a base espiritual",icon:"✝️",color:"#5C1A2E",bg:"#3B0F1D",
   subgroups:[
    {title:"Oração em Casal",purposes:["Rezar o Pai Nosso de mãos dadas toda manhã","Criar um horário fixo de oração de 10 min por dia","Ler um versículo bíblico juntos antes de dormir","Rezar o terço toda segunda e sábado","Fazer a Hora Santa juntos uma vez por mês","Participar de um grupo de casais da paróquia","Criar juntos uma intenção semanal para orar","Rezar uma Novena nas épocas litúrgicas","Agradecer a Deus em voz alta por três coisas todo dia","Consagrar o lar ao Sagrado Coração de Jesus"]},
    {title:"Palavra de Deus",purposes:["Ler um livro do Novo Testamento inteiro juntos","Participar de um grupo de partilha bíblica","Memorizar um versículo bíblico por mês juntos","Estudar as cartas de Paulo sobre o casamento","Ler o Catecismo sobre o matrimônio","Escutar um podcast católico sobre fé e família","Assistir juntos a um retiro virtual de casais","Ler a biografia de Luís e Zélia Martin","Estudar o Evangelho do domingo antes da Missa","Criar um caderno de reflexões bíblicas do casal"]},
    {title:"Sacramentos",purposes:["Ir à Missa juntos todo domingo sem exceção","Confessar-se individualmente ao menos uma vez por mês","Receber a Comunhão em intenção um pelo outro","Participar de uma peregrinação anual juntos","Fazer o retiro Encontro de Casais com Cristo","Renovar os votos matrimoniais em uma Missa especial","Criar o hábito do jejum conjunto às sextas-feiras","Participar da Vigília Pascal juntos","Visitar o Santíssimo Sacramento semanalmente","Ir à Missa de Primeira Sexta juntos"]},
    {title:"Apostolado",purposes:["Ajudar na catequese da paróquia juntos","Acolher casais em crise em sua casa","Testemunhar a fé de vocês para outros casais","Participar do apostolado Encontro de Casais","Contribuir com a Cáritas ou pastoral social","Adotar uma família necessitada como padrinhos","Ser voluntários em um retiro de jovens juntos","Compartilhar versículos nas redes como casal","Rezar o terço em família com filhos e parentes","Oferecer hospitalidade cristã regularmente"]},
    {title:"Devoção Mariana",purposes:["Consagrar o casamento ao Imaculado Coração de Maria","Rezar a Salve Rainha toda noite antes de dormir","Visitar um santuário mariano pelo menos uma vez ao ano","Meditar juntos os Mistérios do Rosário mensalmente","Entronizar a imagem de Nossa Senhora no lar","Celebrar as festas marianas (Fátima, Aparecida)","Ler a consagração de São Luís de Montfort juntos","Fazer a Primeira Sábado em reparação juntos","Pedir a intercessão de Maria nas decisões do casal","Rezar o Angelus ao meio-dia como hábito"]},
   ]},
  {id:"pecado",title:"Pecado e Conversão",subtitle:"Crescer juntos na santidade",icon:"🔥",color:"#7A3A10",bg:"#4A1E06",
   subgroups:[
    {title:"Exame de Consciência",purposes:["Fazer o exame de consciência juntos toda noite","Identificar o pecado capital predominante de cada um","Nomear sem julgamento as áreas de fraqueza mútua","Criar um diário de conversão pessoal","Reconhecer como os pecados pessoais afetam o cônjuge","Estudar os 10 Mandamentos aplicados ao casamento","Identificar gatilhos que levam às brigas","Ler o Sermão da Montanha como exame de consciência","Perguntar: 'Em que posso melhorar para você?'","Agradecer pelas repreensões fraternas recebidas"]},
    {title:"Confissão e Penitência",purposes:["Confessar-se antes de todas as grandes datas litúrgicas","Ir à confissão no mesmo dia, um pelo outro","Rezar juntos o Ato de Contrição toda semana","Fazer penitências voluntárias em reparação pelos pecados","Praticar o jejum uma vez por semana","Pedir absolvição com humildade, sem argumentação","Acompanhar o cônjuge até a Igreja para se confessar","Criar o hábito de pedir perdão antes de dormir","Meditar nas Sete Palavras de Jesus na Cruz","Fazer a Via Sacra juntos durante a Quaresma"]},
    {title:"Vícios a Abandonar",purposes:["Eliminar juntos o hábito de criticar em público","Parar de usar o silêncio punitivo como arma","Abandonar o hábito de trazer erros do passado","Eliminar o exagero no uso de álcool","Parar de usar o celular durante refeições","Abandonar a pornografia e impureza digital","Eliminar a mentira por menor que seja","Parar de falar mal do cônjuge para terceiros","Abandonar o orgulho de nunca pedir desculpas","Eliminar o ciúme doentio e o controle excessivo"]},
    {title:"Virtudes a Cultivar",purposes:["Praticar a mansidão nas discussões por 30 dias","Desenvolver o hábito da pontualidade como respeito","Cultivar a gratidão expressa em palavras todo dia","Praticar a caridade primeiro em casa antes de fora","Desenvolver a paciência diante das limitações do cônjuge","Cultivar a castidade matrimonial como dom sagrado","Praticar a generosidade sem esperar reconhecimento","Desenvolver a humildade de reconhecer os próprios erros","Cultivar a alegria mesmo nos dias difíceis","Praticar a fortaleza nas provações sem desistir"]},
    {title:"Misericórdia Mútua",purposes:["Pronunciar o ato de misericórdia em voz alta um pelo outro","Praticar os sete atos de misericórdia corporais no lar","Visitar juntos alguém doente ou necessitado semanalmente","Libertar o cônjuge de uma dívida emocional deliberadamente","Orar pela conversão de quem nos magoou","Dar uma segunda chance sem cobrar a primeira falha","Falar bem do cônjuge mesmo quando ele erra","Rezar o Terço de Misericórdia nas crises","Lembrar que também somos pecadores perdoados","Rezar pela misericórdia de Deus sobre o casamento"]},
   ]},
  {id:"traicao",title:"Traição e Cura",subtitle:"Reconstruir o que foi ferido",icon:"💔",color:"#1A4A6E",bg:"#0D2E4A",
   subgroups:[
    {title:"Reconhecer a Ferida",purposes:["Nomear a dor com palavras, sem minimizá-la","Permitir que o cônjuge ferido expresse a mágoa inteiramente","Ouvir sem interromper, sem defender, sem justificar","Reconhecer o peso do que foi causado ao outro","Buscar acompanhamento psicológico cristão juntos","Não apressar o processo de cura — respeitar o tempo","Escrever uma carta sincera sobre a dor sentida","Comprometer-se a não mais esconder a verdade","Rezar juntos pelo Espírito Santo curar o que humanos não conseguem","Ler o Salmo 51 juntos como oração de arrependimento"]},
    {title:"Perdão Radical",purposes:["Declarar o perdão em voz alta, mesmo sem sentir ainda","Entender que perdoar não significa esquecer, mas libertar","Rezar pela cura da memória ferida","Abdicar conscientemente do direito à vingança","Buscar o sacramento da confissão como ato de libertação","Meditar na Cruz de Cristo como modelo de perdão","Comprometer-se a não usar a traição como argumento futuro","Renovar os votos matrimoniais após a cura","Contar com um casal de referência espiritual no processo","Rezar pela pessoa que foi instrumento da traição"]},
    {title:"Reconstrução da Confiança",purposes:["Criar transparência total sobre localizações","Comunicar onde está e com quem sem ser cobrado","Cumprir pequenas promessas diariamente","Eliminar amizades que colocaram o casamento em risco","Criar novos rituais de conexão que simbolizem o recomeço","Celebrar cada marco da reconstrução (1 mês, 3 meses, 1 ano)","Participar de um retiro para casais em crise","Estabelecer limites saudáveis com o ambiente de trabalho","Criar um símbolo físico da renovação do casamento","Ter um casal padrinho espiritual que ore pelo casamento"]},
    {title:"Proteção do Casamento",purposes:["Nunca falar mal do cônjuge para terceiros","Não cultivar amizades íntimas com o sexo oposto sem o cônjuge","Evitar situações que criem oportunidade de tentação","Fazer check-in emocional semanal: 'Como você está?'","Definir juntos os limites das redes sociais","Nunca dormir com raiva sem uma oração de reconciliação","Rezar pela proteção do casamento todo dia","Pedir a intercessão de São Rafael Arcanjo","Criar um código de alerta para quando sentir risco","Fazer um pacto de transparência digital"]},
    {title:"Renovação da Aliança",purposes:["Reescrever os votos com as palavras de hoje","Criar um ritual anual de renovação dos votos","Visitar a Igreja onde se casaram e rezar juntos lá","Contar a história da restauração para outros casais","Escrever uma carta de amor renovada","Plantar uma árvore como símbolo do novo começo","Fazer uma viagem de recomeço mesmo que simples","Guardar uma data anual de celebração da restauração","Testemunhar como Deus restaurou o casamento na paróquia","Criar um objeto sagrado que simbolize a renovação"]},
   ]},
  {id:"comunicacao",title:"Comunicação",subtitle:"Conectar corações com palavras",icon:"💬",color:"#2E5E3A",bg:"#1A3A24",
   subgroups:[
    {title:"Escuta Ativa",purposes:["Ouvir sem preparar a resposta enquanto o cônjuge fala","Praticar o silêncio compassivo quando o outro sofre","Repetir com suas palavras o que entendeu antes de responder","Perguntar 'O que você precisa: solução ou escuta?'","Desligar o celular durante conversas importantes","Olhar nos olhos ao ouvir — sem tela, sem distração","Validar o sentimento antes de apresentar um argumento","Não terminar as frases do cônjuge","Praticar ouvir a crítica sem reação defensiva imediata","Agradecer ao cônjuge toda vez que ele se abriu com você"]},
    {title:"Linguagens do Amor",purposes:["Descobrir juntos as Cinco Linguagens do Amor de cada um","Praticar a linguagem do amor do cônjuge, não a sua","Dar um elogio sincero todo dia — sem ironias","Escrever bilhetes de carinho inesperados","Tocar o cônjuge com afeto sem intenção sexual","Fazer um ato de serviço sem ser pedido nem comentado","Reservar tempo de qualidade sem celular toda semana","Dar um presente simbólico numa data inesperada","Verbalizar o amor em palavras todos os dias","Perguntar: 'O que faz você se sentir mais amado?'"]},
    {title:"Resolver Conflitos",purposes:["Nunca usar palavras que machuquem de forma permanente","Fazer uma pausa de 10 minutos quando a discussão esquentar","Não trazer à tona erros antigos numa discussão nova","Tratar apenas um assunto por vez","Nunca brigar na frente dos filhos","Criar a regra: dormir sempre após um pedido de desculpas","Usar 'Eu sinto...' em vez de 'Você faz...'","Buscar o que une antes de listar o que separa","Encerrar toda briga com uma oração juntos","Criar um sinal de 'preciso de espaço' sem ofensa"]},
    {title:"Expressar Sentimentos",purposes:["Fazer o check-in emocional todas as noites","Nomear as emoções com precisão — não só 'estressado'","Compartilhar medos e inseguranças sem julgamento","Contar sonhos e desejos que ainda não realizou","Expressar necessidades sem cobrar e sem manipular","Mostrar vulnerabilidade como ato de confiança","Compartilhar alegrias antes de compartilhar problemas","Criar um diário de casal físico para o que é difícil falar","Falar sobre a espiritualidade pessoal sem impor ao outro","Expressar gratidão por aspectos específicos, não genéricos"]},
    {title:"Rituais de Conexão",purposes:["Criar um ritual matinal de 5 minutos juntos","Comer pelo menos uma refeição juntos ao dia sem telas","Fazer um 'date' semanal — mesmo em casa","Criar uma playlist de músicas que são 'de vocês'","Ter um apelido carinhoso exclusivo do casal","Criar uma pergunta profunda para responder juntos por mês","Reler juntos fotos e histórias do relacionamento","Criar um ritual de boas-vindas quando um chega em casa","Ter um gesto secreto de carinho em público","Criar um arquivo digital das melhores memórias do casal"]},
   ]},
  {id:"intimidade",title:"Intimidade e Pureza",subtitle:"Amar com o corpo e a alma",icon:"💎",color:"#6A4A10",bg:"#3A2A06",
   subgroups:[
    {title:"Pureza do Coração",purposes:["Guardar os olhos — praticar o pudor como proteção mútua","Eliminar toda pornografia dos dispositivos do casal","Instalar filtros de conteúdo juntos","Confessar lutas com a impureza ao cônjuge sem vergonha","Meditar no Sermão da Montanha sobre pureza","Consagrar a sexualidade ao Senhor juntos","Estudar a Teologia do Corpo de João Paulo II","Criar limites digitais respeitosos com o sexo oposto","Rezar pela pureza dos filhos e do lar","Praticar o jejum como domínio das paixões"]},
    {title:"Intimidade Emocional",purposes:["Compartilhar uma memória dolorosa do passado com confiança","Contar um sonho secreto que nunca revelou","Falar sobre medos profundos de perda e abandono","Compartilhar o que mais admira e teme no cônjuge","Criar espaço para choro sem precisar explicar","Praticar a presença plena — sem mente em outro lugar","Perguntar 'O que você precisa de mim que nunca pediu?'","Criar um ritual de reconexão após períodos de distância","Partilhar sonhos para o futuro com detalhes","Fazer um inventário conjunto das alegrias do casamento"]},
    {title:"Intimidade Espiritual",purposes:["Rezar um pelo outro em voz alta, com nomes e detalhes","Partilhar a experiência espiritual pessoal da semana","Ler juntos sobre os mistérios do matrimônio como sacramento","Confessar pecados que afetam a vida espiritual do outro","Criar um espaço sagrado (altar doméstico) juntos","Fazer o exame de consciência juntos em oração","Partilhar o que Deus tem falado ao coração de cada um","Convidar o Espírito Santo para o lar do casal","Rezar juntos antes e depois da intimidade conjugal","Estudar os santos casais como modelos de amor sagrado"]},
    {title:"Proteção Digital",purposes:["Estabelecer um horário de apagar as telas — por ex. 21h","Nunca trocar mensagens íntimas com outras pessoas","Criar a regra de não receber alguém do sexo oposto sozinho","Revisar juntos o que seguem nas redes sociais","Limitar o tempo total de celular por dia","Criar zonas livres de tela: quarto, mesa, carro","Nunca publicar brigas ou desavenças nas redes sociais","Criar grupo de WhatsApp exclusivo do casal","Fazer uma desintoxicação digital de fim de semana juntos","Criar uma política de privacidade digital como casal"]},
    {title:"Corpo como Templo",purposes:["Cuidar da saúde física como dever de amor ao cônjuge","Praticar exercícios juntos pelo menos duas vezes por semana","Dormir bem — reconhecer o sono como cuidado sagrado","Cuidar da alimentação com gratidão pelo corpo recebido","Praticar o descanso do domingo como lei de amor","Massagem ou toque terapêutico sem conotação sexual","Cuidar da aparência como ato de respeito ao cônjuge","Rezar pela saúde física um do outro com imposição de mãos","Agradecer a Deus pelo corpo do cônjuge como dom divino","Meditar no corpo glorioso — a ressurreição começa agora"]},
   ]},
  {id:"familia",title:"Família e Missão",subtitle:"Construir uma Igreja doméstica",icon:"🏠",color:"#1A4A5E",bg:"#0D2E3A",
   subgroups:[
    {title:"Educação dos Filhos",purposes:["Rezar com os filhos toda noite antes de dormir","Levar os filhos à Missa e explicar cada parte","Criar um momento de catequese doméstica por semana","Contar histórias de santos para as crianças","Criar tradições litúrgicas em casa (Advento, Quaresma)","Orar pelos filhos em voz alta, com os nomes deles","Confessar os filhos regularmente a partir dos 7 anos","Criar um ambiente de lar onde Deus é centro","Discutir o Evangelho à mesa de jantar","Ser o principal catequista dos próprios filhos"]},
    {title:"Igreja Doméstica",purposes:["Entronizar o Sagrado Coração de Jesus no lar","Criar um altar doméstico com a Bíblia e imagens","Rezar a Liturgia das Horas em família","Criar um 'dia do Senhor' de verdade — sem trabalho","Abençoar os filhos toda manhã e noite","Criar um caderno de intenções de oração da família","Fazer a oração das refeições em família sempre","Celebrar os sacramentos como grandes festas familiares","Criar o hábito de ler a Bíblia à mesa em família","Decorar a casa com símbolos da fé de forma bela"]},
    {title:"Serviço Comunitário",purposes:["Adotar uma família carente como missão do casal","Participar ativamente de uma pastoral da paróquia","Abrir a casa para acolher casais em dificuldade","Contribuir generosamente — dízimo e além","Ser padrinhos ativos de batismo e crisma","Criar um fundo familiar para doações mensais","Visitar idosos sozinhos pelo menos uma vez por mês","Ajudar na distribuição de alimentos em mutirões","Participar de campanhas da Igreja: Natal Sem Fome","Criar um projeto social ligado ao carisma do casal"]},
    {title:"Finanças Cristãs",purposes:["Criar um orçamento familiar transparente e conjunto","Eliminar dívidas como missão espiritual do casal","Separar o dízimo antes de qualquer outro gasto","Criar uma reserva de emergência como prudência","Decidir todo gasto acima de R$200 juntos","Evitar o consumismo — o suficiente com gratidão","Investir em experiências juntos, não apenas em bens","Estudar juntos um livro sobre finanças cristãs","Criar um fundo de aposentadoria como responsabilidade mútua","Nunca esconder compras ou dívidas do cônjuge"]},
    {title:"Vocação do Casal",purposes:["Identificar juntos os carismas que Deus deu ao casal","Discernir a vocação específica do casamento de vocês","Criar um projeto de vida de casal com metas espirituais","Revisar anualmente o projeto de vida em retiro","Identificar quem Deus colocou para vocês amarem","Perguntar: 'Para que Deus nos casou?'","Usar os dons um do outro como complementação vocacional","Deixar um legado de fé para a próxima geração","Criar um lema espiritual do casal baseado na Escritura","Consagrar anualmente o casamento à missão de Deus"]},
   ]},
  {id:"crise",title:"Crise e Esperança",subtitle:"Permanecer juntos na tempestade",icon:"🌅",color:"#4A3A8A",bg:"#2A1E5A",
   subgroups:[
    {title:"Fé nas Tribulações",purposes:["Ler Rm 8,28 quando tudo parecer contra vocês","Criar o hábito de dar graças mesmo no sofrimento","Meditar em Jó como modelo de fidelidade","Rezar a Coroa da Misericórdia nos momentos difíceis","Criar um 'mural de vitórias' com graças recebidas","Recordar as crises passadas já superadas como prova de Deus","Fazer um jejum nas crises como súplica especial","Convocar a rede de oração da família nos momentos críticos","Meditar na Paixão de Cristo quando o sofrimento é grande","Praticar a confiança: 'Deus sabe o que faz'"]},
    {title:"Luto e Perda",purposes:["Chorar juntos sem envergonhar a dor um do outro","Criar um ritual de memória pelos que partiram","Rezar pela alma dos falecidos de ambas as famílias","Oferecer Missas em sufrágio pelos mortos amados","Guardar a presença um do outro quando não há palavras","Não apressar o luto — respeitar o ritmo de cada um","Buscar acompanhamento espiritual e psicológico no luto","Ler o livro de Jó juntos como partilha espiritual","Criar um espaço de memória sagrado no lar","Acender uma vela em memória numa data especial"]},
    {title:"Doença e Cuidado",purposes:["Rezar pelo cônjuge doente com imposição de mãos","Pedir a Unção dos Enfermos quando necessário","Criar uma rede de apoio para os momentos de internação","Cuidar sem perder a própria saúde — o cuidador também precisa","Praticar a presença — só estar, sem precisar fazer nada","Agradecer a Deus pelas fases boas quando a saúde retorna","Criar um plano de cuidados em caso de doença grave","Rezar o Rosário ao lado da cama do cônjuge doente","Ver a doença como escola de amor","Ler juntos a história de Tobit como força"]},
    {title:"Recomeço após Crise",purposes:["Celebrar o fim de uma crise como vitória espiritual","Criar um marco físico do recomeço (viagem, objeto, foto)","Contar a história da crise superada para outro casal","Agradecer pela crise — ela fortaleceu o que poderia destruir","Criar novas metas após a crise com mais sabedoria","Rezar de joelhos juntos como consagração do recomeço","Renovar os votos após superar uma crise grave","Identificar o que a crise ensinou sobre o amor e sobre Deus","Escrever uma carta de gratidão pela superação","Usar a experiência da crise para ajudar outros casais"]},
    {title:"Esperança Escatológica",purposes:["Meditar juntos na promessa da vida eterna","Conversar sobre como querem ser lembrados como casal","Criar um testamento espiritual — que valores legamos?","Meditar em Ap 21: a nova Jerusalém como destino","Perguntar: 'Como nosso casamento aponta para o reino?'","Rezar pela santidade mútua — que um leve o outro ao Céu","Criar o hábito de dizer 'Te amo até a eternidade'","Visitar um cemitério e rezar pela própria morte bem-vinda","Criar um lugar de meditação sobre a eternidade no lar","Encerrar todo dia com: 'Se hoje fosse o último, morreria amando você?'"]},
   ]},
  {id:"prosperidade",title:"Prosperidade do Casal",subtitle:"Abundância com propósito e fé",icon:"🌿",color:"#1A6B3A",bg:"#0D3D20",
   subgroups:[
    {title:"Mentalidade de Abundância",purposes:["Substituir a mentalidade de escassez pela confiança em Deus provedor","Declarar juntos Mt 6,33 toda manhã antes de começar o dia","Agradecer por tudo que já possuem antes de pedir mais","Criar um mural de gratidão com bênçãos materiais já recebidas","Eliminar as comparações com outros casais — sua jornada é única","Estudar a parábola dos talentos como chamado à multiplicação","Identificar os dons que Deus deu ao casal como ferramentas de prosperidade","Rezar pela prosperidade um do outro com imposição de mãos","Criar afirmações bíblicas de abundância para declarar juntos","Entender que prosperidade começa dentro — no coração e na paz"]},
    {title:"Finanças com Propósito",purposes:["Criar um orçamento familiar transparente e conjunto todo mês","Separar o dízimo (10%) antes de qualquer outro gasto como ato de fé","Criar uma reserva de emergência de 3 a 6 meses de despesas","Eliminar dívidas começando pelas de maior juros — com estratégia e oração","Decidir juntos todo gasto acima de um valor combinado","Criar um fundo de sonhos — viagem, casa, projeto do casal","Revisar as finanças mensalmente como casal sem julgamentos","Estabelecer metas financeiras de curto, médio e longo prazo juntos","Aprender sobre investimentos juntos — um livro, um curso, um podcast","Criar a prática do jejum de consumo: um mês sem compras desnecessárias"]},
    {title:"Trabalho e Vocação",purposes:["Rezar pela carreira e vocação um do outro todo dia","Apoiar ativamente os sonhos profissionais do cônjuge","Identificar como os dons de cada um se complementam no lar e no trabalho","Criar um projeto empreendedor ou criativo juntos — mesmo pequeno","Celebrar cada conquista profissional do cônjuge como vitória do casal","Discernir se o trabalho atual está alinhado com a vocação de Deus","Eliminar o vício do trabalho excessivo que rouba tempo do casamento","Criar limites saudáveis entre trabalho e família no dia a dia","Estudar a doutrina social da Igreja sobre trabalho e dignidade humana","Perguntar juntos: 'Como nosso trabalho serve ao Reino de Deus?'"]},
    {title:"Saúde como Bem",purposes:["Criar uma rotina de exercícios físicos juntos pelo menos 3x por semana","Cozinhar refeições saudáveis juntos como ato de amor e cuidado","Fazer check-ups de saúde anuais — cuidar do corpo que Deus deu","Dormir bem e no mesmo horário sempre que possível — o sono é sagrado","Eliminar hábitos que destroem a saúde: fumo, álcool em excesso, sedentarismo","Caminhar juntos ao ar livre como prática de saúde e conexão","Criar uma rotina de saúde mental: gratidão, oração e descanso","Meditar em 1 Cor 6,19-20: o corpo é templo do Espírito Santo","Rezar pela saúde física do cônjuge com imposição de mãos mensalmente","Aprender juntos sobre alimentação saudável como mordomia do corpo"]},
    {title:"Legado e Impacto",purposes:["Criar um projeto de impacto social ligado ao carisma do casal","Destinar parte da renda para uma causa que une os dois","Mentorar outro casal mais jovem na fé e nas finanças","Plantar a semente da prosperidade nos filhos com educação financeira cristã","Criar o hábito de ajudar sem esperar retorno — a generosidade prospera","Deixar um legado espiritual que dure além de vocês dois","Criar um patrimônio familiar não apenas financeiro — valores, fé, tradições","Investir na educação dos filhos como ato de esperança no futuro","Perguntar juntos: 'Como nossa prosperidade bênça os que nos cercam?'","Encerrar cada ano criando um relatório do bem que o casal fez ao mundo"]},
   ]},
];

// ── Rosary ────────────────────────────────────────────────────────────────────
const CREDO="Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu na Virgem Maria; padeceu sob Pôncio Pilatos; foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai Todo-Poderoso; donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo; na Santa Igreja Católica; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.";
const PAI_NOSSO="Pai Nosso que estais no Céu, santificado seja o Vosso Nome; venha a nós o Vosso Reino; seja feita a Vossa vontade, assim na terra como no Céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do Mal. Amém.";
const AVE_MARIA="Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém.";
const GLORIA="Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre, e por todos os séculos dos séculos. Amém.";
const FATIMA="Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu, especialmente as que mais precisarem da vossa misericórdia. Amém.";
const SALVE_RAINHA="Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro mostrai-nos Jesus, o bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria.";
const MYSTERIES={joyful:{name:"Gozosos",day:"2ª e Sáb",icon:"🌹",color:"#8B2E3F",list:[{t:"A Anunciação",m:"O Anjo Gabriel anuncia a Maria que ela conceberá o Filho de Deus. Como casal, peçamos abertura total à vontade de Deus."},{t:"A Visitação",m:"Maria visita Isabel. Contemplemos como o serviço ao próximo é expressão de amor."},{t:"O Nascimento de Jesus",m:"Jesus nasce em humildade. Que nosso lar seja sempre um presépio — lugar de acolhida e paz."},{t:"A Apresentação no Templo",m:"A Sagrada Família oferece Jesus a Deus. Consagremos nossa família ao Senhor."},{t:"O Encontro no Templo",m:"Jesus é encontrado ensinando no Templo. Que a Palavra de Deus guie nossa casa."}]},sorrowful:{name:"Dolorosos",day:"3ª e Sex",icon:"🌿",color:"#3A2E1A",list:[{t:"A Agonia no Jardim",m:"Jesus ora em angústia, mas entrega sua vontade. Nos momentos de crise, rezemos juntos sem desistir."},{t:"A Flagelação",m:"Jesus sofre sem rancor. Que tenhamos paciência nas provações do casamento."},{t:"A Coroação de Espinhos",m:"Jesus é humilhado mas permanece manso. Cultivemos a humildade mútua."},{t:"Jesus carrega a Cruz",m:"Jesus não desiste. Quando o peso for grande, carreguemos a cruz um pelo outro."},{t:"A Crucificação",m:"'Tudo está consumado.' O amor de Cristo vai até o fim. Que nosso amor também seja total."}]},glorious:{name:"Gloriosos",day:"4ª e Dom",icon:"☀️",color:"#6A4A10",list:[{t:"A Ressurreição",m:"Cristo vence a morte. Em nosso casamento, que toda dificuldade seja oportunidade de ressurgir mais fortes."},{t:"A Ascensão",m:"Jesus parte prometendo voltar. Vivamos em esperança sem negligenciar o cotidiano."},{t:"A Vinda do Espírito Santo",m:"O Espírito enche os discípulos de coragem. Peçamos esse mesmo fogo para nossa relação."},{t:"A Assunção de Maria",m:"Maria é elevada corpo e alma. Cuidemos do nosso corpo e alma — ambos são sagrados."},{t:"A Coroação de Maria",m:"Maria, Rainha e Mãe. Que Nossa Senhora interceda sempre por nossa família."}]},luminous:{name:"Luminosos",day:"5ª",icon:"💫",color:"#1A4A6E",list:[{t:"O Batismo de Jesus",m:"'Este é meu Filho amado.' Somos filhos de Deus — isso define quem somos no casamento."},{t:"As Bodas de Caná",m:"Maria intercede e Jesus realiza o primeiro milagre num casamento. Ela está conosco em cada dificuldade."},{t:"O Anúncio do Reino",m:"'Convertei-vos e crede no Evangelho.' Renunciemos ao que nos afasta de Deus e um do outro."},{t:"A Transfiguração",m:"O rosto de Jesus resplandece. Que possamos ver Deus no rosto do cônjuge, especialmente nos dias difíceis."},{t:"A Instituição da Eucaristia",m:"Jesus doa seu corpo por amor. Que nossa entrega mútua seja espelho desse amor eucarístico."}]}};
function buildRosary(type){const m=MYSTERIES[type],steps=[];steps.push({type:"opening",label:"Credo dos Apóstolos",prayer:CREDO,icon:"✝️"});steps.push({type:"our-father",label:"Pai Nosso",prayer:PAI_NOSSO,icon:"🙏"});["pela fé","pela esperança","pela caridade"].forEach((int,i)=>steps.push({type:"hail-mary",label:`${i+1}ª Ave Maria — ${int}`,prayer:AVE_MARIA,icon:"📿",count:i+1,total:3}));steps.push({type:"glory-be",label:"Glória",prayer:GLORIA,icon:"✨"});m.list.forEach((myst,mi)=>{steps.push({type:"mystery",label:`${mi+1}º Mistério`,mystery:myst.t,meditation:myst.m,icon:m.icon});steps.push({type:"our-father",label:"Pai Nosso",prayer:PAI_NOSSO,icon:"🙏"});for(let i=0;i<10;i++)steps.push({type:"hail-mary",label:`${i+1}ª Ave Maria`,prayer:AVE_MARIA,icon:"📿",count:i+1,total:10});steps.push({type:"glory-be",label:"Glória",prayer:GLORIA,icon:"✨"});steps.push({type:"fatima",label:"Oração de Fátima",prayer:FATIMA,icon:"🕊️"});});steps.push({type:"closing",label:"Salve Rainha",prayer:SALVE_RAINHA,icon:"👑"});return steps;}

// ── NT Books + Verses ─────────────────────────────────────────────────────────
const NT_BOOKS=[{name:"Mateus",abbr:"Mt",chapters:28,section:"Evangelhos"},{name:"Marcos",abbr:"Mc",chapters:16,section:"Evangelhos"},{name:"Lucas",abbr:"Lc",chapters:24,section:"Evangelhos"},{name:"João",abbr:"Jo",chapters:21,section:"Evangelhos"},{name:"Atos",abbr:"At",chapters:28,section:"Atos dos Apóstolos"},{name:"Romanos",abbr:"Rm",chapters:16,section:"Cartas de Paulo"},{name:"1 Coríntios",abbr:"1Co",chapters:16,section:"Cartas de Paulo"},{name:"2 Coríntios",abbr:"2Co",chapters:13,section:"Cartas de Paulo"},{name:"Gálatas",abbr:"Gl",chapters:6,section:"Cartas de Paulo"},{name:"Efésios",abbr:"Ef",chapters:6,section:"Cartas de Paulo"},{name:"Filipenses",abbr:"Fp",chapters:4,section:"Cartas de Paulo"},{name:"Colossenses",abbr:"Cl",chapters:4,section:"Cartas de Paulo"},{name:"1 Tessalonicenses",abbr:"1Ts",chapters:5,section:"Cartas de Paulo"},{name:"2 Tessalonicenses",abbr:"2Ts",chapters:3,section:"Cartas de Paulo"},{name:"1 Timóteo",abbr:"1Tm",chapters:6,section:"Cartas de Paulo"},{name:"2 Timóteo",abbr:"2Tm",chapters:4,section:"Cartas de Paulo"},{name:"Tito",abbr:"Tt",chapters:3,section:"Cartas de Paulo"},{name:"Filemom",abbr:"Fm",chapters:1,section:"Cartas de Paulo"},{name:"Hebreus",abbr:"Hb",chapters:13,section:"Cartas Gerais"},{name:"Tiago",abbr:"Tg",chapters:5,section:"Cartas Gerais"},{name:"1 Pedro",abbr:"1Pe",chapters:5,section:"Cartas Gerais"},{name:"2 Pedro",abbr:"2Pe",chapters:3,section:"Cartas Gerais"},{name:"1 João",abbr:"1Jo",chapters:5,section:"Cartas Gerais"},{name:"2 João",abbr:"2Jo",chapters:1,section:"Cartas Gerais"},{name:"3 João",abbr:"3Jo",chapters:1,section:"Cartas Gerais"},{name:"Judas",abbr:"Jd",chapters:1,section:"Cartas Gerais"},{name:"Apocalipse",abbr:"Ap",chapters:22,section:"Apocalipse"}];
const SEC_ICONS={"Evangelhos":"✝️","Atos dos Apóstolos":"🕊️","Cartas de Paulo":"📜","Cartas Gerais":"✉️","Apocalipse":"🌟"};
const V=[{b:"Mateus",c:5,v:3,t:"Bem-aventurados os pobres em espírito, porque deles é o reino dos céus."},{b:"Mateus",c:5,v:8,t:"Bem-aventurados os puros de coração, porque eles verão a Deus."},{b:"Mateus",c:5,v:9,t:"Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus."},{b:"Mateus",c:6,v:9,t:"Pai nosso, que estás nos céus, santificado seja o teu nome."},{b:"Mateus",c:6,v:33,t:"Mas buscai primeiro o reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas."},{b:"Mateus",c:7,v:7,t:"Pedi e dar-se-vos-á; buscai e achareis; batei e abrir-se-vos-á."},{b:"Mateus",c:18,v:20,t:"Porque onde dois ou três estiverem reunidos em meu nome, ali estou eu no meio deles."},{b:"Mateus",c:19,v:5,t:"Por isso deixará o homem pai e mãe, e se unirá a sua mulher, e serão dois numa só carne."},{b:"Mateus",c:19,v:6,t:"De sorte que já não são dois, mas uma só carne; o que, pois, Deus ajuntou, não o separe o homem."},{b:"Mateus",c:22,v:37,t:"Amarás o Senhor teu Deus de todo o teu coração, e de toda a tua alma, e de todo o teu pensamento."},{b:"Mateus",c:22,v:39,t:"Amarás o teu próximo como a ti mesmo."},{b:"Mateus",c:28,v:20,t:"Eu estou convosco todos os dias, até à consumação dos séculos."},{b:"Marcos",c:10,v:9,t:"O que Deus ajuntou, não o separe o homem."},{b:"Marcos",c:12,v:31,t:"Amarás o teu próximo como a ti mesmo. Não há outro mandamento maior do que estes."},{b:"Lucas",c:1,v:46,t:"A minha alma glorifica ao Senhor."},{b:"Lucas",c:1,v:49,t:"Porque o Poderoso me fez grandes coisas, e santo é o seu nome."},{b:"Lucas",c:15,v:20,t:"Quando ainda estava longe, viu-o seu pai, e se moveu de íntima compaixão, e, correndo, lançou-se-lhe ao pescoço e o beijou."},{b:"João",c:1,v:1,t:"No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus."},{b:"João",c:1,v:14,t:"E o Verbo se fez carne, e habitou entre nós, cheio de graça e de verdade."},{b:"João",c:3,v:16,t:"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."},{b:"João",c:13,v:34,t:"Que vos ameis uns aos outros; como eu vos amei a vós, que também vós uns aos outros vos ameis."},{b:"João",c:13,v:35,t:"Nisto conhecerão todos que sois meus discípulos, se vos amardes uns aos outros."},{b:"João",c:14,v:6,t:"Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim."},{b:"João",c:14,v:27,t:"A minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração."},{b:"João",c:15,v:9,t:"Como o Pai me amou, também eu vos amei; permanecei no meu amor."},{b:"João",c:15,v:12,t:"Que vos ameis uns aos outros, como eu vos amei."},{b:"João",c:15,v:13,t:"Ninguém tem maior amor do que este: de dar alguém a sua vida pelos seus amigos."},{b:"João",c:17,v:21,t:"Para que todos sejam um; como tu, ó Pai, és em mim, e eu em ti."},{b:"Romanos",c:8,v:28,t:"Todas as coisas contribuem juntamente para o bem daqueles que amam a Deus."},{b:"Romanos",c:8,v:39,t:"Nada nos poderá separar do amor de Deus, que está em Cristo Jesus nosso Senhor."},{b:"Romanos",c:12,v:2,t:"Transformai-vos pela renovação do vosso entendimento, para que experimenteis qual seja a boa, agradável e perfeita vontade de Deus."},{b:"Romanos",c:12,v:10,t:"Amai-vos cordialmente uns aos outros com amor fraternal."},{b:"Romanos",c:12,v:21,t:"Não sejas vencido do mal, mas vence o mal com o bem."},{b:"Romanos",c:15,v:13,t:"O Deus de esperança vos encha de todo o gozo e paz em crença."},{b:"1 Coríntios",c:13,v:4,t:"O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade."},{b:"1 Coríntios",c:13,v:7,t:"Tudo sofre, tudo crê, tudo espera, tudo suporta."},{b:"1 Coríntios",c:13,v:8,t:"O amor nunca falha."},{b:"1 Coríntios",c:13,v:13,t:"Permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor."},{b:"2 Coríntios",c:5,v:17,t:"Se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo."},{b:"Gálatas",c:5,v:22,t:"O fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fidelidade."},{b:"Gálatas",c:6,v:2,t:"Levai as cargas uns dos outros, e assim cumprireis a lei de Cristo."},{b:"Efésios",c:4,v:32,t:"Sede bondosos uns para com os outros, misericordiosos, perdoando-vos uns aos outros."},{b:"Efésios",c:5,v:25,t:"Maridos, amai vossas mulheres, como também Cristo amou a igreja."},{b:"Filipenses",c:4,v:6,t:"Em nada estejais ansiosos; antes, as vossas petições sejam em tudo conhecidas diante de Deus."},{b:"Filipenses",c:4,v:7,t:"A paz de Deus, que excede todo o entendimento, guardará os vossos corações."},{b:"Filipenses",c:4,v:13,t:"Posso tudo em Cristo que me fortalece."},{b:"Colossenses",c:3,v:14,t:"Revesti-vos de amor, que é o vínculo da perfeição."},{b:"Colossenses",c:3,v:15,t:"A paz de Deus domine nos vossos corações; e sede agradecidos."},{b:"1 Tessalonicenses",c:5,v:17,t:"Orai sem cessar."},{b:"1 Tessalonicenses",c:5,v:18,t:"Em tudo dai graças, porque esta é a vontade de Deus."},{b:"2 Timóteo",c:1,v:7,t:"Deus não nos deu o espírito de temor, mas de força, e de amor, e de moderação."},{b:"Hebreus",c:11,v:1,t:"A fé é a certeza das coisas que se esperam, e a demonstração das que se não vêem."},{b:"Hebreus",c:12,v:2,t:"Olhando para Jesus, autor e consumador da fé."},{b:"Hebreus",c:13,v:4,t:"O casamento seja honroso em tudo, e o leito sem mácula."},{b:"Hebreus",c:13,v:8,t:"Jesus Cristo é o mesmo, ontem, e hoje, e eternamente."},{b:"Tiago",c:1,v:17,t:"Todo o bom dom e todo o dom perfeito vêm do alto."},{b:"1 Pedro",c:4,v:8,t:"Tende ardente amor uns para com os outros; porque o amor cobre multidão de pecados."},{b:"1 Pedro",c:5,v:7,t:"Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós."},{b:"1 João",c:4,v:7,t:"Amados, amemo-nos uns aos outros; porque o amor é de Deus."},{b:"1 João",c:4,v:8,t:"Aquele que não ama não conhece a Deus; porque Deus é amor."},{b:"1 João",c:4,v:16,t:"Deus é amor; e quem está em amor está em Deus, e Deus nele."},{b:"1 João",c:4,v:19,t:"Nós o amamos a ele porque ele nos amou primeiro."},{b:"Judas",c:1,v:21,t:"Conservai-vos no amor de Deus, esperando a misericórdia de nosso Senhor Jesus Cristo."},{b:"Apocalipse",c:21,v:4,t:"Deus limpará de seus olhos toda a lágrima; e não haverá mais morte, nem pranto, nem dor."},{b:"Apocalipse",c:21,v:5,t:"Eis que faço novas todas as coisas."},{b:"Apocalipse",c:22,v:20,t:"Vem, Senhor Jesus!"}];

// ── Misc helpers ──────────────────────────────────────────────────────────────
function haversineKm(la1,lo1,la2,lo2){const R=6371,r=d=>d*Math.PI/180,dL=r(la2-la1),dO=r(lo2-lo1),a=Math.sin(dL/2)**2+Math.cos(r(la1))*Math.cos(r(la2))*Math.sin(dO/2)**2;return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}
const MONTHS=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],DN=["D","S","T","Q","Q","S","S"];
function getDim(y,m){return new Date(y,m+1,0).getDate();}function getFdow(y,m){return new Date(y,m,1).getDay();}function dkey(d){return d?`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`:""}
function speak(t){if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="pt-BR";u.rate=0.85;window.speechSynthesis.speak(u);}
function stopSpeak(){window.speechSynthesis?.cancel();}
function shareWA(v){window.open(`https://wa.me/?text=${encodeURIComponent(`"${v.t}" — ${v.b} ${v.c},${v.v} 📖 Casal em Fé`)}`,"_blank");}
const CrossIcon=({size=18,color})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="10" y="2" width="4" height="20" rx="1.2" fill={color}/><rect x="3" y="8" width="18" height="4" rx="1.2" fill={color}/></svg>);


// ── DAYS ──────────────────────────────────────────────────────────────────────
const DAYS=[{id:0,label:"Preparação",sublabel:"Antes da Jornada",icon:"🕯️",theme:"Disposição do Coração",verse:'"Onde dois ou três estiverem reunidos em meu nome, ali estou eu." — Mt 18,20',reflection:"Reservem um momento sagrado. Acendam uma vela e sentem-se de frente um para o outro.",propositos:["Rezem juntos o Pai-Nosso de mãos dadas","Compartilhe uma palavra que quer cultivar esta semana","Escrevam o que esperam que Deus faça em seu casamento","Guardem o papel na Bíblia — abram no Dia 7"],color:"#7A4A6A"},{id:1,label:"Dia 1",sublabel:"Amor",icon:"❤️",theme:"O Amor que não Falha",verse:'"O amor é sofredor, é benigno." — 1 Cor 13,4',reflection:"O amor cristão é decisão diária.",propositos:["Leiam 1 Cor 13,4-8 juntos em voz alta","Citem três atitudes de amor que o cônjuge demonstrou","Escolham uma qualidade do amor para praticar hoje","Digam 'Eu te amo' olhando nos olhos"],color:"#8B2E3F"},{id:2,label:"Dia 2",sublabel:"Fidelidade",icon:"🤝",theme:"A Aliança que Deus Abençoa",verse:'"O que Deus uniu, o homem não separe." — Mt 19,6',reflection:"Fidelidade é escolher o outro todos os dias.",propositos:["Releiam juntos os votos do casamento","Identifiquem uma área onde a atenção pode aumentar","Rezem pedindo fortalecimento da aliança","Façam algo que o outro gosta sem ser pedido"],color:"#1A4A6E"},{id:3,label:"Dia 3",sublabel:"Oração",icon:"🙏",theme:"Rezar é Respirar Juntos",verse:'"Orai sem cessar." — 1 Ts 5,17',reflection:"O casal que reza junto permanece junto.",propositos:["Reservem 15 min para rezar juntos","Cada um apresente uma intenção para o cônjuge orar","Criem um horário fixo de oração do casal","Agradeçam a Deus por três graças do relacionamento"],color:"#2E5E3A"},{id:4,label:"Dia 4",sublabel:"Perdão",icon:"🕊️",theme:"Libertos para Amar de Novo",verse:'"Perdoando-vos mutuamente, como Deus vos perdoou." — Ef 4,32',reflection:"O perdão não apaga a dor, mas recusa que ela destrua o amor.",propositos:["Pensem em algo pelo qual precisam pedir perdão","Compartilhem com gentileza e ouçam com coração aberto","Rezem juntos o Ato de Contrição","Marquem uma confissão individual nesta semana"],color:"#5A4A1A"},{id:5,label:"Dia 5",sublabel:"Gratidão",icon:"🌾",theme:"Contar as Bênçãos a Dois",verse:'"Em tudo dai graças." — 1 Ts 5,18',reflection:"A gratidão transforma como enxergamos o outro.",propositos:["Cada um escreva 7 coisas pelo qual é grato no cônjuge","Leiam as listas um para o outro olhando nos olhos","Criem um Diário de Gratidão do Casal","Façam uma refeição especial com ação de graças"],color:"#3A5A2A"},{id:6,label:"Dia 6",sublabel:"Serviço",icon:"🫶",theme:"Amor que Serve sem Esperar",verse:'"O maior entre vós será vosso servo." — Mt 23,11',reflection:"Jesus lavou os pés dos discípulos. No casamento, lavar os pés do outro é preparar o café sem ser pedido.",propositos:["Faça uma tarefa doméstica que é do cônjuge com alegria","Conversem sobre a distribuição das responsabilidades","Planejem um ato de serviço ao próximo juntos","Rezem a oração de São Francisco juntos"],color:"#1A4A5E"},{id:7,label:"Dia 7",sublabel:"Esperança",icon:"✨",theme:"O Melhor ainda está por Vir",verse:'"Que o Deus da esperança vos encha de alegria." — Rm 15,13',reflection:"Este é um recomeço. O casamento cristão é uma peregrinação rumo à santidade.",propositos:["Abram o papel guardado no Dia de Preparação","Compartilhem o que esta semana transformou em cada um","Renovem os votos com suas próprias palavras","Celebrem com um jantar ou passeio especial","Comprometam-se a repetir esta jornada semestralmente"],color:"#6A4A10"}];

// ── Theme Detail overlay ──────────────────────────────────────────────────────
function ThemeDetail({theme,P,checked,setChecked,onClose}){
  const[open,setOpen]=useState(null);
  const total=theme.subgroups.reduce((a,s)=>a+s.purposes.length,0);
  const done=theme.subgroups.reduce((a,s)=>a+s.purposes.filter((_,i)=>checked[`${theme.id}-${theme.subgroups.indexOf(s)}-${i}`]).length,0);
  return(<div style={{position:"fixed",inset:0,zIndex:60,overflowY:"auto",background:`linear-gradient(160deg,${theme.bg}F0 0%,#0D0608 100%)`}}>
    {/* Header */}
    <div style={{padding:"52px 24px 20px",position:"relative"}}>
      <button onClick={onClose} style={{position:"absolute",top:16,left:16,background:"#ffffff22",border:"none",color:"#fff",borderRadius:12,padding:"8px 14px",cursor:"pointer",fontFamily:"'Lora',serif",fontSize:13}}>← Voltar</button>
      <div style={{textAlign:"center",paddingTop:8}}>
        <div style={{fontSize:44,marginBottom:6}}>{theme.icon}</div>
        <div style={{fontSize:11,color:"#ffffff66",letterSpacing:3,fontFamily:"'Lora',serif",textTransform:"uppercase"}}>Tema de Relacionamento</div>
        <div style={{fontSize:28,fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:900,lineHeight:1.1,marginTop:4}}>{theme.title}</div>
        <div style={{fontSize:12,color:"#ffffff77",fontFamily:"'Lora',serif",fontStyle:"italic"}}>{theme.subtitle}</div>
        {/* Progress */}
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#ffffff15",borderRadius:20,padding:"6px 16px",marginTop:12}}>
          <div style={{width:80,height:5,borderRadius:3,background:"#ffffff22",overflow:"hidden"}}><div style={{width:`${(done/total)*100}%`,height:"100%",background:LP.gold,transition:"width 0.3s"}}/></div>
          <span style={{fontSize:11,color:LP.goldLight,fontFamily:"'Lora',serif"}}>{done}/{total} concluídos</span>
        </div>
      </div>
    </div>

    {/* Subgroups */}
    <div style={{padding:"0 14px 40px"}}>
      {theme.subgroups.map((sg,si)=>{
        const sgDone=sg.purposes.filter((_,i)=>checked[`${theme.id}-${si}-${i}`]).length;
        const isOpen=open===si;
        return(<div key={si} style={{marginBottom:10,borderRadius:16,overflow:"hidden",border:`1.5px solid ${theme.color}44`,background:P.card,boxShadow:`0 3px 12px ${P.shadow}`}}>
          <div onClick={()=>setOpen(isOpen?null:si)} style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",background:isOpen?`${theme.color}18`:"transparent"}}>
            <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${theme.color},${theme.color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontFamily:"'Playfair Display',serif",fontWeight:700,flexShrink:0}}>{si+1}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:P.burgundy,fontWeight:700}}>{sg.title}</div>
              <div style={{fontSize:10,color:P.textMuted,fontFamily:"'Lora',serif",marginTop:2}}>{sgDone}/{sg.purposes.length} propósitos marcados</div>
            </div>
            {sgDone===sg.purposes.length&&sgDone>0&&<div style={{fontSize:9,background:"#2E5E3A22",color:"#2E5E3A",padding:"3px 8px",borderRadius:20,fontFamily:"'Lora',serif"}}>✓ Completo</div>}
            <span style={{fontSize:16,color:P.textMuted,transition:"transform 0.2s",transform:isOpen?"rotate(90deg)":"none"}}>›</span>
          </div>
          {isOpen&&<div style={{borderTop:`1px solid ${theme.color}22`}}>
            {sg.purposes.map((pur,pi)=>{
              const k=`${theme.id}-${si}-${pi}`;const done2=!!checked[k];
              return(<div key={pi} onClick={()=>setChecked(c=>({...c,[k]:!done2}))} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 16px",cursor:"pointer",borderBottom:`1px solid ${theme.color}11`,background:done2?`${theme.color}08`:"transparent",transition:"background 0.2s"}}>
                <div style={{width:22,height:22,borderRadius:6,flexShrink:0,marginTop:1,background:done2?theme.color:P.cream,border:`2px solid ${done2?theme.color:theme.color+"44"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>
                  {done2&&<span style={{fontSize:11,color:"#fff",fontWeight:"bold"}}>✓</span>}
                </div>
                <p style={{margin:0,fontFamily:"'Lora',serif",fontSize:12.5,color:done2?P.textMuted:P.text,lineHeight:1.7,textDecoration:done2?"line-through":"none"}}>{pur}</p>
              </div>);
            })}
          </div>}
        </div>);
      })}
    </div>
  </div>);
}

// ── 4 Extra Themes ────────────────────────────────────────────────────────────
THEMES.push(
  {id:"sogros",title:"Família Extensa",subtitle:"Honrar sem se perder",icon:"🏡",color:"#5C4A8A",bg:"#2E2050",
   subgroups:[
    {title:"Deixar Pai e Mãe",purposes:["Meditar em Gn 2,24 como mandamento de prioridade conjugal","Identificar hábitos da família de origem que entram em conflito no casamento","Criar rituais e tradições próprios do casal — independentes das famílias","Reconhecer quando o cônjuge está sendo priorizado menos que os pais","Conversar sobre as expectativas das famílias de origem com honestidade","Aprender a dizer não com amor sem gerar culpa desnecessária","Criar o lar como espaço sagrado do casal — primário e inviolável","Meditar na Sagrada Família como modelo de unidade com discernimento","Fazer terapia de casal para trabalhar padrões da família de origem","Rezar pela libertação de laços que impedem a plena entrega conjugal"]},
    {title:"Limites Saudáveis",purposes:["Definir juntos o que é aceitável e o que é invasivo — antes de conflitos","Criar uma resposta padrão para interferências sem agressividade","Nunca usar sogros como árbitros de conflitos conjugais","Alinhar as decisões importantes antes de comunicar às famílias","Não compartilhar intimidades do casamento com pais ou irmãos","Criar um pacto: o que acontece no casal fica no casal","Visitar as famílias com frequência equilibrada — sem favoritismos","Proteger o cônjuge de críticas da própria família — com lealdade","Definir como serão tratadas as interferências financeiras de pais","Rezar pela sabedoria de honrar sem obedecer em detrimento do casal"]},
    {title:"Cicatrizes da Origem",purposes:["Identificar medos e comportamentos herdados das famílias de origem","Entender o padrão emocional da família de cada um sem julgamento","Perdoar os pais pelas feridas que moldaram cada um — com oração","Fazer o genograma familiar juntos para identificar padrões repetidos","Reconhecer o que foi aprendido de bom nas famílias e preservar","Buscar acompanhamento psicológico cristão para trabalhar traumas","Rezar pela cura da árvore genealógica — Missa, consagração, perdão","Compartilhar memórias dolorosas da infância com o cônjuge com confiança","Identificar os gatilhos do cônjuge que vêm da família de origem","Criar um ambiente de cura mútua — sem julgamento, com compaixão"]},
    {title:"Cuidado com Idosos",purposes:["Alinhar juntos as expectativas sobre cuidar de pais idosos","Criar um plano prático para quando os pais precisarem de apoio","Definir limites financeiros para o cuidado de familiares","Não permitir que o cuidado dos pais desequilibre o casamento","Incluir os filhos no respeito e cuidado dos avós","Rezar pela saúde e salvação dos pais e sogros todo dia","Visitar os idosos da família com regularidade e intencionalidade","Tratar o sogro/sogra como presente — não como adversário","Agradecer ao cônjuge que cuida bem de seus próprios pais","Meditar em Rt 1,16 — a lealdade de Rute como modelo de amor"]},
    {title:"União das Famílias",purposes:["Criar um evento anual que una as duas famílias com alegria","Rezar pelas duas famílias juntos todo domingo","Encontrar pontos em comum entre as duas origens e celebrá-los","Tratar a família do cônjuge como própria — com afeto real","Criar tradições que misturem elementos das duas famílias","Envolver os avós na educação espiritual dos filhos","Defender o cônjuge diante da própria família quando necessário","Nunca fazer o cônjuge escolher entre você e sua família de origem","Criar um momento mensal de partilha entre as famílias","Rezar juntos pela conversão de familiares que se afastaram da fé"]},
  ]},
  {id:"discernimento",title:"Decisões e Discernimento",subtitle:"Ouvir Deus juntos nas encruzilhadas",icon:"🧭",color:"#2A6B5A",bg:"#0D3A30",
   subgroups:[
    {title:"Ouvir Deus Juntos",purposes:["Criar o hábito de perguntar: 'O que Deus está dizendo sobre isso?'","Praticar o silêncio contemplativo juntos antes de grandes decisões","Ler a Lectio Divina juntos sobre o assunto em discernimento","Criar um diário de discernimento para grandes escolhas do casal","Rezar o Veni Creator Spiritus antes de decisões importantes","Buscar um confessor ou diretor espiritual como guia do casal","Aprender os princípios do discernimento de Santo Inácio de Loyola","Jejuar juntos como pedido especial de sabedoria a Deus","Consultar a Palavra de Deus — não apenas a opinião de outros","Esperar o tempo de Deus — não apressar o discernimento por ansiedade"]},
    {title:"Filhos e Família",purposes:["Discernir juntos em oração a abertura à vida e ao número de filhos","Estudar a Humanae Vitae como bússola para a família","Tratar a questão de filhos como discernimento espiritual — não apenas prático","Rezar pelas almas dos filhos que virão — ou que já vieram","Discernir juntos a educação: escola, catequese, formação humana","Conversar sobre adoção como possível chamado do casal","Alinhar expectativas sobre criação dos filhos antes que se tornem conflito","Perguntar juntos: 'Que ambiente espiritual nossos filhos estão recebendo?'","Criar uma missão de família — uma frase que guie as decisões sobre os filhos","Rezar pela vocação específica de cada filho desde cedo"]},
    {title:"Moradia e Mudanças",purposes:["Nunca decidir uma mudança grande sem consenso e oração dos dois","Rezar pela cidade e pelo bairro antes de escolher onde morar","Criar critérios espirituais para escolha do lar — não só financeiros","Investigar a comunidade de fé disponível antes de se mudar","Consultar um diretor espiritual quando a decisão for difícil","Abençoar o lar antes de entrar — com água benta e oração","Discernir se a mudança é chamado de Deus ou fuga de problemas","Tratar a casa como espaço sagrado desde a escolha","Perguntar: 'Esta moradia facilita ou dificulta nossa vida espiritual?'","Celebrar cada novo lar como um novo capítulo da história do casal"]},
    {title:"Divergências a Dois",purposes:["Criar um protocolo para quando os dois discordam: oração primeiro","Aprender a distinguir preferência pessoal de chamado de Deus","Buscar um terceiro de confiança espiritual quando o impasse persistir","Respeitar o não de Deus quando ambos sentem fechamento na oração","Nunca tomar uma decisão grande com um dos dois em dúvida séria","Exercitar a humildade de ceder quando o cônjuge tem mais clareza","Criar o hábito de revisitar decisões passadas para aprender com elas","Meditar em Pv 3,5-6: confiar em Deus com todo o coração","Praticar o desapego do próprio plano — a vontade de Deus é melhor","Celebrar quando uma decisão difícil é tomada em paz e consenso"]},
    {title:"Sonhos e Projetos",purposes:["Criar um encontro anual para revisar o projeto de vida do casal","Mapear os sonhos individuais e os sonhos em comum do casal","Identificar quais sonhos já foram cumpridos — e agradecer","Criar um quadro de visão do casal — físico, na parede do lar","Discernir quais projetos são de Deus e quais são apenas ego","Dar permissão ao cônjuge para ter seus próprios sonhos e apoiá-los","Criar prazos e marcos concretos para os projetos mais importantes","Rezar sobre cada sonho do casal com expectativa e abandono","Distinguir sonho de Deus de pressão social ou familiar","Encerrar todo ano com: 'Em que avançamos? O que Deus está pedindo agora?'"]},
  ]},
  {id:"hospitalidade",title:"Hospitalidade e Comunidade",subtitle:"Abrir o lar como missão de amor",icon:"🕯️",color:"#8A5A1A",bg:"#4A2E08",
   subgroups:[
    {title:"O Lar como Missão",purposes:["Entender a casa como extensão da missão batismal do casal","Abrir a casa para refeições com outros pelo menos uma vez por mês","Criar um ambiente acolhedor — vela, música suave, mesa posta com cuidado","Rezar antes de receber convidados: 'Que Cristo seja o anfitrião'","Identificar quem ao redor precisa de um lar para se sentir amado","Aprender com Abraão e Sara: receber o estranho é receber Deus (Hb 13,2)","Criar uma tradição de hospitalidade ligada às festas litúrgicas","Transformar a mesa em altar: cada refeição partilhada é sagrada","Não esperar a casa perfeita para receber — a presença basta","Rezar por quem passou pela casa de vocês nesta semana"]},
    {title:"Amizades que Edificam",purposes:["Avaliar juntos se as amizades atuais edificam ou corroem o casamento","Cultivar amizades com outros casais que compartilham a fé","Eliminar gradualmente relações que trazem influências destrutivas","Criar um grupo pequeno de casais para partilha e oração mensal","Ser o casal de referência que outros sabem que podem chamar","Nunca fazer amizades que criem segredos em relação ao cônjuge","Orar pelos amigos e pelas famílias deles todo domingo","Criar momentos de lazer com outros casais — alegria também é missão","Cultivar a amizade genuína — não apenas a utilidade ou o convívio superficial","Perguntar: 'Nossas amizades nos aproximam ou nos afastam de Deus?'"]},
    {title:"Proteção da Comunidade",purposes:["Escolher a comunidade de fé como um casal — não apenas individualmente","Participar ativamente da paróquia — não como consumidores mas como membros","Criar vínculos com uma família espiritual de referência","Evitar o isolamento — casais solitários são casais vulneráveis","Não deixar que crises internas impeçam a participação comunitária","Rezar pela comunidade de fé de vocês todo dia","Contribuir com dons e talentos — não só com presença ou dinheiro","Acolher novos membros da comunidade com calor e intencionalidade","Proteger o nome do casal — não falar mal da comunidade publicamente","Criar laços intergeracionais: aprender com os mais velhos e guiar os mais novos"]},
    {title:"Ajudar Casais em Crise",purposes:["Estar disponível para ouvir outro casal sem julgamento","Nunca tomar partido em conflito de outro casal — ser ponte de paz","Indicar acompanhamento profissional quando necessário sem impor","Partilhar a própria história de crise superada com humildade e esperança","Criar um pacto de sigilo: o que se conta em partilha fica ali","Rezar pelo casal em crise com nomes e intenções específicas","Oferecer ajuda prática — refeição, cuidado com filhos — nos momentos difíceis","Acompanhar um casal em crise com paciência — cura leva tempo","Ser modelo vivo de que é possível superar — sem exibicionismo","Perguntar: 'O que podemos fazer por vocês neste momento?' — e fazer"]},
    {title:"Lazer e Alegria",purposes:["Criar momentos de lazer com outros casais sem celular ou trabalho","Celebrar aniversários, conquistas e marcos dos amigos com alegria genuína","Criar viagens ou retiros em grupo com outros casais de confiança","Aprender algo novo juntos com outros casais — dança, culinária, idioma","Rir junto — a alegria compartilhada é cimento da amizade","Criar jogos, festas e celebrações ligados ao calendário litúrgico","Descansar juntos — lazer não é pecado, é dever de criatura limitada","Celebrar o Natal, a Páscoa e o Pentecostes com a comunidade","Criar tradições festivas que crianças das famílias amigas esperem ansiosamente","Encerrar cada encontro com uma oração ou bênção sobre os presentes"]},
  ]},
  {id:"identidade",title:"Identidade do Casal",subtitle:"Saber quem vocês são juntos",icon:"💍",color:"#7A2A5A",bg:"#3D0D2E",
   subgroups:[
    {title:"História e Narrativa",purposes:["Escrever juntos a história do casamento — como se conheceram, como Deus agiu","Criar um álbum físico ou digital com os marcos da jornada","Reler a história do casal nos momentos de crise para reencontrar o porquê","Identificar três momentos em que claramente Deus interveio na relação","Contar a história de vocês para os filhos como herança espiritual","Criar um vídeo ou registro do testemunho do casamento","Agradecer pelos momentos difíceis que forjaram quem vocês são hoje","Mapear a providência de Deus na linha do tempo do casamento","Celebrar o aniversário de casamento com um ritual de memória e gratidão","Escrever uma carta ao casal que vocês eram no início — com amor e sabedoria"]},
    {title:"Valores Inegociáveis",purposes:["Listar juntos os cinco valores que definem o casal — sem negociação","Revisar anualmente se os valores ainda estão sendo vividos","Criar decisões a partir dos valores — não das emoções do momento","Identificar quando um valor foi comprometido e corrigi-lo juntos","Ensinar os valores do casal aos filhos por meio do exemplo","Criar um lema espiritual baseado em uma passagem bíblica","Colocar o lema do casal em lugar visível no lar","Perguntar diante de cada grande decisão: 'Isso reflete quem somos?'","Celebrar quando o casal age de acordo com seus valores sob pressão","Rezar para que Deus aprofunde e refine os valores do casal ao longo do tempo"]},
    {title:"Projeto de Vida",purposes:["Criar um projeto de vida do casal com metas para 1, 5 e 20 anos","Revisar o projeto em retiro anual — longe da rotina","Incluir dimensões espiritual, relacional, financeira, vocacional e de saúde","Identificar o que está impedindo o casal de avançar no projeto","Criar um painel de visão (vision board) com os sonhos do casal","Celebrar cada etapa do projeto cumprida como graça de Deus","Discernir juntos quando o projeto precisa ser revisado ou abandonado","Criar metas concretas e não apenas intenções vagas","Alinhar o projeto de vida com a missão que Deus deu ao casal","Encerrar cada ano fazendo: 'O que vivemos? O que aprendemos? Para onde vamos?'"]},
    {title:"Personalidade e Dons",purposes:["Fazer juntos o teste de personalidade (MBTI, DISC ou Eneagrama)","Estudar como as personalidades de cada um se complementam","Identificar os dons espirituais de cada um (1 Cor 12) e como se combinam","Nunca usar a personalidade do cônjuge como crítica — mas como compreensão","Criar espaço para que cada um brilhe no que faz de melhor","Aprender a trabalhar com as diferenças como força — não como fraqueza","Identificar como a personalidade de cada um afeta a forma de amar e de conflitar","Criar projetos que usem os dons dos dois de forma complementar","Agradecer pelas diferenças — elas completam o que falta em cada um","Rezar para que cada um cresça no melhor de quem foi criado para ser"]},
    {title:"Renovação da Visão",purposes:["Fazer um retiro de casal ao menos uma vez por ano para renovar a visão","Reconhecer quando a visão do casal se perdeu — sem culpa, com coragem","Criar rituais de renovação: renovar os votos, reacender um símbolo","Buscar um diretor espiritual que acompanhe a visão do casal a longo prazo","Ler a biografia de um santo casal para reinflamar o coração","Perguntar: 'Se nosso casamento tivesse apenas 5 anos, o que faríamos diferente?'","Criar um manifesto do casal — o que acreditam, o que recusam, o que perseguem","Fazer uma peregrinação anual como renovação espiritual da visão","Encerrar cada fase difícil com um ritual de consagração do novo começo","Rezar: 'Senhor, renova a visão do nosso casamento — mostra-nos o que ainda não vemos'"]},
  ]}
);

// ── Themes Section (for Home) ─────────────────────────────────────────────────
function ThemesSection({P,checked,setChecked}){
  const[active,setActive]=useState(null);
  const scrollRef=useRef(null);
  const[scrollPct,setScrollPct]=useState(0);
  const[hint,setHint]=useState(true);

  useEffect(()=>{
    const el=scrollRef.current;if(!el)return;
    const onScroll=()=>{
      const max=el.scrollWidth-el.clientWidth;
      setScrollPct(max>0?el.scrollLeft/max:0);
      if(el.scrollLeft>10)setHint(false);
    };
    el.addEventListener("scroll",onScroll,{passive:true});
    return()=>el.removeEventListener("scroll",onScroll);
  },[]);

  // Auto-hint pulse after 1.2s if user hasn't scrolled
  useEffect(()=>{
    if(!hint)return;
    const t=setTimeout(()=>{
      const el=scrollRef.current;
      if(el&&el.scrollLeft===0){
        el.scrollTo({left:40,behavior:"smooth"});
        setTimeout(()=>el.scrollTo({left:0,behavior:"smooth"}),500);
      }
    },1800);
    return()=>clearTimeout(t);
  },[hint]);

  const total_themes=THEMES.length;

  return(<>
    {active&&<ThemeDetail theme={THEMES.find(t=>t.id===active)} P={P} checked={checked} setChecked={setChecked} onClose={()=>setActive(null)}/>}

    {/* Header */}
    <div style={{padding:"0 24px 10px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <CrossIcon size={13} color={LP.warm}/>
        <span style={{fontSize:10,color:P.textMuted,letterSpacing:2,textTransform:"uppercase",fontFamily:"'Lora',serif"}}>{total_themes} Temas de Relacionamento</span>
      </div>
      <span style={{fontSize:10,color:P.textMuted,fontFamily:"'Lora',serif",opacity:0.6}}>{Math.round(scrollPct*100*(total_themes-2)/(100))+1}/{total_themes}</span>
    </div>

    {/* Carousel */}
    <div ref={scrollRef} style={{overflowX:"auto",paddingBottom:4,paddingLeft:16,display:"flex",gap:12,scrollbarWidth:"none",WebkitOverflowScrolling:"touch",scrollSnapType:"x mandatory"}}>
      {THEMES.map(t=>{
        const total=t.subgroups.reduce((a,s)=>a+s.purposes.length,0);
        const done=Object.keys(checked).filter(k=>k.startsWith(t.id+"-")&&checked[k]).length;
        const pct=Math.round((done/total)*100);
        return(<div key={t.id} onClick={()=>setActive(t.id)} style={{flexShrink:0,width:148,borderRadius:20,overflow:"hidden",cursor:"pointer",boxShadow:`0 4px 16px ${t.color}44`,scrollSnapAlign:"start",transition:"transform 0.15s"}}>
          <div style={{background:`linear-gradient(160deg,${t.bg},${t.color})`,padding:"16px 14px 12px"}}>
            <div style={{fontSize:32,marginBottom:6}}>{t.icon}</div>
            <div style={{fontSize:13,fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:700,lineHeight:1.2}}>{t.title}</div>
            <div style={{fontSize:10,color:"#ffffff77",fontFamily:"'Lora',serif",marginTop:2,lineHeight:1.4}}>{t.subtitle}</div>
          </div>
          <div style={{background:P.card,padding:"10px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
              <span style={{fontSize:9,color:P.textMuted,fontFamily:"'Lora',serif"}}>{done}/{total}</span>
              <span style={{fontSize:9,color:t.color,fontFamily:"'Lora',serif",fontWeight:"600"}}>{pct}%</span>
            </div>
            <div style={{height:4,borderRadius:2,background:`${t.color}22`,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:t.color,transition:"width 0.4s"}}/></div>
          </div>
        </div>);
      })}
      <div style={{width:16,flexShrink:0,scrollSnapAlign:"none"}}/>
    </div>

    {/* Scroll track — minimal dot strip */}
    <div style={{display:"flex",alignItems:"center",gap:6,padding:"10px 24px 4px",justifyContent:"center"}}>
      <div style={{flex:1,height:2,borderRadius:2,background:`${LP.gold}18`,position:"relative",overflow:"hidden",maxWidth:200}}>
        <div style={{
          position:"absolute",top:0,left:0,height:"100%",borderRadius:2,
          background:`linear-gradient(90deg,${LP.gold}88,${LP.gold})`,
          width:`${Math.max(scrollPct*100,8)}%`,
          transition:"width 0.2s ease, left 0.2s ease",
          left:`${scrollPct*(100-Math.max(scrollPct*100,8))}%`,
        }}/>
      </div>
    </div>
  </>);
}

// ── Bible Tab ─────────────────────────────────────────────────────────────────
function BibleTab({P,favorites,setFavorites}){
  const[q,setQ]=useState("");const[book,setBook]=useState(null);const[ch,setCh]=useState(null);const[speaking,setSpeaking]=useState(false);const[aTab,setATab]=useState("browse");
  const bvMap=useMemo(()=>{const m={};V.forEach(v=>{if(!m[v.b])m[v.b]={};if(!m[v.b][v.c])m[v.b][v.c]=[];m[v.b][v.c].push(v);});return m;},[]);
  const results=useMemo(()=>{if(!q.trim()||q.length<2)return[];const qq=q.toLowerCase();return V.filter(v=>v.t.toLowerCase().includes(qq)||v.b.toLowerCase().includes(qq)).slice(0,50);},[q]);
  const isS=q.trim().length>=2;const favV=useMemo(()=>V.filter(v=>favorites.includes(`${v.b}${v.c}${v.v}`)),[favorites]);
  function toggleFav(v){const id=`${v.b}${v.c}${v.v}`;setFavorites(f=>f.includes(id)?f.filter(x=>x!==id):[...f,id]);}
  function isFav(v){return favorites.includes(`${v.b}${v.c}${v.v}`);}
  function Hl({text}){if(!q.trim())return<span>{text}</span>;const re=new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");return<span>{text.split(re).map((p,i)=>re.test(p)?<mark key={i} style={{background:"#E8C97A66",color:"#5C1A2E",borderRadius:3,padding:"0 2px"}}>{p}</mark>:<span key={i}>{p}</span>)}</span>;}
  function VC({v}){return(<div style={{marginBottom:10,padding:"14px 16px",borderRadius:14,background:P.card,border:`1px solid ${LP.gold}22`,boxShadow:`0 2px 8px ${P.shadow}`}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><div style={{background:LP.burgundy,borderRadius:8,padding:"2px 8px"}}><span style={{fontSize:10,color:LP.goldLight,fontFamily:"'Lora',serif"}}>{v.b} {v.c},{v.v}</span></div></div><p style={{margin:0,fontFamily:"'Playfair Display',serif",fontSize:13.5,color:P.text,lineHeight:1.7,fontStyle:"italic"}}>{isS?<Hl text={v.t}/>:v.t}</p><div style={{display:"flex",gap:8,marginTop:10,justifyContent:"flex-end"}}><button onClick={()=>shareWA(v)} style={{background:"none",border:`1px solid ${LP.gold}44`,borderRadius:10,padding:"4px 10px",cursor:"pointer",fontSize:11,color:P.warm,fontFamily:"'Lora',serif"}}>📲 WhatsApp</button><button onClick={()=>{if(speaking){stopSpeak();setSpeaking(false);}else{speak(v.t);setSpeaking(true);setTimeout(()=>setSpeaking(false),8000);}}} style={{background:"none",border:`1px solid ${LP.gold}44`,borderRadius:10,padding:"4px 10px",cursor:"pointer",fontSize:11,color:P.warm,fontFamily:"'Lora',serif"}}>{speaking?"⏹ Parar":"🔊 Ouvir"}</button><button onClick={()=>toggleFav(v)} style={{background:isFav(v)?LP.gold+"22":"none",border:`1px solid ${isFav(v)?LP.gold:LP.gold+"44"}`,borderRadius:10,padding:"4px 10px",cursor:"pointer",fontSize:11,color:isFav(v)?LP.gold:P.textMuted}}>{isFav(v)?"❤️":"🤍"}</button></div></div>);}
  const SECS=[...new Set(NT_BOOKS.map(b=>b.section))];
  return(<div style={{paddingBottom:"calc(80px + env(safe-area-inset-bottom))"}}>
    <div style={{background:`linear-gradient(135deg,${LP.burgundyDeep},${LP.burgundy})`,padding:"48px 16px 0",position:"sticky",top:0,zIndex:30}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8,minHeight:22}}>
        {book&&<><button onClick={()=>{setBook(null);setCh(null);setQ("");}} style={{background:"none",border:"none",color:LP.goldLight,fontFamily:"'Lora',serif",fontSize:12,cursor:"pointer",padding:0}}>Início</button><span style={{color:"#ffffff44",fontSize:12}}>›</span><button onClick={()=>setCh(null)} style={{background:"none",border:"none",color:ch?LP.goldLight:"#fff",fontFamily:"'Lora',serif",fontSize:12,cursor:"pointer",padding:0,fontWeight:ch?"400":"600"}}>{book.name}</button>{ch&&<><span style={{color:"#ffffff44",fontSize:12}}>›</span><span style={{color:"#fff",fontFamily:"'Lora',serif",fontSize:12,fontWeight:"600"}}>Cap. {ch}</span></>}</>}
        {!book&&<span style={{color:"#ffffff88",fontFamily:"'Lora',serif",fontSize:11,letterSpacing:2,textTransform:"uppercase"}}>Novo Testamento</span>}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,background:"#ffffff18",borderRadius:14,padding:"10px 14px",marginBottom:8,backdropFilter:"blur(8px)"}}>
        <span style={{fontSize:16}}>🔍</span>
        <input value={q} onChange={e=>{setQ(e.target.value);setBook(null);setCh(null);setATab("browse");}} placeholder="Buscar versículo, livro ou palavra..." style={{flex:1,background:"none",border:"none",outline:"none",color:"#fff",fontFamily:"'Lora',serif",fontSize:13}}/>
        {q&&<button onClick={()=>setQ("")} style={{background:"none",border:"none",color:"#ffffff88",cursor:"pointer",fontSize:14,padding:0}}>✕</button>}
      </div>
      {!isS&&!book&&<div style={{display:"flex",gap:0,marginBottom:0}}>{["browse","favorites"].map(t=><button key={t} onClick={()=>setATab(t)} style={{flex:1,padding:"8px 0",background:aTab===t?"#ffffff22":"none",border:"none",borderTop:aTab===t?`2px solid ${LP.gold}`:"2px solid transparent",color:aTab===t?"#fff":"#ffffff66",fontFamily:"'Lora',serif",fontSize:12,cursor:"pointer"}}>{t==="browse"?"📖 Livros":"❤️ Favoritos"}</button>)}</div>}
    </div>
    {isS&&<div style={{padding:"14px 16px 0"}}><div style={{fontSize:10,color:P.textMuted,letterSpacing:2,textTransform:"uppercase",fontFamily:"'Lora',serif",marginBottom:10}}>{results.length} resultado{results.length!==1?"s":""}</div>{results.length===0?<div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontSize:32,marginBottom:12}}>📖</div><p style={{fontFamily:"'Lora',serif",color:P.textMuted,fontSize:13,fontStyle:"italic"}}>Nenhuma passagem encontrada.</p></div>:results.map((v,i)=><VC key={i} v={v}/>)}</div>}
    {!isS&&!book&&aTab==="favorites"&&<div style={{padding:"14px 16px 0"}}>{favV.length===0?<div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontSize:36,marginBottom:12}}>🤍</div><p style={{fontFamily:"'Lora',serif",color:P.textMuted,fontSize:13,fontStyle:"italic"}}>Nenhum versículo favoritado ainda.</p></div>:favV.map((v,i)=><VC key={i} v={v}/>)}</div>}
    {!isS&&book&&ch&&<div style={{padding:"14px 16px 0"}}><div style={{marginBottom:14,padding:"12px 16px",borderRadius:14,background:`linear-gradient(135deg,${LP.burgundy},${LP.burgundy}88)`}}><div style={{fontSize:10,color:"#ffffff77",letterSpacing:2,fontFamily:"'Lora',serif",textTransform:"uppercase"}}>{book.name}</div><div style={{fontSize:18,fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:700}}>Capítulo {ch}</div></div>{(bvMap[book.name]?.[ch]||[]).map((v,i)=><VC key={i} v={v}/>)}{!bvMap[book.name]?.[ch]&&<div style={{textAlign:"center",padding:"40px 0"}}><p style={{fontFamily:"'Lora',serif",color:P.textMuted,fontSize:13,fontStyle:"italic"}}>Use a busca para encontrar versículos por palavra-chave.</p></div>}</div>}
    {!isS&&book&&!ch&&<div style={{padding:"14px 16px 0"}}><div style={{marginBottom:14,padding:"14px 18px",borderRadius:16,background:P.card,border:`1px solid ${LP.gold}22`,display:"flex",alignItems:"center",gap:12}}><div style={{width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${LP.burgundy},${LP.burgundy}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{SEC_ICONS[book.section]||"📖"}</div><div><div style={{fontSize:18,fontFamily:"'Playfair Display',serif",color:P.burgundy,fontWeight:700}}>{book.name}</div><div style={{fontSize:11,color:P.textMuted,fontFamily:"'Lora',serif"}}>{book.section} · {book.chapters} cap. · {book.abbr}</div></div></div><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>{Array.from({length:book.chapters},(_,i)=>i+1).map(n=>{const has=!!bvMap[book.name]?.[n];return(<div key={n} onClick={()=>setCh(n)} style={{height:48,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:has?`${LP.burgundy}22`:P.card,border:has?`1.5px solid ${LP.burgundy}44`:`1px solid ${LP.gold}22`,position:"relative"}}><span style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:has?P.burgundy:P.textMuted,fontWeight:has?"700":"400"}}>{n}</span>{has&&<div style={{position:"absolute",top:4,right:5,width:5,height:5,borderRadius:"50%",background:LP.gold}}/>}</div>);})}</div></div>}
    {!isS&&!book&&aTab==="browse"&&<div style={{padding:"14px 16px 0"}}>{SECS.map(sec=><div key={sec} style={{marginBottom:20}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:14}}>{SEC_ICONS[sec]}</span><span style={{fontSize:10,color:P.textMuted,letterSpacing:2,textTransform:"uppercase",fontFamily:"'Lora',serif"}}>{sec}</span><div style={{flex:1,height:1,background:`${LP.gold}33`,marginLeft:4}}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{NT_BOOKS.filter(b=>b.section===sec).map(b=>{const cnt=V.filter(v=>v.b===b.name).length;return(<div key={b.name} onClick={()=>setBook(b)} style={{padding:"12px 14px",borderRadius:14,cursor:"pointer",background:P.card,border:`1.5px solid ${cnt>0?LP.burgundy+"33":LP.gold+"22"}`,boxShadow:`0 2px 8px ${P.shadow}`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontSize:13,fontFamily:"'Playfair Display',serif",color:P.burgundy,fontWeight:700,lineHeight:1.2}}>{b.name}</div><div style={{fontSize:10,color:P.textMuted,fontFamily:"'Lora',serif",marginTop:2}}>{b.abbr} · {b.chapters} cap.</div></div>{cnt>0&&<div style={{background:`${LP.gold}22`,borderRadius:8,padding:"2px 6px"}}><span style={{fontSize:9,color:P.warm,fontFamily:"'Lora',serif"}}>{cnt}v</span></div>}</div></div>);})}</div></div>)}<div style={{margin:"8px 0 24px",padding:"14px 18px",borderRadius:16,background:`linear-gradient(135deg,${LP.burgundyDeep},${LP.burgundy})`,textAlign:"center"}}><div style={{fontSize:20,marginBottom:6}}>✝️</div><p style={{fontFamily:"'Playfair Display',serif",fontSize:12,color:LP.goldLight,fontStyle:"italic",margin:0,lineHeight:1.6}}>"A tua palavra é lâmpada para os meus pés."<br/><span style={{fontSize:10,color:"#ffffff55",fontFamily:"'Lora',serif"}}>Sl 119,105</span></p></div></div>}
  </div>);
}

// ── Rosary Tab ────────────────────────────────────────────────────────────────
function RosaryTab({P}){
  const[mType,setMType]=useState("joyful");const[step,setStep]=useState(0);const[started,setStarted]=useState(false);const[speaking,setSpeaking]=useState(false);
  const steps=useMemo(()=>buildRosary(mType),[mType]);const cur=steps[step];const total=steps.length;
  function speakCur(){if(speaking){stopSpeak();setSpeaking(false);}else{speak(cur.prayer||cur.meditation||"");setSpeaking(true);setTimeout(()=>setSpeaking(false),20000);}}
  if(!started)return(<div style={{paddingBottom:"calc(80px + env(safe-area-inset-bottom))"}}><div style={{background:`linear-gradient(160deg,${LP.burgundyDeep},${LP.burgundy})`,padding:"52px 24px 32px",textAlign:"center"}}><div style={{fontSize:36,marginBottom:8}}>📿</div><div style={{fontSize:10,color:LP.goldLight,letterSpacing:3,fontFamily:"'Lora',serif",textTransform:"uppercase",marginBottom:4}}>Terço do Casal</div><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:"#fff",fontWeight:900,margin:"4px 0"}}>Rezar Juntos</h2><p style={{color:"#ffffff77",fontSize:12,fontFamily:"'Lora',serif",fontStyle:"italic",margin:0}}>O casal que reza o Terço permanece unido</p></div><div style={{padding:"20px 16px"}}><div style={{fontSize:10,color:P.textMuted,letterSpacing:2,textTransform:"uppercase",fontFamily:"'Lora',serif",marginBottom:12}}>Escolha os Mistérios</div>{Object.entries(MYSTERIES).map(([k,m])=><div key={k} onClick={()=>setMType(k)} style={{marginBottom:10,padding:"16px 18px",borderRadius:16,cursor:"pointer",background:mType===k?`linear-gradient(135deg,${m.color},${m.color}BB)`:P.card,border:`1.5px solid ${mType===k?m.color:LP.gold+"22"}`,boxShadow:mType===k?`0 6px 20px ${m.color}44`:`0 2px 8px ${P.shadow}`}}><div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:26}}>{m.icon}</span><div><div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:mType===k?"#fff":P.burgundy,fontWeight:700}}>Mistérios {m.name}</div><div style={{fontSize:11,color:mType===k?"#ffffff88":P.textMuted,fontFamily:"'Lora',serif"}}>{m.day}</div></div></div></div>)}<button onClick={()=>setStarted(true)} style={{width:"100%",marginTop:16,padding:"16px",background:`linear-gradient(135deg,${LP.burgundy},${LP.burgundy}BB)`,border:"none",borderRadius:16,color:"#fff",fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,cursor:"pointer"}}>📿 Começar o Terço</button></div></div>);
  const sColors={"opening":LP.burgundy,"our-father":"#2E5E3A","hail-mary":"#1A4A6E","glory-be":LP.warm,"fatima":"#7A4A6A","mystery":"#6A4A10","closing":LP.gold};const cc=sColors[cur.type]||LP.burgundy;
  return(<div style={{paddingBottom:"calc(80px + env(safe-area-inset-bottom))"}}><div style={{background:`linear-gradient(160deg,${LP.burgundyDeep},${LP.burgundy})`,padding:"48px 24px 20px",textAlign:"center"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><button onClick={()=>{setStarted(false);setStep(0);stopSpeak();setSpeaking(false);}} style={{background:"#ffffff22",border:"none",color:"#fff",borderRadius:10,padding:"6px 12px",cursor:"pointer",fontFamily:"'Lora',serif",fontSize:12}}>← Voltar</button><div style={{fontSize:11,color:LP.goldLight,fontFamily:"'Lora',serif"}}>Mistérios {MYSTERIES[mType].name}</div><div style={{fontSize:11,color:"#ffffff88",fontFamily:"'Lora',serif"}}>{step+1}/{total}</div></div><div style={{display:"flex",gap:3,justifyContent:"center",flexWrap:"wrap",maxWidth:280,margin:"0 auto 12px"}}>{steps.map((_,i)=><div key={i} style={{width:i===step?12:6,height:i===step?12:6,borderRadius:"50%",background:i<=step?LP.gold:"#ffffff33",transition:"all 0.3s",marginTop:i===step?0:3}}/>)}</div><div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"center"}}><span style={{fontSize:20}}>{cur.icon}</span><div style={{fontSize:13,color:"#fff",fontFamily:"'Lora',serif"}}>{cur.label}</div></div></div>
  <div style={{margin:"16px",borderRadius:24,background:P.card,boxShadow:`0 8px 30px ${P.shadow}`,overflow:"hidden"}}><div style={{background:`linear-gradient(135deg,${cc},${cc}BB)`,padding:"16px 20px"}}><div style={{fontSize:10,color:"#ffffff88",letterSpacing:2,fontFamily:"'Lora',serif",textTransform:"uppercase"}}>{cur.type==="mystery"?"Meditação":"Oração"}</div><div style={{fontSize:18,fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:700,marginTop:2}}>{cur.mystery||cur.label}</div>{cur.count&&<div style={{marginTop:4}}>{Array.from({length:cur.total},(_,i)=><span key={i} style={{fontSize:12,opacity:i<cur.count?1:0.3}}>📿</span>)}</div>}</div><div style={{padding:"20px"}}><p style={{fontFamily:"'Lora',serif",fontSize:14,color:P.text,lineHeight:1.9,margin:0}}>{cur.prayer||cur.meditation}</p>{cur.prayer&&<button onClick={speakCur} style={{marginTop:14,background:"none",border:`1px solid ${cc}44`,borderRadius:10,padding:"6px 14px",cursor:"pointer",fontSize:12,color:cc,fontFamily:"'Lora',serif"}}>{speaking?"⏹ Parar":"🔊 Ouvir em voz alta"}</button>}</div></div>
  <div style={{display:"flex",gap:10,padding:"0 16px"}}><button onClick={()=>{setStep(s=>Math.max(0,s-1));stopSpeak();setSpeaking(false);}} disabled={step===0} style={{flex:1,padding:"14px",background:step===0?"#ddd":P.card,border:`1.5px solid ${LP.gold}33`,borderRadius:16,color:step===0?P.textMuted:P.burgundy,fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,cursor:step===0?"default":"pointer"}}>← Anterior</button>{step<total-1?<button onClick={()=>{setStep(s=>s+1);stopSpeak();setSpeaking(false);}} style={{flex:1,padding:"14px",background:`linear-gradient(135deg,${LP.burgundy},${LP.burgundy}BB)`,border:"none",borderRadius:16,color:"#fff",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>Próxima →</button>:<button onClick={()=>{setStep(0);setStarted(false);}} style={{flex:1,padding:"14px",background:`linear-gradient(135deg,${LP.gold},${LP.warm})`,border:"none",borderRadius:16,color:"#fff",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>✝️ Terminar</button>}</div></div>);
}

// ── Calendar ──────────────────────────────────────────────────────────────────
function JourneyCalendar({P,startDate,setStartDate,completedDays}){
  const today=new Date();const[vy,setVy]=useState(today.getFullYear());const[vm,setVm]=useState(today.getMonth());
  const total=getDim(vy,vm),first=getFdow(vy,vm);const cells=[...Array(first).fill(null),...Array(total).fill(0).map((_,i)=>i+1)];
  const jd=startDate?Array.from({length:8},(_,i)=>{const d=new Date(startDate);d.setDate(startDate.getDate()+i);return d;}):[],jKeys=new Set(jd.map(dkey)),cKeys=new Set(jd.filter((_,i)=>completedDays.includes(i)).map(dkey)),sk=dkey(jd[0]),ek=dkey(jd[7]);
  const cd2=d=>d?new Date(vy,vm,d):null,click=d=>{if(d)setStartDate(new Date(vy,vm,d));};
  const prev=()=>{if(vm===0){setVy(y=>y-1);setVm(11);}else setVm(m=>m-1);};const next=()=>{if(vm===11){setVy(y=>y+1);setVm(0);}else setVm(m=>m+1);};
  return(<div style={{margin:"0 16px 16px",borderRadius:20,overflow:"hidden",background:P.card,border:`1.5px solid ${LP.gold}33`,boxShadow:`0 4px 20px ${P.shadow}`}}><div style={{background:`linear-gradient(135deg,${LP.burgundyDeep},${LP.burgundy})`,padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}><button onClick={prev} style={{background:"#ffffff22",border:"none",color:"#fff",borderRadius:10,padding:"5px 12px",cursor:"pointer",fontSize:16}}>‹</button><div style={{textAlign:"center"}}><div style={{fontSize:9,color:LP.goldLight,letterSpacing:3,fontFamily:"'Lora',serif",textTransform:"uppercase"}}>Calendário da Jornada</div><div style={{fontSize:15,fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:700}}>{MONTHS[vm]} {vy}</div></div><button onClick={next} style={{background:"#ffffff22",border:"none",color:"#fff",borderRadius:10,padding:"5px 12px",cursor:"pointer",fontSize:16}}>›</button></div><div style={{padding:"14px 10px"}}><div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:6}}>{DN.map((d,i)=><div key={i} style={{textAlign:"center",fontSize:10,fontFamily:"'Lora',serif",color:i===0||i===6?LP.gold:P.textMuted,paddingBottom:4}}>{d}</div>)}</div><div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>{cells.map((day,idx)=>{const d2=cd2(day),k=dkey(d2),iS=k===sk,iE=k===ek,inJ=jKeys.has(k),iC=cKeys.has(k),iT=day&&dkey(today)===k;let bg="transparent",tc=P.text,brd="none",fw="400";if(iS||iE){bg=LP.burgundy;tc="#fff";fw="700";}else if(iC){bg=`${LP.gold}33`;tc=LP.warm;brd=`1.5px solid ${LP.gold}66`;}else if(inJ){bg=`${LP.burgundy}11`;tc=P.burgundy;brd=`1px dashed ${LP.burgundy}44`;}if(iT&&!iS&&!iE)brd=`2px solid ${LP.gold}`;return(<div key={idx} onClick={()=>click(day)} style={{height:34,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",cursor:day?"pointer":"default",background:bg,border:brd,position:"relative",transition:"background 0.2s"}}>{day&&<><span style={{fontSize:11,fontFamily:"'Lora',serif",color:tc,fontWeight:fw}}>{day}</span>{iC&&<span style={{position:"absolute",top:1,right:2,fontSize:7,color:LP.gold}}>✓</span>}{(iS||iE)&&<span style={{position:"absolute",bottom:0,fontSize:6,color:"#ffffff88"}}>{iS?"início":"fim"}</span>}</>}</div>);})}</div>{startDate?<div style={{marginTop:10,padding:"8px 12px",borderRadius:10,background:`${LP.gold}11`,border:`1px solid ${LP.gold}33`,textAlign:"center"}}><p style={{margin:0,fontSize:11,fontFamily:"'Lora',serif",color:LP.warm}}>📅 De <strong>{startDate.toLocaleDateString("pt-BR")}</strong> até <strong>{jd[7]?.toLocaleDateString("pt-BR")}</strong></p></div>:<p style={{textAlign:"center",fontSize:10,color:P.textMuted,fontFamily:"'Lora',serif",fontStyle:"italic",marginTop:8,marginBottom:0}}>Toque em um dia para marcar o início</p>}</div></div>);
}

// ── Casal Tab ─────────────────────────────────────────────────────────────────
function CasalTab({P,isDark,setIsDark,profile,setProfile,diary,setDiary,progress}){
  const[sub,setSub]=useState("perfil");const[locA,setLocA]=useState(null),[locB,setLocB]=useState(null),[ldA,setLdA]=useState(false),[ldB,setLdB]=useState(false),[errA,setErrA]=useState(""),[errB,setErrB]=useState("");const[notif,setNotif]=useState(false);
  function getloc(set,sl,se){if(!navigator.geolocation){se("Não suportado.");return;}sl(true);se("");navigator.geolocation.getCurrentPosition(p=>{sl(false);set({lat:p.coords.latitude,lon:p.coords.longitude});},()=>{sl(false);se("Permissão negada.");},{enableHighAccuracy:true,timeout:10000});}
  const dist=locA&&locB?haversineKm(locA.lat,locA.lon,locB.lat,locB.lon).toFixed(1):null;
  const figP=Math.min(progress/7,1);
  async function reqN(){if(!("Notification" in window))return;const p=await Notification.requestPermission();if(p==="granted"){setNotif(true);new Notification("Casal em Fé 🙏",{body:`Propósito do dia: ${DAYS[Math.min(progress,7)].sublabel}!`});}}
  const wd=profile.wedding?new Date(profile.wedding):null;const dm=wd?Math.floor((new Date()-wd)/(1000*60*60*24)):null;
  const SUBS=[{id:"perfil",icon:"👫",label:"Perfil"},{id:"diario",icon:"📓",label:"Diário"},{id:"distancia",icon:"📍",label:"Distância"},{id:"config",icon:"⚙️",label:"Config."}];
  return(<div style={{paddingBottom:"calc(80px + env(safe-area-inset-bottom))"}}><div style={{background:`linear-gradient(160deg,${LP.burgundyDeep},${LP.burgundy})`,padding:"48px 24px 0",textAlign:"center"}}><CrossIcon size={26} color={LP.gold}/><div style={{fontSize:10,color:LP.goldLight,letterSpacing:3,fontFamily:"'Lora',serif",textTransform:"uppercase",marginTop:6}}>Nosso Espaço</div><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:"#fff",fontWeight:900,margin:"4px 0 16px"}}>Casal em Fé</h2><div style={{display:"flex",borderTop:`1px solid #ffffff22`}}>{SUBS.map(s=><button key={s.id} onClick={()=>setSub(s.id)} style={{flex:1,padding:"10px 0",background:sub===s.id?"#ffffff22":"none",border:"none",borderTop:sub===s.id?`2px solid ${LP.gold}`:"2px solid transparent",color:sub===s.id?"#fff":"#ffffff66",fontFamily:"'Lora',serif",fontSize:11,cursor:"pointer"}}>{s.icon}<br/>{s.label}</button>)}</div></div>
  {sub==="perfil"&&<div style={{padding:"20px 16px"}}><div style={{background:P.card,borderRadius:20,padding:20,border:`1px solid ${LP.gold}22`,marginBottom:16}}><div style={{textAlign:"center",marginBottom:16}}><div style={{display:"flex",justifyContent:"center",marginBottom:4}}><span style={{fontSize:48,letterSpacing:-2}}>👨</span><span style={{fontSize:36,verticalAlign:"middle",margin:"0 2px"}}>❤️</span><span style={{fontSize:48,letterSpacing:-2}}>👩</span></div><div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginTop:6}}>{["💍","🙏","✝️","❤️","🌹"].map(e=><button key={e} onClick={()=>setProfile(p=>({...p,avatar:e}))} style={{background:profile.avatar===e?`${LP.gold}33`:"none",border:`1px solid ${profile.avatar===e?LP.gold:LP.gold+"33"}`,borderRadius:10,padding:"4px 8px",cursor:"pointer",fontSize:18}}>{e}</button>)}</div></div>{[{k:"he",l:"Nome dele"},{k:"she",l:"Nome dela"},{k:"wedding",l:"Data do relacionamento",t:"date"}].map(f=><div key={f.k} style={{marginBottom:14}}><div style={{fontSize:10,color:P.textMuted,letterSpacing:1.5,fontFamily:"'Lora',serif",textTransform:"uppercase",marginBottom:4}}>{f.l}</div><input type={f.t||"text"} value={profile[f.k]||""} onChange={e=>setProfile(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",background:P.cream,border:`1.5px solid ${LP.gold}33`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lora',serif",fontSize:13,color:P.text,outline:"none",boxSizing:"border-box"}}/></div>)}</div>{dm!==null&&(<><div style={{background:`linear-gradient(135deg,${LP.burgundyDeep},${LP.burgundy})`,borderRadius:16,padding:"16px 20px",textAlign:"center",marginBottom:12}}><div style={{fontSize:10,color:LP.goldLight,letterSpacing:2,fontFamily:"'Lora',serif",textTransform:"uppercase"}}>Unidos há</div><div style={{fontSize:42,fontFamily:"'Playfair Display',serif",color:LP.gold,fontWeight:900,lineHeight:1}}>{dm.toLocaleString("pt-BR")}</div><div style={{fontSize:13,color:"#ffffff77",fontFamily:"'Lora',serif"}}>dias juntos</div><div style={{fontSize:11,color:"#ffffff55",fontFamily:"'Lora',serif",marginTop:4,fontStyle:"italic"}}>{Math.floor(dm/365)} anos, {Math.floor((dm%365)/30)} meses e {dm%30} dias</div></div>{(()=>{const autoSaint=getSaintFromDate(profile.wedding);return autoSaint?(<div style={{borderRadius:16,overflow:"hidden",border:`1.5px solid ${autoSaint.color}44`}}><div style={{background:`linear-gradient(135deg,${autoSaint.color}DD,${autoSaint.color}88)`,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}><div style={{width:36,height:36,borderRadius:"50%",background:"#ffffff22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{autoSaint.icon}</div><div><div style={{fontSize:9,color:"#ffffff88",letterSpacing:2,fontFamily:"'Lora',serif",textTransform:"uppercase"}}>Santo Padroeiro do Casal</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:"#fff",fontWeight:700}}>{autoSaint.name}</div></div></div><div style={{background:P.card,padding:"12px 16px"}}><p style={{margin:0,fontFamily:"'Lora',serif",fontSize:12,color:P.text,lineHeight:1.7,fontStyle:"italic"}}>{autoSaint.phrase}</p></div></div>):null;})()}</>)}</div>}
  {sub==="diario"&&<div style={{padding:"20px 16px"}}><div style={{fontSize:10,color:P.textMuted,letterSpacing:2,textTransform:"uppercase",fontFamily:"'Lora',serif",marginBottom:12}}>Reflexões por dia</div>{DAYS.map(day=><div key={day.id} style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1.5px solid ${day.color}33`}}><div style={{background:`linear-gradient(135deg,${day.color},${day.color}BB)`,padding:"10px 16px",display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{day.icon}</span><div style={{flex:1}}><div style={{fontSize:13,fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:700}}>{day.label} — {day.sublabel}</div></div></div><div style={{background:P.card,padding:"12px 14px"}}><textarea value={diary[day.id]||""} onChange={e=>setDiary(d=>({...d,[day.id]:e.target.value}))} placeholder="Escreva a reflexão do casal..." style={{width:"100%",minHeight:80,background:P.cream,border:`1px solid ${LP.gold}22`,borderRadius:10,padding:"10px 12px",fontFamily:"'Lora',serif",fontSize:12,color:P.text,outline:"none",resize:"vertical",boxSizing:"border-box",lineHeight:1.7}}/></div></div>)}</div>}
  {sub==="distancia"&&<div style={{padding:"20px 16px"}}>
    <div style={{background:P.card,borderRadius:20,padding:"16px 12px",border:`1px solid ${LP.gold}22`,marginBottom:14}}>
      <div style={{textAlign:"center",position:"relative",height:160,display:"flex",alignItems:"center",justifyContent:"center"}}>
        {(()=>{
          const gap=Math.round(120*(1-figP));
          return(
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:0,width:"100%",position:"relative"}}>

              {/* Man emoji */}
              <div style={{
                fontSize:72,lineHeight:1,
                transform:`translateX(-${gap/2}px)`,
                transition:"transform 0.9s cubic-bezier(.34,1.56,.64,1)",
                filter:"drop-shadow(0 4px 8px #0002)",
              }}>🧍‍♂️</div>

              {/* Cross — always centered between them */}
              <div style={{
                position:"absolute",left:"50%",top:"50%",
                transform:"translate(-50%,-60%)",
                display:"flex",flexDirection:"column",alignItems:"center",
                zIndex:2,
              }}>
                <svg width="24" height="32" viewBox="0 0 24 32">
                  <rect x="10" y="0" width="4" height="32" rx="2" fill={LP.gold} opacity="0.9"/>
                  <rect x="2" y="10" width="20" height="4" rx="2" fill={LP.gold} opacity="0.9"/>
                </svg>
              </div>

              {/* Heart — appears as they get closer */}
              {figP>0.3&&(
                <div style={{
                  position:"absolute",left:"50%",top:0,
                  transform:`translate(-50%,-10%) scale(${figP>0.85?1+(figP-0.85)*3:figP*0.8})`,
                  transition:"transform 0.4s ease, opacity 0.4s ease",
                  opacity:Math.min(figP*1.5,1),
                  fontSize:28,
                  zIndex:3,
                }}>❤️</div>
              )}

              {/* Woman emoji */}
              <div style={{
                fontSize:72,lineHeight:1,
                transform:`translateX(${gap/2}px)`,
                transition:"transform 0.9s cubic-bezier(.34,1.56,.64,1)",
                filter:"drop-shadow(0 4px 8px #0002)",
              }}>🧍‍♀️</div>

            </div>
          );
        })()}
      </div>
      <div style={{textAlign:"center",fontSize:11,fontFamily:"'Lora',serif",color:P.textMuted,fontStyle:"italic",marginBottom:12}}>{figP<1?progress===0?"A jornada ainda não começou...":`Dia ${progress} — o amor se aprofunda ❤️`:"✨ Unidos em Cristo!"}</div>
      <div style={{display:"flex",gap:3}}>{Array.from({length:8},(_,i)=><div key={i} style={{flex:1,height:i<progress?8:4,borderRadius:4,background:i<progress?LP.gold:"#E0D0B8",transition:"all 0.4s"}}/>)}</div>
    </div>
    <div style={{display:"flex",gap:10,marginBottom:14}}>
      {[{who:"Ele",emoji:"👨",color:LP.burgundy,loc:locA,ld:ldA,err:errA,fn:()=>getloc(setLocA,setLdA,setErrA)},{who:"Ela",emoji:"👩",color:"#8B2E3F",loc:locB,ld:ldB,err:errB,fn:()=>getloc(setLocB,setLdB,setErrB)}].map(({who,emoji,color,loc,ld,err,fn})=><div key={who} style={{flex:1,background:P.card,borderRadius:18,padding:"16px 12px",border:`1.5px solid ${color}33`,textAlign:"center"}}><div style={{fontSize:26,marginBottom:6}}>{emoji}</div><div style={{fontSize:13,fontFamily:"'Playfair Display',serif",color:P.burgundy,fontWeight:700,marginBottom:10}}>{who}</div>{loc?<div style={{background:`${color}11`,borderRadius:10,padding:"8px 6px"}}><div style={{fontSize:10,color,fontFamily:"'Lora',serif",lineHeight:1.7}}>{loc.lat.toFixed(4)}°<br/>{loc.lon.toFixed(4)}°</div><div style={{marginTop:6,fontSize:9,color:"#2E5E3A",background:"#2E5E3A11",borderRadius:8,padding:"3px 8px",display:"inline-block",fontFamily:"'Lora',serif"}}>✓ Localizado</div></div>:<button onClick={fn} disabled={ld} style={{width:"100%",padding:"10px 6px",background:ld?"#ccc":`linear-gradient(135deg,${color},${color}BB)`,border:"none",borderRadius:12,color:"#fff",fontFamily:"'Lora',serif",fontSize:11,cursor:ld?"default":"pointer"}}>📍{ld?" Buscando...":" Compartilhar"}</button>}{err&&<p style={{fontSize:9,color:"#c0392b",marginTop:6,fontFamily:"'Lora',serif"}}>{err}</p>}</div>)}
    </div>
    {dist!==null&&<div style={{borderRadius:20,background:`linear-gradient(135deg,${LP.burgundyDeep},${LP.burgundy})`,padding:"20px",textAlign:"center",boxShadow:`0 8px 30px ${LP.burgundy}44`}}><div style={{fontSize:9,color:LP.goldLight,letterSpacing:3,fontFamily:"'Lora',serif",textTransform:"uppercase",marginBottom:4}}>Distância entre vocês</div><div style={{fontSize:48,fontFamily:"'Playfair Display',serif",color:LP.gold,fontWeight:900,lineHeight:1}}>{dist}</div><div style={{fontSize:13,color:"#ffffff77",fontFamily:"'Lora',serif"}}>quilômetros</div></div>}
  </div>}
  {sub==="config"&&<div style={{padding:"20px 16px"}}><div style={{background:P.card,borderRadius:20,padding:20,border:`1px solid ${LP.gold}22`,marginBottom:14}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:14,borderBottom:`1px solid ${LP.gold}22`}}><div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:P.burgundy,fontWeight:700}}>🌙 Modo Escuro</div><div style={{fontSize:11,color:P.textMuted,fontFamily:"'Lora',serif"}}>Tema noturno</div></div><div onClick={()=>setIsDark(d=>!d)} style={{width:50,height:28,borderRadius:14,background:isDark?LP.gold:"#ddd",cursor:"pointer",position:"relative",transition:"background 0.3s"}}><div style={{position:"absolute",top:3,left:isDark?22:3,width:22,height:22,borderRadius:"50%",background:"#fff",transition:"left 0.3s",boxShadow:"0 2px 4px #0003"}}/></div></div><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:14}}><div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:P.burgundy,fontWeight:700}}>🔔 Notificações</div><div style={{fontSize:11,color:P.textMuted,fontFamily:"'Lora',serif"}}>Lembrete diário</div></div><button onClick={reqN} style={{background:notif?`${LP.gold}22`:`linear-gradient(135deg,${LP.burgundy},${LP.burgundy}BB)`,border:`1px solid ${notif?LP.gold:LP.burgundy}`,borderRadius:12,padding:"6px 14px",cursor:"pointer",color:notif?LP.warm:"#fff",fontFamily:"'Lora',serif",fontSize:11}}>{notif?"✓ Ativado":"Ativar"}</button></div></div></div>}
  </div>);
}

// ── Day Detail ────────────────────────────────────────────────────────────────
function DayDetail({day,onClose,onComplete,isCompleted,P}){return(<div style={{position:"fixed",inset:0,zIndex:50,overflowY:"auto",background:`linear-gradient(160deg,${day.color}EE 0%,#1A0A12 100%)`}}><div style={{padding:"52px 24px 24px",position:"relative"}}><button onClick={onClose} style={{position:"absolute",top:16,left:16,background:"#ffffff22",border:"none",color:"#fff",borderRadius:12,padding:"8px 14px",cursor:"pointer",fontFamily:"'Lora',serif",fontSize:13}}>← Voltar</button><div style={{textAlign:"center",paddingTop:8}}><div style={{fontSize:48,marginBottom:8}}>{day.icon}</div><div style={{fontSize:10,color:"#ffffff77",letterSpacing:3,fontFamily:"'Lora',serif",textTransform:"uppercase"}}>{day.label}</div><div style={{fontSize:30,fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:700,lineHeight:1.2}}>{day.sublabel}</div><div style={{fontSize:13,color:"#ffffff88",fontFamily:"'Lora',serif",fontStyle:"italic"}}>{day.theme}</div></div></div><div style={{margin:"0 16px 40px",borderRadius:24,background:P.card,padding:24,boxShadow:"0 20px 60px #0004"}}><div style={{background:`${day.color}11`,borderLeft:`3px solid ${day.color}`,padding:"14px 16px",borderRadius:"0 12px 12px 0",marginBottom:20}}><div style={{fontSize:9,color:P.textMuted,letterSpacing:2,fontFamily:"'Lora',serif",marginBottom:6,textTransform:"uppercase"}}>Palavra do Dia</div><p style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:P.burgundy,lineHeight:1.7,margin:0,fontStyle:"italic"}}>{day.verse}</p></div><div style={{marginBottom:20}}><p style={{fontFamily:"'Lora',serif",fontSize:14,color:P.text,lineHeight:1.8,margin:0}}>{day.reflection}</p></div><div style={{borderTop:`1px solid ${day.color}22`,paddingTop:16}}>{day.propositos.map((p,i)=><div key={i} style={{display:"flex",gap:12,marginBottom:14,alignItems:"flex-start"}}><div style={{width:24,height:24,borderRadius:"50%",flexShrink:0,background:`${day.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:day.color,fontWeight:700,fontFamily:"'Playfair Display',serif"}}>{i+1}</div><p style={{fontFamily:"'Lora',serif",fontSize:13.5,color:P.text,lineHeight:1.7,margin:0}}>{p}</p></div>)}</div><button onClick={()=>onComplete(day.id)} style={{width:"100%",marginTop:20,padding:"16px",background:isCompleted?"#2E5E3A":`linear-gradient(135deg,${day.color},${day.color}BB)`,border:"none",borderRadius:16,color:"#fff",fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:`0 6px 20px ${day.color}55`}}>{isCompleted?"✓ Propósitos Cumpridos":"Marcar como Cumprido"}</button></div></div>);}


// ── Onboarding ────────────────────────────────────────────────────────────────
const ONBOARD_STEPS=[
  {icon:"✝️",title:"Bem-vindos ao\nCasal em Fé",body:"Um espaço sagrado para os dois crescerem juntos na fé, no amor e na missão que Deus preparou para vocês.",cta:"Começar",bg:"#3B0F1D",accent:"#C8973A"},
  {icon:"📿",title:"A Jornada\nde 8 Dias",body:"Um dia de preparação + 7 dias temáticos com versículos, reflexões e propósitos práticos baseados na Bíblia — para fazer juntos.",cta:"Próximo",bg:"#5C1A2E",accent:"#E8C97A"},
  {icon:"🗂️",title:"12 Temas\nde Relacionamento",body:"Amor, comunicação, perdão, prosperidade, identidade, família extensa e mais. Cada tema tem 50 propósitos concretos para o casal trabalhar no seu ritmo.",cta:"Próximo",bg:"#1A3A24",accent:"#C8973A"},
  {icon:"📖",title:"Bíblia,\nTerço e Mais",body:"Acesse o Novo Testamento completo com busca, favoritos e áudio. Guia de terço passo a passo com os quatro mistérios para rezar juntos.",cta:"Próximo",bg:"#0D2E4A",accent:"#E8C97A"},
  {icon:"👨👩",title:"Feito para\nVocês Dois",body:"Configure o perfil do casal, marque a data de início no calendário, registre reflexões no diário e meça a distância entre vocês em km.",cta:"Entrar no App",bg:"#3B0F1D",accent:"#C8973A"},
];

function Onboarding({onDone}){
  const[step,setStep]=useState(0);
  const[exiting,setExiting]=useState(false);
  const s=ONBOARD_STEPS[step];
  const isLast=step===ONBOARD_STEPS.length-1;

  function next(){
    if(isLast){setExiting(true);setTimeout(onDone,400);}
    else setStep(n=>n+1);
  }

  return(
    <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column",background:s.bg,transition:"background 0.5s ease",opacity:exiting?0:1,transform:exiting?"scale(0.96)":"scale(1)",transitionProperty:"background,opacity,transform",transitionDuration:"0.5s"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500;1,600&display=swap" rel="stylesheet"/>

      {/* Decorative blobs */}
      <div style={{position:"absolute",top:-60,right:-60,width:260,height:260,borderRadius:"50%",background:"#ffffff06",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:100,left:-80,width:200,height:200,borderRadius:"50%",background:"#ffffff04",pointerEvents:"none"}}/>

      {/* Step dots */}
      <div style={{display:"flex",gap:6,justifyContent:"center",paddingTop:56,paddingBottom:0}}>
        {ONBOARD_STEPS.map((_,i)=>(
          <div key={i} onClick={()=>setStep(i)} style={{
            width:i===step?24:6,height:6,borderRadius:3,cursor:"pointer",
            background:i===step?s.accent:i<step?"#ffffff55":"#ffffff22",
            transition:"all 0.35s cubic-bezier(.34,1.56,.64,1)",
          }}/>
        ))}
      </div>

      {/* Content — centered vertically */}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 32px",textAlign:"center"}}>
        {/* Icon bubble */}
        <div style={{
          width:100,height:100,borderRadius:"50%",
          background:`${s.accent}18`,border:`1.5px solid ${s.accent}44`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:44,marginBottom:28,
          boxShadow:`0 0 40px ${s.accent}22`,
        }}>
          {s.icon}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:30,fontWeight:900,color:"#fff",
          lineHeight:1.15,margin:"0 0 16px",
          whiteSpace:"pre-line",
        }}>{s.title}</h1>

        {/* Body */}
        <p style={{
          fontFamily:"'Lora',serif",fontSize:14,
          color:"#ffffff99",lineHeight:1.8,
          margin:0,maxWidth:300,
        }}>{s.body}</p>
      </div>

      {/* Bottom CTA */}
      <div style={{padding:"0 28px 48px",display:"flex",flexDirection:"column",gap:12,alignItems:"center"}}>
        <button onClick={next} style={{
          width:"100%",maxWidth:340,
          padding:"16px",border:"none",
          borderRadius:18,cursor:"pointer",
          background:`linear-gradient(135deg,${s.accent},${s.accent}CC)`,
          fontFamily:"'Playfair Display',serif",
          fontSize:16,fontWeight:700,color:"#3B0F1D",
          boxShadow:`0 8px 24px ${s.accent}44`,
          transition:"transform 0.15s,box-shadow 0.15s",
        }}>
          {s.cta} {isLast?"":"→"}
        </button>

        {/* Skip — only on non-last steps */}
        {!isLast&&(
          <button onClick={()=>{setExiting(true);setTimeout(onDone,350);}} style={{
            background:"none",border:"none",cursor:"pointer",
            fontFamily:"'Lora',serif",fontSize:11,
            color:"#ffffff44",letterSpacing:1,
          }}>Pular introdução</button>
        )}
      </div>
    </div>
  );
}

// ── Compact Calendar (for Home) ───────────────────────────────────────────────
function CompactCalendar({P,startDate,setStartDate,completedDays}){
  const today=new Date();
  const[vy,setVy]=useState(today.getFullYear());
  const[vm,setVm]=useState(today.getMonth());
  const[open,setOpen]=useState(false);
  const total=getDim(vy,vm),first=getFdow(vy,vm);
  const cells=[...Array(first).fill(null),...Array(total).fill(0).map((_,i)=>i+1)];
  const jd=startDate?Array.from({length:8},(_,i)=>{const d=new Date(startDate);d.setDate(startDate.getDate()+i);return d;}):[],jKeys=new Set(jd.map(dkey)),cKeys=new Set(jd.filter((_,i)=>completedDays.includes(i)).map(dkey)),sk=dkey(jd[0]),ek=dkey(jd[7]);
  const cd2=d=>d?new Date(vy,vm,d):null,click=d=>{if(d)setStartDate(new Date(vy,vm,d));};
  const prev=()=>{if(vm===0){setVy(y=>y-1);setVm(11);}else setVm(m=>m-1);};
  const next=()=>{if(vm===11){setVy(y=>y+1);setVm(0);}else setVm(m=>m+1);};

  return(
    <div style={{margin:"0 16px 20px",borderRadius:16,overflow:"hidden",background:P.card,border:`1px solid ${LP.gold}22`,boxShadow:`0 3px 12px ${P.shadow}`}}>
      {/* Header row — always visible */}
      <div onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",cursor:"pointer",background:`linear-gradient(135deg,${LP.burgundyDeep},${LP.burgundy})`}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <CrossIcon size={12} color={LP.goldLight}/>
          <span style={{fontSize:10,color:LP.goldLight,letterSpacing:2,fontFamily:"'Lora',serif",textTransform:"uppercase"}}>Calendário da Jornada</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {startDate&&<span style={{fontSize:10,color:"#ffffff88",fontFamily:"'Lora',serif"}}>{startDate.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}</span>}
          <span style={{fontSize:12,color:"#ffffff66",transition:"transform 0.25s",display:"inline-block",transform:open?"rotate(90deg)":"rotate(0deg)"}}>›</span>
        </div>
      </div>

      {/* Collapsible grid */}
      <div style={{maxHeight:open?500:0,overflow:"hidden",transition:"max-height 0.4s cubic-bezier(.4,0,.2,1)"}}>
        <div style={{padding:"12px 10px 8px"}}>
          {/* Month nav */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <button onClick={prev} style={{background:"none",border:"none",color:P.textMuted,cursor:"pointer",fontSize:16,padding:"0 6px"}}>‹</button>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:P.burgundy,fontWeight:700}}>{MONTHS[vm]} {vy}</span>
            <button onClick={next} style={{background:"none",border:"none",color:P.textMuted,cursor:"pointer",fontSize:16,padding:"0 6px"}}>›</button>
          </div>
          {/* Day names */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:4}}>
            {DN.map((d,i)=><div key={i} style={{textAlign:"center",fontSize:9,fontFamily:"'Lora',serif",color:i===0||i===6?LP.gold:P.textMuted,paddingBottom:3}}>{d}</div>)}
          </div>
          {/* Cells */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
            {cells.map((day,idx)=>{
              const d2=cd2(day),k=dkey(d2),iS=k===sk,iE=k===ek,inJ=jKeys.has(k),iC=cKeys.has(k),iT=day&&dkey(today)===k;
              let bg="transparent",tc=P.text,brd="none",fw="400";
              if(iS||iE){bg=LP.burgundy;tc="#fff";fw="700";}
              else if(iC){bg=`${LP.gold}33`;tc=LP.warm;brd=`1.5px solid ${LP.gold}66`;}
              else if(inJ){bg=`${LP.burgundy}11`;tc=P.burgundy;brd=`1px dashed ${LP.burgundy}44`;}
              if(iT&&!iS&&!iE)brd=`2px solid ${LP.gold}`;
              return(<div key={idx} onClick={()=>click(day)} style={{height:28,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",cursor:day?"pointer":"default",background:bg,border:brd,position:"relative"}}>
                {day&&<><span style={{fontSize:10,fontFamily:"'Lora',serif",color:tc,fontWeight:fw}}>{day}</span>{iC&&<span style={{position:"absolute",top:0,right:1,fontSize:6,color:LP.gold}}>✓</span>}{(iS||iE)&&<span style={{position:"absolute",bottom:-1,fontSize:5,color:"#ffffff88"}}>{iS?"ini":"fim"}</span>}</>}
              </div>);
            })}
          </div>
          {/* Footer */}
          <div style={{marginTop:10,paddingTop:8,borderTop:`1px solid ${LP.gold}22`}}>
            {startDate?(
              <p style={{margin:0,fontSize:10,fontFamily:"'Lora',serif",color:LP.warm,textAlign:"center"}}>📅 {startDate.toLocaleDateString("pt-BR")} → {jd[7]?.toLocaleDateString("pt-BR")}</p>
            ):(
              <p style={{margin:0,fontSize:10,fontFamily:"'Lora',serif",color:P.textMuted,textAlign:"center",fontStyle:"italic"}}>Toque em um dia para marcar o início</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Daily Verse Pool (365 entries via day-of-year index) ─────────────────────
const DAILY_VERSES=[
  {ref:"Jo 3,16",text:"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."},
  {ref:"Rm 8,28",text:"Todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito."},
  {ref:"1 Co 13,4",text:"O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece."},
  {ref:"1 Co 13,7",text:"Tudo sofre, tudo crê, tudo espera, tudo suporta."},
  {ref:"1 Co 13,13",text:"Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor."},
  {ref:"Fp 4,7",text:"A paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus."},
  {ref:"Fp 4,13",text:"Posso tudo em Cristo que me fortalece."},
  {ref:"Cl 3,14",text:"E, sobre tudo isto, revesti-vos de amor, que é o vínculo da perfeição."},
  {ref:"Ef 4,32",text:"Sede bondosos uns para com os outros, misericordiosos, perdoando-vos uns aos outros, como Deus também vos perdoou em Cristo."},
  {ref:"Ef 5,25",text:"Maridos, amai vossas mulheres, como também Cristo amou a igreja, e a si mesmo se entregou por ela."},
  {ref:"Jo 15,12",text:"Este é o meu mandamento: Que vos ameis uns aos outros, como eu vos amei."},
  {ref:"Jo 15,9",text:"Como o Pai me amou, também eu vos amei; permanecei no meu amor."},
  {ref:"Jo 14,27",text:"A minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize."},
  {ref:"Rm 12,10",text:"Amai-vos cordialmente uns aos outros com amor fraternal, preferindo-vos em honra uns aos outros."},
  {ref:"Rm 12,21",text:"Não sejas vencido do mal, mas vence o mal com o bem."},
  {ref:"1 Pe 4,8",text:"Tende ardente amor uns para com os outros; porque o amor cobre multidão de pecados."},
  {ref:"1 Jo 4,8",text:"Aquele que não ama não conhece a Deus; porque Deus é amor."},
  {ref:"1 Jo 4,19",text:"Nós o amamos a ele porque ele nos amou primeiro."},
  {ref:"Mt 19,6",text:"De sorte que já não são dois, mas uma só carne; o que, pois, Deus ajuntou, não o separe o homem."},
  {ref:"Mt 18,20",text:"Porque onde dois ou três estiverem reunidos em meu nome, ali estou eu no meio deles."},
  {ref:"Mt 6,33",text:"Buscai primeiro o reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas."},
  {ref:"Mt 7,7",text:"Pedi e dar-se-vos-á; buscai e achareis; batei e abrir-se-vos-á."},
  {ref:"Gl 5,22",text:"O fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fidelidade."},
  {ref:"Gl 6,2",text:"Levai as cargas uns dos outros, e assim cumprireis a lei de Cristo."},
  {ref:"Hb 13,4",text:"O casamento seja honroso em tudo, e o leito sem mácula."},
  {ref:"Hb 13,8",text:"Jesus Cristo é o mesmo, ontem, e hoje, e eternamente."},
  {ref:"Hb 11,1",text:"A fé é a certeza das coisas que se esperam, e a demonstração das que se não vêem."},
  {ref:"Rm 15,13",text:"O Deus de esperança vos encha de todo o gozo e paz em crença, para que abundeis em esperança pela virtude do Espírito Santo."},
  {ref:"1 Ts 5,17",text:"Orai sem cessar."},
  {ref:"1 Ts 5,18",text:"Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco."},
  {ref:"2 Co 5,17",text:"Se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo."},
  {ref:"2 Tm 1,7",text:"Deus não nos deu o espírito de temor, mas de força, e de amor, e de moderação."},
  {ref:"Ap 21,4",text:"Deus limpará de seus olhos toda a lágrima; e não haverá mais morte, nem pranto, nem clamor, nem dor."},
  {ref:"Jo 13,34",text:"Que vos ameis uns aos outros; como eu vos amei a vós, que também vós uns aos outros vos ameis."},
  {ref:"Cl 3,15",text:"A paz de Deus, para a qual também fostes chamados em um só corpo, domine nos vossos corações; e sede agradecidos."},
  {ref:"Fp 4,6",text:"Em nada estejais ansiosos; antes, as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças."},
  {ref:"1 Jo 4,16",text:"Deus é amor; e quem está em amor está em Deus, e Deus nele."},
  {ref:"Jo 17,21",text:"Para que todos sejam um; como tu, ó Pai, és em mim, e eu em ti, que também eles sejam um em nós."},
  {ref:"Rm 8,39",text:"Nada nos poderá separar do amor de Deus, que está em Cristo Jesus nosso Senhor."},
  {ref:"Tg 1,17",text:"Todo o bom dom e todo o dom perfeito vêm do alto, descendo do Pai das luzes."},
];

// ── Saints Pool ───────────────────────────────────────────────────────────────
const SAINTS=[
  {name:"São Joaquim e Santa Ana",date:"26/Jul",icon:"👴👵",color:"#5C1A2E",phrase:"Deus escolheu um casal simples para ser a raiz da árvore que daria Maria. Sua fidelidade oculta preparou o maior milagre da história."},
  {name:"São Luís e Zélia Martin",date:"12/Jul",icon:"💑",color:"#1A4A6E",phrase:"Pais de Santa Teresinha, mostraram que a santidade mais profunda se constrói na rotina do lar, com amor e sacrifício silenciosos."},
  {name:"São José",date:"19/Mar",icon:"⚒️",color:"#2E5E3A",phrase:"Amou Maria sem compreender tudo — só por confiar em Deus. No casamento, há momentos em que a fé precisa ser maior que a compreensão."},
  {name:"Nossa Senhora",date:"15/Ago",icon:"🌹",color:"#8B2E3F",phrase:"'Fazei tudo o que ele vos disser.' O mais curto caminho para a felicidade conjugal é a obediência amorosa à voz de Deus."},
  {name:"São Francisco de Sales",date:"24/Jan",icon:"📜",color:"#6A4A10",phrase:"'A medida do amor é amar sem medida.' A santa mansidão não é fraqueza — é a força mais transformadora no casamento."},
  {name:"Santa Teresa de Ávila",date:"15/Out",icon:"🔥",color:"#7A3A10",phrase:"'Que nada te perturbe, que nada te atemorize; tudo passa, Deus não muda.' A paz do lar começa quando cada cônjuge descansa em Deus."},
  {name:"São João Paulo II",date:"22/Out",icon:"✝️",color:"#1A4A5E",phrase:"'O amor não é apenas um sentimento — é uma decisão renovada a cada manhã.' O matrimônio é vocação, não apenas contrato."},
  {name:"Santa Rita de Cássia",date:"22/Mai",icon:"🌹",color:"#8B2E3F",phrase:"Suportou um casamento difícil com fé e oração, e transformou seu lar num lugar de graça. O sofrimento ofertado a Deus tem poder."},
  {name:"São Valentim",date:"14/Fev",icon:"❤️",color:"#5C1A2E",phrase:"Símbolo do amor verdadeiro, que não recua diante da dificuldade. Que o amor de vocês seja digno do amor de Cristo pela Igreja."},
  {name:"São Rafael Arcanjo",date:"29/Set",icon:"⚕️",color:"#2E5E3A",phrase:"O anjo que conduziu Tobias ao encontro de sua esposa. Invoquem São Rafael sobre o caminho do casamento de vocês."},
  {name:"São Pedro e São Paulo",date:"29/Jun",icon:"⚓",color:"#1A4A6E",phrase:"Dois temperamentos opostos, unidos pela mesma fé. No casamento, as diferenças não são obstáculos — são a tapeçaria da unidade."},
  {name:"Santa Gianna Molla",date:"28/Abr",icon:"🌸",color:"#8B2E3F",phrase:"Médica e mãe que deu a vida por seu filho. Mostrou que o amor matrimonial e materno é capaz de heroísmo extraordinário."},
  {name:"São Tomás de Aquino",date:"28/Jan",icon:"📚",color:"#6A4A10",phrase:"'O amor é querer o bem do outro.' Amar no casamento é querer, antes de tudo, que o cônjuge alcance a santidade e a vida eterna."},
  {name:"Santa Mônica",date:"27/Ago",icon:"🙏",color:"#7A4A6A",phrase:"Rezou por décadas pela conversão do marido e do filho Agostinho. Nunca desistiu. A oração perseverante de um cônjuge tem poder imenso."},
  {name:"São Agostinho",date:"28/Ago",icon:"💛",color:"#5A4A1A",phrase:"'Fizeste-nos para ti, Senhor, e o nosso coração está inquieto enquanto não repousa em ti.' Só em Deus o casamento encontra descanso."},
  {name:"Santa Teresa do Menino Jesus",date:"01/Out",icon:"🌺",color:"#8B2E3F",phrase:"'O amor se prova pelas obras.' No casamento, o amor que não se expressa em gestos concretos corre o risco de ser apenas sentimento."},
  {name:"São Francisco de Assis",date:"04/Out",icon:"🕊️",color:"#3A5A2A",phrase:"'Onde há amor e sabedoria, não há temor nem ignorância.' Que a paz franciscana habite o coração de cada cônjuge e de cada lar."},
  {name:"São Benedito",date:"11/Jul",icon:"🏛️",color:"#2E5E3A",phrase:"'Ora et Labora' — reza e trabalha. O equilíbrio entre espiritualidade e responsabilidade prática é o ritmo saudável do lar cristão."},
  {name:"Nossa Senhora de Fátima",date:"13/Mai",icon:"👑",color:"#7A4A6A",phrase:"'Rezai muito o Rosário.' Maria pediu oração simples e constante. O casal que reza o Rosário junto tem Nossa Senhora como guardiã."},
  {name:"Nossa Senhora Aparecida",date:"12/Out",icon:"🇧🇷",color:"#5C1A2E",phrase:"Padroeira do Brasil, encontrada partida e restaurada. Assim como foi remendada, Deus pode restaurar qualquer casamento entregue a Ela."},
  {name:"São Miguel Arcanjo",date:"29/Set",icon:"⚔️",color:"#1A4A5E",phrase:"'Quem como Deus?' A batalha espiritual no casamento é real — invocar a proteção de São Miguel é sabedoria, não superstição."},
  {name:"Santo Antônio de Pádua",date:"13/Jun",icon:"🌸",color:"#8B2E3F",phrase:"Patrono dos casamentos abençoados. Intercede pelos casais em crise, pelos que buscam reconciliação e pelos que esperam o cônjuge certo."},
  {name:"São João Batista",date:"24/Jun",icon:"🌊",color:"#2E5E3A",phrase:"'Convém que ele cresça e que eu diminua.' No casamento, a arte de deixar o cônjuge crescer sem sentir ameaça é sinal de amor maduro."},
  {name:"Santa Isabel",date:"05/Nov",icon:"👶",color:"#6A4A10",phrase:"Prima de Maria, repleta do Espírito, reconheceu a graça quando a encontrou. Que casais reconheçam a graça de Deus um no outro."},
  {name:"São Jacinto e Santa Inês",date:"Jan",icon:"✝️",color:"#5C1A2E",phrase:"Jovens mártires que preferiram a morte à traição à fé. A fidelidade — a Deus e ao cônjuge — pode exigir coragem heróica."},
  {name:"São João Evangelista",date:"27/Dez",icon:"📖",color:"#1A4A6E",phrase:"O discípulo amado, que Jesus confiou a Maria. Que cada cônjuge cuide do outro com esse mesmo amor de filho e de mãe."},
  {name:"São Estêvão",date:"26/Dez",icon:"⭐",color:"#7A3A10",phrase:"Primeiro mártir, que morreu pedindo perdão pelos perseguidores. Perdoar ao cônjuge é o mais próximo que podemos chegar desse amor."},
  {name:"São Barnabé",date:"11/Jun",icon:"🤝",color:"#2E5E3A",phrase:"'Filho da consolação.' Ser cônjuge é também ser a consolação do outro — o ombro, a palavra, o colo que acolhe sem julgamento."},
  {name:"São Mateus",date:"21/Set",icon:"💰",color:"#5A4A1A",phrase:"Cobrador de impostos chamado por Jesus sem merecimento. Deus nos ama antes de sermos dignos — que esse amor mostre o caminho no casamento."},
  {name:"São Lucas",date:"18/Out",icon:"🎨",color:"#6A4A10",phrase:"Evangelista e médico, que cuidou das feridas do corpo e da alma. No casamento, cuide das feridas visíveis e invisíveis do cônjuge."},
];

// ── Saint Quotes for couples ─────────────────────────────────────────────────
const SAINT_QUOTES=[
  {author:"São João Paulo II",text:"O amor não é apenas um sentimento. É uma decisão, um julgamento, uma promessa."},
  {author:"São Francisco de Sales",text:"A medida do amor é amar sem medida."},
  {author:"Santo Agostinho",text:"O nosso coração está inquieto enquanto não repousa em ti, Senhor."},
  {author:"Santa Teresa de Ávila",text:"Que nada te perturbe, que nada te atemorize; tudo passa, Deus não muda."},
  {author:"São João Paulo II",text:"O homem não pode viver sem amor. Ele permanece um ser incompreensível para si mesmo."},
  {author:"Santo Agostinho",text:"Amai e fazei o que quiserdes."},
  {author:"São Francisco de Assis",text:"Onde há amor e sabedoria, não há temor nem ignorância."},
  {author:"Santa Teresinha",text:"O amor se prova pelas obras."},
  {author:"São João Crisóstomo",text:"Que haja dois unidos: todo o demais vem por acréscimo."},
  {author:"Santa Zélia Martin",text:"Quando se tem filhos, sofre-se muito, mas alegra-se também muito."},
  {author:"São João Paulo II",text:"A família é o santuário da vida e da esperança da humanidade."},
  {author:"São Francisco de Sales",text:"Seja paciente com todos, mas sobretudo consigo mesmo."},
  {author:"Santo Agostinho",text:"Rezai como se tudo dependesse de Deus; trabalhai como se tudo dependesse de vós."},
  {author:"Santa Teresa de Calcutá",text:"Não faço grandes coisas. Faço pequenas coisas com grande amor."},
  {author:"São João Paulo II",text:"O casamento é uma aliança de amor, e toda aliança exige fidelidade."},
  {author:"Santo Tomás de Aquino",text:"O amor é querer o bem do outro."},
  {author:"Santa Mônica",text:"Onde quer que estejas, estaremos sempre um do lado do outro diante de Deus."},
  {author:"São João Bosco",text:"A família que reza unida permanece unida."},
  {author:"São Pedro",text:"Sobretudo, tende ardente amor uns para com os outros, porque o amor cobre multidão de pecados."},
  {author:"São Paulo",text:"Revesti-vos de amor, que é o vínculo da perfeição."},
];

function getDayIndex(){
  const n=new Date(),s=new Date(n.getFullYear(),0,0),d=n-s,o=1000*60*60*24;
  return Math.floor(d/o);
}
function getSaintFromDate(dateStr){
  if(!dateStr) return null;
  const d=new Date(dateStr);
  const s=new Date(d.getFullYear(),0,0);
  const idx=Math.floor((d-s)/(1000*60*60*24))%SAINTS.length;
  return SAINTS[idx];
}

// ── Verse of the Day Widget ───────────────────────────────────────────────────
function VerseOfDay({P}){
  const idx=getDayIndex()%DAILY_VERSES.length;
  const v=DAILY_VERSES[idx];
  const[copied,setCopied]=useState(false);
  function share(){const t=`"${v.text}" — ${v.ref} 📖 Casal em Fé`;window.open(`https://wa.me/?text=${encodeURIComponent(t)}`,"_blank");}
  function copy(){navigator.clipboard?.writeText(`"${v.text}" — ${v.ref}`).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});}
  return(
    <div style={{margin:"0 16px 4px",borderRadius:18,overflow:"hidden",boxShadow:`0 4px 20px ${LP.burgundy}22`}}>
      <div style={{background:`linear-gradient(135deg,${LP.burgundyDeep},${LP.burgundy})`,padding:"12px 16px 10px",display:"flex",alignItems:"center",gap:8}}>
        <CrossIcon size={12} color={LP.goldLight}/>
        <span style={{fontSize:9,color:LP.goldLight,letterSpacing:2.5,fontFamily:"'Lora',serif",textTransform:"uppercase",flex:1}}>Versículo do Dia</span>
        
      </div>
      <div style={{background:P.card,padding:"16px 18px"}}>
        <div style={{borderLeft:`3px solid ${LP.gold}55`,paddingLeft:14,marginBottom:14}}>
          <p style={{margin:0,fontFamily:"'Cormorant Garamond',serif",fontSize:19,color:P.text,lineHeight:1.75,fontStyle:"italic",fontWeight:500,letterSpacing:0.2}}>
            “{v.text}”
          </p>
          <div style={{marginTop:8,fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:LP.gold,fontWeight:600,letterSpacing:1,textAlign:"right"}}>{v.ref}</div>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={copy} style={{background:"none",border:`1px solid ${LP.gold}44`,borderRadius:10,padding:"4px 12px",cursor:"pointer",fontSize:10,color:P.warm,fontFamily:"'Lora',serif",transition:"all 0.2s"}}>
            {copied?"✓ Copiado":"📋 Copiar"}
          </button>
          <button onClick={share} style={{background:`linear-gradient(135deg,${LP.burgundy},${LP.burgundy}BB)`,border:"none",borderRadius:10,padding:"4px 12px",cursor:"pointer",fontSize:10,color:"#fff",fontFamily:"'Lora',serif"}}>
            📲 WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Saint of the Day Widget ───────────────────────────────────────────────────
function SaintOfDay({P}){
  const idx=getDayIndex()%SAINTS.length;
  const s=SAINTS[idx];
  const qi=getDayIndex()%SAINT_QUOTES.length;
  const q=SAINT_QUOTES[qi];
  const[expanded,setExpanded]=useState(false);
  return(
    <div style={{margin:"0 16px 4px",borderRadius:18,overflow:"hidden",boxShadow:`0 4px 20px ${s.color}22`,cursor:"pointer"}} onClick={()=>setExpanded(e=>!e)}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${s.color}EE,${s.color}88)`,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:"#ffffff22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{s.icon}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:9,color:"#ffffff77",letterSpacing:2,fontFamily:"'Lora',serif",textTransform:"uppercase"}}>Santo do Dia</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:"#fff",fontWeight:700,lineHeight:1.2}}>{s.name}</div>
        </div>
        <span style={{fontSize:11,color:"#ffffff55",transition:"transform 0.25s",transform:expanded?"rotate(90deg)":"none"}}>›</span>
      </div>
      {/* Always visible teaser */}
      <div style={{background:P.card,padding:"10px 16px"}}>
        <p style={{margin:0,fontFamily:"'Lora',serif",fontSize:12,color:P.textMuted,lineHeight:1.7,
          overflow:"hidden",display:"-webkit-box",WebkitLineClamp:expanded?100:2,WebkitBoxOrient:"vertical",transition:"all 0.3s"}}>
          {s.phrase}
        </p>
        {/* Expanded: saint quote of the day */}
        {expanded&&(
          <div style={{marginTop:12,padding:"10px 14px",borderRadius:12,background:`${s.color}11`,border:`1px solid ${s.color}33`}}>
            <div style={{fontSize:9,color:P.textMuted,letterSpacing:2,fontFamily:"'Lora',serif",textTransform:"uppercase",marginBottom:6}}>Frase de Santo</div>
            <p style={{margin:0,fontFamily:"'Playfair Display',serif",fontSize:13,color:P.text,lineHeight:1.7,fontStyle:"italic"}}>"{q.text}"</p>
            <div style={{fontSize:10,color:P.textMuted,fontFamily:"'Lora',serif",marginTop:6,textAlign:"right"}}>— {q.author}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Weekly Intention Widget ───────────────────────────────────────────────────
function WeeklyIntention({P,intention,setIntention}){
  const[editing,setEditing]=useState(false);
  const[draft,setDraft]=useState(intention||"");
  function save(){setIntention(draft.trim());setEditing(false);}
  const weekNum=Math.ceil(getDayIndex()/7);
  return(
    <div style={{margin:"0 16px 4px",borderRadius:18,overflow:"hidden",boxShadow:`0 4px 16px ${LP.gold}18`}}>
      <div style={{background:`linear-gradient(135deg,#2E5E3A,#1A3A24)`,padding:"12px 16px",display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:14}}>🙏</span>
        <span style={{fontSize:9,color:"#E8C97A",letterSpacing:2.5,fontFamily:"'Lora',serif",textTransform:"uppercase",flex:1}}>Intenção da Semana</span>
        <span style={{fontSize:9,color:"#ffffff44",fontFamily:"'Lora',serif"}}>Semana {weekNum}</span>
      </div>
      <div style={{background:P.card,padding:"12px 16px"}}>
        {!editing?(
          <>
            {intention?(
              <p style={{margin:"0 0 10px",fontFamily:"'Lora',serif",fontSize:13,color:P.text,lineHeight:1.7,fontStyle:"italic"}}>"{intention}"</p>
            ):(
              <p style={{margin:"0 0 10px",fontFamily:"'Lora',serif",fontSize:12,color:P.textMuted,lineHeight:1.7,fontStyle:"italic"}}>
                Nenhuma intenção registrada ainda. Escrevam juntos pelo que vão rezar esta semana.
              </p>
            )}
            <button onClick={()=>{setDraft(intention||"");setEditing(true);}} style={{background:"none",border:`1px solid ${LP.gold}44`,borderRadius:10,padding:"5px 14px",cursor:"pointer",fontSize:10,color:P.warm,fontFamily:"'Lora',serif"}}>
              {intention?"✏️ Editar":"+ Adicionar intenção"}
            </button>
          </>
        ):(
          <>
            <textarea value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Ex: Pela cura do nosso casamento. Por paciência mútua esta semana. Pela família que nos foi confiada..." autoFocus style={{width:"100%",minHeight:72,background:P.cream,border:`1.5px solid ${LP.gold}55`,borderRadius:12,padding:"10px 12px",fontFamily:"'Lora',serif",fontSize:12,color:P.text,outline:"none",resize:"none",boxSizing:"border-box",lineHeight:1.7}}/>
            <div style={{display:"flex",gap:8,marginTop:8,justifyContent:"flex-end"}}>
              <button onClick={()=>setEditing(false)} style={{background:"none",border:`1px solid ${LP.gold}33`,borderRadius:10,padding:"5px 12px",cursor:"pointer",fontSize:10,color:P.textMuted,fontFamily:"'Lora',serif"}}>Cancelar</button>
              <button onClick={save} style={{background:`linear-gradient(135deg,#2E5E3A,#1A3A24)`,border:"none",borderRadius:10,padding:"5px 14px",cursor:"pointer",fontSize:10,color:"#fff",fontFamily:"'Lora',serif"}}>✓ Salvar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App(){
  const[isDark,setIsDark]=useStorage("dark",false);const P=isDark?DP:LP;
  const[completedDays,setCompleted]=useStorage("completed",[]);
  const[startDate,setStartDateRaw]=useStorage("start",null);
  const[profile,setProfile]=useStorage("profile",{he:"",she:"",wedding:"",saint:"",avatar:"💑"});
  const[diary,setDiary]=useStorage("diary",{});
  const[favorites,setFavorites]=useStorage("fav",[]);
  const[themeChecked,setThemeChecked]=useStorage("tchecked",{});
  const[onboarded,setOnboarded]=useStorage("onboarded",false);
  const[intention,setIntention]=useStorage("intention","");
  const[tab,setTab]=useState("home");const[selectedDay,setSelectedDay]=useState(null);

  const sd2=startDate?new Date(startDate):null;
  function setStartDate(d){setStartDateRaw(d?d.toISOString():null);}
  const currentDay=Math.min(completedDays.length,7);const progress=completedDays.length;
  function handleComplete(id){if(!completedDays.includes(id)){setCompleted(n=>[...n,id]);}}

  const NAV=[{id:"home",icon:"🏠",label:"Início"},{id:"journey",icon:"📿",label:"Jornada"},{id:"bible",icon:"📖",label:"Bíblia"},{id:"rosary",icon:"🙏",label:"Terço"},{id:"casal",icon:"👫",label:"Casal"}];
  const totalThemeDone=Object.values(themeChecked).filter(Boolean).length;

  return(<div style={{maxWidth:430,margin:"0 auto",minHeight:"100vh",minHeight:"100dvh",background:P.cream,fontFamily:"'Lora',serif",position:"relative",transition:"background 0.3s",WebkitTapHighlightColor:"transparent",touchAction:"pan-y"}}>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500;1,600&display=swap" rel="stylesheet"/>

    {/* Onboarding gate */}
    {!onboarded&&<Onboarding onDone={()=>setOnboarded(true)}/>}

    {selectedDay&&<DayDetail day={selectedDay} onClose={()=>setSelectedDay(null)} onComplete={handleComplete} isCompleted={completedDays.includes(selectedDay.id)} P={P}/>}

    {!selectedDay&&(<>
      {/* ── HOME ── */}
      {tab==="home"&&<div style={{paddingBottom:"calc(80px + env(safe-area-inset-bottom))"}}>
        {/* Hero header */}
        <div style={{background:`linear-gradient(160deg,${LP.burgundyDeep} 0%,${LP.burgundy} 60%,#8B3A5A 100%)`,padding:"48px 24px 22px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-40,right:-40,width:180,height:180,borderRadius:"50%",background:"#ffffff08"}}/>
          <div style={{textAlign:"center",position:"relative"}}>
            <CrossIcon size={26} color={LP.gold}/>
            <div style={{fontSize:9,color:LP.goldLight,letterSpacing:4,textTransform:"uppercase",fontFamily:"'Lora',serif",margin:"6px 0 3px"}}>Jornada de Fé</div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:"#fff",fontWeight:900,margin:"0 0 3px",lineHeight:1.1}}>{profile.he&&profile.she?`${profile.he} & ${profile.she}`:"Casal em Fé"}</h1>
            {/* Inline progress strip */}
            <div style={{display:"flex",gap:2,justifyContent:"center",margin:"10px 0 6px"}}>
              {DAYS.map(d=><div key={d.id} style={{width:d.id<progress?18:8,height:4,borderRadius:2,background:d.id<progress?LP.gold:"#ffffff33",transition:"all 0.3s"}}/>)}
            </div>
            <div style={{fontSize:10,color:"#ffffff77",fontFamily:"'Lora',serif"}}>
              {progress===0?"Toque em Hoje para começar":`${progress}/8 dias · ${totalThemeDone} propósitos`}
            </div>
          </div>
        </div>

        {/* Today shortcut — compact pill */}
        {currentDay<8&&(
          <div onClick={()=>setSelectedDay(DAYS[currentDay])} style={{margin:"12px 16px 4px",borderRadius:14,background:`linear-gradient(135deg,${DAYS[currentDay].color},${DAYS[currentDay].color}BB)`,padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,boxShadow:`0 4px 18px ${DAYS[currentDay].color}44`}}>
            <div style={{width:40,height:40,borderRadius:10,background:"#ffffff22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{DAYS[currentDay].icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:9,color:"#ffffff88",letterSpacing:2,fontFamily:"'Lora',serif",textTransform:"uppercase"}}>Hoje · {DAYS[currentDay].label}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:"#fff",fontWeight:700,marginTop:1}}>{DAYS[currentDay].sublabel}</div>
            </div>
            <span style={{fontSize:18,color:"#ffffff55"}}>›</span>
          </div>
        )}

        {/* ── Daily widgets ── */}
        <div style={{paddingTop:12,display:"flex",flexDirection:"column",gap:8}}>
          <VerseOfDay P={P}/>
          <SaintOfDay P={P}/>
          <WeeklyIntention P={P} intention={intention} setIntention={setIntention}/>
        </div>

        {/* ── THEMES — main focus ── */}
        <div style={{paddingTop:14}}>
          <ThemesSection P={P} checked={themeChecked} setChecked={setThemeChecked}/>
        </div>

        {/* ── Compact collapsible calendar ── */}
        <div style={{paddingTop:6}}>
          <CompactCalendar P={P} startDate={sd2} setStartDate={setStartDate} completedDays={completedDays}/>
        </div>
      </div>}

      {/* JOURNEY */}
      {tab==="journey"&&(()=>{
        const allDone=completedDays.length>=8;
        const nextTheme=THEMES.reduce((least,t)=>{
          const done=Object.keys(themeChecked).filter(k=>k.startsWith(t.id+"-")&&themeChecked[k]).length;
          const total=t.subgroups.reduce((a,s)=>a+s.purposes.length,0);
          const pct=total>0?done/total:0;
          return(!least||pct<least.pct)?{t,pct}:least;
        },{t:THEMES[0],pct:1}).t;
        function startNewJourney(){setCompleted([]);setTab("home");}
        return(
        <div style={{paddingBottom:"calc(80px + env(safe-area-inset-bottom))"}}>
          <div style={{background:`linear-gradient(160deg,${LP.burgundyDeep},${LP.burgundy})`,padding:"52px 24px 24px",textAlign:"center"}}>
            <CrossIcon size={28} color={LP.gold}/>
            <div style={{fontSize:10,color:LP.goldLight,letterSpacing:3,fontFamily:"'Lora',serif",textTransform:"uppercase",marginTop:8}}>8 Dias</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:"#fff",fontWeight:900,margin:"4px 0"}}>Propósitos Bíblicos</h2>
            <p style={{color:"#ffffff77",fontSize:11,fontFamily:"'Lora',serif",fontStyle:"italic",margin:0}}>{completedDays.length}/8 dias concluídos</p>
          </div>
          <div style={{paddingTop:18}}>
            {DAYS.map(day=>(
              <div key={day.id} onClick={()=>setSelectedDay(day)} style={{margin:"0 16px 10px",borderRadius:16,background:day.id===currentDay?`${day.color}18`:P.card,border:`1.5px solid ${day.id===currentDay?day.color:LP.gold+"22"}`,cursor:"pointer",boxShadow:day.id===currentDay?`0 4px 20px ${day.color}33`:`0 2px 8px ${P.shadow}`}}>
                <div style={{display:"flex",alignItems:"center",padding:"14px 16px",gap:14}}>
                  <div style={{width:46,height:46,borderRadius:12,flexShrink:0,background:completedDays.includes(day.id)?day.color:day.id===currentDay?`${day.color}22`:"#F0E8D8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:completedDays.includes(day.id)?18:22,color:"#fff"}}>{completedDays.includes(day.id)?"✓":day.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,color:P.textMuted,fontFamily:"'Lora',serif",letterSpacing:1.5,textTransform:"uppercase"}}>{day.label}</div>
                    <div style={{fontSize:16,fontFamily:"'Playfair Display',serif",color:P.burgundy,fontWeight:700,lineHeight:1.2}}>{day.sublabel}</div>
                    <div style={{fontSize:11,color:P.textMuted,fontFamily:"'Lora',serif",marginTop:2}}>{day.theme}</div>
                  </div>
                  {day.id===currentDay&&<div style={{fontSize:9,background:day.color,color:"#fff",padding:"3px 9px",borderRadius:20,fontFamily:"'Lora',serif",flexShrink:0}}>HOJE</div>}
                  {completedDays.includes(day.id)&&<div style={{fontSize:9,background:"#2E5E3A22",color:"#2E5E3A",padding:"3px 9px",borderRadius:20,fontFamily:"'Lora',serif",flexShrink:0}}>FEITO</div>}
                </div>
              </div>
            ))}

            {/* ── CAIXA CONCLUÍDO ── */}
            <div style={{margin:"8px 16px 24px",borderRadius:18,overflow:"hidden",border:`2.5px solid ${allDone?"#2E5E3A":LP.gold+"33"}`,boxShadow:allDone?"0 8px 28px #2E5E3A44":"none",transition:"all 0.5s ease"}}>
              <div style={{background:allDone?"linear-gradient(135deg,#1A3A24,#2E5E3A)":`linear-gradient(135deg,${LP.burgundyDeep},${LP.burgundy})`,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:40,height:40,borderRadius:12,background:allDone?"#ffffff22":LP.gold+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{allDone?"🏆":"🔒"}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:9,color:allDone?"#A8E6B8":"#ffffff66",letterSpacing:2,fontFamily:"'Lora',serif",textTransform:"uppercase"}}>{allDone?"Jornada Concluída ✓":"Aguardando conclusão"}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:"#fff",fontWeight:700}}>Concluído</div>
                </div>
                <div style={{width:30,height:30,borderRadius:8,background:allDone?"#2E5E3A":"#ffffff11",border:`2.5px solid ${allDone?"#5ECC88":"#ffffff22"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.4s",flexShrink:0}}>
                  {allDone&&<span style={{fontSize:15,color:"#fff",fontWeight:"bold"}}>✓</span>}
                </div>
              </div>
              <div style={{background:P.card,padding:"16px 18px"}}>
                {!allDone?(
                  <>
                    <div style={{display:"flex",gap:4,marginBottom:12}}>
                      {DAYS.map(d=><div key={d.id} style={{flex:1,height:5,borderRadius:3,background:completedDays.includes(d.id)?d.color:LP.gold+"22",transition:"background 0.4s"}}/>)}
                    </div>
                    <p style={{margin:0,fontFamily:"'Lora',serif",fontSize:12,color:P.textMuted,lineHeight:1.7}}>
                      Complete todos os 8 dias para desbloquear a próxima jornada — baseada no tema <strong style={{color:nextTheme.color}}>{nextTheme.icon} {nextTheme.title}</strong>.
                    </p>
                    <div style={{marginTop:8,fontSize:11,color:P.textMuted,fontFamily:"'Lora',serif",fontStyle:"italic"}}>{completedDays.length} de 8 dias concluídos</div>
                  </>
                ):(
                  <>
                    <div style={{marginBottom:14,padding:"12px 14px",borderRadius:12,background:"#2E5E3A11",border:"1px solid #2E5E3A33"}}>
                      <p style={{margin:0,fontFamily:"'Playfair Display',serif",fontSize:14,color:P.text,lineHeight:1.7,fontStyle:"italic"}}>"Combati o bom combate, acabei a carreira, guardei a fé."</p>
                      <div style={{fontSize:10,color:P.textMuted,fontFamily:"'Lora',serif",marginTop:4,textAlign:"right"}}>— 2 Tm 4,7</div>
                    </div>
                    <p style={{margin:"0 0 16px",fontFamily:"'Lora',serif",fontSize:12,color:P.textMuted,lineHeight:1.7}}>
                      Próxima jornada sugerida: tema <strong style={{color:nextTheme.color}}>{nextTheme.icon} {nextTheme.title}</strong> — {nextTheme.subtitle}.
                    </p>
                    <button onClick={startNewJourney} style={{width:"100%",padding:"15px",background:"linear-gradient(135deg,#1A3A24,#2E5E3A)",border:"none",borderRadius:14,color:"#fff",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 20px #2E5E3A55"}}>
                      ✝️ Iniciar Nova Jornada
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>);
      })()}


      {tab==="bible"&&<BibleTab P={P} favorites={favorites} setFavorites={setFavorites}/>}
      {tab==="rosary"&&<RosaryTab P={P}/>}
      {tab==="casal"&&<CasalTab P={P} isDark={isDark} setIsDark={setIsDark} profile={profile} setProfile={setProfile} diary={diary} setDiary={setDiary} progress={progress}/>}

      {/* Nav */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:isDark?`${DP.white}F5`:`${LP.white}F2`,backdropFilter:"blur(14px)",borderTop:`1px solid ${LP.gold}33`,display:"flex",padding:"8px 0 max(16px,env(safe-area-inset-bottom))",zIndex:40}}>
        {NAV.map(n=><div key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,textAlign:"center",cursor:"pointer",opacity:tab===n.id?1:0.4,transition:"opacity 0.2s"}}><div style={{fontSize:20}}>{n.icon}</div><div style={{fontSize:10,fontFamily:"'Lora',serif",color:tab===n.id?P.burgundy:P.textMuted,fontWeight:tab===n.id?"600":"400"}}>{n.label}</div>{tab===n.id&&<div style={{width:16,height:2,background:LP.gold,borderRadius:1,margin:"2px auto 0"}}/>}</div>)}
      </div>
    </>)}
  </div>);
}
