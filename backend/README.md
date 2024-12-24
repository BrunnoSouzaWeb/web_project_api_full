# Tripleten web_project_around_express

Projeto básico de API desenvolvido para realizar vária operações (GET, POST, DELETE, PUT e PATCH) sobre dados de cartões e usuários. Utiliza como **Front-end:** o ES Modules (ESM) em Node.js, como **Back-end:** o Express.js, o aplicativo escutará na porta especificada (padrão, 3000). Utiliza o banco de dados MongoDB.

Utiliza o EditorConfig (solução para problemas de formatação e edição do código) e o ESLint (guias de estilo para manter a consistência e encontrar erros do código). Também implementado o Hot reload, uma tecnologia que permite fazer alterações em uma aplicação sem a necessidade de reiniciá-la.

## Rotas

Rotas do usuário

- **Obter todos os usuários:**
- **Obter um usuário específico:**
- **Criar um novo usuário:**
- **Atualizar o perfil do usuário:**
- **Atualizar o avatar do perfil do usuário:**

Rotas de cartão

- **Obter todos os cartões:**
- **Criar um novo cartão:**
- **Deletar um cartão específico:**
- **Curtir um cartão específico:**
- **Descurtir um cartão específico:**

### Caminho "Não encontrado"

- **Tratamento de erros de rotas inexistentes:**
- **Descrição:** Caso a rota solicitada não seja encontrada, retorna um erro 500 com uma mensagem personalizada.
- **ERROS:** Retorna o erro adequado de acordo com a resposta da solicitação: 400 — dados inválidos passados aos
- \*\*métodos para criar um cartão/usuário ou atualizar um perfil/avatar do usuário;
- \*\*404 — cartão ou usuário não encontrado
