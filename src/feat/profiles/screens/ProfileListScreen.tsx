import { Container } from "@/shared/ui/Container";
import { Button, Stack, Text, Card, Loader, Center, Group } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "@/shared/api/client";

export function ProfileListScreen() {
  const navigate = useNavigate();
  const [friendships, setFriendships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFriendships = async () => {
      try {
        setLoading(true);
        const data = await apis.friendships().listReceivedFriendships();
        setFriendships(data);
      } catch (err) {
        setError("プロフィール一覧の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadFriendships();
  }, []);

  if (loading) {
    return (
      <Container title="プロフィール一覧">
        <Center mt="xl">
          <Loader size="lg" />
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container title="プロフィール一覧">
        <Text c="red" ta="center" mt="xl">{error}</Text>
        <Button fullWidth mt="md" onClick={() => navigate("/home")}>ホームに戻る</Button>
      </Container>
    );
  }

  return (
    <Container title="プロフィール一覧">
      <Stack gap="md" mt="xl">
        {friendships.length === 0 ? (
          <Text c="dimmed" ta="center">まだプロフィールがありません</Text>
        ) : (
          friendships.map((friendship) => (
            <Card
              key={friendship.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/profiles/${friendship.senderUserId}`)}
            >
              <Group justify="space-between">
                <div>
                  <Text fw={500}>
                    {friendship.senderProfile?.profileData?.displayName || "名前未設定"}
                  </Text>
                  {friendship.senderProfile?.profileData?.tagline && (
                    <Text size="sm" c="dimmed">
                      {friendship.senderProfile.profileData.tagline}
                    </Text>
                  )}
                </div>
              </Group>
            </Card>
          ))
        )}
        <Button size="lg" variant="light" onClick={() => navigate("/qr/scan")}>
          QRコードで追加
        </Button>
        <Button size="lg" variant="subtle" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
