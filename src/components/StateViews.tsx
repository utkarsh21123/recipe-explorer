import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function LoadingView() {
  return (
    <View style={styles.center} accessibilityRole="progressbar">
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={styles.sub}>Loading recipes…</Text>
    </View>
  );
}

export function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Couldn't load recipes</Text>
      <Text style={styles.sub}>{message}</Text>
      <Pressable
        onPress={onRetry}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  sub: { fontSize: 14, color: colors.muted, textAlign: 'center' },
  button: {
    marginTop: 8,
    backgroundColor: colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
