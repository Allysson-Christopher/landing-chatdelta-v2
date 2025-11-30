# Landing Page Chat Delta - Next.js 16

Migração de Vite + React para Next.js 16 com App Router.

## Status da Migração

✅ **Concluído:**
- Estrutura Next.js 16 criada
- Configurações (next.config.ts, tailwindcss, tsconfig)
- Componentes migrados (9/14 arquivos adaptados)
- Página principal (HomePage) criada com lazy loading

⏳ **Pendente:**
- Migrar páginas /cadastro e /aguardando-confirmacao
- Criar páginas /contato, /politica-de-privacidade, /termos-de-uso
- Dockerfile para produção
- Script deploy.sh
- Testar build e produção

## Instalação

\`\`\`bash
npm install
\`\`\`

## Desenvolvimento

\`\`\`bash
npm run dev
\`\`\`

## Build de Produção

\`\`\`bash
npm run build
npm start
\`\`\`

## Próximos Passos

1. Copiar código das páginas restantes do Vite
2. Adaptar para Next.js (usar useRouter ao invés de useNavigate)
3. Criar Dockerfile multi-stage
4. Criar script deploy.sh com backup/rollback
5. Testar em produção localmente

## Diferenças Principais vs Vite

- **Roteamento:** File-system based (app directory) ao invés de React Router
- **Navegação:** `useRouter()` from "next/navigation" ao invés de `useNavigate()`
- **Links:** `<Link>` from "next/link" ao invés de "react-router-dom"
- **Client Components:** Adicionar `"use client"` em componentes com estado/hooks
- **Env Vars:** `process.env.NEXT_PUBLIC_*` ao invés de `import.meta.env.VITE_*`
