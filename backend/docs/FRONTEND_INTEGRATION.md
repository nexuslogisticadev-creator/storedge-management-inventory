# 📦 Storedge – Guia de Integração Frontend ↔ Backend

> **Base URL:** `http://localhost:3000`  
> **Formato:** Todas as requisições e respostas são em `application/json`

---

## 🔐 Autenticação

O sistema usa **JWT (JSON Web Token)** com validade de **1 hora**.

O token deve ser enviado no header `Authorization` de **todas** as rotas protegidas (categorias, produtos e combos):

```
Authorization: Bearer <seu_token_aqui>
```

### Como funciona o fluxo:
1. Usuário faz **login** ou **registro** → backend retorna o `token`
2. Frontend armazena o `token` (ex: `localStorage`)
3. Toda requisição protegida inclui `Authorization: Bearer <token>` no header
4. O backend valida o token automaticamente via middleware antes de processar qualquer ação

---

## 👤 Auth – Autenticação de Usuários

### `POST /auth/register` – Cadastrar usuário

**Body (JSON):**
```json
{
  "username": "joao",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta de sucesso (201):**
```json
{
  "message": "Usuário cadastrado com sucesso e senha protegida!",
  "user": {
    "id": "uuid-aqui",
    "username": "joao",
    "email": "joao@email.com",
    "created_at": "2025-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGci..."
}
```

---

### `POST /auth/login` – Login

**Body (JSON):**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta de sucesso (200):**
```json
{
  "message": "Login realizado com sucesso!",
  "user": {
    "id": "uuid-aqui",
    "username": "joao",
    "email": "joao@email.com",
    "created_at": "2025-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGci..."
}
```

> ⚠️ **Salvar no frontend:** Após login/register, salve `token` no `localStorage`. Ele será necessário em todas as outras requisições.

---

## 📂 Categorias

> 🔒 Todas as rotas de categoria requerem `Authorization: Bearer <token>` no header.

### `GET /categorias` – Listar categorias do usuário

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta (200):**
```json
[
  {
    "id": "uuid",
    "nome": "Bebidas",
    "descricao": "Cervejas e refrigerantes",
    "cor": "#FF5733",
    "userId": "user-uuid"
  }
]
```

---

### `POST /categorias` – Criar categoria

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nome": "Bebidas",
  "descricao": "Cervejas e refrigerantes",
  "cor": "#FF5733"
}
```

> ⚠️ O campo `cor` deve estar no formato hexadecimal `#RRGGBB` ou `#RGB`. O backend valida o formato e retorna erro 400 se inválido.

**Resposta (201):**
```json
{
  "id": "uuid",
  "nome": "Bebidas",
  "descricao": "Cervejas e refrigerantes",
  "cor": "#FF5733",
  "userId": "user-uuid"
}
```

---

### `PUT /categorias/:id` – Editar categoria

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "novoNome": "Bebidas Geladas",
  "novaDescricao": "Cervejas, refrigerantes e sucos",
  "novaCor": "#3498DB"
}
```

> Todos os campos são opcionais. Envie apenas os que deseja alterar.

**Resposta (200):**
```json
{
  "id": "uuid",
  "nome": "Bebidas Geladas",
  "descricao": "Cervejas, refrigerantes e sucos",
  "cor": "#3498DB",
  "userId": "user-uuid"
}
```

---

### `DELETE /categorias/:id` – Excluir categoria

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nome": "Bebidas"
}
```

> ⚠️ O campo `nome` é obrigatório como confirmação para evitar exclusões acidentais.

**Resposta (200):**
```json
{
  "message": "Categoria excluída com sucesso."
}
```

---

## 📦 Produtos

> 🔒 Todas as rotas de produto requerem `Authorization: Bearer <token>` no header.

### `GET /produtos` – Listar produtos do usuário

**Headers:**
```
Authorization: Bearer <token>
```

**Query Params:**
```
?email=joao@email.com&token=eyJhbGci...
```

**Resposta (200):**
```json
[
  {
    "id": "uuid",
    "nome": "Brahma 600ml",
    "descricao": "Cerveja lager",
    "estoqueAtual": 50,
    "estoqueMinimo": 10,
    "categoriaId": "cat-uuid",
    "imagemUrl": "https://...",
    "categoria": {
      "id": "cat-uuid",
      "nome": "Bebidas",
      "cor": "#FF5733"
    }
  }
]
```

---

### `POST /produtos` – Criar produto

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nome": "Brahma 600ml",
  "descricao": "Cerveja lager gelada",
  "estoqueAtual": 50,
  "estoqueMinimo": 10,
  "categoriaId": "uuid-da-categoria",
  "imagemUrl": "https://url-da-imagem.jpg",
  "email": "joao@email.com",
  "token": "eyJhbGci..."
}
```

> `imagemUrl` é opcional. Use a rota `/produtos/image-search` para buscar imagem antes de criar.

**Resposta (201):**
```json
{
  "id": "uuid",
  "nome": "Brahma 600ml",
  "descricao": "Cerveja lager gelada",
  "estoqueAtual": 50,
  "estoqueMinimo": 10,
  "categoriaId": "cat-uuid",
  "imagemUrl": "https://..."
}
```

---

### `PUT /produtos/:id` – Editar produto

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nome": "Brahma 600ml Premium",
  "estoqueMinimo": 15,
  "email": "joao@email.com",
  "token": "eyJhbGci..."
}
```

