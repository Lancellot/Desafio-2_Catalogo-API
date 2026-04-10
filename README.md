# 🛍️ Desafio 2 — Catálogo de Produtos

Aplicação responsiva de catálogo de produtos desenvolvida com React, Vite, TypeScript e Tailwind CSS, consumindo dados de uma API externa.

---

## 🚀 Tecnologias utilizadas

<div>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
</div>

---

## 🌐 API

A aplicação consome a **[DummyJSON](https://dummyjson.com/)** — uma alternativa robusta e confiável à Fake Store API (originalmente proposta no enunciado).

> ⚠️ **Por que DummyJSON?**  
> A Fake Store API (`fakestoreapi.com`) apresentou instabilidade durante o desenvolvimento, retornando erros ou sem resposta em diversas requisições. Para garantir a funcionalidade e estabilidade da aplicação, optou-se pela DummyJSON, que oferece endpoints equivalentes e compatíveis com os requisitos do desafio.

### Endpoints utilizados

| Descrição | Endpoint |
|---|---|
| Lista de produtos | `GET /products` |
| Lista de categorias | `GET /products/categories` |
| Produtos por categoria | `GET /products/category/:slug` |

---

## 📁 Estrutura do projeto

```
src/
├── assets/              # Imagens e recursos estáticos
├── components/
│   ├── filters/
│   │   └── FilterSidebar.tsx    # Sidebar de filtro por categoria
│   ├── footer/
│   │   └── Footer.tsx
│   ├── navbar/
│   │   └── Navbar.tsx
│   └── product/
│       └── cardproduct/
│           └── ProductCard.tsx  # Card individual de produto
├── models/
│   ├── Category.ts      # Tipagem de categoria
│   └── Product.ts       # Tipagem de produto
├── pages/
│   └── home/
│       └── Home.tsx     # Página principal com o catálogo
├── services/
│   └── Service.ts       # Camada de acesso à API (Axios)
├── App.tsx
├── main.tsx
└── index.css
```

---

## ⚙️ Camada de serviço (API)

A comunicação com a API é centralizada em `src/services/Service.ts`, utilizando uma instância do **Axios** configurada com a base URL da DummyJSON:

```ts
import axios from "axios";
import type { Product } from "../models/Product";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

// Retorna todos os produtos
export async function getProducts(): Promise<Product[]> { ... }

// Retorna todas as categorias disponíveis
export async function getCategories(): Promise<Category[]> { ... }

// Retorna produtos filtrados por categoria
export async function getByCategory(category: string): Promise<Product[]> { ... }
```

Essa separação mantém a lógica de dados isolada dos componentes de UI, facilitando manutenção e testes.

---

## ✅ Requisitos implementados

### Obrigatórios
- [x] Consumo de dados da API externa
- [x] Exibição dinâmica de produtos
- [x] Cada produto exibe imagem, título e preço
- [x] Componentização (Navbar, Footer, FilterSidebar, ProductCard)
- [x] Interface responsiva (mobile e desktop)
- [x] Filtro por categoria (comportamento dinâmico)

### Opcionais
- [x] Separação entre UI e lógica de dados (camada `services/`)
- [x] Organização de componentes por domínio
- [x] Tipagem TypeScript com models dedicados
- [x] Loading state durante requisições
- [x] Error state para falhas de rede

---

## 🏃 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/lancellot/Desafio-2_Catalogo-API
cd nome-do-repo

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build para produção

```bash
npm run build
```

---

## 📸 Screenshots


https://github.com/user-attachments/assets/d3fe0d9f-8e1f-4660-b82d-61c131e45fa3



## 📝 Observações

- A troca de API (Fake Store → DummyJSON) não impacta os requisitos do desafio. Os dados retornados (produtos, categorias, imagens, preços) são equivalentes e atendem a todos os critérios de avaliação.
- A estrutura de tipos foi adaptada para o formato de resposta da DummyJSON (ex: `products[]` dentro do objeto de resposta, categorias com `slug` e `name`).
