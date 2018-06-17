package fr.isep.vlacich.thibault.rockpaperscissors.controllers;

import fr.isep.vlacich.thibault.rockpaperscissors.models.Game;
import fr.isep.vlacich.thibault.rockpaperscissors.models.Round;
import fr.isep.vlacich.thibault.rockpaperscissors.models.RoundChoice;
import fr.isep.vlacich.thibault.rockpaperscissors.repositories.GameRepository;
import fr.isep.vlacich.thibault.rockpaperscissors.repositories.RoundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RepositoryRestController
@RequestMapping("/games")
public class GameController {
  @Autowired
  GameRepository gameRepository;

  @Autowired
  RoundRepository roundRepository;

  @RequestMapping(method = RequestMethod.PUT, value="")
  public @ResponseBody ResponseEntity<Game> createGame() {
    Game game = new Game();
    gameRepository.save(game);

    return new ResponseEntity<>(game, HttpStatus.CREATED);
  }

  @RequestMapping(method = RequestMethod.PUT, value="/{id}")
  public @ResponseBody ResponseEntity<Round> createRound(@PathVariable("id") Long gameId, @RequestBody Round round) {
    Optional<Game> game = gameRepository.findById(gameId);

    if (!game.isPresent()) {
      return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    round.setGame(game.get());
    round.setServerChoice(RoundChoice.randomChoice());
    roundRepository.save(round);

    return new ResponseEntity<>(round, HttpStatus.CREATED);
  }
}
