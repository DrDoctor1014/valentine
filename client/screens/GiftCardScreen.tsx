import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  withDelay,
  ZoomIn,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";

import { ValentineColors, Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const GIFT_CARD_CODE = "XXXX-XXXXXX-XXXX";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Floating sparkle
function FloatingSparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0, { duration: 1000 })
        ),
        -1,
        false
      )
    );
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.2, { duration: 1000 }),
          withTiming(0.5, { duration: 1000 })
        ),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[{ position: "absolute", left: x, top: y }, animatedStyle]}>
      <Feather name="star" size={14} color={ValentineColors.accent} />
    </Animated.View>
  );
}

// Confetti heart that floats up
function ConfettiHeart({ delay, startX }: { delay: number; startX: number }) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(-height * 0.4, { duration: 3000, easing: Easing.out(Easing.ease) })
    );
    translateX.value = withDelay(
      delay,
      withTiming((Math.random() - 0.5) * 100, { duration: 3000 })
    );
    opacity.value = withDelay(
      delay + 1500,
      withTiming(0, { duration: 1500 })
    );
    rotate.value = withDelay(
      delay,
      withTiming((Math.random() - 0.5) * 360, { duration: 3000 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[{ position: "absolute", left: startX, bottom: height * 0.4 }, animatedStyle]}>
      <Feather
        name="heart"
        size={Math.random() * 10 + 12}
        color={Math.random() > 0.5 ? ValentineColors.primary : ValentineColors.accent}
      />
    </Animated.View>
  );
}

