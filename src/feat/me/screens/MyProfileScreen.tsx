import { Container } from "@/shared/ui/Container";
import { Button, Stack, Text, Card, Loader, Center } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "@/shared/api/client";

export function MyProfileScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await apis.profiles().getMyProfile();
        setProfile(data);
      } catch (err: any) {
        if (err?.status === 404) {
          // Profile doesn't exist yet, redirect to edit
          navigate("/me/profile/edit");
        } else {
          setError("プロフィールの取得に失敗しました");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

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
        <Button fullWidth mt="md" onClick={() => navigate("/me/profile/edit")}>
          プロフィールを作成
        </Button>
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

        <Button size="lg" onClick={() => navigate("/me/profile/edit")}>
          編集する
        </Button>
        <Button size="lg" variant="light" onClick={() => navigate("/qr/profile")}>
          QRコードを表示
        </Button>
        <Button size="lg" variant="subtle" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
