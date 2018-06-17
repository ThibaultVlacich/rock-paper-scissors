package fr.isep.vlacich.thibault.rockpaperscissors.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Game {
  private @Id @GeneratedValue Long id;

  @Enumerated(EnumType.STRING)
  private GameChoice playerChoice;

  @Enumerated(EnumType.STRING)
  private GameChoice serverChoice;

  public Game(GameChoice playerChoice, GameChoice serverChoice) {
    this.playerChoice = playerChoice;
    this.serverChoice = serverChoice;
  }
}
