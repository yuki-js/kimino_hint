import { Container } from "@/shared/ui/Container";
import { Button, Stack, Text, Loader, Center } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "@/shared/api/client";
import { FriendshipCard } from "../../profiles/components/FriendshipCard";

export function ReceivedFriendshipsScreen() {
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
        setError("プロフィールカードの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadFriendships();
  }, []);

  if (loading) {
    return (
      <Container title="受け取ったプロフィールカード">
        <Center mt="xl">
          <Loader size="lg" />
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container title="受け取ったプロフィールカード">
        <Text c="red" ta="center" mt="xl">{error}</Text>
        <Button fullWidth mt="md" onClick={() => navigate("/home")}>ホームに戻る</Button>
      </Container>
    );
  }

  return (
    <Container title="受け取ったプロフィールカード">
      <Stack gap="md" mt="xl">
        {friendships.length === 0 ? (
          <Text c="dimmed" ta="center">まだプロフィールカードがありません</Text>
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
