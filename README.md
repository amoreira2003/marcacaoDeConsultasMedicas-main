# Sistema de Agendamento de Consultas Médicas

[![React Native](https://img.shields.io/badge/React%20Native-0.72.0-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.0-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Um aplicativo mobile para **agendamento de consultas médicas**, desenvolvido com **React Native** e **TypeScript**.

---

## 📋 Sobre o Projeto

O sistema permite que **pacientes visualizem médicos disponíveis**, **agendem consultas** e **gerenciem compromissos médicos** de forma simples, moderna e intuitiva.  
Ele também oferece **painéis administrativos e de médicos**, com interface responsiva e integração real com API.

---

## ⚙️ Funcionalidades Principais

- 🔍 Visualização de médicos disponíveis
- 📅 Agendamento e cancelamento de consultas
- ✏️ Edição e atualização de compromissos
- 🩺 Seleção de médicos por especialidade
- 💾 Persistência de dados com API + AsyncStorage
- 🌙 Interface intuitiva com suporte a tema claro/escuro
- 🔐 Autenticação com login, registro e perfil do usuário

---

## 🧰 Tecnologias Utilizadas

| Categoria | Ferramentas |
|------------|-------------|
| **Framework** | [React Native](https://reactnative.dev/) |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) |
| **Estilização** | [Styled Components](https://styled-components.com/) |
| **Navegação** | [React Navigation](https://reactnavigation.org/) |
| **UI Components** | [React Native Elements](https://reactnativeelements.com/) |
| **Armazenamento Local** | [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) |
| **Integração com API** | Axios / AuthService |
| **Gestão de Estado e Hooks** | React Context API + Custom Hooks |

---

## 🧩 Estrutura do Projeto

```
src/
├── components/
│   ├── Header/
│   ├── AppointmentForm/
│   └── Shared/EmptyState/
├── screens/
│   ├── HomeScreen/
│   ├── PatientDashboardScreen/
│   ├── DoctorDashboardScreen/
│   ├── AdminDashboardScreen/
│   └── CreateAppointmentScreen/
├── services/
│   └── authService.ts       # Integração com API real
├── contexts/
│   └── AuthContext.tsx      # Controle global de autenticação
├── styles/
│   └── theme.ts
├── types/
│   ├── auth.ts
│   ├── appointments.ts
│   ├── doctors.ts
│   └── navigation.ts
└── utils/
    └── formatters.ts
```

---

## 🧠 Funcionalidades Detalhadas

### 👩‍⚕️ Agendamento de Consultas
- Seleção de médico por especialidade
- Escolha de data e horário disponíveis
- Adição de observações e motivo da consulta
- Validação de disponibilidade e conflito

### 📋 Gerenciamento de Consultas
- Visualização e histórico de consultas
- Atualização de status (pendente, confirmada, cancelada)
- Edição ou cancelamento de compromissos

### 👤 Interface do Usuário
- Layout responsivo e moderno
- Feedback visual de ações (loading, erro, sucesso)
- Modo escuro / claro
- Avatar dinâmico carregado da API

---

## 🔐 Integração com API Real

- Login e registro via `POST /auth/login` e `POST /auth/register`
- Persistência de sessão com token JWT
- Recuperação de dados do usuário logado via `/auth/me`
- Listagem de médicos e pacientes via `/users/doctors` e `/users/patients`

---

## 🚀 Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/marcacaoDeConsultasMedicas.git
   cd marcacaoDeConsultasMedicas
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Instale dependências do iOS (macOS apenas):
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. Execute o projeto:
   ```bash
   # Android
   npm run android
   # iOS (macOS)
   npm run ios
   ```

---

## 👨‍💻 Equipe de Desenvolvimento

| RM | Nome Completo |
|----|----------------|
| **98621** | Alexandre Moreira da Silva Junior |
| **98343** | Fernando Borelli |
| **99639** | Giovanna Ferro Menis |
| **97777** | João Marco Oliveira Pereira |
| **558735** | Luiz Fernando Della Colette Pombo Lema |

---

## 👨‍🏫 Orientação

- **Professor:** Hete Caetano
- **Instituição:** FIAP — Faculdade de Informática e Administração Paulista
- **Disciplina:** Desenvolvimento Mobile / Projeto Integrador

---

## 🧾 Licença

Este projeto está sob a licença **MIT**.  
Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

## 💬 Agradecimentos

- Comunidade [React Native](https://reactnative.dev/)
- [Styled Components](https://styled-components.com/)
- [React Navigation](https://reactnavigation.org/)
- Professor **Hete Caetano**
- E todos os contribuidores do projeto

---

💙 **Desenvolvido por alunos FIAP | Turma de TDS - 2025**  
_“Clean code, clean mind, better apps.”_
