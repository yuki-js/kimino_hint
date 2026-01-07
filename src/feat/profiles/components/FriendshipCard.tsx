import { Card, Group, Text } from "@mantine/core";

type FriendshipCardProps = {
  friendship: {
    id: number;
    senderUserId: number;
    senderProfile?: {
      profileData?: {
        displayName?: string;
        tagline?: string;
      };
    };
  };
  onClick?: () => void;
};

export function FriendshipCard({ friendship, onClick }: FriendshipCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
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
  );
}
