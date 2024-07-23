# Documentação dos Endpoints da Aplicação

## 1. Página de Login
- **Rota:** `/login`
- **Descrição:** Rota para acessar a página de login.
- **Resposta:**  Renderiza a view `pages/entrance/login`.
- **Método:** `GET`

## 2. Fazer Login
- **Rota:** `/login`
- **Descrição:** Autentica o usuário.
- **Parâmetros:**
  - `email` (string): E-mail do usuário.
  - `password` (string): Senha do usuário.
- **Resposta:** Redireciona para a página de boas-vindas em caso de sucesso.
- **Controlador:** UserController
- **Função:** `login`
- **Método:** `POST`
- **Acionada em:** Acionado ao clicar em no botão de login.

## 3. Página de Sinup
- **Rota:** `/sinup`
- **Descrição:** Rota para acessar a página de sinup.
- **Resposta:**  Renderiza a view `pages/entrance/signup`.
- **Método:** `GET`

## 4. Criar um Usuário
- **Rota:** `/signup`
- **Descrição:** Cria um novo usuário.
- **Parâmetros:**
  - `name` (string): Nome do usuário.
  - `email` (string): E-mail do usuário.
  - `password` (string): Senha do usuário.
  - `confirmPassword` (string): Confirmação da senha.
  - `type` (string): Tipo do usuário (Member ou Tutor).
- **Resposta:** Redireciona para a página de autoavaliação de colaboração em caso de sucesso.
- **Controlador:** UserController
- **Função:** `sinup`
- **Método:** `POST`
- **Acionada em:** Acionado na página de Sinup.

## 5. Página de auto-avaliação collaboration
- **Rota:** `assessment/self-assessment-collaboration`
- **Descrição:** Acessa a página de auto-avaliação collaboration após criar uma conta na plataforma
- **Resposta:** Renderiza a view `pages/assessment/self-assessment-collaboration`.
- **Método:** `GET`

## 6. Criar Avaliação de Colaboração
- **Rota:** `/self-assessment-collaboration`
- **Descrição:** Cria uma nova avaliação de colaboração.
- **Parâmetros:**
  - `question1`, `question2`, `question3`, `question4`, `question5`, `question6` (strings): Respostas às perguntas.
- **Resposta:** Redireciona para a página de autoavaliação de tomada de decisão.
- **Controlador:** PreGameCollaborationController
- **Método:** `POST`
- **Acionada em:** Acionado na pagina de Self Assessment Collaboration ao clicar o botão de enviar o formulário.

## 7. Página de auto-avaliação decision making
- **Rota:** `assessment/self-assessment-decision-making`
- **Descrição:** Acessa a página de auto-avaliação decision making após responder o formulário de auto-avaliação collaboration.
- **Resposta:** Renderiza a view `pages/assessment/self-assessment-decision-making`.
- **Método:** `GET`

## 8. Criar Avaliação de Tomada de Decisão
- **Rota:** `/self-assessment-decision-making`
- **Descrição:** Cria uma nova avaliação de tomada de decisão.
- **Parâmetros:**
  - `question1`, `question2`, `question3`, `question4`, `question5`, `question6` (strings): Respostas às perguntas.
- **Resposta:** Redireciona para a página de perfil profissional.
- **Controlador:** PreGameDmController
- **Método:** `POST`
- **Acionada em:** Acionado na pagina de Self Assessment Deciosion Making ao clicar o botão de enviar o formulário.

## 9. Criar um Jogo
- **Rota:** `/admin/createGame`
- **Descrição:** Página para de criação de jogos
- **Resposta:**  Renderiza a view `pages/admin/createGame`.
- **Método:** `GET`

## 10. Criar um Jogo
- **Rota:** `/admin/createGame`
- **Descrição:** Cria um novo jogo.
- **Controlador:** AdminController
- **Função:** createGame
- **Parâmetros:**
  - `name` (string): Nome do jogo.
  - `startDate` (string): Data de início do jogo.
  - `endDate` (string): Data de término do jogo.
- **Resposta:** Redireciona para a página de criação de universos de acordo com o ID do jogo recém-criado.
- **Método:** `POST`
- **Acionada em:** Acionado na página de criação de jogo

## 11. Página de Criação de Universos
- **Rota:** `/admin/createUniverses`
- **Descrição:** Exibe a página para criar universos.
- **Parâmetros:**
  - `gameId` (string): ID do jogo.
