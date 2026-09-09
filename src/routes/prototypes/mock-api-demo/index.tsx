import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
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
import { greetings } from "../../../data/greetings";
import {
  handlers,
  errorHandlers,
  malformedHandlers,
} from "../../../api/greetings";
import { worker } from "../../../api/worker";

export const meta: PrototypeMeta = {
  title: "Mock API Demo",
  description:
    "Shows the shared mock-data and mock-API registries, including error and bad-data scenarios.",
};

// Each scenario swaps in a different set of handlers for /api/greetings at
// runtime (worker.use / worker.resetHandlers) — see src/api/greetings/.
const SCENARIOS = {
  default: handlers,
  error: errorHandlers,
  malformed: malformedHandlers,
} as const;
type Scenario = keyof typeof SCENARIOS;

type FetchState =
  | { status: "loading" }
  | { status: "ok"; body: unknown }
  | { status: "error"; message: string };

function MockApiDemo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("scenario");
  const scenario: Scenario =
    requested && requested in SCENARIOS ? (requested as Scenario) : "default";
  const [state, setState] = useState<FetchState>({ status: "loading" });

  useEffect(() => {
    setState({ status: "loading" });
    worker.use(...SCENARIOS[scenario]);
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
  }, [scenario]);

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
          Fetched from /api/greetings via the MSW mock worker — pick a scenario
          to see how this page handles it (the choice lives in the URL, so it
          survives a reload/share):
        </Text>
        <Group gap="xs">
          {(Object.keys(SCENARIOS) as Scenario[]).map((s) => (
            <Button
              key={s}
              variant={s === scenario ? "solid" : "outline"}
              onClick={() => setSearchParams({ scenario: s })}
            >
              {s}
            </Button>
          ))}
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

export default MockApiDemo;
