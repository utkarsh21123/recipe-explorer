import { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecipeCard } from '../components/RecipeCard';
import { ErrorView, LoadingView } from '../components/StateViews';
import { useRecipes } from '../hooks/useRecipes';
import { colors } from '../theme';
import type { Recipe, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export default function ListScreen({ navigation }: Props) {
  const { recipes, loading, refreshing, error, retry, refresh } = useRecipes();

  const openDetail = useCallback(
    (recipe: Recipe) => navigation.navigate('Detail', { recipe }),
    [navigation],
  );

  // Full-screen states only when there is nothing to show yet.
  if (loading) return <LoadingView />;
  if (error && recipes.length === 0) return <ErrorView message={error} onRetry={retry} />;

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Refresh failed: {error}</Text>
        </View>
      )}
      <FlatList
        data={recipes}
        keyExtractor={(r) => String(r.id)}
        renderItem={({ item }) => <RecipeCard recipe={item} onPress={openDetail} />}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        ListEmptyComponent={<Text style={styles.empty}>No recipes found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 16 },
  banner: { backgroundColor: '#FEE4E2', paddingVertical: 8, paddingHorizontal: 16 },
  bannerText: { color: colors.error, fontSize: 13 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 48 },
});