- **Resposta:** Renderiza a view `pages/admin/createUniverses`.
- **Controlador:** AdminController
- **Método:** `GET`

## 12. Criar um Universo
- **Rota:** `/admin/createUniverse`
- **Descrição:** Cria um novo universo.
- **Parâmetros:**
  - `number` (integer): Número do universo.
  - `gameId` (string): ID do jogo.
- **Resposta:** Redireciona para a página de criação de times com o ID do universo e do jogo.
- **Controlador:** AdminController
- **Método:** `POST`
- **Acionada em:** Acionado na página de criação de universo.

## 13. Página de Criação de Times
- **Rota:** `/admin/createTeams`
- **Descrição:** Exibe a página para criar times.
- **Parâmetros:**
  - `gameId` (string): ID do jogo.
  - `universeId` (string): ID do universo.
- **Resposta:** Renderiza a view `pages/admin/createTeams`.
- **Método:** `GET`

## 14. Criar um Time
- **Rota:** `/admin/createTeam`
- **Descrição:** Cria um novo time.
- **Controlador:** AdminController
- **função:** `createTeam`
- **Parâmetros:**
  - `color` (string): Cor do time.
  - `universeId` (string): ID do universo.
  - `members` (array): Lista de membros do time.
- **Resposta:** Redireciona para a página de criação de times com um alerta dos status da criaçãõ anterior de um time.
- **Método:** `POST`
- **Acionada em:** Acionado ao clicar no botão 'Create Team' na página de criação de times.

## 15. Listar Universos
- **Rota:** `/listUniverse`
- **Descrição:** Lista todos os universos.
- **Resposta:** Retorna uma lista de universos em formato JSON.
- **Controlador:** AdminController
- **Função:** listUniverse
- **Método:** `GET`
- **Acionada em:** Acionado quando a página de criação de times é carregada.

## 16. Listar Usuários
- **Rota:** `/listUser`
- **Descrição:** Lista todos os usuários.
- **Resposta:** Retorna uma lista de usuários em formato JSON.
- **Controlador:** AdminController
- **Função:** `listUser`
- **Método:** `GET`
- **Acionada em:**  Acionada quando a página de criação de times é carregada.

## 17. Atualizar Time
- **Rota:** `/updateTeam`
- **Descrição:** Atualiza os membros de um time existente.
- **Controlador:** AdminController
- **função:** `updateTeam`
- **Parâmetros:**
  - `teamId` (string): ID do time a ser atualizado.
  - Outros parâmetros opcionais para atualização, como `color` (cor), `members` (membros), etc.
- **Resposta:** Redireciona para a página de criação de times alertando a atualização feita.
- **Método:** `POST`
- **Acionada em:** Acionada ao clicar no botão 'Update Members' na página de criação de times.

## 18. Atualizar Rodada
- **Rota:** `/admin/manageUniverse`
- **Descrição:** Redireciona para a página de alterações de informações de um universo.
- **Resposta:** Renderiza a view `pages/admin/manageUniverse`
- **Método:** `GET`
- **Acionada em:** (Preciso atualizar a página de criação de universos para adicionar um atalho da página `/admin/manageUniverse`)

## 19. Atualizar Rodada
- **Rota:** `/updateRound`
- **Descrição:** Atualiza uma rodada existente.
- **Controlador:** AdminController
- **Função:** updateRound
- **Parâmetros:**
  - `UniverseId`: ID do universo em que a  rodada a ser atualizada.
  - `round`: Valor que irá atualizar o round de um universo
  - Outros parâmetros opcionais para atualização, como `startDate` (data de início), `endDate` (data de término), etc.
- **Resposta:** Retorna um JSON com todoas as informações do universo.
- **Método:** `POST`
- **Acionada em:** Acionada ao clicar no botão Change Round

## 20. Alterar Status do Usuário
- **Rota:** `/user/:id/status`
- **Descrição:** Atualiza o status de um usuário específico.
- **Controlador:** StatusController
- **Função:** changeStatus
- **Parâmetros:**
  - `id` (string): ID do usuário.
  - `status` (string): Novo status do usuário.
- **Resposta:** Redireciona para a página de perfil do usuário.
- **Método:** `PUT`
- **Acionada em:** Acionada ao clicar no botão 'Change Status' na do time

## 21. Obter Status do Usuário
- **Rota:** `GET /user/:id/status`
- **Descrição:** Obtém o status de um usuário específico.
- **Parâmetros:**
  - `id` (string): ID do usuário.
