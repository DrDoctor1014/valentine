import { Platform } from "react-native";

// Aesthetic and Romantic Color Palette (Liquid Glass inspired)
export const ValentineColors = {
  primary: "#FF8DA1", // Vibrant but soft romantic pink
  secondary: "#FADADD", // Classic Mac OS Aqua-style soft pink
  accent: "#FFD700", // Soft gold for highlights
  background: "#FFF0F3", // Very light blushing background
  surface: "rgba(255, 255, 255, 0.7)", // Semi-transparent for glass effect
  textPrimary: "#5D4037", // Soft warm coffee brown
  textSecondary: "#A88E93", // Muted mauve-rose
  success: "#FFB3C1", // Sweet pink
  glassTint: "rgba(255, 182, 193, 0.1)", // Subtle pink tint for glass
};

export const Colors = {
  light: {
    text: ValentineColors.textPrimary,
    buttonText: "#FFFFFF",
    tabIconDefault: ValentineColors.textSecondary,
    tabIconSelected: ValentineColors.primary,
    link: ValentineColors.primary,
    backgroundRoot: ValentineColors.background,
    backgroundDefault: ValentineColors.surface,
    backgroundSecondary: ValentineColors.secondary,
    backgroundTertiary: ValentineColors.primary,
    glassTint: ValentineColors.glassTint,
  },
  dark: {
    text: ValentineColors.textPrimary,
    buttonText: "#FFFFFF",
    tabIconDefault: ValentineColors.textSecondary,
    tabIconSelected: ValentineColors.primary,
    link: ValentineColors.primary,
    backgroundRoot: ValentineColors.background,
    backgroundDefault: ValentineColors.surface,
    backgroundSecondary: ValentineColors.secondary,
    backgroundTertiary: ValentineColors.primary,
    glassTint: ValentineColors.glassTint,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  display: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "400" as const,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "400" as const,
  },
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600" as const,
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