export default function GiftCardScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const revealScale = useSharedValue(1);
  const copyScale = useSharedValue(1);
  const cardShine = useSharedValue(0);

  useEffect(() => {
    cardShine.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const shineStyle = useAnimatedStyle(() => ({
    opacity: cardShine.value * 0.15,
  }));

  const revealAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: revealScale.value }],
  }));

  const copyAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: copyScale.value }],
  }));

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleReveal = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    revealScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 100 })
    );
    setIsRevealed(true);
  };

  const handleCopyCode = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    copyScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 100 })
    );
    await Clipboard.setStringAsync(GIFT_CARD_CODE);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePressIn = (scaleValue: Animated.SharedValue<number>) => {
    scaleValue.value = withSpring(0.95, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = (scaleValue: Animated.SharedValue<number>) => {
    scaleValue.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFF5F7", ValentineColors.secondary, "#FFF8FA"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating Sparkles */}
      <FloatingSparkle delay={0} x={width * 0.1} y={height * 0.2} />
      <FloatingSparkle delay={500} x={width * 0.85} y={height * 0.25} />
      <FloatingSparkle delay={1000} x={width * 0.15} y={height * 0.6} />
      <FloatingSparkle delay={1500} x={width * 0.8} y={height * 0.55} />

      {/* Confetti when revealed */}
      {isRevealed && (
        <View style={styles.confettiContainer} pointerEvents="none">
          {Array.from({ length: 15 }).map((_, i) => (
            <ConfettiHeart
              key={i}
              delay={i * 80}
              startX={20 + Math.random() * (width - 60)}
            />
          ))}
        </View>
      )}

      <View
        style={[
          styles.content,
          {
            paddingTop: insets.top + Spacing.xl,
            paddingBottom: insets.bottom + Spacing.xl,
          },
        ]}
      >
        {/* Close Button */}
        <Animated.View
          entering={FadeIn.duration(400)}
          style={styles.closeButtonContainer}
        >
          <Pressable
            onPress={handleClose}
            style={styles.closeButton}
            testID="button-close-gift-card"
          >
            <Feather name="x" size={20} color={ValentineColors.textSecondary} />
          </Pressable>
        </Animated.View>

        {/* Title */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.titleContainer}
        >
          <View style={styles.titleDecor}>
            <Feather name="star" size={14} color={ValentineColors.accent} />
          </View>
          <Animated.Text style={styles.title}>A Little Something</Animated.Text>
          <View style={styles.titleDecor}>
            <Feather name="star" size={14} color={ValentineColors.accent} />
          </View>
        </Animated.View>

        {/* Gift Card */}
        <Animated.View
          entering={FadeInUp.duration(700).delay(400)}
          style={styles.giftCardContainer}
        >
          <View style={styles.cardShadow} />
          <View style={styles.giftCard}>
            {/* Shine effect */}
            <Animated.View style={[styles.cardShine, shineStyle]} />

            <Image
              source={require("../../assets/images/gift-card-bg.png")}
              style={styles.giftCardBg}
              resizeMode="cover"
            />

            {/* Amount */}
            <View style={styles.amountContainer}>
              <Animated.Text style={styles.dollarSign}>$</Animated.Text>
              <Animated.Text style={styles.amount}>50</Animated.Text>
            </View>

            <Animated.Text style={styles.cardLabel}>Amazon</Animated.Text>

            {/* Code Section */}
            <View style={styles.codeSection}>
              {!isRevealed ? (
                <AnimatedPressable
                  onPress={handleReveal}
                  onPressIn={() => handlePressIn(revealScale)}
                  onPressOut={() => handlePressOut(revealScale)}
                  style={[styles.revealButton, revealAnimatedStyle]}
                  testID="button-reveal-code"
                >
                  <LinearGradient
                    colors={[ValentineColors.primary, "#FF8FA3"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.revealButtonGradient}
                  >
                    <Feather name="eye" size={16} color="#FFFFFF" />
                    <Animated.Text style={styles.revealButtonText}>
                      Reveal Your Gift
                    </Animated.Text>
                  </LinearGradient>
                </AnimatedPressable>
              ) : (
                <Animated.View entering={ZoomIn.duration(400)}>
                  <View style={styles.codeContainer}>
                    <Animated.Text style={styles.codeText}>
                      {GIFT_CARD_CODE}
                    </Animated.Text>
                  </View>
                  <AnimatedPressable
                    onPress={handleCopyCode}
                    onPressIn={() => handlePressIn(copyScale)}
                    onPressOut={() => handlePressOut(copyScale)}
                    style={[styles.copyButton, copyAnimatedStyle]}
                    testID="button-copy-code"
                  >
                    <Feather
                      name={isCopied ? "check" : "copy"}
                      size={14}
                      color={ValentineColors.primary}
                    />
                    <Animated.Text style={styles.copyButtonText}>
                      {isCopied ? "Copied!" : "Copy Code"}
                    </Animated.Text>
                  </AnimatedPressable>
                </Animated.View>
              )}
            </View>
          </View>
        </Animated.View>

        {/* Signature */}
        <Animated.View
          entering={FadeIn.duration(600).delay(800)}
          style={styles.signatureContainer}
        >
          <Animated.Text style={styles.message}>
            for treats and smiles
          </Animated.Text>
          <Animated.Text style={styles.signature}>Love, Brady</Animated.Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ValentineColors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    alignItems: "center",
  },
  closeButtonContainer: {
    alignSelf: "flex-end",
    marginBottom: Spacing.lg,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  confettiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing["3xl"],
    gap: Spacing.md,
  },
  titleDecor: {
    opacity: 0.8,
  },
  title: {
    fontFamily: "Satisfy_400Regular",
    fontSize: 30,
    color: ValentineColors.textPrimary,
  },
  giftCardContainer: {
    width: "100%",
    aspectRatio: 1.6,
    marginBottom: Spacing["3xl"],
    position: "relative",
  },
  cardShadow: {
    position: "absolute",
    top: 8,
    left: 8,
    right: -4,
    bottom: -4,
    backgroundColor: ValentineColors.primary,
    borderRadius: BorderRadius.xl,
    opacity: 0.15,
  },
  giftCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    justifyContent: "space-between",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#FF8FA3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  cardShine: {
    position: "absolute",
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    backgroundColor: ValentineColors.accent,
    transform: [{ rotate: "45deg" }],
  },
  giftCardBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  dollarSign: {
    fontFamily: "Lato_700Bold",
    fontSize: 20,
    color: ValentineColors.accent,
    marginTop: 6,
  },
  amount: {
    fontFamily: "Lato_700Bold",
    fontSize: 48,
    color: ValentineColors.textPrimary,
  },
  cardLabel: {
    fontFamily: "Lato_400Regular",
    fontSize: 13,
    color: ValentineColors.textSecondary,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  codeSection: {
    alignItems: "center",
  },
  revealButton: {
    borderRadius: BorderRadius.full,
    overflow: "hidden",
    elevation: 4,
    shadowColor: ValentineColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  revealButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  revealButtonText: {
    fontFamily: "Lato_700Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  codeContainer: {
    backgroundColor: ValentineColors.secondary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  codeText: {
    fontFamily: "Lato_700Bold",
    fontSize: 17,
    color: ValentineColors.textPrimary,
    letterSpacing: 2,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  copyButtonText: {
    fontFamily: "Lato_700Bold",
    fontSize: 12,
    color: ValentineColors.primary,
  },
  signatureContainer: {
    alignItems: "center",
  },
  message: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    color: ValentineColors.textSecondary,
    fontStyle: "italic",
    marginBottom: Spacing.sm,
  },
  signature: {
    fontFamily: "Satisfy_400Regular",
    fontSize: 24,
    color: ValentineColors.textPrimary,
  },
});
