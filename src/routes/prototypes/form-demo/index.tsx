import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  Button,
  Checkbox,
  Container,
  Heading,
  Stack,
  TextField,
  Toast,
} from "@recursica/adapter-mantine-v8";
import type { PrototypeMeta } from "..";

export const meta: PrototypeMeta = {
  title: "Form Demo",
  description:
    "React Hook Form wired to design-system inputs via Controller — see Forms in ARCHITECTURE.md.",
};

interface SignupForm {
  name: string;
  email: string;
  subscribe: boolean;
}

function FormDemo() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<SignupForm>({
    defaultValues: { name: "", email: "", subscribe: false },
  });

  const onSubmit: SubmitHandler<SignupForm> = (values) => {
    // A real prototype would fetch("/api/...") here (see src/api/) instead.
    console.log("form-demo submit", values);
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="md">
        <Heading order={1}>Form Demo</Heading>

        {isSubmitSuccessful && (
          <Toast variant="success" title="Submitted">
            Thanks — check the console for the submitted values.
          </Toast>
        )}

        {/*
          Each field goes through RHF's Controller instead of `register()`.
          Controller only needs a component that takes value/onChange (plus
          label/error for validation messages) — the same controlled-input
          contract every Recursica adapter exposes — so this form doesn't
          depend on *which* adapter (Mantine today, maybe MUI later) is
          installed. See "Forms" in ARCHITECTURE.md.
        */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="md">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Name"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Email"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="subscribe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="Email me about new prototypes"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}

export default FormDemo;
