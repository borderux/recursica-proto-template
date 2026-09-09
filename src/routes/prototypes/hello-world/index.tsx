import { Container, Heading, Stack, Text } from "@recursica/adapter-mantine-v8";
import type { PrototypeMeta } from "..";

export const meta: PrototypeMeta = {
  title: "Hello World",
  description: "A minimal starting point for a new prototype.",
};

function HelloWorld() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Heading order={1}>Hello, world!</Heading>
        <Text>
          This is the hello-world prototype, at /prototypes/hello-world.
        </Text>
      </Stack>
    </Container>
  );
}

export default HelloWorld;
