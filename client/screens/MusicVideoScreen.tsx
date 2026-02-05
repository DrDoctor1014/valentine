import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Dimensions, Platform } from "react-native";
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
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useVideoPlayer, VideoView } from "expo-video";

import { ValentineColors, Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const VIDEO_WIDTH = width - Spacing.xl * 2;
const VIDEO_HEIGHT = VIDEO_WIDTH * (9 / 16);

const VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

// Floating music note
function FloatingNote({ delay, x, y, icon }: { delay: number; x: number; y: number; icon: "music" | "headphones" }) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.4);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-12, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
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
    rotate.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(10, { duration: 2000 }),
          withTiming(-10, { duration: 2000 })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[{ position: "absolute", left: x, top: y }, animatedStyle]}>
      <Feather name={icon} size={16} color={ValentineColors.primary} />
    </Animated.View>
  );
}

export default function MusicVideoScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const playScale = useSharedValue(1);
  const playGlow = useSharedValue(0.3);

  const player = useVideoPlayer(VIDEO_URL, (player) => {
    player.loop = true;
    player.muted = true;
  });

  useEffect(() => {
    playGlow.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1200 }),
        withTiming(0.3, { duration: 1200 })
      ),
      -1,
      true
    );
  }, []);

  const playAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: playScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: isPlaying ? 0 : playGlow.value,
  }));

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    player.pause();
    navigation.goBack();
  };

  const handlePlay = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    playScale.value = withSpring(0.9, { damping: 15, stiffness: 150 });
    setTimeout(() => {
      playScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    }, 100);

    if (!hasStarted) {
      player.muted = false;
      setHasStarted(true);
    }

    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2D2327", "#3D2830", "#4A3133", "#3D2830"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating music notes */}
      <FloatingNote delay={0} x={width * 0.08} y={height * 0.18} icon="music" />
      <FloatingNote delay={600} x={width * 0.88} y={height * 0.22} icon="headphones" />
      <FloatingNote delay={1200} x={width * 0.1} y={height * 0.7} icon="music" />
      <FloatingNote delay={900} x={width * 0.85} y={height * 0.65} icon="music" />

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
            testID="button-close-video"
          >
            <Feather name="x" size={20} color="rgba(255,255,255,0.8)" />
          </Pressable>
        </Animated.View>

        {/* Title */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.titleContainer}
        >
          <View style={styles.titleDecor}>
            <Feather name="music" size={16} color={ValentineColors.primary} />
          </View>
          <Animated.Text style={styles.title}>A Song for You</Animated.Text>
          <View style={styles.titleDecor}>
            <Feather name="music" size={16} color={ValentineColors.primary} />
          </View>
        </Animated.View>

        {/* Video Player */}
        <Animated.View
          entering={FadeIn.duration(700).delay(400)}
          style={styles.videoContainer}
        >
          <View style={styles.videoFrame}>
            <View style={styles.videoWrapper}>
              <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen
                allowsPictureInPicture={Platform.OS !== "web"}
                contentFit="contain"
              />

              {/* Play Overlay */}
              {!isPlaying && (
                <Pressable
                  onPress={handlePlay}
                  style={styles.playOverlay}
                  testID="button-play-video"
                >
                  <Animated.View style={[styles.playGlow, glowStyle]} />
                  <Animated.View style={[styles.playButton, playAnimatedStyle]}>
                    <Feather name="play" size={32} color="#FFFFFF" />
                  </Animated.View>
                </Pressable>
              )}
            </View>
          </View>

          {/* Controls */}
          {hasStarted && (
            <Animated.View
              entering={FadeIn.duration(400)}
              style={styles.controlsContainer}
            >
              <Pressable
                onPress={handlePlay}
                style={styles.controlButton}
                testID="button-toggle-play"
              >
                <Feather
                  name={isPlaying ? "pause" : "play"}
                  size={20}
                  color="rgba(255,255,255,0.9)"
                />
              </Pressable>
            </Animated.View>
          )}
        </Animated.View>

        {/* Signature */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(700)}
          style={styles.signatureContainer}
        >
          <View style={styles.heartRow}>
            <Feather name="heart" size={10} color={ValentineColors.primary} />
            <Feather name="heart" size={14} color={ValentineColors.primary} style={styles.heartSpacing} />
            <Feather name="heart" size={10} color={ValentineColors.primary} />
          </View>
          <Animated.Text style={styles.signature}>Love, Brady</Animated.Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2327",
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
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
    color: "#FFFFFF",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  videoFrame: {
    padding: 3,
    borderRadius: BorderRadius.xl,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  videoWrapper: {
    width: VIDEO_WIDTH - 6,
    height: VIDEO_HEIGHT,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    backgroundColor: "#000000",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  playGlow: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: ValentineColors.primary,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: ValentineColors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
    elevation: 6,
    shadowColor: ValentineColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.xl,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  signatureContainer: {
    alignItems: "center",
    marginTop: Spacing["2xl"],
  },
  heartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  heartSpacing: {
    marginHorizontal: 6,
  },
  signature: {
    fontFamily: "Satisfy_400Regular",
    fontSize: 24,
    color: ValentineColors.primary,
  },
});
