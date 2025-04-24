"use client";
import React, { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";

interface CFormProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: SubmitHandler<T>; // can be async
  defaultValues?: Partial<T>;
}

const CForm = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues = {},
}: CFormProps<T>) => {
  console.log(defaultValues.defaultValues);

  const methods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleFormSubmit = async (data: T) => {
    await onSubmit(data);
    // methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        className="grid gap-1"
        onSubmit={methods.handleSubmit(handleFormSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default CForm;
