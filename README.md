# Site da Casa Técnica

Site institucional da **Casa Técnica**, loja de peças, equipamentos e cursos de refrigeração e climatização em Toledo (PR).
Desenvolvido pela **CRESCERE Consultoria** (projeto acadêmico da Faculdade Donaduzzi) e entregue à empresa.

É um site simples: não tem loja virtual, preços, cadastro nem formulários. Todo botão abre o WhatsApp do balcão com uma mensagem pronta.

---

## 1. Trocar telefone, endereço, horário ou Instagram

Tudo fica em um arquivo só: **`src/config.ts`**.

```ts
export const EMPRESA = {
  whatsapp: '5545988069355',   // só números: 55 + DDD + número
  instagram: 'https://instagram.com/casatecnicapr',
  endereco: 'Av. Parigot de Souza, 2500, sala A, Vila Industrial, Toledo - PR, 85904-270',
  horario: 'Segunda a sexta, das 8h às 12h e das 13h às 18h',
  dominio: 'https://casatecnicapr.com.br',
  ...
};
export const cnpj = '';   // preencha para o CNPJ aparecer no rodapé
```

No mesmo arquivo ficam as **mensagens prontas** de cada botão do WhatsApp (`MENSAGENS`).
Se mudar o endereço, ajuste também `ENDERECO_ESTRUTURADO` (usado pelo Google).

**Como editar sem instalar nada:** abra o repositório no GitHub, entre em `src/config.ts`, clique no lápis (Edit), altere o texto e clique em **Commit changes**. A Cloudflare publica a nova versão sozinha em 1 ou 2 minutos.

---

## 2. Publicar na Cloudflare Pages (gratuito e permitido para uso comercial)

> Não use o plano Hobby da Vercel: ele é só para uso pessoal, não comercial.

1. Coloque esta pasta (`site/`) em um repositório no GitHub da empresa.
2. Entre em [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → aba **Pages** → **Connect to Git**.
3. Autorize o GitHub e escolha o repositório.
4. Configure:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - Em *Environment variables*, adicione `NODE_VERSION` = `22`.
5. Clique em **Save and Deploy**. Em poucos minutos o site fica no ar em um endereço `nome-do-projeto.pages.dev`.

A partir daí, toda alteração enviada ao GitHub é publicada automaticamente.

**Outras opções:** Netlify (plano gratuito, mesmo fluxo: build `npm run build`, pasta `dist`) ou Vercel **Pro** (pago).

---

## 3. Registrar o domínio e apontar para o site

1. Acesse [registro.br](https://registro.br), entre com a conta da empresa e procure `casatecnicapr.com.br` (ou outro nome).
2. Registre **no CNPJ da empresa** (não no CPF de uma pessoa). O valor é anual.
3. No painel da Cloudflare, abra o projeto do Pages → **Custom domains** → **Set up a custom domain** → digite `casatecnicapr.com.br`.
4. A Cloudflare vai mostrar o que configurar. O caminho mais simples:
   - adicionar o domínio como **site** na Cloudflare (plano Free) e copiar os **dois servidores DNS** que ela indicar;
   - no Registro.br, em **DNS → Alterar servidores DNS**, colar esses dois servidores e salvar.
5. Aguarde a propagação (de minutos até algumas horas). O certificado de segurança (https) é criado sozinho.
6. Repita o passo 3 para `www.casatecnicapr.com.br`, se quiser que o “www” também funcione.

---

## 4. Depois que o domínio estiver no ar

1. Em `src/config.ts`, troque `dominio` pelo endereço definitivo (ex.: `https://casatecnicapr.com.br`) e publique.
   Isso atualiza o mapa do site (`sitemap.xml`), o `robots.txt`, os dados para o Google e a imagem de compartilhamento.
2. Cadastre ou atualize o **Perfil da Empresa no Google** ([business.google.com](https://business.google.com)) com o link do site, o horário e fotos.
3. No **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)), adicione o domínio e envie `https://casatecnicapr.com.br/sitemap-index.xml`.
4. Coloque o link do site na **bio do Instagram** e na mensagem de ausência do WhatsApp Business.

---

## 5. Passar tudo para contas da própria empresa

O ideal é que o GitHub, a Cloudflare e o domínio fiquem em contas **da empresa** (com e-mail da empresa), não de pessoas.

**GitHub:** no repositório, vá em **Settings → General → Danger Zone → Transfer ownership** e informe o usuário ou a organização da empresa. A empresa aceita pelo e-mail.

**Cloudflare Pages:**
- Se o projeto foi criado numa conta pessoal, a forma mais simples é a empresa criar o próprio projeto do Pages (passo 2) a partir do repositório já transferido, e depois apagar o projeto antigo.
- Ou: na conta atual, em **Manage account → Members**, convidar o e-mail da empresa como **Super Administrator**, e depois remover o acesso pessoal.

**Domínio (Registro.br):** se foi registrado em outra conta, use **Transferir titularidade** no painel do Registro.br para o CNPJ da empresa.

---

## 6. Medir visitas (opcional, sem cookies)

O site não tem rastreadores. Para ver quantas pessoas acessam, use o **Cloudflare Web Analytics** (não usa cookies):
1. No painel da Cloudflare: **Analytics & Logs → Web Analytics → Add a site**.
2. Se o site estiver no Pages, basta ativar ali mesmo, sem mexer no código.
3. Se pedir um código, copie o token e tire o comentário do trecho indicado em `src/layouts/Base.astro`.

---

## Para quem for mexer no código

Precisa do [Node.js](https://nodejs.org) 22 (ou 20 no mínimo).

```bash
npm install
npm run dev        # abre em http://localhost:4321
npm run build      # gera a pasta dist/
npm run preview    # confere o build
npm run imagens    # gera de novo favicon, ícones e a imagem de compartilhamento
```

- Feito com **Astro** + **Tailwind CSS** + TypeScript. Site estático: sem servidor, banco de dados ou senhas.
- Fotos em `src/assets/fotos/` (o Astro converte para WebP/AVIF em vários tamanhos). Para melhorar a nitidez em celulares, troque por fotos maiores (pelo menos 1200 px de largura) com o mesmo nome.
- Logo em `src/assets/logo/casa-tecnica.png`. Ao trocar, rode `npm run imagens`.
- Fontes Barlow e Barlow Condensed instaladas no próprio site (`@fontsource`), sem depender do Google Fonts.
- Ícones: Lucide.
- O texto da página de privacidade fica em `src/pages/privacidade.astro`.
