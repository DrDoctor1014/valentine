import React, { useRef, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeInUp,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

import { ValentineColors, Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Floating heart that rises gently
function RisingHeart({ delay, x, size }: { delay: number; x: number; size: number }) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: 0 }),
          withTiming(-height * 0.35, { duration: 5000, easing: Easing.out(Easing.ease) })
        ),
        -1,
        false
      )
    );
    translateX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming((Math.random() - 0.5) * 40, { duration: 2500 }),
          withTiming((Math.random() - 0.5) * 40, { duration: 2500 })
        ),
        -1,
        true
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.7, { duration: 500 }),
          withTiming(0.7, { duration: 3500 }),
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
          withTiming(1, { duration: 500 }),
          withTiming(1.1, { duration: 2500 }),
          withTiming(0.9, { duration: 2000 })
        ),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[{ position: "absolute", left: x, bottom: height * 0.15 }, animatedStyle]}>
      <Feather name="heart" size={size} color={ValentineColors.primary} />
    </Animated.View>
  );
}

// Sparkle decoration
function Sparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const rotate = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0.3, { duration: 1000 })
        ),
        -1,
        true
      )
    );
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.2, { duration: 1000 }),
          withTiming(0.8, { duration: 1000 })
        ),
        -1,
        true
      )
    );
    rotate.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
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

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function FinalBouquetScreen() {
  const insets = useSafeAreaInsets();
  const viewRef = useRef<View>(null);
  const saveScale = useSharedValue(1);
  const shareScale = useSharedValue(1);
  const bouquetGlow = useSharedValue(0.2);

  useEffect(() => {
    bouquetGlow.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 2000 }),
        withTiming(0.15, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: bouquetGlow.value,
  }));

  const saveAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: saveScale.value }],
  }));

  const shareAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: shareScale.value }],
  }));

  const handlePressIn = (scaleValue: Animated.SharedValue<number>) => {
    scaleValue.value = withSpring(0.95, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = (scaleValue: Animated.SharedValue<number>) => {
    scaleValue.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  const handleSaveImage = useCallback(async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (Platform.OS === "web") {
      Alert.alert("Save", "Use Expo Go on your phone to save.");
      return;
    }

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Allow access to save to photos.");
        return;
      }

      const uri = await captureRef(viewRef, { format: "png", quality: 1 });
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("Saved", "Saved to your photos.");
    } catch (error) {
      Alert.alert("Error", "Could not save. Try again.");
    }
  }, []);

  const handleShare = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (Platform.OS === "web") {
      Alert.alert("Share", "Use Expo Go on your phone to share.");
      return;
    }

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Unavailable", "Sharing is not available.");
        return;
      }

      const uri = await captureRef(viewRef, { format: "png", quality: 1 });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert("Error", "Could not share. Try again.");
    }
  }, []);

  return (
    <View ref={viewRef} collapsable={false} style={styles.container}>
      <LinearGradient
        colors={["#FFF0F3", ValentineColors.secondary, ValentineColors.background, "#FFF5F7"]}
        locations={[0, 0.25, 0.7, 1]}
        style={styles.gradient}
      >
        {/* Rising Hearts Background */}
        <View style={styles.heartsContainer} pointerEvents="none">
          <RisingHeart delay={0} x={width * 0.15} size={14} />
          <RisingHeart delay={800} x={width * 0.35} size={12} />
          <RisingHeart delay={1600} x={width * 0.55} size={16} />
          <RisingHeart delay={2400} x={width * 0.75} size={10} />
          <RisingHeart delay={400} x={width * 0.25} size={18} />
          <RisingHeart delay={1200} x={width * 0.65} size={14} />
          <RisingHeart delay={2000} x={width * 0.85} size={12} />
        </View>

        {/* Sparkles */}
        <Sparkle delay={0} x={width * 0.1} y={height * 0.18} />
        <Sparkle delay={500} x={width * 0.85} y={height * 0.22} />
        <Sparkle delay={1000} x={width * 0.2} y={height * 0.55} />
        <Sparkle delay={1500} x={width * 0.8} y={height * 0.5} />

        <View
          style={[
            styles.content,
            {
              paddingTop: insets.top + Spacing["4xl"],
              paddingBottom: insets.bottom + Spacing["3xl"],
            },
          ]}
        >
          {/* Bouquet with Glow */}
          <Animated.View
            entering={ZoomIn.duration(1000).delay(400)}
            style={styles.bouquetContainer}
          >
            <Animated.View style={[styles.bouquetGlow, glowStyle]} />
            <Image
              source={require("../../assets/images/flower-bouquet.png")}
              style={styles.bouquetImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Text */}
          <Animated.View
            entering={FadeIn.duration(800).delay(1000)}
            style={styles.textContainer}
          >
            <View style={styles.textDecor}>
              <View style={styles.decorLine} />
              <Feather name="heart" size={12} color={ValentineColors.primary} />
              <View style={styles.decorLine} />
            </View>
            <ThemedText type="romantic" style={styles.mainText}>For you, Sara</ThemedText>
            <ThemedText type="small" style={styles.date}>February 14, 2026</ThemedText>
          </Animated.View>

          {/* Buttons */}
          <Animated.View
            entering={FadeInUp.duration(600).delay(1400)}
            style={styles.buttonContainer}
          >
            <AnimatedPressable
              onPress={handleSaveImage}
              onPressIn={() => handlePressIn(saveScale)}
              onPressOut={() => handlePressOut(saveScale)}
              style={[styles.button, saveAnimatedStyle]}
              testID="button-save-image"
            >
              <LinearGradient
                colors={[ValentineColors.primary, "#FF8FA3"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Feather name="download" size={16} color="#FFFFFF" />
                <ThemedText style={styles.buttonText}>Save</ThemedText>
              </LinearGradient>
            </AnimatedPressable>

            <AnimatedPressable
              onPress={handleShare}
              onPressIn={() => handlePressIn(shareScale)}
              onPressOut={() => handlePressOut(shareScale)}
              style={[styles.shareButton, shareAnimatedStyle]}
              testID="button-share"
            >
              <Feather name="share-2" size={16} color={ValentineColors.primary} />
              <ThemedText style={styles.shareButtonText}>Share</ThemedText>
            </AnimatedPressable>
          </Animated.View>

          {/* Signature */}
          <Animated.View
            entering={FadeIn.duration(600).delay(1700)}
            style={styles.signatureContainer}
          >
            <ThemedText type="romantic" style={styles.signature}>with love, Brady</ThemedText>
            <View style={styles.heartRow}>
              <Feather name="heart" size={8} color={ValentineColors.primary} />
              <Feather name="heart" size={12} color={ValentineColors.primary} style={styles.heartSpacing} />
              <Feather name="heart" size={8} color={ValentineColors.primary} />
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  heartsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    justifyContent: "space-between",
  },
  bouquetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: height * 0.48,
    position: "relative",
  },
  bouquetGlow: {
    position: "absolute",
    width: width * 0.9,
    height: height * 0.45,
    borderRadius: width * 0.45,
    backgroundColor: ValentineColors.primary,
  },
  bouquetImage: {
    width: width * 0.75,
    height: height * 0.42,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  textDecor: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  decorLine: {
    width: 35,
    height: 1,
    backgroundColor: ValentineColors.primary,
    opacity: 0.4,
    marginHorizontal: Spacing.sm,
  },
  mainText: {
    fontSize: 36,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  date: {
    letterSpacing: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  button: {
    borderRadius: BorderRadius.full,
    overflow: "hidden",
    elevation: 4,
    shadowColor: ValentineColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  buttonText: {
    fontFamily: "Lato_700Bold",
    fontSize: 15,
    color: "#FFFFFF",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: ValentineColors.primary,
  },
  shareButtonText: {
    fontFamily: "Lato_700Bold",
    fontSize: 15,
    color: ValentineColors.primary,
  },
  signatureContainer: {
    alignItems: "center",
  },
  signature: {
    fontSize: 18,
    marginBottom: Spacing.xs,
  },
  heartRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  heartSpacing: {
    marginHorizontal: 4,
  },
});
