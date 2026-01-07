import { Container } from "@/shared/ui/Container";
import { TextInput, Textarea, Button, Stack, Text, Loader, Center } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "@/shared/api/client";

export function EditMyProfileScreen() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [tagline, setTagline] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await apis.profiles().getMyProfile();
        setDisplayName(data.profileData?.displayName || "");
        setTagline(data.profileData?.tagline || "");
      } catch (err: any) {
        // Profile doesn't exist yet, that's fine
        if (err?.status !== 404) {
          setError("プロフィールの取得に失敗しました");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!displayName.trim()) {
      setError("表示名を入力してください");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await apis.profiles().updateMyProfile({
        userProfileUpdateRequest: {
          profileData: {
            displayName: displayName.trim(),
            tagline: tagline.trim() || undefined,
          },
        },
      });
      navigate("/me/profile");
    } catch (err: any) {
      console.error("Profile update failed:", err);
      setError("プロフィールの保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container title="プロフィール編集">
        <Center mt="xl">
          <Loader size="lg" />
        </Center>
      </Container>
    );
  }

  return (
    <Container title="プロフィール編集">
      <Stack gap="md" mt="xl">
        <TextInput
          label="表示名"
          placeholder="あなたの名前"
          value={displayName}
          onChange={(e) => setDisplayName(e.currentTarget.value)}
          size="lg"
          required
        />
        <Textarea
          label="ひとこと"
          placeholder="自己紹介など"
          value={tagline}
          onChange={(e) => setTagline(e.currentTarget.value)}
          size="lg"
          rows={3}
        />
        {error && <Text c="red">{error}</Text>}
        <Button size="lg" onClick={handleSave} loading={saving}>
          保存する
        </Button>
        <Button size="lg" variant="light" onClick={() => navigate("/me/profile")}>
          キャンセル
        </Button>
      </Stack>
    </Container>
  );
}