> Todos os campos de produto são opcionais na edição. Envie apenas o que mudar.

**Resposta (200):**
```json
{
  "id": "uuid",
  "nome": "Brahma 600ml Premium",
  "estoqueAtual": 50,
  "estoqueMinimo": 15,
  "categoriaId": "cat-uuid",
  "imagemUrl": "https://..."
}
```

---

### `DELETE /produtos/:id` – Excluir produto

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "joao@email.com",
  "token": "eyJhbGci..."
}
```

**Resposta (200):**
```json
{
  "message": "Produto excluído com sucesso."
}
```

---

### `POST /produtos/:id/vender` – Vender produto (desconta estoque)

> Ao vender um produto que é um **combo (produto filho)**, o backend automaticamente desconta do **produto pai** também.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "quantidade": 2,
  "email": "joao@email.com",
  "token": "eyJhbGci..."
}
```

**Resposta (200):**
```json
{
  "id": "uuid",
  "nome": "Combo 12 Brahma",
  "estoqueAtual": 48,
  "estoqueMinimo": 5,
  "categoriaId": "cat-uuid"
}
```

---

### `GET /produtos/lista-compras` – Lista de compras (estoque abaixo do mínimo)

> Retorna todos os produtos onde `estoqueAtual < estoqueMinimo`.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Params:**
```
?email=joao@email.com&token=eyJhbGci...
```

**Resposta (200):**
```json
[
  {
    "id": "uuid",
    "nome": "Brahma 600ml",
    "estoqueAtual": 3,
    "estoqueMinimo": 10,
    "categoriaId": "cat-uuid"
  }
]
```

---

### `POST /produtos/image-search` – Buscar imagens via Mercado Livre

> Consulta a API do Mercado Livre pelo nome do produto e retorna **até 5 imagens em alta resolução** para o usuário escolher.  
> ⚠️ **Nunca salve automaticamente!** Exiba as opções para o usuário confirmar antes de salvar no produto.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "joao@email.com",
  "token": "eyJhbGci..."
}
```

**Query Params:**
```
?productName=Brahma 600ml
```

**Resposta (200):**
```json
{
  "query": "Brahma 600ml",
  "images": [
    {
      "title": "Cerveja Brahma 600ml",
      "thumbnail": "https://http2.mlstatic.com/...thumb.jpg",
      "imageUrl": "https://http2.mlstatic.com/...alta-res.jpg"
    },
    {
      "title": "Brahma Pilsen 600ml",
      "thumbnail": "https://...",
      "imageUrl": "https://..."
    }
  ]
}
```

**Fluxo recomendado no frontend:**
1. Usuário digita nome do produto
2. Frontend chama `POST /produtos/image-search?productName=<nome>`
3. Backend retorna array de até 5 imagens em alta resolução
4. Exibir galeria com botão **"Usar esta imagem"** para cada uma
5. Só após confirmar → envia `imagemUrl` no `POST /produtos`

---

## 🔗 Combos (Produto Pai e Filho)

> 🔒 Todas as rotas de combo requerem `Authorization: Bearer <token>` no header.

### Conceito de Combos

Um combo é uma relação entre dois produtos onde:
- **Produto Pai** = a unidade base (ex: Brahma Unidade)
- **Produto Filho** = o combo (ex: Caixinha 12 Brahma)
- **quantidadePai** = quantas unidades do pai são descontadas ao vender 1 filho

**Exemplo ao vender 1 "Caixinha 12 Brahma":** desconta automaticamente 12 do estoque de "Brahma Unidade"

---

### `GET /combos` – Listar combos

**Headers:**
```
Authorization: Bearer <token>
```

**Query Params:**
```
?email=joao@email.com&token=eyJhbGci...
```

**Resposta (200):**
```json
[
  {
    "id": "uuid",
    "nome": "Combo 12 Brahma",
    "quantidadePai": 12,
    "produtoPaiId": "pai-uuid",
    "produtoFilhoId": "filho-uuid",
    "produtoPai": { "id": "pai-uuid", "nome": "Brahma Unidade", "estoqueAtual": 120 },
    "produtoFilho": { "id": "filho-uuid", "nome": "Combo 12 Brahma", "estoqueAtual": 10 }
  }
]
```

---

### `POST /combos` – Criar combo

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nome": "Combo 12 Brahma",
  "quantidadePai": 12,
  "produtoPaiId": "uuid-do-produto-pai",
  "produtoFilhoId": "uuid-do-produto-filho",
  "email": "joao@email.com",
  "token": "eyJhbGci..."
}
```

**Resposta (201):**
```json
{
  "id": "uuid",
  "nome": "Combo 12 Brahma",
  "quantidadePai": 12,
  "produtoPaiId": "pai-uuid",
  "produtoFilhoId": "filho-uuid"
}
```

