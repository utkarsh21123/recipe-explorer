# Recipe Explorer

A small React Native (Expo + TypeScript) app for the Zuvomo take-home task.

- **List screen** – fetches recipes from the public [DummyJSON Recipes API](https://dummyjson.com/docs/recipes) and shows them in a `FlatList`.
- **Detail screen** – tap a recipe to see the photo, stats, tags, ingredients and step-by-step instructions.
- **Loading / error states** – a spinner on first load; a full-screen error with a **Try again** button if the first load fails.
- **Pull-to-refresh** – native `RefreshControl`. If a refresh fails, the existing list stays visible and an inline banner explains what happened.

## Run it

Requirements: Node 20+ and the [Expo Go](https://expo.dev/go) app on your phone (or an Android emulator / iOS simulator).

```bash
npm install
npx expo start
```

Then scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `a` / `i` to open an emulator/simulator.

Typecheck: `npx tsc --noEmit`

## Project structure

```
App.tsx                      Navigation setup (native stack)
src/
  api/recipes.ts             fetch + timeout + friendly error messages
  hooks/useRecipes.ts        loading / refreshing / error state in one hook
  screens/ListScreen.tsx     list, pull-to-refresh, state switching
  screens/DetailScreen.tsx   recipe detail
  components/RecipeCard.tsx  memoized list row
  components/StateViews.tsx  LoadingView, ErrorView
  types.ts, theme.ts
```

## Design notes

- **Separate `loading` and `refreshing` flags** so pull-to-refresh shows the native pull indicator rather than replacing the list with a full-screen spinner.
- **Failed refresh doesn't wipe data.** Full-screen error only appears when there's nothing to show.
- **10s request timeout** so a hung connection becomes an error state instead of an endless spinner.
- **The detail screen receives the recipe via navigation params**, since the list payload already contains everything shown. With an API where the list returns summaries only, the detail screen would fetch by `id` and have its own loading/error state.
- **Tested by**: typecheck and a production bundle build for both Android and iOS.

## Testing the error state

Turn on airplane mode (or turn off Wi-Fi) and relaunch the app / pull to refresh.
