# Casino CRM Pro

Sistema completo de gestão de jogadores para cassinos online.

## Tecnologias Utilizadas

- React 18+ com TypeScript
- Vite como empacotador
- Tailwind CSS para estilização
- shadcn/ui para componentes
- Lucide React para ícones
- Recharts para gráficos
- React Router Dom para navegação
- Sonner para notificações

## Funcionalidades

- Analytics com gráficos e métricas
- Segmentação de jogadores
- Gerenciamento de campanhas
- Central de alertas
- Testes A/B

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/casino-crm-pro.git
cd casino-crm-pro
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse o projeto em `http://localhost:5173`

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run lint` - Executa o linter
- `npm run preview` - Visualiza a versão de produção localmente

## Estrutura do Projeto

```
src/
  ├── components/
  │   ├── ui/
  │   ├── Analytics.tsx
  │   ├── PlayerSegmentation.tsx
  │   ├── CampaignManager.tsx
  │   ├── AlertCenter.tsx
  │   └── ABTesting.tsx
  ├── pages/
  │   └── Index.tsx
  ├── lib/
  │   └── utils.ts
  ├── App.tsx
  └── main.tsx
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 