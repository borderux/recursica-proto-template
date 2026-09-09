import { Link as RouterLink } from "react-router";
import {
  Card,
  Container,
  Heading,
  Link,
  Stack,
  Text,
} from "@recursica/adapter-mantine-v8";
import { prototypes } from "./prototypes";

function Home() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Heading order={1}>Prototypes</Heading>
        {prototypes.length === 0 ? (
          <Text variant="body-small">
            No prototypes yet. Add one under
            src/routes/prototypes/&lt;slug&gt;/index.tsx.
          </Text>
        ) : (
          <Stack gap="md">
            {prototypes.map(({ slug, title, description }) => (
              <Card key={slug} withBorder padding="lg">
                <Stack gap="xs">
                  <Link
                    renderRoot={(props) => (
                      <RouterLink to={`/prototypes/${slug}`} {...props} />
                    )}
                  >
                    <Heading order={3}>{title}</Heading>
                  </Link>
                  {description && (
                    <Text variant="body-small">{description}</Text>
                  )}
                  <Text variant="caption">/prototypes/{slug}</Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

export default Home;
