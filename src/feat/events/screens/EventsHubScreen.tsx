import { Container } from "@/shared/ui/Container";
import { Stack, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function EventsHubScreen() {
  const navigate = useNavigate();

  return (
    <Container title="イベント">
      <Stack gap="md" mt="xl">
        <Group grow>
          <Button size="lg" onClick={() => navigate("/events/join")}>
            ルームに参加
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/events/new")}>
            ルームを作成
          </Button>
        </Group>
        <Button size="lg" variant="light" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
