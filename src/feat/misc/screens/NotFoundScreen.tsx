import { Container } from "@/shared/ui/Container";
import { Stack, Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <Container title="404 Not Found">
      <Stack gap="md" mt="xl">
        <Text ta="center" size="lg" c="dimmed">
          お探しのページが見つかりません
        </Text>
        <Button size="lg" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
