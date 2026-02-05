import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
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
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { ValentineColors, Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const LOVE_NOTE_MESSAGE = `My Dearest Sara,

From the moment I met you, my world became brighter. Your smile lights up every room, and your laugh is the most beautiful sound I've ever heard.

Every day with you feels like a gift. You make me want to be a better person, and I'm so grateful that you chose me.

This Valentine's Day is our first together, and I wanted to create something special just for you. Something that shows you how much you mean to me.

You are my sunshine, my heart, and my everything. I can't wait to share many more Valentine's Days with you, and to build a beautiful future together.

Thank you for being you, for loving me, and for making every moment magical.`;

// Floating heart decoration
function FloatingHeart({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-15, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.7, { duration: 2500 }),
          withTiming(0.3, { duration: 2500 })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[{ position: "absolute", left: x, top: y }, animatedStyle]}>
      <Feather name="heart" size={size} color={ValentineColors.primary} />
    </Animated.View>
  );
}

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function LoveNoteScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFF5F7", ValentineColors.secondary, "#FFF8FA"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating Hearts */}
      <FloatingHeart delay={0} x={width * 0.08} y={height * 0.15} size={14} />
      <FloatingHeart delay={600} x={width * 0.88} y={height * 0.2} size={12} />
      <FloatingHeart delay={1200} x={width * 0.12} y={height * 0.75} size={16} />
      <FloatingHeart delay={900} x={width * 0.85} y={height * 0.7} size={10} />

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
            testID="button-close-love-note"
          >
            <Feather name="x" size={20} color={ValentineColors.textSecondary} />
          </Pressable>
        </Animated.View>

        {/* Card */}
        <Animated.View
          entering={FadeInUp.duration(800).delay(200)}
          style={styles.cardContainer}
        >
          <ThemedView useGlass style={styles.card}>
            {/* Decorative top */}
            <View style={styles.cardTop}>
              <Image
                source={require("../../assets/images/love-note-decor.png")}
                style={styles.headerDecor}
                resizeMode="contain"
              />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Message */}
              <Animated.View entering={FadeIn.duration(1000).delay(600)}>
                <ThemedText style={styles.message}>
                  {LOVE_NOTE_MESSAGE}
                </ThemedText>
              </Animated.View>

              {/* Signature */}
              <Animated.View
                entering={FadeIn.duration(700).delay(1000)}
                style={styles.signatureContainer}
              >
                <View style={styles.signatureLine} />
                <ThemedText type="romantic" style={styles.signature}>
                  Love, Brady
                </ThemedText>
                <View style={styles.heartRow}>
                  <Feather name="heart" size={10} color={ValentineColors.primary} />
                  <Feather name="heart" size={14} color={ValentineColors.primary} style={styles.heartSpacing} />
                  <Feather name="heart" size={10} color={ValentineColors.primary} />
                </View>
              </Animated.View>
            </ScrollView>

            {/* Bottom decorative gradient */}
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,0.4)"]}
              style={styles.bottomFade}
              pointerEvents="none"
            />
          </ThemedView>
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
    paddingHorizontal: Spacing.lg,
  },
  closeButtonContainer: {
    alignItems: "flex-end",
    marginBottom: Spacing.md,
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
  cardContainer: {
    flex: 1,
    position: "relative",
  },
  card: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
  },
  cardTop: {
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  headerDecor: {
    width: "100%",
    height: 55,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing["5xl"],
  },
  message: {
    lineHeight: 30,
    textAlign: "left",
  },
  signatureContainer: {
    alignItems: "center",
    marginTop: Spacing["4xl"],
  },
  signatureLine: {
    width: 50,
    height: 1,
    backgroundColor: ValentineColors.primary,
    opacity: 0.3,
    marginBottom: Spacing.lg,
  },
  signature: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  heartRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  heartSpacing: {
    marginHorizontal: 6,
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
});
