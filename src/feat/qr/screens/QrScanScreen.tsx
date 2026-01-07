import { Container } from "@/shared/ui/Container";
import { Text, Stack, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function QrScanScreen() {
  const navigate = useNavigate();

  return (
    <Container title="QRコードをスキャン">
      <Stack gap="md" mt="xl">
        <Text ta="center" c="dimmed">
          QRスキャン機能は準備中です
        </Text>
        <Text size="sm" ta="center" c="dimmed">
          プロフィールやイベントのQRコードを読み取れます
        </Text>
        <Button size="lg" onClick={() => navigate("/events/join")}>
          招待コードで参加
        </Button>
        <Button size="lg" variant="light" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
