# Jusfy Challenge Url Shortener

## Tecnologias utilizadas no projeto

- NodeJS 16+
- Docker
- Docker compose
- TypeORM
- Jest
- Express

## Installation
Instale as dependências localmente (opcional)

```sh
git@github.com:Kauanphbbb/url-shortener-jusfy.git
cd url-shortener-jusfy
npm i
```

Para rodar o projeto basta rodar os seguintes comandos

```sh
docker compose build
docker compose up
```

O docker irá iniciar o banco de dados e conectar. Após o docker finalizar a API estará disponível na porta 3000 do seu dispositivo.

## Rotas
A API possui apenas duas rotas:
- [post] http://localhost:3000/urls
  - body: {
      url: "google.com"
  }
  - reponse: {
     original: "google.com",
     short: "zDSOGi"
 }

- [get] http://localhost:3000/urls/:hash
    - Se não encontrar uma url salva com esse hash ou caso ela já tenha expirado será retornado um 404
    - Se encontrar ele vai redirecionar para a URL encontrada

## Detalhes
O encurtador faz um hash de 6 caracteres aleatórios de letras e números. Cada hash criado tem uma duração de 5 minutos, após os 5 minutos ele não funciona mais.