- **Resposta:** Retorna o status do usuário em formato JSON.
- **Controlador:** StatusController
- **Método:** `getStatus`
- **Acionada em:** `-`

## 22. Página Principal
- **Rota:** `/`
- **Descrição:** Página principal do site.
- **Resposta:** Renderiza a view `pages/main`.
- **Método:** `GET`

## 23. Página de Recuperação de Senha (Passo 1)
- **Rota:** `/forgotPassword1`
- **Descrição:** Página para recuperação de senha (passo 1).
- **Resposta:** Renderiza a view `pages/entrance/forgotPassword_email`.
- **Método:** `GET`
- **Acionada em:** Acionada ao clicar em 'forgot password' na página de login

## 24. Página de Recuperação de Senha (Passo 2)
- **Rota:** `/forgotPassword2`
- **Descrição:** Página para recuperação de senha (passo 2).
- **Resposta:** Renderiza a view `pages/entrance/forgotPassword_safetyCode`.
- **Método:** GET

## 25. Página de Boas-Vindas
- **Rota:** `/welcome`
- **Descrição:** Página de boas-vindas após o login.
- **Resposta:** Renderiza a view `pages/welcome`.
- **Método:** `GET`

## 26. Página de Perfil do Time
- **Rota:** `/team-page`
- **Descrição:** Página de perfil do time.
- **Resposta:** Renderiza a view `pages/team-page`.
- **Método:** `GET`
- **Acionada em:** Acionada ao clicar em 'Team' na side bar

## 28. Página de Avaliação em Grupo de Colaboração
- **Rota:** `/assessment/group-assessment-collaboration`
- **Descrição:** Página de avaliação em grupo de colaboração.
- **Resposta:** Renderiza a view `pages/assessment/group-assessment-collaboration`.
- **Método:** `GET`
- **Acionada em:** Acionada ao clicar em 'Group Collaboration' na side bar

## 29. Página de Avaliação em Grupo de Tomada de Decisão
- **Rota:** `/assessment/group-assessment-decision-making`
- **Descrição:** Página de avaliação em grupo de tomada de decisão.
- **Resposta:** Renderiza a view `pages/assessment/group-assessment-decision-making`.
- **Método:** `GET`
- **Acionada em:** Acionada ao clicar em 'Group Decision Making' na side bar

## 30. Página de Feedback
- **Rota:** `/assessment/feedback`
- **Descrição:** Página de feedback.
- **Resposta:** Renderiza a view `pages/assessment/feedback`.
- **Método:** GET

## 31. Página de Feedback de Colaboração
- **Rota:** `/assessment/feedback-collaboration`
- **Descrição:** Página de feedback de colaboração.
- **Resposta:** Renderiza a view `pages/assessment/feedback-collaboration`.
- **Método:** GET
- **Acionada em:** Acionada ao clicar em 'Feedback Collaboration' na side bar

## 32. Página de Feedback de Tomada de Decisão
- **Rota:** `/assessment/feedback-decision-making`
- **Descrição:** Página de feedback de tomada de decisão.
- **Resposta:** Renderiza a view `pages/assessment/feedback-decision-making`.
- **Método:** GET
- **Acionada em:** Acionada ao clicar em 'Group Decision Making' na side bar

## 33. Rodada de Feedback de Colaboração
- **Rota:** `/assessment/feedback-collaboration/round`
- **Descrição:** Rodada de feedback de colaboração.
- **Resposta:** Cria um gráfico de acordo com o round que o usuário escolheu ver os feedbacks
- **Controlador:** FeedbackCollaborationController
- **Função:** `round`
- **Parâmetros:**
  - `id` (string): ID do usuário.
- **Método:** `GET`
- **Acionada em:** Acionada ao clicar um dos botões de seleção do round na página de feedback collaboration

## 34. Visualização de Feedbacks
- **Rota:** `/assessment/feedback-collaboration/showFeedbacks`
- **Descrição:** Visualização de feedbacks de colaboração.
- **Resposta:** Mostra um gráfico com os feedbacks da rodada passada
- **Controlador:** `showFeedbacks`
- **Parâmetros:**
  - `id` (string): ID do usuário.
- **Método:** `GET`
- **Acionada em:** Acionado qunado a página de feedback collaboration é carregada.

