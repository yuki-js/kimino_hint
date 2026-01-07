import { Container } from "@/shared/ui/Container";
import { Text, Stack, Button, List } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function HelpScreen() {
  const navigate = useNavigate();

  return (
    <Container title="使い方">
      <Stack gap="md" mt="xl">
        <Text fw={700}>キミのヒントへようこそ</Text>
        <List>
          <List.Item>ルームを作成またはルームに参加してクイズを楽しもう</List.Item>
          <List.Item>プロフィールを設定して、他の参加者と交流しよう</List.Item>
          <List.Item>QRコードでプロフィールを簡単に共有できます</List.Item>
        </List>
        <Button size="lg" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
