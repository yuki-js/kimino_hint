import { Container } from "@/shared/ui/Container";
import { Button, Stack, Text, Card, Loader, Center } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apis } from "@/shared/api/client";

export function ProfileDetailScreen() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await apis.profiles().getUserProfile({
          userId: parseInt(userId),
        });
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("プロフィールの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  if (loading) {
    return (
      <Container title="プロフィール">
        <Center mt="xl">
          <Loader size="lg" />
        </Center>
      </Container>
    );
  }

  if (error || !profile) {
    return (
      <Container title="プロフィール">
        <Text c="red" ta="center" mt="xl">{error || "プロフィールが見つかりません"}</Text>
        <Button fullWidth mt="md" onClick={() => navigate("/profiles")}>一覧に戻る</Button>
      </Container>
    );
  }

  return (
    <Container title="プロフィール">
      <Stack gap="md" mt="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="xl" fw={700} mb="md">
            {profile.profileData?.displayName || "名前未設定"}
          </Text>
          {profile.profileData?.tagline && (
            <Text size="sm" c="dimmed" mb="md">
              {profile.profileData.tagline}
            </Text>
          )}
          {Object.entries(profile.profileData || {})
            .filter(([key]) => key !== "displayName" && key !== "tagline")
            .map(([key, value]) => (
              <Text key={key} size="sm">
                {key}: {String(value)}
              </Text>
            ))}
        </Card>

        <Button size="lg" variant="light" onClick={() => navigate("/profiles")}>
          一覧に戻る
        </Button>
        <Button size="lg" variant="subtle" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
