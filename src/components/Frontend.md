## O frontend do app possui dois componentes centrais:

### Mapa

Ele é responsável por exibir todas as informações relacionadas ao mapa, como o marcadores e rotas e o mapa em si.

### Seletor de rota

Ele representa uma das rotas previamente fornecidas no JSON de GPS, e contém algumas informações básicas sobre a rota, como foto e placa do veículo.
Além disso também exibe a data e hora em que o trajeto foi iniciado.

## Bibliotecas usadas

### React native maps

Como sugerido, usei essa biblioteca para fazer a exibição do mapa ao consumir uma API do Google Maps. Além do MapView, também usei o MarkerAnimated
para exibir o ícone do veículo com uma transição gradual entre os pontos. As rotas foram feitas usando o Polyine, que consome todas as coordenadas 
do trajeto para exibir a rota no mapa.

### React native paper

Utilizei essa biblioteca para exibir um botão no canto superior do mapa. Ele é responsável por alterar o tipo dele ente "Standard" e "Hybrid"
