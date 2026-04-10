# API Routes (Ambiente de Desenvolvimento)

> Em produção, substitua `http://localhost:3000` pela URL do serviço hospedado.

## Autenticação (Auth)

### Registrar usuário

**Endpoint:**  
`POST http://localhost:3000/auth/register`

**Body (JSON):**

```json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

### Login

**Endpoint:**  
`POST http://localhost:3000/auth/login`

**Body (JSON):**

```json
{
    "email": "string",
    "password": "string"
}
```
