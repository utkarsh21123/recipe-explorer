import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Recipe } from '../types';
import { colors, radius } from '../theme';

type Props = { recipe: Recipe; onPress: (recipe: Recipe) => void };

function RecipeCardBase({ recipe, onPress }: Props) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  return (
    <Pressable
      onPress={() => onPress(recipe)}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
      accessibilityRole="button"
      accessibilityLabel={`${recipe.name}, ${recipe.cuisine}, ${totalTime} minutes`}
    >
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {recipe.name}
        </Text>
        <Text style={styles.meta}>
          {recipe.cuisine} · {totalTime} min · {recipe.difficulty}
        </Text>
        <Text style={styles.rating}>
          ★ {recipe.rating.toFixed(1)} <Text style={styles.meta}>({recipe.reviewCount})</Text>
        </Text>
      </View>
    </Pressable>
  );
}

export const RecipeCard = memo(RecipeCardBase);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  image: { width: 100, height: 100, backgroundColor: colors.accentSoft },
  body: { flex: 1, padding: 12, justifyContent: 'center', gap: 4 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  meta: { fontSize: 13, color: colors.muted },
  rating: { fontSize: 13, fontWeight: '600', color: colors.accent },
});
