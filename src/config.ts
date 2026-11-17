/**
 * Dados da Casa Técnica. Para trocar telefone, endereço, horário ou Instagram,
 * edite só este arquivo e publique de novo.
 */
export const EMPRESA = {
  nome: 'Casa Técnica',
  slogan: 'Tudo em refrigeração, com solução técnica',
  descricao: 'Equipamentos, capacitação e soluções em refrigeração e climatização',
  whatsapp: '5545988069355', // só números, com DDI e DDD
  instagram: 'https://instagram.com/casatecnicapr',
  endereco: 'Av. Parigot de Souza, 2500, sala A, Vila Industrial, Toledo - PR, 85904-270',
  horario: 'Segunda a sexta, das 8h às 12h e das 13h às 18h',
  desde: 2025,
  dominio: 'https://casatecnica.pages.dev', // endereço atual; trocar pelo domínio próprio quando a empresa registrar
};

/** CNPJ da empresa. Deixe vazio para não aparecer no rodapé. Ex.: '00.000.000/0001-00' */
export const cnpj = '32.897.133/0001-07';

/** Partes do endereço, usadas nos dados estruturados (Google). */
export const ENDERECO_ESTRUTURADO = {
  rua: 'Av. Parigot de Souza, 2500, sala A',
  bairro: 'Vila Industrial',
  cidade: 'Toledo',
  estado: 'PR',
  cep: '85904-270',
  pais: 'BR',
};

/** Mensagens prontas do WhatsApp, uma para cada botão. */
export const MENSAGENS = {
  tecnico: 'Olá! Sou técnico e quero falar com o balcão da Casa Técnica.',
  pedidoSeparado: 'Olá! Quero deixar um pedido separado para retirar. Segue minha lista:',
  consumidor: 'Olá! Quero um orçamento de ar-condicionado / produtos de limpeza.',
  btus: 'Olá! Quero ajuda para escolher o ar-condicionado certo. O ambiente tem __ m².',
  cursos: 'Olá! Quero saber sobre os cursos e a próxima turma.',
  geral: 'Olá! Vim pelo site da Casa Técnica.',
};

/** Link do WhatsApp com mensagem pronta. */
export function waLink(mensagem: string = MENSAGENS.geral): string {
  return `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Telefone formatado para exibir: (45) 98806-9355 */
export function telefoneFormatado(): string {
  const n = EMPRESA.whatsapp.replace(/^55/, '');
  return `(${n.slice(0, 2)}) ${n.slice(2, n.length - 4)}-${n.slice(-4)}`;
}

/** Link de rota no Google Maps e mapa incorporado (sem chave de API). */
export const mapaLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EMPRESA.endereco)}`;
export const mapaEmbed = `https://www.google.com/maps?q=${encodeURIComponent(EMPRESA.endereco)}&output=embed`;
