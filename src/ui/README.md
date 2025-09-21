---
globs: src/ui/**
alwaysApply: false
---

# 🖥️ Camada de Interface de Usuário (ui)

A camada ui é a responsável por fornecer a interface gráfica e a lógica de
interação com o usuário, seja em uma página web ou em uma tela mobile. Ela é
diferente das demais porque não possui handlers nem protocols, mas sim widgets —
blocos reutilizáveis que combinam visual com lógica de interface.

## Widgets

Um widget é como um pequeno bloco de construção independente e reutilizável que
forma a interface de usuário de uma aplicação React. Em projetos React, pense
nele como uma função JavaScript que retorna elementos React, descrevendo o que
deve aparecer na tela.

No projeto, componentes React sempre deverão ser criados como
[functional components](https://www.robinwieruch.de/react-function-component),
sendo declaradas por meio de uma arrow function.

```tsx
export const Checkbox = () => {
  return (
    // ..
  )
}
```

Caso o widget receba propriedades, um type deve ser declarado em cima da arrow
function e sempre nomeado como `Props`.

```tsx
type Props = {
  isChecked: boolean
  onChange: (isChecked: boolean) => void
}

export const Checkbox = ({ isChecked, onChange }: Props) => { // Procure desestruturar o objeto props
  return (
    // ..
  )
}
```

Um widget é geralmente composto por três arquivos: view, hook e index

### View

View: É a interface do usuário. É a parte que renderiza o HTML (ou JSX, que é
transformado em HTML utilizando React) e reage às interações do usuário. A View
deve ser o mais "burra" possível, ou seja, ela apenas exibe dados e dispara
eventos.

```tsx
const CheckboxView = ({ isChecked, onChange }: Props) => { // O nome da view sempre vai terminar com sufixo View
  return (
    <Input
      isChecked={isChecked}
      onChange={onChange}
    >
      <AnimatedIndicator>
        <Icon name="check" size={14} className="text-green-900" weight="bold" />
      </AnimatedIndicator>
    </Input>
  );
};
```

### Hook

É uma função que expõe dados de uma forma que a View possa consumir facilmente,
e também expõe comandos (funções) que a View pode chamar para atualizar o Model.
O hook abstrai a lógica da View e a prepara para ser exibida. No React, o hook
sempre começa com prefixo `use`.

```tsx
function useCheckbox() {
  const [isChecked, setIsChecked] = useState(false); // Um hook pode chamar e usar outros hooks (seja do próprio React ou customizados)

  function handleChange() {
    setIsChecked((isChecked) => !isChecked);
  }

  return { // O hook exões seus dados retornado um objeto
    isDisable,
    handleChange,
  };
}
```

Sendo uma função, naturalmente, o hook pode receber parâmentros para usá-los
internamente ou aplicar inversão de independência no caso de receber interfaces.

```tsx
function useCheckbox(profileService: ProfileService) {
  const [isChecked, setIsChecked] = useState(false);

  const updateUser = useCallback(async (dto: UserDto) => {
    await profileService.updateUser(dto);
  }, []);

  async function handleChange() {
    setIsChecked((isChecked) => !isChecked);
  }

  return {
    isDisable,
    handleChange,
  };
}
```

No exemplo de código acima, é possível perceber outro padrão utilizado: um hook
pode expor dois tipos de função.

#### Funções manipuladoras de evento de interface

Funções executadas em resposta a uma interação do usuário ou a um evento
específico que ocorre na interface. São sempre declaradas com a palavra
`function` e seu nome é prefixado com `handle`, como `handleClick`,
`handleSubmit`, `handleChange`, `handleKeyDown`, `handleKeyUp` etc.

> [!NOTE]\
> Caso uma proprieade de um componente react seja uma função manipuladora de
> evento de interface, a propriedade em questão terá `on` como prefixo.