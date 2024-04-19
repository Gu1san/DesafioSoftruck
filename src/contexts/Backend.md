## O backend do app está dividido entre:

### Context de rotas

Controla o comportamento dos componentes relacionados ao mapa, como a imagem do marker a ser exibida, bem como sua movimentação.

Através do context, é possível obter alguns dados sobre a rota e selecionar uma nova de forma simples.

### Localização

Utilizando o i18n-js e moment, criei a internacionalização do app de forma que ele funciona em três idiomas: inglês, português e espanhol.

Para isso, foram criados arquivos distintos para cada idioma, com cada um contendo sua tradução para determinada frase ou palavra.
No caso das datas e horários, foi utilizado o locale do moment para mudar a formatação.

### Interfaces

Para tornar prático o desenvolvimento das funcionalidades envolvendo o mapa, criei interfaces para todos os objetos do JSON com dados das rotas.
