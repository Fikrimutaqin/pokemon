# ⚡ Pokomen - Modern Pokedex Application

Pokomen is a premium, high-performance Pokedex web application built with modern web technologies. It allows users to explore Pokemon, view detailed statistics, and build their own favorite collections (Dream Teams).

## ✨ Features
- **Infinite Scrolling Explorer**: Smoothly scroll through hundreds of Pokemon.
- **Dynamic Theming**: UI colors automatically adapt based on the Pokemon's elemental type.
- **Smart Rotom AI**: A simulated AI assistant that generates battle summaries based on Pokemon stats.
- **Favorite Collection**: Save (nickname), and delete your favorite Pokemon. Data persists across reloads.
- **Micro-animations**: Premium fluid animations using Framer Motion.

---

## 🛠️ Technology Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS (`index.css`)
- **Data Fetching:** Axios + TanStack React Query
- **State Management:** Redux Toolkit + Redux Persist
- **Animations:** Framer Motion
- **Component Documentation:** Storybook
- **Unit Testing:** Vitest + React Testing Library

---

## 🚀 Setup & Run Instructions

### Prerequisites
Make sure you have **Node.js (v20 or v22)** and **Yarn** installed.

### 1. Installation
Clone the repository and install the dependencies:
```bash
yarn install
```

### 2. Running the Development Server
To start the application locally:
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Storybook (Component Library)
To view the isolated UI components:
```bash
yarn storybook
```

### 4. Running Unit Tests
To run the automated tests for services, hooks, and slices:
```bash
yarn test
```

---

## 📂 Project Structure Explanation

The project strictly follows a modular, scalable architecture:

```text
POKOMEN/
├── .github/workflows/        # CI/CD Pipelines (Github Actions)
├── .storybook/               # Storybook configurations
├── src/
│   ├── app/                  # Next.js App Router pages (/, /collection, /pokemon/[name])
│   ├── components/           # Reusable UI components
│   │   ├── common/           # Atoms (Buttons, Inputs, Cards, Empty States)
│   │   └── layouts/          # Global layouts (Header, Footer)
│   ├── hooks/                # Custom React Hooks (e.g., useDebounce)
│   ├── services/             # API services and utility functions
│   │   ├── interface/        # TypeScript interfaces for services
│   │   └── ...
│   ├── store/                # Redux Toolkit configuration & Slices
│   └── types/                # Global TypeScript type definitions
└── ...
```

---

## 🌐 API Usage Notes & Endpoints Used

This application consumes the official [PokeAPI](https://pokeapi.co/). All API calls are routed through custom Axios instances and managed by `TanStack React Query` to enable aggressive caching, background refetching, and pagination.

### Endpoints Used:
1. **Fetch Pokemon List (Infinite)**
   - `GET https://pokeapi.co/api/v2/pokemon?limit=20&offset={offset}`
   - *Used on the home page for the infinite scroll grid.*
2. **Fetch Pokemon Details**
   - `GET https://pokeapi.co/api/v2/pokemon/{name_or_id}`
   - *Used to get stats, types, weight, height, and sprites for the detail page.*
3. **Universal Search & Aggregation (`searchUniversal` & `getPokemonsWithDetails`)**
   - `GET https://pokeapi.co/api/v2/pokemon/{name}` (Exact Name)
   - `GET https://pokeapi.co/api/v2/type/{type}` (Elemental Type)
   - `GET https://pokeapi.co/api/v2/ability/{ability}` (Ability)
   - *Used to perform flexible universal searches. The `Promise.any` mechanism aggregates data and supports pagination across different search strategies.*

---

## 🛡️ Error Handling Approach

The application uses a multi-layered approach to handle errors gracefully without breaking the UI:

1. **Service Layer (Axios Try-Catch)**
   API requests in `src/services/pokemonServices.ts` are wrapped in `try-catch` blocks. If an API call fails (e.g., a 404 for a mistyped search query), it safely throws a controlled error message.
2. **State Management Layer (React Query)**
   `useQuery` and `useInfiniteQuery` automatically track `isError` and `isLoading` states. If a network request fails, React Query triggers the `isError` boolean, allowing the UI to react instantly.
3. **UI Layer (Empty States & Fallbacks)**
   When `isError` is true or data returns empty, the UI intentionally renders dedicated fallback components like `<EmptySearch />` instead of a blank screen or a raw JSON error stack. 
4. **Mock AI Service Graceful Degradation**
   The Rotom AI service is wrapped in a `try-catch`. If the simulated AI function fails, the UI gracefully falls back to a friendly error message (`Bzzzt! Koneksi Rotom terputus.`) instead of crashing the detail page.
