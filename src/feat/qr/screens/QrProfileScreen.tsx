import { Container } from "@/shared/ui/Container";
import { Text, Stack, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function QrProfileScreen() {
  const navigate = useNavigate();

  return (
    <Container title="プロフィール共有QR">
      <Stack gap="md" mt="xl">
        <Text ta="center" c="dimmed">
          QRコード表示機能は準備中です
        </Text>
        <Text size="sm" ta="center" c="dimmed">
          あなたのプロフィールをQRコードで共有できます
        </Text>
        <Button size="lg" onClick={() => navigate("/me/profile")}>
          プロフィールに戻る
        </Button>
        <Button size="lg" variant="light" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
