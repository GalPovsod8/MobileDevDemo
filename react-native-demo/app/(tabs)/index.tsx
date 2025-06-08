import { ActivityIndicator, Image } from "react-native";
import { StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { UserCard } from "@/components/ui/UserCard";

export default function HomeScreen() {
  const apiUrl: string = "https://jsonplaceholder.typicode.com/users";

  let [users, setUsers] = useState<User[]>([]);
  let [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Napaka: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError("Problem pri pridobivanju uporabnikov.");
      console.error("Problem pri pridobivanju uporabnikov:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Uporabniki</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        {loading && <ActivityIndicator size="large" color="#007AFF" />}
        {error && (
          <ThemedText type="default" style={styles.errorText}>
            {error}
          </ThemedText>
        )}
        {!loading && !error && (
          <View>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </View>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});
