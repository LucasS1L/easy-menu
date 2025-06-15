
# 📝 Easy Menu

**Easy Menu** é uma aplicação web para gerenciamento de produtos e geração de cardápios digitais. Focada em pequenos restaurantes e lanchonetes, ela permite controlar o catálogo de itens de forma simples e eficiente.

---

## 🚀 Funcionalidades Principais

- ✅ **Cadastro de Produtos:** Adicione, edite e exclua produtos com nome, descrição, preço e imagem.
- ✅ **Listagem de Produtos:** Visualize todos os produtos cadastrados.
- ✅ **Geração de Cardápio:** Realize o download de um cardápio organizado automaticamente.
- ✅ **Exclusão e Edição:** Mantenha o catálogo sempre atualizado.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React + TypeScript + Ant Design
- **Backend:** Node.js + Express + TypeORM
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker
- **Versionamento:** Git + GitHub

---

## 📂 Estrutura do Projeto

```
easy-menu/
├── backend/          → API em Node.js
├── frontend/         → Interface Web com React
├── docs/             → Documentação (incluindo GCS)
├── docker-compose.yml → Orquestração dos containers
├── README.md         → Este arquivo
└── .gitignore        → Boas práticas de versionamento
```

---

## 🐳 Executando com Docker Compose

1. **Criar o arquivo `.env` na pasta backend com as configurações necessárias:**

Exemplo:

```
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=easymenu
```

2. **Subir os containers:**

```bash
docker compose --env-file ./backend/.env up -d
```

Isso irá iniciar o banco de dados PostgreSQL.

---

## 🗄️ Executando o Backend Localmente

Se desejar rodar o backend separadamente:

```bash
cd backend
npm install
npm run dev
```

Isso iniciará o servidor backend em modo de desenvolvimento.

---

## 🗄️ Executando as Migrations do Banco de Dados

Após subir o container do banco (ou configurar um banco local), execute:

```bash
npm run typeorm -- -d ./src/shared/typeorm/index.ts migration:run
```

Esse comando aplica todas as migrations pendentes, criando as tabelas necessárias no banco.

---

## 📋 Executando o Frontend Localmente

Se desejar rodar o frontend:

```bash
cd frontend
npm install
npm run dev
```

---
