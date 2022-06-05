# Criando uma Rede Social
[K-Fandom](https://annaisah.github.io/SAP007-social-network/#login)

## Índice

* [1. K-Fandom](#1-k-fandom)
* [2. Resumo do projeto](#2-resumo-do-projeto)
* [3. Histórias de usuário](#4-histórias-de-usuário)
* [4. Desenho da Interface de Usuário (protótipo de baixa fidelidade)](#4-desenho-da-interface-de-usuário-protótipo-de-baixa-fidelidade)
* [5. Testes de Usabilidade e Entrevista com usuário.](#5-testes-de-usabilidade-e-entrevista-com-usuário)
* [6. Testes unitários](#6-testes-unitários)
* [7. Desenvolvedoras](#7-desenvolvedoras)
* [8. Objetivos de aprendizagem](8-Objetivos-de-aprendizagem)

## 1. K-Fandom

<p align="center">
<img src="./src/img/CapaKF.PNG" alt="K-Fandom" width="700">
</p>

A K-Fandom é uma Rede Social voltada para kpoppers (fãs de Kpop). Sinta-se à vontade para compartilhar tudo relacionado sobre Kpop, falar sobre votações, conhecer amigues e o melhor de tudo dentro de um espaço onde todes curtem o mesmo estilo. Curta mensagens e se conecte nesse meio. 

Essa Rede surgiu da ideia de trazer um cantinho seguro onde kpoppers podem compartilhar sem se sentirem julgados. Uma grande maioria de kpoppers na internet são pessoas mais jovens e estar em um meio onde temos apenas pessoas com interesses em comum e com postagens públicas apenas, evitamos de pessoas más intencionadas de agirem através de mensagens diretas.

Esta é uma rede social em construção e para fins (inicialmente) de estudo. O projeto foi iniciado a partir da ideia da Laboratória para aprender desenvolvimento Web. Mande seu feedback para as desenvolvedoras, se quiser conhece-las só descer mais um pouco!

## 2. Resumo do projeto

Esse é um dos projetos propostos durante o curso da Laboratória. Nele devemos criar uma rede social com o tema que preferirmos. A escolha do tema de uma rede social sobre Kpop/Fãs de Kpop veio principalmente pelo fato de que são poucas as redes sociais criadas para o público jovem que curte esse estilo musical.

Neste projeto fizemos nosso próprio boilerplate. Utilizamos ferramentas como o Figma e o Trello para conseguirmos nos organizar a respeito do que deveria ser entregue no final. Na organização do trello utilizamos a metodologia do Kanban.

MVPS:
- Sua Rede Social terá que permitir à qualquer usuário criar uma conta de acesso,
  logar-se com ela, criar, editar, deletar e dar _likes_ em publicações.
- O objetivo principal de aprendizagem deste projeto é construir uma Single-page
  Application (com mais de uma tela/ página) na qual seja possível **ler e escrever dados**.

## 3. Histórias de usuário
<p align="center"><img src="https://cdn.discordapp.com/attachments/972803404961304616/973025491059617863/usuario1.png" alt="K-Fandom" width="400">
<img src="https://cdn.discordapp.com/attachments/972803404961304616/973025491646808074/usuario3.png" alt="K-Fandom" width="400"></p>

<p align="center">
<img src="https://cdn.discordapp.com/attachments/972803404961304616/973025491873308723/usuario4.png" alt="K-Fandom" width="400">
<img src="https://cdn.discordapp.com/attachments/972803404961304616/973025491281907752/usuario2.png" alt="K-Fandom" width="400"></p>

<p align="center"><img src="https://cdn.discordapp.com/attachments/972803404961304616/973025492083048529/usuario5.png" alt="K-Fandom" width="400">
<img src="https://cdn.discordapp.com/attachments/972803404961304616/973025492401786931/usuario6.png" alt="K-Fandom" width="400"></p>

<p align="center"><img src="https://cdn.discordapp.com/attachments/972803404961304616/973025492653449247/usuario7.png" alt="K-Fandom" width="400">
<img src="https://cdn.discordapp.com/attachments/972803404961304616/973025492863189052/usuario8.png" alt="K-Fandom" width="400"></p>

## 4. Desenho da Interface de Usuário (protótipo de alta fidelidade)
Criamos o design baseado em respostas de kpoppers, todos responderam que a primeira coisa que se lembram ao pensar em KPOP seriam os cabelos coloridos. Por isso trouxemos um layout colorido.

<p align="center">
<img src="https://media.discordapp.net/attachments/972803404961304616/972812627937988638/Picsart_22-05-08_07-48-23-947.gif?width=665&height=473" alt="K-Fandom" width="700">
</p>

<p align="center">
<img src="https://cdn.discordapp.com/attachments/972803404961304616/973030226185572432/Picsart_22-05-08_22-14-17-946.gif" alt="K-Fandom" width="200">
</p>

### Logo

<p align="center">
<img src="./src/img/kfandom.svg" alt="k-fandom">
</p>

## 5. Testes de Usabilidade e Entrevista com usuário.

Fizemos dois testes de usabilidade com o produto finalizado. Os [testes](https://docs.google.com/document/d/1Hi8fUVCZfOhvY5WAkRd2CVSm5gV4fSdn7Pg4vcY7BJ8/edit?usp=sharing) se encontram no link abaixo do roteiro.
Esse foi o roteiro seguido:
***
 
   <p align="center"><b>Roteiro:</b></p>

  Teste de Usuário

  Entrevista e teste de usabilidade.

  Nome:

  Idade:

  Pergunta: Costuma usar rede social?

  Pergunta: Prefere mobile ou desktop?

  PENSAMENTOS DA USUÁRIA SEGUINDO AS INSTRUÇÕES DE USO:

  Primeira tarefa, cadastrar na página:

  Segunda tarefa, entrar com o google:

  Terceira tarefa, publicar algo:

  Quarta tarefa, curtir uma postagem:

  Quinta tarefa, comentar:

  Sexta tarefa, editar post:

  Sétima tarefa, excluir post:

  Oitava tarefa, sair da página:

  QUESTIONÁRIO FINAL:

  Usuária:

  1-Os nomes nas seções e botões são fáceis de identificar e entender?

  2-A informação está agrupada em categorias que fazem sentido?

  3-Os elementos estão em lugares onde normalmente os usuários esperariam que estivessem?

  4-Os elementos mais comuns são localizados facilmente pelos usuários?

  5-As instruções são claras?

  6-As instruções são necessárias?

  Entrevistadora:

  7-Os usuários conseguem completar as tarefas?

  8-Cometem erros? Em quais partes do processo?

***
<a href="https://docs.google.com/document/d/1Hi8fUVCZfOhvY5WAkRd2CVSm5gV4fSdn7Pg4vcY7BJ8/edit?usp=sharing" target="_blank">Testes de Usabilidade e entrevista.</a>

***

## 6. Testes unitários
Criamos testes para os arquivos feed.js, timelinepost.js, comments.js, register.js e login.js.
O objetivo do teste era cobrir as funcionalidades principais de uma Rede Social.

<p align="center">
<img src="https://media.discordapp.net/attachments/972803404961304616/972805095626506270/testes.png" alt="K-Fandom" width="700">
</p>

## 7. Desenvolvedoras
***
<h3 >Anna Ferraz</h3>   
<img src="https://github.com/AnnaIsah.png" alt="Anna" width="100">

<a href="https://github.com/AnnaIsah" target="_blank">GitHub</a>
<a href="https://www.linkedin.com/in/anna-ferraz/" target="_blank">LinkedIn</a></p>

***
<h3> Mônica Guimarães</h3>
<img src="https://github.com/MonicaGuimaraes.png" alt="Anna" width="100">

<a href="https://github.com/MonicaGuimaraes" target="_blank">GitHub</a>
<a href="https://www.linkedin.com/in/monica-peixoto-guimaraes-v/" target="_blank">LinkedIn</a>

***
<h3> Taize dos Santos</h3>
<img src="https://github.com/taizesantos.png" alt="Anna" width="100">

<a href="https://github.com/taizesantos" target="_blank">GitHub</a>
<a href="https://www.linkedin.com/in/taizeborges/" target="_blank">LinkedIn</a>

***

## 8. Objetivos de aprendizagem
### HTML

-  Uso de HTML semântico

### CSS

-  Uso de seletores de CSS

-  Empregar o modelo de caixa (box model): borda, margem, preenchimento

-  Uso de flexbox en CSS

-  Uso de CSS Grid Layout

### Web APIs

-  Uso de seletores de DOM

-  Gerenciamento de eventos de DOM

-  Manipulação dinâmica de DOM

-  Routing (History API, evento hashchange, window.location)

### JavaScript

-  Manipular arrays (filter, map, sort, reduce)

-  Manipular objects (key | value)

-  Diferenciar entre tipos de dados primitivos e não primitivos

-  Variáveis (declaração, atribuição, escopo)

-  Uso de condicionais (if-else, switch, operador ternário)

-  Uso de laços (for, for..of, while)

-  Uso de funções (parâmetros, argumentos, valor de retorno)

-  Testes unitários

-  Testes assíncronos

-  Mocking

-  Uso ES modules

-  Uso de linter (ESLINT)

-  Uso de identificadores descritivos (Nomenclatura | Semântica)

-  Diferença entre expression e statements

-  Uso de callbacks

-  Promise

### Git e GitHub

-  Git: Instalação e configuração

-  Git: Controle de versão com git (init, clone, add, commit, status, push, pull, remote)

-  Git: Integração de mudanças entre ramos (branch, checkout, fetch, merge, reset, rebase, tag)

-  GitHub: Criação de contas e repositórios, configuração de chave SSH

-  GitHub: Implantação com GitHub Pages

-  GitHub: Colaboração pelo Github (branches | forks | pull requests | code review | tags)

-  GitHub: Organização pelo Github (projects | issues | labels | milestones | releases)

### user-centricity

-  Desenhar a aplicação pensando e entendendo a usuária

### product-design

-  Criar protótipos para obter feedback e iterar

-  Aplicar os princípios de desenho visual (contraste, alinhamento, hierarquia)

### research

-  Planejar e executar testes de usabilidade

### Firebase

-  Firebase Auth

-  Firestore

***
### Tests

- Jest

- Mock
