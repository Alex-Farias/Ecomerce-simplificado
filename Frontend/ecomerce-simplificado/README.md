# Ecomerce Simplificado - Frontend

Este é o frontend para o projeto "Ecomerce Simplificado", desenvolvido com Next.js e integrado com o backend Node.js.

## 🚀 Tecnologias

- [Next.js 13+](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Axios](https://axios-http.com/)
- [SWR](https://swr.vercel.app/)
- [Next Themes](https://github.com/pacocoursey/next-themes)
- [Heroicons](https://heroicons.com/)
- [React Hot Toast](https://react-hot-toast.com/)

## 📋 Requisitos

- Node.js 16.8.0 ou superior
- NPM ou Yarn
- Backend do Ecomerce Simplificado rodando na porta 3000

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ecomerce-simplificado.git
cd ecomerce-simplificado
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📁 Estrutura do Projeto

O projeto segue a estrutura do App Router do Next.js 13+:

- `/app`: Contém todas as rotas e páginas da aplicação
- `/app/(admin)`: Grupo de rotas administrativas
- `/components`: Componentes reutilizáveis
- `/context`: Contextos do React (autenticação, carrinho, tema)
- `/hooks`: Custom hooks
- `/lib`: Utilitários e configurações
- `/public`: Arquivos estáticos

## 🔍 Funcionalidades

- 🏠 **Página Inicial**: Exibe produtos e categorias em destaque
- 👤 **Autenticação**: Login e registro de usuários
- 🛒 **Carrinho de Compras**: Adicionar, atualizar e remover produtos
- 💳 **Checkout**: Processo de compra simplificado
- 👨‍💼 **Área Administrativa**: Gerenciamento de produtos, categorias, pedidos e usuários
- 🌓 **Tema Claro/Escuro**: Alternância entre temas

## 📱 Responsividade

O site é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:
- Desktops
- Tablets
- Dispositivos móveis

## 🔌 Integração com o Backend

Este frontend conecta-se ao backend através do arquivo `lib/api.js` que utiliza Axios para fazer as requisições. As rotas da API estão configuradas para acessar o backend na URL `http://localhost:3000`.

## 🌐 Rotas Principais

- `/`: Página inicial com produtos em destaque
- `/login` e `/register`: Autenticação de usuários
- `/product/:id`: Detalhes do produto
- `/category/:id`: Produtos por categoria
- `/cart`: Carrinho de compras
- `/checkout`: Finalização de compra
- `/profile`: Perfil do usuário
- `/orders`: Pedidos do usuário
- `/(admin)/...`: Rotas administrativas

## 👨‍💻 Desenvolvimento

Para contribuir com o projeto, siga estas etapas:

1. Crie um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adicionando nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Se tiver dúvidas ou sugestões, entre em contato pelo email: exemplo@mail.com