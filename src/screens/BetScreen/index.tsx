import { GameActions, GamesButtons, Logo, NumbersButtons } from "@components";
import { GamesState, GameType } from "@shared/types";
import { gamesActions } from "@store/games";
import { getGamesData } from "@store/games/thunk";
import { useEffect } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";

export const BetScreen = () => {
  const dispatch = useDispatch();
  const games = useSelector((state: GamesState) => state.games.types);
  const activeGame = useSelector((state: GamesState) => state.games.activeGame);
  const selectedNumbers = useSelector((state: GamesState) => state.games.selectedNumbers);

  useEffect(() => {
    dispatch(getGamesData());
  }, []);

  const handleGameFilter = (clickedGame: GameType) => {
    const selectedGame = games.find((game) => game.id === clickedGame.id);

    dispatch(gamesActions.setActiveGame({ selectedGame }));
    dispatch(gamesActions.setSelectedNumbers({ selectedNumbers: [] }));
  }

  const checkIfGameIsActive = (game: GameType) => {
    return activeGame.id === game.id;
  }

  const handleNumberButtonClick = (selectedNumber: number) => {
    if(selectedNumbers.includes(selectedNumber)) {
      const filteredSelectedNumbers = selectedNumbers.filter((number) => {
        return number !== selectedNumber;
      });

      dispatch(gamesActions.setSelectedNumbers({ selectedNumbers: filteredSelectedNumbers }));
    } else if (selectedNumbers.length === activeGame.max_number) {
      Alert.alert(`You already chose ${activeGame.max_number} numbers!`);
      return;
    } else {      
      dispatch(gamesActions.setSelectedNumbers({ selectedNumbers: [...selectedNumbers, selectedNumber] }));
    }
  }

  const checkIfNumberIsSelected = (number: number) => {
    return selectedNumbers.includes(number);
  }

  return (
    <S.Container>
      <S.Content contentContainerStyle={{
        alignItems: "center"
      }}>
        <Logo />
        <S.Title>
          <S.NewBet>NEW BET </S.NewBet>
          <S.GameName>FOR {activeGame.type.toUpperCase()}</S.GameName>
        </S.Title>
        <GamesButtons
          title="Choose a game"
          types={games}
          handleGameFilter={handleGameFilter}
          isActive={checkIfGameIsActive}
        />
        <S.GameDescription>          
          <S.SubTitle>Fill your bet</S.SubTitle>
          <S.Description>{activeGame.description}</S.Description>
        </S.GameDescription>
        <NumbersButtons 
          color={activeGame.color}
          range={activeGame.range} 
          handleNumberButtonClick={handleNumberButtonClick}
          checkIfNumberIsSelected={checkIfNumberIsSelected}
        />        
        <GameActions />
      </S.Content>
    </S.Container>
  )
}
