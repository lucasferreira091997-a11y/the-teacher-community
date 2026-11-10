# The Teacher Community · versão 0.1

Primeira entrega funcional: cadastro, login, sessão segura por cookie HTTP-only, feed público, criação e exclusão de posts, curtidas, comentários e listagem de vídeos do canal pela API oficial do YouTube.

## Rodar no computador

1. Instale Node.js 20+ e crie um banco PostgreSQL (pode ser Neon ou Supabase).
2. Copie `.env.example` para `.env` e preencha `DATABASE_URL` e `SESSION_SECRET` (mínimo 32 caracteres aleatórios).
3. No terminal, na pasta do projeto, execute:

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

4. Abra http://localhost:3000

## Publicar online

1. Suba os arquivos para um repositório privado no GitHub (NUNCA inclua `.env`).
2. Crie banco PostgreSQL gerenciado no Neon/Supabase.
3. Conecte o repositório à Vercel.
4. Configure `DATABASE_URL`, `SESSION_SECRET`, `YOUTUBE_CHANNEL_ID` e `YOUTUBE_API_KEY` nas variáveis de ambiente da hospedagem.
5. Aplique o esquema do banco com `npx prisma db push` a partir de um ambiente com acesso ao banco (para produção, preferir migrations versionadas).
6. Faça o deploy e valide cadastro, login, publicação, curtida e comentário.

## YouTube

No Google Cloud Console, ative YouTube Data API v3 e gere uma chave com restrições apropriadas. Obtenha o **ID do canal**, que começa com `UC`, e coloque-o em `YOUTUBE_CHANNEL_ID`. O nome 'The Teacher' sozinho não identifica unicamente um canal.

## Estado e próximos módulos

Implementados: autenticação básica, feed, curtidas, comentários, exclusão autorizada, visualização de vídeos recentes, interface responsiva.

Ainda não implementados: recuperação/verificação de e-mail, rate limiting distribuído, uploads, seguidores, perfis editáveis, notícias completas, grupos, enquetes, chat, notificações, moderação e dashboard administrativo. **Não lançar publicamente para usuários reais sem reforçar proteção contra abuso, política de privacidade e fluxos de conta.**

Nenhuma conta de administrador é criada automaticamente. Para promover uma conta própria, após cadastro altere `role` de `MEMBER` para `ADMIN` usando uma ferramenta administrativa segura no banco. Nunca exponha esta alteração numa rota pública.