---

### `PUT /combos/:id` – Editar combo

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nome": "Combo 24 Brahma",
  "quantidadePai": 24,
  "email": "joao@email.com",
  "token": "eyJhbGci..."
}
```

---

### `DELETE /combos/:id` – Excluir combo

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "joao@email.com",
  "token": "eyJhbGci..."
}
```

---

## 🔴 Erros Comuns

| Código | Mensagem | Causa |
|--------|----------|-------|
| `400`  | Dados incompletos | Campos obrigatórios faltando no body |
| `400`  | Cor inválida | Cor enviada não está no formato `#RRGGBB` ou `#RGB` |
| `401`  | Token de autenticação não fornecido | Header `Authorization` ausente ou mal formatado |
| `401`  | Token inválido ou expirado | Token expirou (1h) – faça login novamente |
| `401`  | Autenticação falhou | Email/token do body não corresponde ao usuário |
| `403`  | Sem permissão | Tentando modificar recurso de outro usuário |
| `404`  | Não encontrado | Recurso não existe ou não pertence ao usuário |
| `500`  | Erro interno | Problema no servidor |

---

## 💾 Exemplo de Armazenamento no Frontend (localStorage)

```javascript
// Após login:
localStorage.setItem('token', response.token);
localStorage.setItem('email', response.user.email);

// Header padrão para todas as requisições protegidas:
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
};
```

---

## 🧪 Exemplo Completo com Fetch (JavaScript nativo)

```javascript
// === CONFIG ===
const API = 'http://localhost:3000';
const getToken = () => localStorage.getItem('token');
const getEmail = () => localStorage.getItem('email');

const authHeaders = () => ({
  'Authorization': `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
});

// === AUTH ===
async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.user.email);
  }
  return data;
}

// === CATEGORIAS (apenas Bearer Token, sem email/token no body) ===
async function listarCategorias() {
  const res = await fetch(`${API}/categorias`, {
    headers: authHeaders()
  });
  return res.json();
}

async function criarCategoria(nome, descricao, cor) {
  const res = await fetch(`${API}/categorias`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ nome, descricao, cor })
  });
  return res.json();
}

async function editarCategoria(id, novoNome, novaDescricao, novaCor) {
  const res = await fetch(`${API}/categorias/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ novoNome, novaDescricao, novaCor })
  });
  return res.json();
}

async function excluirCategoria(id, nome) {
  const res = await fetch(`${API}/categorias/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify({ nome }) // confirmação por nome
  });
  return res.json();
}

// === PRODUTOS (Bearer Token + email/token no body) ===
async function listarProdutos() {
  const token = getToken(); const email = getEmail();
  const res = await fetch(`${API}/produtos?email=${email}&token=${token}`, {
    headers: authHeaders()
  });
  return res.json();
}

async function criarProduto({ nome, descricao, estoqueAtual, estoqueMinimo, categoriaId, imagemUrl }) {
  const res = await fetch(`${API}/produtos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      nome, descricao, estoqueAtual, estoqueMinimo, categoriaId, imagemUrl,
      email: getEmail(), token: getToken()
    })
  });
  return res.json();
}

// === VENDA (desconta estoque + combos automáticos) ===
async function venderProduto(produtoId, quantidade) {
  const res = await fetch(`${API}/produtos/${produtoId}/vender`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ quantidade, email: getEmail(), token: getToken() })
  });
  return res.json();
}

// === LISTA DE COMPRAS ===
async function listaDeCompras() {
  const token = getToken(); const email = getEmail();
  const res = await fetch(`${API}/produtos/lista-compras?email=${email}&token=${token}`, {
    headers: authHeaders()
  });
  return res.json();
}

// === BUSCA DE IMAGEM (retorna até 5 opções em alta resolução) ===
async function buscarImagens(nomeProduto) {
  const res = await fetch(`${API}/produtos/image-search?productName=${encodeURIComponent(nomeProduto)}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ email: getEmail(), token: getToken() })
  });
  const data = await res.json();
  // data.images = [{ title, thumbnail, imageUrl }, ...]
  return data;
}

// === TRATAMENTO DE TOKEN EXPIRADO ===
async function safeFetch(url, options) {
  const res = await fetch(url, options);
  if (res.status === 401) {
    // Token expirado: redirecionar para login
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = '/login';
    return;
  }
  return res.json();
}
```

---

## 🗒️ Notas Importantes para o Frontend

1. **Expiração de token (1h):** Implemente tratamento de erro 401 para redirecionar ao login.
2. **Categorias:** Não precisam de `email`/`token` no body — apenas o Bearer Token no header.
3. **Cor das categorias:** Sempre enviar no formato `#RRGGBB` ou `#RGB`. Use um color picker.
4. **Imagens:** Nunca salve `imagemUrl` automaticamente. A busca retorna até 5 opções — mostre todas para o usuário escolher.
5. **Combos e venda:** Ao vender um produto filho (combo), o backend desconta do pai automaticamente. O frontend não precisa fazer nada extra.
6. **Lista de compras:** Ideal exibir como badge/notificação quando há produtos abaixo do mínimo.