## 35. Perfil Profissional
- **Rota:** `/professional-profile`
- **Descrição:** Página de perfil profissional.
- **Resposta:** Renderiza a view `pages/professional-profile`.
- **Método:** GET
- **Acionada em:** Acionada ao clicar em 'Individual' na side bar

## 36. Perfil de Outro Usuário
- **Rota:** `/other-profile`
- **Descrição:** Página de perfil de outro usuário.
- **Resposta:** Renderiza a view `pages/other-profile`
- **Método:** GET
- **Acionada em:** Acionado ao clicar no botão de profile (que tem em cada elemento que representa um membro do time) na página de time.

## 37. Visualizar Perfil de Usuário
- **Rota:** `/other-profile/:id`
- **Descrição:** Visualiza o perfil de um usuário específico.
- **Resposta:** Redirecionamento para other-profile de acordo com o Id do usuário que quer ser vizualizado pelo usuário da sessão
- **Controlador:** OtherProfileController
- **Função:** profile 
- **Parâmetros:**
  - `userId` (string): ID do usuário em que quer ser visualizado pelo usuário da sessão.
- **Método:** `GET`
- **Acionada em:** Acionada ao carregar por completo a página de other-profile

## 38. Obter Informações de Usuário
- **Rota:** `/user/:id`
- **Descrição:** Obtém informações de um usuário específico.
- **Resposta:** Retorna as informações do usuário em formato JSON.
- **Controlador:** OtherProfileController
- **Função:** getUser 
- **Parâmetros:**
  - `userId` (string): ID do usuário em que quer ser visualizado pelo usuário da sessão.
- **Método:** `GET`
- **Acionada em:** Acionada quando a função profile dentro de OtherProfileController terminar de ser executada.

### 39. Atualizar Felicidade do Usuário
- **Rota:** `/user/update-happiness`
- **Descrição:** Atualiza a felicidade do usuário.
- **Controlador:** UserController
- **Função:** `updateHappiness`
- **Parâmetros:**
  - `userId` (string): ID do usuário.
  - `happiness` (integer): Novo nível de felicidade.
- **Método:** `POST`
- **Acionada em:** (Informação não especificada)

### 40. Página de Perfil Pessoal
- **Rota:** `/view-personal-profile`
- **Descrição:** Página de perfil pessoal do usuário.
- **Resposta:** Renderiza a view `pages/view-personal-profile`.
- **Método:** `GET`

### 41. Formulário de Perfil Pessoal
- **Rota:** `/my-profile`
- **Descrição:** Exibe o formulário de perfil do usuário.
- **Controlador:** MyProfileController
- **Função:** `showProfileForm`
- **Método:** `GET`
- **Acionada em:** (Informação não especificada)

### 42. Exibir Perfil Pessoal do Usuário
- **Rota:** `/view-personal-profile`
- **Descrição:** Exibe o perfil pessoal do usuário.
- **Controlador:** MyProfileController
- **Função:** `showUserProfile`
- **Método:** `GET`
- **Acionada em:** (Informação não especificada)

### 43. Atualizar Dados do Perfil
- **Rota:** `/profileData`
- **Descrição:** Atualiza os dados do perfil do usuário.
- **Controlador:** MyProfileController
- **Função:** `updateProfile`
- **Parâmetros:**
  - `name` (string): Nome do usuário.
  - `email` (string): E-mail do usuário.
  - `password` (string): Senha do usuário.
- **Método:** `POST`
- **Acionada em:** (Informação não especificada)

### 44. Feedback Pré-Jogo de Colaboração
- **Rota:** `/feedbackPreGameCollaboration`
- **Descrição:** Processa o feedback de colaboração pré-jogo.
- **Controlador:** ProfessionalProfileController
- **Função:** `feedbackPreGameCollaboration`
- **Método:** (Método não especificado)
- **Acionada em:** (Informação não especificada)

### 45. Exibir Feedback de Colaboração
- **Rota:** `/professional-profile`
- **Descrição:** Exibe o feedback de colaboração do perfil profissional.
- **Controlador:** ProfessionalProfileController
- **Função:** `showFeedback`
- **Método:** `GET`
- **Acionada em:** (Informação não especificada)

### 46. Página de Meu Gráfico
- **Rota:** `/mychart`
- **Descrição:** Exibe a página de gráfico do usuário.
- **Resposta:** Renderiza a view `pages/mychart`.
- **Método:** `GET`
- **Acionada em:** (Informação não especificada)


