import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

import { Image } from "expo-image";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HelloWave } from "@/components/HelloWave";
import { User } from "@/types";
import { UserCard } from "@/components/ui/UserCard";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const apiUrl = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Napaka: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Problem pri pridobivanju uporabnikov.");
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
        {error && <ThemedText type="default">{error}</ThemedText>}

        {!loading && !error && (
          <View>
            {users.map((user) => (
              <TouchableOpacity
                key={user.id}
                onPress={() => router.push(`/details?id=${user.id}`)}
              >
                <UserCard user={user} />
              </TouchableOpacity>
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
});
