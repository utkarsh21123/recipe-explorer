import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radius } from '../theme';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: recipe.image }} style={styles.hero} />

      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.sub}>
        {recipe.cuisine} · {recipe.mealType.join(', ')} · ★ {recipe.rating.toFixed(1)} (
        {recipe.reviewCount})
      </Text>

      <View style={styles.stats}>
        <Stat label="Prep" value={`${recipe.prepTimeMinutes} min`} />
        <Stat label="Cook" value={`${recipe.cookTimeMinutes} min`} />
        <Stat label="Serves" value={String(recipe.servings)} />
        <Stat label="Kcal" value={String(recipe.caloriesPerServing)} />
      </View>

      <View style={styles.tags}>
        {recipe.tags.map((t) => (
          <Text key={t} style={styles.tag}>
            {t}
          </Text>
        ))}
      </View>

      <Text style={styles.heading}>Ingredients</Text>
      {recipe.ingredients.map((ing, i) => (
        <Text key={i} style={styles.line}>
          • {ing}
        </Text>
      ))}

      <Text style={styles.heading}>Instructions</Text>
      {recipe.instructions.map((step, i) => (
        <View key={i} style={styles.step}>
          <Text style={styles.stepNum}>{i + 1}</Text>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 40 },
  hero: { width: '100%', aspectRatio: 4 / 3, borderRadius: radius, backgroundColor: colors.accentSoft },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginTop: 16 },
  sub: { fontSize: 14, color: colors.muted, marginTop: 4 },
  stats: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 16,
    paddingVertical: 12,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: '700', color: colors.text },
  statLabel: { fontSize: 12, color: colors.muted, marginTop: 2 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  tag: {
    backgroundColor: colors.accentSoft,
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
  heading: { fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 24, marginBottom: 8 },
  line: { fontSize: 15, color: colors.text, lineHeight: 24 },
  step: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '700',
    fontSize: 13,
    overflow: 'hidden',
  },
  stepText: { flex: 1, fontSize: 15, lineHeight: 22, color: colors.text },
});
