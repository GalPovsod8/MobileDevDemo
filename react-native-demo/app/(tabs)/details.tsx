import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { User } from "@/types";
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Ni izbranega uporabnika.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!response.ok) {
          throw new Error(`Napaka: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
        setError(null);
      } catch {
        setError("Napaka pri nalaganju uporabnika.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading)
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#007AFF" />
    );
  if (error) return <ThemedText>{error}</ThemedText>;
  if (!user) return null;

  return (
    <View style={styles.container}>
      <ThemedText type="title">{user.name}</ThemedText>
      <ThemedText>Email: {user.email}</ThemedText>
      <ThemedText>Telefon: {user.phone}</ThemedText>
      <ThemedText>
        Naslov: {user.address.street}, {user.address.city}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loader: {
    marginTop: 50,
  },
});
