package fr.isep.vlacich.thibault.rockpaperscissors.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Round {
  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id")
  @JsonBackReference
  private Game game;

  @Enumerated(EnumType.STRING)
  private RoundChoice playerChoice;

  @Enumerated(EnumType.STRING)
  private RoundChoice serverChoice;

  public Round(RoundChoice playerChoice, RoundChoice serverChoice) {
    this.playerChoice = playerChoice;
    this.serverChoice = serverChoice;
  }

  @Transient
  public RoundResult getResult() {
    if (this.playerChoice == this.serverChoice) {
      // Player and Server chose the same choice
      return RoundResult.DRAW;
    } else if (this.serverChoice == RoundChoice.ROCK) {
      if (this.playerChoice == RoundChoice.PAPER) {
        // Paper wins over rock
        return RoundResult.WIN;
      } else {
        // Scissors lose over rock
        return RoundResult.LOSE;
      }
    } else if (this.serverChoice == RoundChoice.PAPER) {
      if (this.playerChoice == RoundChoice.ROCK) {
        // Rock loses over paper
        return RoundResult.LOSE;
      } else {
        // Scissors win over paper
        return RoundResult.WIN;
      }
    } else if (this.serverChoice == RoundChoice.SCISSORS) {
      if (this.playerChoice == RoundChoice.ROCK) {
        // Rock wins over scissors
        return RoundResult.WIN;
      } else {
        // Paper loses over scissors
        return RoundResult.LOSE;
      }
    }

    // Unknown case
    return null;
  }
}
