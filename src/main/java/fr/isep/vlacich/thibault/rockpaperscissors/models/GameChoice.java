package fr.isep.vlacich.thibault.rockpaperscissors.models;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public enum GameChoice {
  ROCK,
  PAPER,
  SCISSORS;

  private static final List<GameChoice> VALUES = Collections.unmodifiableList(Arrays.asList(values()));
  private static final int SIZE = VALUES.size();
  private static final Random RANDOM = new Random();

  public static GameChoice randomChoice()  {
    return VALUES.get(RANDOM.nextInt(SIZE));
  }
}
