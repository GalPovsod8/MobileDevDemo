import { User } from "@/types";
import { ThemedText } from "../ThemedText";

export const UserCard = ({ user }: { user: User }) => {
  return (
    <ThemedText
      style={{
        borderRadius: 12,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      type="subtitle"
    >
      {user.name}
    </ThemedText>
  );
};
