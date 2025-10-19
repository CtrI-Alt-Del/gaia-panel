import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { UserDto } from "@/core/membership/dtos/user-dto";
import { RestResponse } from "@/core/global/responses";
import type { ToastProvider, UiProvider } from "@/core/global/interfaces";
import type { MembershipService } from "@/core/membership/interfaces";

import { userSchema } from "@/validation/membership";

type Props = {
  userDto?: UserDto;
  membershipService: MembershipService;
  uiProvider: UiProvider;
  toastProvider: ToastProvider;
  onSuccess?: () => void;
  onCancel: () => void;
};

export function useUserForm({
  onSuccess,
  onCancel,
  userDto,
  membershipService,
  uiProvider,
  toastProvider,
}: Props) {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: userDto?.name || "",
      email: userDto?.email || "",
    },
    mode: "onSubmit",
  });

  const { formState } = form;
  const isValid = formState.isValid;

  function handleCancel() {
    onCancel();
  }

  async function handleSubmit(data: UserDto) {
    const isEdition = Boolean(userDto?.id);

    let response = new RestResponse();
    if (isEdition) {
      data.id = userDto?.id;
      response = await membershipService.updateUser(data);
    } else {
      response = await membershipService.createUser(data);
    }

    if (response.isFailure) {
      toastProvider.showError(response.errorMessage);
    }

    if (response.isSuccessful) {
      toastProvider.showSuccess(
        isEdition
          ? "Usuário atualizado com sucesso!"
          : "Usuário criado com sucesso!"
      );
      await uiProvider.reload();
      onSuccess?.();
    }
  }

  return {
    form,
    isValid,
    handleCancel,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}
