import { View, type ViewProps, StyleSheet } from "react-native";
import { GlassView } from "expo-glass-effect";

import { useTheme } from "@/hooks/useTheme";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  useGlass?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  useGlass = false,
  ...otherProps
}: ThemedViewProps) {
  const { theme, isDark } = useTheme();

  const backgroundColor =
    isDark && darkColor
      ? darkColor
      : !isDark && lightColor
        ? lightColor
        : theme.backgroundRoot;

  if (useGlass) {
    return (
      <GlassView
        glassEffectStyle="regular"
        intensity={60}
        tintColor={theme.glassTint}
        style={[styles.glass, { backgroundColor }, style]}
        {...otherProps}
      />
    );
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  glass: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
});
