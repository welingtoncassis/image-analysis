# Image-analysis

- Aplicação serveless para analise de imagem através da url de uma imagem

## Requisitos

- Nodejs 12+
- Conta AWS & aws CLI configurada
- Conta no framework serveless
- CLI serveless

## Comandos 

- npm install
- sls deploy (Para fazer deploy da apliacação no lambda da aws)
- sls invoke local -f img-analysis -p ./request.json -l (Invocar a função localmente)
- sls invoke -f img-analysis -p ./request.json -l (Invocar a função na aws)