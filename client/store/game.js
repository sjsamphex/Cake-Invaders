import axios from 'axios';
import history from '../history';
import { _updateQuiz } from './quiz';
const getToken = () => window.localStorage.getItem('token');
/**
 * ACTION TYPES
 */
const SET_GAME = 'SET_GAME';
const NEXT_STAGE = 'NEXT_STAGE';
const UPDATE_MINI_SCORE = 'UPDATE_MINI_SCORE';
const UPDATE_TOTAL_SCORE = 'UPDATE_TOTAL_SCORE';

/**
 * ACTION CREATORS
 */
const _setGame = (game) => ({ type: SET_GAME, game });
const _nextStage = (game) => ({ type: NEXT_STAGE, game });
export const _updateMiniScore = (score) => ({ type: UPDATE_MINI_SCORE, score });
const _updateTotalScore = (score) => ({ type: UPDATE_TOTAL_SCORE, score });
/**
 * THUNK CREATORS
 */
export const setGame = (userId) => async (dispatch) => {
  const token = getToken();
  const game = (
    await axios.get('/api/game', {
      headers: {
        authorization: token,
      },
    })
  ).data;
  return dispatch(_setGame(game));
};
export const nextStage = () => async (dispatch) => {
  const token = getToken();
  const game = (
    await axios.put(
      '/api/game/next',
      {},
      {
        headers: {
          authorization: token,
        },
      }
    )
  ).data;
  if (game.status === 'finished') {
    history.push('/gameover');
  }
  return dispatch(_nextStage(game));
};

// Update score for any mini-game
export const updateMiniGameScore = (points) => async (dispatch) => {
  const token = getToken();
  const score = (
    await axios.post(
      '/api/game/addScores',
      { points },
      {
        headers: {
          authorization: token,
        },
      }
    )
  ).data;
  // console.log(
  //   `thunk submitted ${points} to back end and got back ${score.total_score}
  //    total from back end`
  // );
  return dispatch(_updateTotalScore(score));
};
/**
 * REDUCER
 */
const initState = {
  pathId: 0,
  gameStage: 0,
  status: 'no-game',
  mini_score: 0,
  mini_status: 'ingame',
  total_score: 0,
};
export default function (state = initState, action) {
  switch (action.type) {
    case SET_GAME:
      return {
        pathId: action.game.pathId,
        gameStage: action.game.stage,
        status: action.game.status,
        mini_score: 0,
        mini_status: 'ingame',
        total_score: action.game.score.total_score,
      };
    case NEXT_STAGE:
      return {
        ...state,
        mini_score: 0,
        mini_status: 'ingame',
        gameStage: action.game.stage,
        status: action.game.status,
      };
    case UPDATE_TOTAL_SCORE:
      return {
        ...state,
        total_score: action.score.total_score,
        mini_status: 'finished',
      };
    case UPDATE_MINI_SCORE:
      return { ...state, mini_score: action.score, mini_status: 'finished' };
    default:
      return state;
  }
}
