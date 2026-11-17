// Gera favicon, ícones e a imagem de compartilhamento (Open Graph 1200×630).
// Rode com: npm run imagens  (só é preciso se trocar o logo ou a foto da fachada)
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const logo = join(raiz, 'src/assets/logo/casa-tecnica.png');
const fachada = join(raiz, 'src/assets/fotos/fachada.jpg');
const pub = (f) => join(raiz, 'public', f);

for (const [nome, tam] of [['favicon-32.png', 32], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(logo).resize(tam, tam).png().toFile(pub(nome));
}
// ícone da tela inicial do iPhone: fundo sólido azul-marinho
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#0B1F3F' } })
  .composite([{ input: await sharp(logo).resize(150, 150).toBuffer(), gravity: 'center' }])
  .png()
  .toFile(pub('apple-touch-icon.png'));

// Open Graph: painel azul-marinho com logo e texto + foto da fachada à direita
const W = 1200, H = 630, FOTO = 470;
const foto = await sharp(fachada).resize(FOTO, H, { fit: 'cover', position: 'centre' }).toBuffer();
const logoOg = await sharp(logo).resize(120, 120).toBuffer();
const texto = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .t { font-family: 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif; font-weight: 700; fill: #fff; }
    .s { font-family: Barlow, Arial, sans-serif; fill: #C9D6E8; }
  </style>
  <text x="72" y="268" class="t" font-size="74">Casa Técnica</text>
  <text x="72" y="350" class="t" font-size="50">Tudo em refrigeração,</text>
  <text x="72" y="406" class="t" font-size="50">com solução técnica.</text>
  <text x="72" y="466" class="s" font-size="28">Peças, equipamentos e cursos de refrigeração</text>
  <text x="72" y="502" class="s" font-size="28">e climatização em Toledo (PR)</text>
  <rect x="72" y="548" width="70" height="10" rx="5" fill="#F28C1B"/>
  <rect x="152" y="548" width="70" height="10" rx="5" fill="#F7C325"/>
  <rect x="232" y="548" width="70" height="10" rx="5" fill="#1F6FC4"/>
</svg>`;
await sharp({ create: { width: W, height: H, channels: 3, background: '#0B1F3F' } })
  .composite([
    { input: foto, left: W - FOTO, top: 0 },
    { input: Buffer.from(texto), left: 0, top: 0 },
    { input: logoOg, left: 72, top: 60 },
  ])
  .jpeg({ quality: 84 })
  .toFile(pub('og-casa-tecnica.jpg'));

writeFileSync(
  pub('site.webmanifest'),
  JSON.stringify({
    name: 'Casa Técnica',
    short_name: 'Casa Técnica',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#0B1F3F',
    background_color: '#F4F6F9',
    display: 'browser',
  }, null, 2),
);
console.log('ícones e imagem de compartilhamento gerados em public/');
