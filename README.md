# github-repositories

Um simples web app de buscas de repositórios do Github.

## Tecnologias utilizadas

* AngularJS
* Angular Style Guide
* Github API
* Stylus
* RSCSS
* Bower
* Gulp

## API Github

Por padrão o Github libera o acesso a API por apenas 60 requisições por hora, por isso deve ser gerado um [token](https://github.com/settings/tokens) para poder utilizar a API com 1000 requisições por hora.

Após gerar o token insira no arquivo `source/app/00-base/app.run.js` como no exemplo:

```
// Insira aqui o token
$http.defaults.headers.common.Authorization = 'Basic XXXXXXSEUXTOKENXXXXXX';
```

No mesmo arquivo altere o nome do usuário principal do Github:

```
$rootScope.userName = 'seu-usuario-git';
```

## Estrutura

A pasta `source` é onde estão todos os arquivos de desenvolvimento.

Na pasta `public` estão os arquivos de produção.

A arquitetura é baseada em meu próprio [boilerplate](https://github.com/camposdev/boilerplate-angularjs) para AngularJS.

## Instalação

Para a instalação deste projeto rode os seguintes comandos via terminal:

```
npm install
```
Todas as dependencias de desenvolvimento serão instaladas.

```
bower install
```
Todas os módulos e dependencias do projeto serão instaladas.

Antes de inicial o desenvolvimento rode os seguintes comandos:

```
gulp start
```
```
gulp watch
```
```
gulp server
```

Para gerar os arquivos minificados e preparados para produção no final rode o comando:

```
gulp build
```

Os arquivos css e js da pasta `public` serão apagados e no lugar criado um único arquivo para css e js, `all.min.js` e `all.min.css`.

Antes da publicação deve ser alterado no arquivo `index.html` a chamada dos arquivos css e js.