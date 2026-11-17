# Projeto Backend - API de e-commerce

Implementação em Node.js, Express, MySQL, Sequelize, JWT, bcrypt e Jest conforme o enunciado.

## Requisitos
- Node.js 18+ e MySQL 8+ instalados.
- Crie no MySQL: `CREATE DATABASE ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
- Copie `.env.example` para `.env` e informe usuário/senha do MySQL e uma chave JWT forte.

## Instalação e execução
```bash
npm install
npm run dev
```
A API ficará em `http://localhost:3000`. As tabelas são criadas pelo Sequelize na primeira execução. Para produção, use migrations em vez de `sync()`.

## Autenticação
Cadastre usuário em `POST /v1/user`, obtenha token em `POST /v1/user/token` e envie `Authorization: Bearer SEU_TOKEN` nas operações de escrita protegidas (categorias/produtos e alteração/exclusão de usuário). Cadastro e login são públicos para permitir criar a primeira conta; consultas GET são públicas.

## Rotas
| Método | Rota | Ação |
|---|---|---|
| GET | `/v1/user/:id` | Consultar usuário |
| POST | `/v1/user` | Cadastrar usuário |
| POST | `/v1/user/token` | Gerar JWT |
| PUT/DELETE | `/v1/user/:id` | Atualizar/excluir usuário (JWT) |
| GET | `/v1/category/search` | Listar categorias |
| GET | `/v1/category/:id` | Consultar categoria |
| POST/PUT/DELETE | `/v1/category` ou `/v1/category/:id` | CRUD (JWT) |
| GET | `/v1/product/search` | Listar produtos |
| GET | `/v1/product/:id` | Consultar produto |
| POST/PUT/DELETE | `/v1/product` ou `/v1/product/:id` | CRUD (JWT) |

### Filtros
Categorias: `limit` (padrão 12; -1 todos), `page` (padrão 1), `fields`, `use_in_menu=true|false`.
Produtos: `limit`, `page`, `match`, `category_ids`, `price-range`. Exemplo: `/v1/product/search?match=tenis&category_ids=1,2&price-range=100-300`.

### Exemplos de payload
Cadastro: `{"firstname":"Ana","surname":"Silva","email":"ana@email.com","password":"123456","confirmPassword":"123456"}`.
Categoria: `{"name":"Calçados","slug":"calcados","use_in_menu":true}`.
Produto: `{"enabled":true,"name":"Tênis","slug":"tenis","stock":10,"description":"Tênis esportivo","price":199.9,"price_with_discount":179.9,"category_ids":[1],"images":[],"options":[{"title":"Tamanho","type":"text","values":["38","39","40"]}]}`.

## Testes
```bash
npm test
```

## Observações de implementação
- Senhas são armazenadas como hash bcrypt e nunca retornadas pela API.
- Imagens recebidas em base64 são gravadas em `media/`; a API as publica em `/media`.
- Opções aceitam `shape` square/circle, `type` text/color e valores separados por vírgula no banco.
- O README original tem pequenas inconsistências: exige token para POST/PUT/DELETE em geral, mas o cadastro e a emissão do token precisam ser públicos para inicializar o sistema; aqui foram mantidos públicos. O campo `option[id]` do filtro é exemplificado no enunciado, mas a filtragem avançada por opção ainda precisa de implementação adicional para contemplar esse caso específico. `fields` na busca de produtos também pode ser refinado conforme o formato de saída desejado.
