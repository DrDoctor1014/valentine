import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { ValentineColors, Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Welcome">;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Floating heart component with gentle animation
function FloatingHeart({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.6);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-20, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.9, { duration: 2000 }),
          withTiming(0.5, { duration: 2000 })
        ),
        -1,
        true
      )
    );
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[{ position: "absolute", left: x, top: y }, animatedStyle]}>
      <Feather name="heart" size={size} color={ValentineColors.primary} />
    </Animated.View>
  );
}

// Pulsing glow effect for the gift
function PulsingGlow() {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 1500 }),
        withTiming(0.2, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.glow, animatedStyle]}>
      <LinearGradient
        colors={[ValentineColors.primary + "60", "transparent"]}
        style={styles.glowGradient}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
      />
    </Animated.View>
  );
}

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const buttonScale = useSharedValue(1);
  const buttonGlow = useSharedValue(0.3);

  useEffect(() => {
    buttonGlow.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1200 }),
        withTiming(0.3, { duration: 1200 })
      ),
      -1,
      true
    );
  }, []);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const buttonGlowStyle = useAnimatedStyle(() => ({
    opacity: buttonGlow.value,
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("GiftSelection");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFF0F3", ValentineColors.secondary, ValentineColors.background, "#FFF8FA"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating Hearts Background */}
      <FloatingHeart delay={0} x={width * 0.1} y={height * 0.15} size={16} />
      <FloatingHeart delay={400} x={width * 0.85} y={height * 0.12} size={14} />
      <FloatingHeart delay={800} x={width * 0.2} y={height * 0.7} size={12} />
      <FloatingHeart delay={1200} x={width * 0.8} y={height * 0.65} size={18} />
      <FloatingHeart delay={600} x={width * 0.5} y={height * 0.08} size={10} />
      <FloatingHeart delay={1000} x={width * 0.15} y={height * 0.45} size={14} />
      <FloatingHeart delay={1400} x={width * 0.88} y={height * 0.4} size={12} />

      <View
        style={[
          styles.content,
          {
            paddingTop: insets.top + Spacing["5xl"],
            paddingBottom: insets.bottom + Spacing["4xl"],
          },
        ]}
      >
        {/* Main Content */}
        <View style={styles.centerContent}>
          {/* Gift with Glow */}
          <Animated.View
            entering={FadeIn.duration(1200).delay(200)}
            style={styles.giftContainer}
          >
            <PulsingGlow />
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.giftIcon}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Title with decorative elements */}
          <Animated.View
            entering={FadeInDown.duration(800).delay(600)}
            style={styles.titleContainer}
          >
            <View style={styles.decorativeLine} />
            <ThemedText type="romantic">For Sara</ThemedText>
            <View style={styles.decorativeLine} />
          </Animated.View>

          {/* Subtitle with hearts */}
          <Animated.View
            entering={FadeIn.duration(600).delay(1000)}
            style={styles.subtitleContainer}
          >
            <View style={styles.heartRow}>
              <Feather name="heart" size={10} color={ValentineColors.primary} />
              <Feather name="heart" size={14} color={ValentineColors.primary} style={styles.heartSpacing} />
              <Feather name="heart" size={18} color={ValentineColors.primary} style={styles.heartSpacing} />
              <Feather name="heart" size={14} color={ValentineColors.primary} style={styles.heartSpacing} />
              <Feather name="heart" size={10} color={ValentineColors.primary} />
            </View>
            <ThemedText type="small" style={styles.subtitle}>
              A Valentine's surprise awaits
            </ThemedText>
          </Animated.View>
        </View>

        {/* Continue Button with Glow */}
        <Animated.View entering={FadeInUp.duration(600).delay(1400)}>
          <View style={styles.buttonWrapper}>
            <Animated.View style={[styles.buttonGlow, buttonGlowStyle]} />
            <AnimatedPressable
              onPress={handleContinue}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={[styles.button, buttonAnimatedStyle]}
              testID="button-continue"
            >
              <LinearGradient
                colors={["#FFB6C1", "#FF8FA3", "#FF7A93"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <ThemedText style={styles.buttonText}>Open Your Gifts</ThemedText>
                <View style={styles.buttonIconContainer}>
                  <Feather name="heart" size={18} color="#FFFFFF" />
                </View>
              </LinearGradient>
            </AnimatedPressable>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  giftContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing["4xl"],
  },
  glow: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
  },
  glowGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 120,
  },
  giftIcon: {
    width: 160,
    height: 160,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  decorativeLine: {
    width: 40,
    height: 1,
    backgroundColor: ValentineColors.primary,
    opacity: 0.4,
    marginHorizontal: Spacing.lg,
  },
  subtitleContainer: {
    alignItems: "center",
  },
  heartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  heartSpacing: {
    marginHorizontal: 4,
  },
  subtitle: {
    textAlign: "center",
    letterSpacing: 0.5,
  },
  buttonWrapper: {
    position: "relative",
  },
  buttonGlow: {
    position: "absolute",
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: BorderRadius.full,
    backgroundColor: ValentineColors.primary,
  },
  button: {
    borderRadius: BorderRadius.full,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#FF7A93",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing["3xl"],
    gap: Spacing.md,
  },
  buttonText: {
    fontFamily: "Lato_700Bold",
    fontSize: 18,
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  buttonIconContainer: {
    marginLeft: 4,
  },
});
