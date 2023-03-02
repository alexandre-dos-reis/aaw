import { useCallback } from "react";
import { useCreate, useNotify, useRedirect, useUpdate } from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface UseSaveProps {
  type: "create" | "edit";
  model: string;
}

export const useSave = (p: UseSaveProps) => {
  const redirect = useRedirect();
  const notify = useNotify();

  const [create] = useCreate();
  const [update] = useUpdate();

  const save = useCallback<SubmitHandler<FieldValues>>(
    async (values) => {
      try {
        if (p.type === "create") {
          await create(p.model, { data: values }, { returnPromise: true });

          notify("ra.notification.created", {
            type: "info",
            messageArgs: { smart_count: 1 },
          });
        } else {
          await update(
            p.model,
            { data: values, id: values.id },
            { returnPromise: true }
          );

          notify("ra.notification.updated", {
            type: "info",
            messageArgs: { smart_count: 1 },
          });
        }

        redirect("list");
      } catch (error) {
        const serverError = error as { errors: Record<string, string[]> };

        const errorsValues = Object.values(serverError.errors).map((e) =>
          e.join(", ")
        );
        const errorsKeys = Object.keys(serverError.errors);

        const objError: Record<string, string> = {};

        errorsKeys.map((key, i) => {
          objError[key] = errorsValues[i];
        });

        return objError;
      }
    },
    [update, create, notify, redirect]
  );

  return { save };
};
