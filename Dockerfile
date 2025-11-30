FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependências
COPY package*.json ./
RUN npm ci

# Copiar código e buildar
COPY . .
ENV NEXT_PUBLIC_API_URL=https://api.chatdelta.ia.br
ENV NEXT_PUBLIC_WHATSAPP_NUMBER=558195970450
ENV NEXT_PUBLIC_SUPPORT_EMAIL=suporte@chat.minhatech.com.br
RUN npm run build

# Produção - Next.js Standalone
FROM node:20-alpine
WORKDIR /app

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copiar arquivos necessários
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
