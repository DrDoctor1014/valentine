import React, { useState, useEffect, useMemo } from "react";
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
  ZoomIn,
  SlideInUp,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { ValentineColors, Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const GIFT_SIZE = Math.min((width - Spacing.xl * 5) / 3, 95);

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "GiftSelection">;

const REVEAL_ORDER: Array<keyof RootStackParamList> = ["LoveNote", "GiftCard", "MusicVideo"];

// Floating sparkle
function FloatingSparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const rotate = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.8, { duration: 1500 }),
          withTiming(0, { duration: 1500 })
        ),
        -1,
        false
      )
    );
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1500 }),
          withTiming(0.5, { duration: 1500 })
        ),
        -1,
        false
      )
    );
    rotate.value = withRepeat(
      withTiming(360, { duration: 4000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[{ position: "absolute", left: x, top: y }, animatedStyle]}>
      <Feather name="star" size={12} color={ValentineColors.accent} />
    </Animated.View>
  );
}

interface GiftBoxProps {
  index: number;
  isOpened: boolean;
  onPress: () => void;
  delay: number;
}

function GiftBox({ index, isOpened, onPress, delay }: GiftBoxProps) {
  const scale = useSharedValue(1);
  const floatY = useSharedValue(0);
  const glowOpacity = useSharedValue(0.2);

  useEffect(() => {
    if (!isOpened) {
      floatY.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(-6, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
            withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        )
      );
      glowOpacity.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(0.5, { duration: 1800 }),
            withTiming(0.2, { duration: 1800 })
          ),
          -1,
          true
        )
      );
    }
  }, [isOpened]);

  const boxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: isOpened ? 0 : floatY.value },
    ],
    opacity: isOpened ? 0.35 : 1,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: isOpened ? 0 : glowOpacity.value,
  }));

  const handlePressIn = () => {
    if (!isOpened) {
      scale.value = withSpring(0.88, { damping: 15, stiffness: 150 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  return (
    <Animated.View entering={ZoomIn.duration(600).delay(delay)}>
      <Pressable
        onPress={isOpened ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isOpened}
        testID={`gift-box-${index}`}
      >
        <View style={styles.giftBoxWrapper}>
          <Animated.View style={[styles.giftGlow, glowStyle]} />
          <Animated.View style={[styles.giftBox, boxAnimatedStyle]}>
            <Image
              source={
                isOpened
                  ? require("../../assets/images/gift-box-open.png")
                  : require("../../assets/images/gift-box-closed.png")
              }
              style={styles.giftImage}
              resizeMode="cover"
            />
          </Animated.View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function GiftSelectionScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [revealIndex, setRevealIndex] = useState(0);

  const shuffledPositions = useMemo(() => {
    const positions = [0, 1, 2];
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    return positions;
  }, []);

  useEffect(() => {
    if (openedGifts.length === 3) {
      const timer = setTimeout(() => {
        navigation.navigate("FinalBouquet");
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [openedGifts, navigation]);

  const handleGiftPress = (boxIndex: number) => {
    if (openedGifts.includes(boxIndex)) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setOpenedGifts((prev) => [...prev, boxIndex]);

    const screen = REVEAL_ORDER[revealIndex];
    setRevealIndex((prev) => prev + 1);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFF0F3", ValentineColors.secondary, ValentineColors.background, "#FFF8FA"]}
        locations={[0, 0.25, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating Sparkles */}
      <FloatingSparkle delay={0} x={width * 0.15} y={height * 0.2} />
      <FloatingSparkle delay={500} x={width * 0.82} y={height * 0.18} />
      <FloatingSparkle delay={1000} x={width * 0.1} y={height * 0.55} />
      <FloatingSparkle delay={1500} x={width * 0.88} y={height * 0.5} />
      <FloatingSparkle delay={750} x={width * 0.5} y={height * 0.15} />

      <View
        style={[
          styles.content,
          {
            paddingTop: insets.top + Spacing["4xl"],
            paddingBottom: insets.bottom + Spacing["3xl"],
          },
        ]}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.duration(700).delay(200)}
          style={styles.header}
        >
          <View style={styles.titleDecor}>
            <View style={styles.decorLine} />
            <Feather name="heart" size={14} color={ValentineColors.primary} />
            <View style={styles.decorLine} />
          </View>
          <ThemedText type="romantic" style={styles.title}>Valentine's Day</ThemedText>
          <ThemedText type="small" style={styles.year}>2026</ThemedText>
        </Animated.View>

        {/* Gift Boxes */}
        <View style={styles.giftContainer}>
          <Animated.View entering={FadeIn.duration(600).delay(500)}>
            <ThemedText style={styles.instruction}>
              choose a gift to unwrap
            </ThemedText>
          </Animated.View>

          <View style={styles.giftRow}>
            {shuffledPositions.map((originalIndex, displayIndex) => (
              <GiftBox
                key={originalIndex}
                index={originalIndex}
                isOpened={openedGifts.includes(originalIndex)}
                onPress={() => handleGiftPress(originalIndex)}
                delay={700 + displayIndex * 200}
              />
            ))}
          </View>
        </View>

        {/* Progress */}
        <Animated.View
          entering={SlideInUp.duration(600).delay(1300)}
          style={styles.progressContainer}
        >
          <View style={styles.progressDots}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={styles.dotWrapper}>
                <View
                  style={[
                    styles.progressDot,
                    openedGifts.length > i && styles.progressDotFilled,
                  ]}
                />
                {openedGifts.length > i && (
                  <View style={styles.dotGlow} />
                )}
              </View>
            ))}
          </View>
          <ThemedText type="small" style={styles.progressText}>
            {openedGifts.length === 0
              ? "three surprises await"
              : openedGifts.length === 3
              ? "all gifts opened"
              : `${3 - openedGifts.length} more to go`}
          </ThemedText>
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
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  titleDecor: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  decorLine: {
    width: 30,
    height: 1,
    backgroundColor: ValentineColors.primary,
    opacity: 0.4,
    marginHorizontal: Spacing.sm,
  },
  title: {
    fontSize: 36,
    textAlign: "center",
  },
  year: {
    letterSpacing: 6,
    marginTop: Spacing.xs,
  },
  instruction: {
    textAlign: "center",
    marginBottom: Spacing["3xl"],
    letterSpacing: 1,
    fontStyle: "italic",
  },
  giftContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  giftRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xl,
  },
  giftBoxWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  giftGlow: {
    position: "absolute",
    width: GIFT_SIZE + 20,
    height: GIFT_SIZE + 20,
    borderRadius: BorderRadius.xl,
    backgroundColor: ValentineColors.primary,
  },
  giftBox: {
    width: GIFT_SIZE,
    height: GIFT_SIZE,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#FF8FA3",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  giftImage: {
    width: "100%",
    height: "100%",
  },
  progressContainer: {
    alignItems: "center",
  },
  progressDots: {
    flexDirection: "row",
    gap: Spacing.lg,
    marginBottom: Spacing.md,
  },
  dotWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: ValentineColors.primary,
  },
  progressDotFilled: {
    backgroundColor: ValentineColors.primary,
    borderColor: ValentineColors.primary,
  },
  dotGlow: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: ValentineColors.primary,
    opacity: 0.25,
  },
  progressText: {
    letterSpacing: 1,
  },
});
