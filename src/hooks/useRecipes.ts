import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchRecipes } from '../api/recipes';
import type { Recipe } from '../types';

type State = {
  recipes: Recipe[];
  /** First load, nothing on screen yet. */
  loading: boolean;
  /** Pull-to-refresh in progress. */
  refreshing: boolean;
  error: string | null;
};

export function useRecipes() {
  const [state, setState] = useState<State>({
    recipes: [],
    loading: true,
    refreshing: false,
    error: null,
  });
  const mounted = useRef(true);

  const load = useCallback(async (mode: 'initial' | 'refresh') => {
    setState((s) => ({
      ...s,
      loading: mode === 'initial',
      refreshing: mode === 'refresh',
      error: null,
    }));
    try {
      const recipes = await fetchRecipes();
      if (mounted.current) {
        setState({ recipes, loading: false, refreshing: false, error: null });
      }
    } catch (e) {
      if (mounted.current) {
        // Keep any previously loaded data so a failed refresh doesn't blank the list.
        setState((s) => ({
          ...s,
          loading: false,
          refreshing: false,
          error: e instanceof Error ? e.message : 'Something went wrong.',
        }));
      }
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load('initial');
    return () => {
      mounted.current = false;
    };
  }, [load]);

  return {
    ...state,
    retry: () => load('initial'),
    refresh: () => load('refresh'),
  };
}
