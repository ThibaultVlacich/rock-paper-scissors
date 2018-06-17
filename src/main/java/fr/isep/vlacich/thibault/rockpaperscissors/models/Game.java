package fr.isep.vlacich.thibault.rockpaperscissors.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Game {
  @Id
  @GeneratedValue
  private Long id;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "game")
  @JsonManagedReference
  private List<Round> rounds = new ArrayList<>();

  @Transient
  public Integer getScore() {
    Integer score = 0;

    for (Round round: rounds) {
      switch (round.getResult()) {
        case WIN:
          score += 1;
        case LOSE:
          score -= 1;
        case DRAW:
          // Do nothing
          break;
      }
    }

    return score;
  }
}
