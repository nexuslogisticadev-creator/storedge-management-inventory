# Guia de Conexão Frontend - Backend

Este documento detalha como o frontend deve interagir com o backend do sistema Storedge Management Inventory, incluindo autenticação, manipulação de categorias, produtos e combos.

## 1. URL Base do Backend

O backend está rodando em `http://localhost:3000`. Todas as requisições devem ser feitas para este endereço, seguido do endpoint específico.

## 2. Autenticação

Todas as rotas de criação, edição e exclusão (e a maioria das listagens) requerem autenticação via token JWT. O token deve ser enviado no cabeçalho `Authorization` como `Bearer <seu_token>`.

### Cadastro de Usuário (Register)

- **Método:** `POST`
- **Endpoint:** `/auth/register`
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Resposta de Sucesso (201 Created):**
  ```json
  {
    "message": "Usuário cadastrado com sucesso e senha protegida!",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "created_at": "datetime"
    },
    "token": "string_jwt_token"
  }
  ```

### Login de Usuário (Login)

- **Método:** `POST`
- **Endpoint:** `/auth/login`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Resposta de Sucesso (200 OK):**
  ```json
  {
    "message": "Login realizado com sucesso!",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "created_at": "datetime"
    },
    "token": "string_jwt_token"
  }
  ```

## 3. Categorias

As operações de categoria exigem o `email` e o `token` do usuário no corpo da requisição (para POST/PUT/DELETE) ou como query params (para GET).

### Criar Categoria

- **Método:** `POST`
- **Endpoint:** `/categorias`
- **Body:**
  ```json
  {
    "nome": "string",
    "descricao": "string",
    "cor": "string_hexadecimal",
    "email": "string",
    "token": "string_jwt_token"
  }
  ```

### Editar Categoria

- **Método:** `PUT`
- **Endpoint:** `/categorias/:id`
- **Body:**
  ```json
  {
    "novoNome": "string",
    "novaDescricao": "string",
    "novaCor": "string_hexadecimal",
    "email": "string",
    "token": "string_jwt_token"
  }
  ```

### Excluir Categoria

- **Método:** `DELETE`
- **Endpoint:** `/categorias/:id`
- **Body:**
  ```json
  {
    "nome": "string",
    "email": "string",
    "token": "string_jwt_token"
  }
  ```

### Listar Categorias

- **Método:** `GET`
- **Endpoint:** `/categorias`
- **Query Params:** `?email=<string>&token=<string_jwt_token>`

## 4. Produtos

As operações de produto exigem o `email` e o `token` do usuário no corpo da requisição (para POST/PUT/DELETE) ou como query params (para GET).

### Criar Produto

- **Método:** `POST`
- **Endpoint:** `/produtos`
- **Body:**
  ```json
  {
    "nome": "string",
    "descricao": "string",
    "estoqueAtual": "number",
    "estoqueMinimo": "number",
    "categoriaId": "string",
    "imagemUrl": "string_url_opcional",
    "email": "string",
    "token": "string_jwt_token"
  }
  ```

### Editar Produto

- **Método:** `PUT`
- **Endpoint:** `/produtos/:id`
- **Body:**
  ```json
  {
    "nome": "string_opcional",
    "descricao": "string_opcional",
    "estoqueAtual": "number_opcional",
    "estoqueMinimo": "number_opcional",
    "categoriaId": "string_opcional",
    "imagemUrl": "string_url_opcional",
    "email": "string",
    "token": "string_jwt_token"
  }
  ```

### Excluir Produto

- **Método:** `DELETE`
- **Endpoint:** `/produtos/:id`
- **Body:**
  ```json
  {
    "email": "string",
    "token": "string_jwt_token"
  }
  ```

### Listar Produtos

- **Método:** `GET`
- **Endpoint:** `/produtos`
- **Query Params:** `?email=<string>&token=<string_jwt_token>`

### Listar Produtos em Lista de Compras (Estoque Mínimo)

- **Método:** `GET`
- **Endpoint:** `/produtos/lista-compras`
- **Query Params:** `?email=<string>&token=<string_jwt_token>`

### Vender Produto (Desconta estoque e lida com combos)

- **Método:** `POST`
- **Endpoint:** `/produtos/:id/vender`
- **Body:**
  ```json
  {
    "quantidade": "number",
    "email": "string",
    "token": "string_jwt_token"
  }
  ```

### Buscar Imagem de Produto (Meli API)

- **Método:** `POST`
- **Endpoint:** `/produtos/image-search`
- **Body:**
  ```json
  {
    "productName": "string_nome_do_produto",
    "email": "string",
    "token": "string_jwt_token"
  }
  ```
- **Resposta de Sucesso (200 OK):**
  ```json
  {
    "imageUrl": "string_url_da_imagem"
  }
  ```

## 5. Combos

As operações de combo exigem o `email` e o `token` do usuário no corpo da requisição (para POST/PUT/DELETE) ou como query params (para GET).

### Criar Combo

- **Método:** `POST`
- **Endpoint:** `/combos`
- **Body:**
  ```json
  {
    "nome": "string",
    "quantidadePai": "number",
    "produtoPaiId": "string",
    "produtoFilhoId": "string",
    "email": "string",
    "token": "string_jwt_token"
  }
  ```

### Editar Combo

- **Método:** `PUT`
- **Endpoint:** `/combos/:id`
- **Body:**
  ```json
  {
    "nome": "string_opcional",
    "quantidadePai": "number_opcional",
    "produtoPaiId": "string_opcional",
    "produtoFilhoId": "string_opcional",
    "email": "string",
    "token": "string_jwt_token"
  }
  ```

### Excluir Combo

- **Método:** `DELETE`
- **Endpoint:** `/combos/:id`
- **Body:**
  ```json
  {
    "email": "string",
    "token": "string_jwt_token"
  }
  ```

### Listar Combos

- **Método:** `GET`
- **Endpoint:** `/combos`
- **Query Params:** `?email=<string>&token=<string_jwt_token>`

## Considerações Adicionais

- **Tratamento de Erros:** O backend retorna mensagens de erro claras com códigos de status HTTP apropriados (400, 401, 403, 404, 500).
- **Dados Opcionais:** Nos PUTs, campos opcionais que não são fornecidos manterão seus valores existentes.
- **Segurança:** Lembre-se de que o `token` e o `email` são essenciais para todas as operações protegidas.