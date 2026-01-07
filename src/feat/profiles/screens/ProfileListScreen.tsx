import { Container } from "@/shared/ui/Container";
import { Button, Stack, Text, Loader, Center } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "@/shared/api/client";
import { FriendshipCard } from "../components/FriendshipCard";

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
        console.error("Failed to load friendships:", err);
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
            <FriendshipCard
              key={friendship.id}
              friendship={friendship}
              onClick={() => navigate(`/profiles/${friendship.senderUserId}`)}
            />
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
