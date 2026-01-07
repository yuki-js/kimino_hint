import { Container } from "@/shared/ui/Container";
import { Stack, Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function AuthErrorScreen() {
  const navigate = useNavigate();

  return (
    <Container title="認証エラー">
      <Stack gap="md" mt="xl">
        <Text ta="center" c="red" size="lg">
          認証に失敗しました
        </Text>
        <Text ta="center" c="dimmed">
          もう一度お試しください
        </Text>
        <Button size="lg" onClick={() => window.location.reload()}>
          再読み込み
        </Button>
        <Button size="lg" variant="light" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
