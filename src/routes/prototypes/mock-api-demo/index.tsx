import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Group,
  Heading,
  Stack,
  Text,
  Toast,
} from "@recursica/adapter-mantine-v8";
import type { PrototypeMeta } from "..";
import { Prototype } from "../../Prototype";
import { usePrototypeModes } from "../../modes";
import { greetings } from "../../../data/greetings";
import {
  handlers,
  emptyHandlers,
  errorHandlers,
  malformedHandlers,
} from "../../../api/greetings";
import { worker } from "../../../api/worker";
import { modes } from "./modes";

export const meta: PrototypeMeta = {
  title: "Mock API Demo",
  description:
    "Shows the shared mock-data and mock-API registries, plus the modes convention for switching between them.",
};

// Maps each mode's id to the handler set it swaps into /api/greetings at
// runtime (worker.use / worker.resetHandlers) — see src/api/greetings/.
const HANDLERS_BY_MODE: Record<number, typeof handlers> = {
  1: handlers,
  2: emptyHandlers,
  3: errorHandlers,
  4: malformedHandlers,
};

type FetchState =
  | { status: "loading" }
  | { status: "ok"; body: unknown }
  | { status: "error"; message: string };

function MockApiDemoContent() {
  const { activeMode, openPanel } = usePrototypeModes();
  const [state, setState] = useState<FetchState>({ status: "loading" });

  useEffect(() => {
    if (!activeMode) return;
    setState({ status: "loading" });
    worker.use(...HANDLERS_BY_MODE[activeMode.id]);
    fetch("/api/greetings")
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body?.error ?? `HTTP ${res.status}`);
        return body;
      })
      .then((body) => setState({ status: "ok", body }))
      .catch((err: unknown) =>
        setState({
          status: "error",
          message: err instanceof Error ? err.message : String(err),
        }),
      )
      .finally(() => worker.resetHandlers());
  }, [activeMode]);

  if (!activeMode) return null;

  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Heading order={1}>Mock API Demo</Heading>

        <Text>Direct import from src/data/greetings (no network):</Text>
        <Stack gap={0}>
          {greetings.map((g) => (
            <Text key={g.id}>
              {g.locale}: {g.message}
            </Text>
          ))}
        </Stack>

        <Text>
          Fetched from /api/greetings via the MSW mock worker — the mode picked
          below decides what it returns (the choice lives in the URL, so it
          survives a reload/share):
        </Text>
        <Group gap="xs" align="center">
          <Button onClick={openPanel}>Mode: {activeMode.name}</Button>
        </Group>

        {state.status === "loading" && <Text>Loading…</Text>}
        {state.status === "error" && (
          <Toast variant="error" title="Request failed">
            {state.message}
          </Toast>
        )}
        {state.status === "ok" && (
          <Text component="pre">{JSON.stringify(state.body, null, 2)}</Text>
        )}
      </Stack>
    </Container>
  );
}

function MockApiDemo() {
  return (
    <Prototype modes={modes}>
      <MockApiDemoContent />
    </Prototype>
  );
}

export default MockApiDemo;
