import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, ScrollView, Image, Alert, Platform } from "react-native";
import {
  Text,
  Button,
  Appbar,
  ProgressBar,
  MD2Colors,
} from "react-native-paper";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../types/navigation";

import { CookingModeScreenStyles } from "../styles/CookingModeScreenStyles";

type CookingModeScreenRouteProp = RouteProp<RootParamList, "CookingModeScreen">;
type CookingModeScreenNavigationProp = StackNavigationProp<
  RootParamList,
  "CookingModeScreen"
>;

export default function CookingModeScreen() {
  const route = useRoute<CookingModeScreenRouteProp>();
  const navigation = useNavigation<CookingModeScreenNavigationProp>();
  const { recipe } = route.params;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentInstruction = recipe.instructions[currentStepIndex];
  const totalSteps = recipe.instructions.length;

  // Zamanlayıcıyı başlatma/durdurma
  const toggleTimer = useCallback(() => {
    if (timerRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setTimerRunning(false);
    } else {
      if (currentInstruction.timerDuration && timeLeft === null) {
        setTimeLeft(currentInstruction.timerDuration * 60);
      } else if (timeLeft === 0) {
        setTimeLeft((currentInstruction.timerDuration || 0) * 60);
      }
      setTimerRunning(true);
    }
  }, [timerRunning, currentInstruction.timerDuration, timeLeft]);

  useEffect(() => {
    if (timerRunning && timeLeft !== null && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime !== null && prevTime > 1) {
            return prevTime - 1;
          } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTimerRunning(false);
            Alert.alert("Time's Up!", "Your timer has finished!");
            return 0;
          }
        });
      }, 1000);
    } else if (timerRunning && timeLeft === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimerRunning(false);
      Alert.alert("Time's Up!", "Your timer has finished!");
    } else if (!timerRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerRunning, timeLeft]);

  useEffect(() => {
    if (currentInstruction.timerDuration) {
      setTimeLeft(currentInstruction.timerDuration * 60);
    } else {
      setTimeLeft(null);
    }
    setTimerRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [currentStepIndex, recipe.instructions]);

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      Alert.alert("Congratulations!", "You have completed all the steps!");
      navigation.goBack();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null || isNaN(seconds)) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = totalSteps > 1 ? (currentStepIndex + 1) / totalSteps : 1;

  return (
    <View style={CookingModeScreenStyles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={recipe.title}
          subtitle={`Step ${currentStepIndex + 1} of ${totalSteps}`}
        />
      </Appbar.Header>

      <ProgressBar
        progress={progress}
        color={MD2Colors.red500}
        style={CookingModeScreenStyles.progressBar}
      />

      <ScrollView contentContainerStyle={CookingModeScreenStyles.content}>
        <Text variant="titleLarge" style={CookingModeScreenStyles.stepTitle}>
          Step {currentStepIndex + 1}
        </Text>
        <Text
          variant="bodyLarge"
          style={CookingModeScreenStyles.instructionText}
        >
          {currentInstruction.step}
        </Text>

        {currentInstruction.photoUri && (
          <Image
            source={{ uri: currentInstruction.photoUri }}
            style={CookingModeScreenStyles.instructionImage}
          />
        )}

        {/* Zamanlayıcı Gösterimi */}
        {currentInstruction.timerDuration !== undefined &&
          currentInstruction.timerDuration > 0 && (
            <View style={CookingModeScreenStyles.timerContainer}>
              <Text
                variant="headlineSmall"
                style={CookingModeScreenStyles.timerText}
              >
                {formatTime(timeLeft)}
              </Text>
              <Button
                mode="contained"
                onPress={toggleTimer}
                icon={timerRunning ? "pause" : "play"}
                style={CookingModeScreenStyles.timerButton}
              >
                {timerRunning
                  ? "Pause Timer"
                  : timeLeft === 0
                  ? "Restart Timer"
                  : "Start Timer"}
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  setTimerRunning(false);
                  setTimeLeft((currentInstruction.timerDuration || 0) * 60);
                }}
                icon="refresh"
                style={CookingModeScreenStyles.resetButton}
              >
                Reset
              </Button>
            </View>
          )}
      </ScrollView>

      <View style={CookingModeScreenStyles.navigationButtons}>
        <Button
          mode="contained"
          onPress={handlePrev}
          disabled={currentStepIndex === 0}
          icon="arrow-left"
          style={CookingModeScreenStyles.navButton}
        >
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={handleNext}
          icon="arrow-right"
          contentStyle={{ flexDirection: "row-reverse" }}
          style={CookingModeScreenStyles.navButton}
        >
          {currentStepIndex === totalSteps - 1 ? "Finish" : "Next"}
        </Button>
      </View>
    </View>
  );
}
