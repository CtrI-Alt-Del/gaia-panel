# 📄 PRD – Formulário de Usuário (`@user-form/`)

## 🎯 Objetivo

Permitir a criação/edição de um usuário por meio de um formulário simples, validado com **React Hook Form**, contendo os campos básicos de **Nome** e **Email**.

---

## 🖼️ Escopo

* Formulário com campos:

  * **Nome**
  * **Email**
* Integração com React Hook Form para gerenciamento de estado e validação.
* Feedback visual de erros.
* Botões de ação: salvar e cancelar.

---

## 🔑 Funcionalidades

### 1. **Campos do Formulário**

* **Nome**

  * Tipo: `text`
  * Placeholder: *"Digite o nome completo"*
  * Regras:

    * Obrigatório (`required`)
    * Mínimo: 3 caracteres
    * Máximo: 100 caracteres

* **Email**

  * Tipo: `email`
  * Placeholder: *"Digite o email do usuário"*
  * Regras:

    * Obrigatório (`required`)
    * Formato válido de e-mail (`pattern`)

---

### 2. **Validação**

* Utilizar o **resolver do React Hook Form** com Zod.
* Exibir mensagens de erro abaixo do campo.
* Campos inválidos devem ter borda vermelha e texto de erro em vermelho.

---

### 3. **Botões de Ação**

* **Salvar**

  * Tipo: `submit`.
  * Desabilitado enquanto o formulário não for válido.
* **Cancelar**

  * Tipo: `button`.
  * Ação: limpar formulário ou redirecionar para lista de usuários.

---

### 4. **Feedbacks**

* Loading no botão "Salvar" enquanto estiver submetendo.
* Reset automático do formulário após envio bem-sucedido (se for criação).
* Mensagem de sucesso/erro (exibida acima do formulário ou em toast).

---

### 5. **Requisitos de UI/UX**

* Labels claras acima dos inputs.
* Espaçamento consistente entre campos e botões.
* Suporte a navegação por teclado (tab).

---

## 🚫 Fora de Escopo

* Persistência de dados (chamada à API).
* Layout responsivo.
* Lógica de autenticação ou permissões.
* Upload de foto ou campos adicionais.

---

