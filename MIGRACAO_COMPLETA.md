# 🎯 Migração Landing Page: Vite → Next.js 16

## ✅ O QUE FOI FEITO (80% Completo)

### 1. Infraestrutura Base
- ✅ Estrutura Next.js 16 com App Router criada
- ✅ `package.json` configurado com dependências corretas
- ✅ `next.config.ts` com output standalone
- ✅ `tailwind.config.ts` adaptado
- ✅ `tsconfig.json` para Next.js
- ✅ `.gitignore` configurado

### 2. Componentes
- ✅ 9/14 componentes migrados automaticamente
  - Header, Footer (adaptados para useRouter)
  - Hero, Benefits, HowItWorks, Testimonials
  - FAQ, CTAFinal, Pricing (adaptados)
- ✅ Componentes UI copiados (Button, Section, etc.)
- ✅ Animações (RevealOnScroll, etc.)

### 3. Página Principal
- ✅ `app/page.tsx` criada com lazy loading
- ✅ Otimizações (dynamic imports para seções below-the-fold)

### 4. Infraestrutura de Deploy
- ✅ **Dockerfile** multi-stage build criado
- ✅ **deploy.sh** com backup/rollback criado
- ✅ `.env.example` configurado

### 5. Configurações
- ✅ `globals.css` adaptado para Next.js
- ✅ `layout.tsx` com metadata SEO
- ✅ Estrutura de diretórios criada

---

## ⏳ O QUE FALTA FAZER (20%)

### 1. Páginas Restantes (CRÍTICO)

Você precisa criar manualmente as seguintes páginas no Next.js:

#### **`src/app/cadastro/page.tsx`**
- Copiar de: `landing-page-gemini/src/pages/CadastroPage.tsx`
- Adaptar:
  - Adicionar `"use client"` no topo
  - Trocar `import { useNavigate, Link } from "react-router-dom"` por:
    ```tsx
    import { useRouter } from "next/navigation";
    import Link from "next/link";
    ```
  - Trocar `const navigate = useNavigate()` por `const router = useRouter()`
  - Trocar `navigate('/path')` por `router.push('/path')`
  - Trocar `import.meta.env.VITE_API_URL` por `process.env.NEXT_PUBLIC_API_URL`

#### **`src/app/aguardando-confirmacao/page.tsx`**
- Copiar de: `landing-page-gemini/src/pages/AguardandoConfirmacaoPage.tsx`
- Aplicar mesmas adaptações acima

#### **`src/app/contato/page.tsx`** (Nova)
- Criar página simples de contato com formulário

#### **`src/app/politica-de-privacidade/page.tsx`** (Nova)
- Criar página estática com política de privacidade

#### **`src/app/termos-de-uso/page.tsx`** (Nova)
- Criar página estática com termos de uso

### 2. Biblioteca `/lib` (se houver)

Se existir `src/lib/api.ts`:
- ✅ Já foi copiado
- Verificar se usa `import.meta.env` e trocar por `process.env`

### 3. Assets Públicos

Verificar se todos os assets foram copiados:
```bash
ls -la landing-page-gemini/public/
ls -la landing-page-nextjs/public/
```

Se faltarem, copiar:
```bash
cp -r landing-page-gemini/public/* landing-page-nextjs/public/
```

---

## 🧪 TESTES NECESSÁRIOS

### 1. Instalar Dependências
```bash
cd landing-page-nextjs
npm install
```

### 2. Testar Dev Mode
```bash
npm run dev
```
- Abrir http://localhost:3000
- Verificar se página principal carrega
- Testar navegação entre seções
- Verificar console do navegador (erros?)

### 3. Testar Build de Produção
```bash
npm run build
```
- Verificar se build completa sem erros
- Checar warnings (podem indicar problemas)

### 4. Testar Server de Produção
```bash
npm start
```
- Abrir http://localhost:3000
- Verificar performance
- Testar todas as rotas

### 5. Testar Docker (Opcional)
```bash
docker build -t landing-chatdelta:test .
docker run -p 3000:3000 landing-chatdelta:test
```

---

## 📋 CHECKLIST ANTES DE DEPLOY

- [ ] Todas as páginas migradas (5 páginas)
- [ ] `npm run build` completa sem erros
- [ ] Todas as rotas funcionam em produção local
- [ ] Assets (imagens, fontes) carregam corretamente
- [ ] Variáveis de ambiente configuradas
- [ ] Dockerfile testa localmente
- [ ] SEO metadata configurado em todas as páginas
- [ ] Links internos funcionam (Header, Footer)
- [ ] Formulários funcionam (cadastro)
- [ ] Integrações com API funcionam

---

## 🚀 COMANDOS PARA DEPLOY NO SERVIDOR

### 1. Fazer backup da landing atual
```bash
ssh -i ~/.ssh/id_ed25519_ci deploy@72.61.44.50
cd /opt/landing-chatdelta
./deploy.sh backups
```

### 2. Subir novo código
```bash
# No local
cd landing-page-nextjs
git add .
git commit -m "feat: Migrar landing page para Next.js 16"
git push origin main

# No servidor
ssh -i ~/.ssh/id_ed25519_ci deploy@72.61.44.50
cd /opt/landing-chatdelta
git pull origin main
```

### 3. Buildar e subir container
```bash
# No servidor
docker build -t landing-chatdelta:latest .
docker stop landing-chatdelta
docker rm landing-chatdelta
docker run -d \
  --name landing-chatdelta \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  landing-chatdelta:latest
```

### 4. Verificar health
```bash
./deploy.sh status
curl http://127.0.0.1:3000
```

### 5. Se algo der errado
```bash
./deploy.sh rollback
```

---

## 🔍 DIFERENÇAS PRINCIPAIS VITE → NEXT.JS

| Aspecto | Vite + React | Next.js 16 |
|---------|--------------|------------|
| **Roteamento** | React Router DOM | File-system (app/) |
| **Navegação** | `useNavigate()` | `useRouter()` |
| **Links** | `<Link to="">` | `<Link href="">` |
| **Env Vars** | `import.meta.env.VITE_*` | `process.env.NEXT_PUBLIC_*` |
| **Client Components** | Padrão | Requer `"use client"` |
| **Build Output** | HTML/CSS/JS estáticos | Server + Standalone |
| **SSR** | Não | Sim (padrão) |
| **SEO** | Client-side | Server-side |

---

## 📞 PROBLEMAS COMUNS

### Erro: "You're importing a component that needs useState"
**Solução:** Adicione `"use client"` no topo do arquivo.

### Erro: "Module not found: Can't resolve '@/constants'"
**Solução:** Verifique se o caminho está correto (`@/constants/constants`).

### Erro: "useNavigate is not a function"
**Solução:** Substitua por `useRouter()` from "next/navigation".

### Erro: Build falha com "Module parse failed"
**Solução:** Verifique imports de imagens/assets. Use `/public/` prefix.

---

## 🎉 CONCLUSÃO

**80% da migração está completa!**

Falta apenas:
1. **Criar as 5 páginas restantes** (cadastro, aguardando-confirmacao, contato, politica, termos)
2. **Testar build local**
3. **Deploy no servidor**

Siga os passos acima e a landing estará pronta para produção! 🚀
