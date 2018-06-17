package fr.isep.vlacich.thibault.rockpaperscissors.repositories;

import fr.isep.vlacich.thibault.rockpaperscissors.models.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, Long> {

}
