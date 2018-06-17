package fr.isep.vlacich.thibault.rockpaperscissors.controllers;

import fr.isep.vlacich.thibault.rockpaperscissors.models.Game;
import fr.isep.vlacich.thibault.rockpaperscissors.models.GameChoice;
import fr.isep.vlacich.thibault.rockpaperscissors.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RepositoryRestController
public class GameController {
  @Autowired
  GameRepository gameRepository;

  @RequestMapping(method = RequestMethod.POST, value="/games")
  public @ResponseBody ResponseEntity<?> createGame(@RequestBody Game game) {
    if (game == null) {
      return ResponseEntity.badRequest().body("Request badly formatted");
    }

    GameChoice serverChoice = GameChoice.randomChoice();
    game.setServerChoice(serverChoice);

    gameRepository.save(game);

    return ResponseEntity.ok(game);
  }
}
