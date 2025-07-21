import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, CarbonCredit, StakingPosition } from '../types';

interface AppState {
  user: User | null;
  credits: CarbonCredit[];
  stakingPositions: StakingPosition[];
  loading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  language: 'en' | 'es' | 'hi';
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CREDITS'; payload: CarbonCredit[] }
  | { type: 'SET_STAKING_POSITIONS'; payload: StakingPosition[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'es' | 'hi' }
  | { type: 'UPDATE_CREDIT'; payload: CarbonCredit }
  | { type: 'ADD_STAKING_POSITION'; payload: StakingPosition };

const initialState: AppState = {
  user: null,
  credits: [],
  stakingPositions: [],
  loading: false,
  error: null,
  theme: 'light',
  language: 'en',
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CREDITS':
      return { ...state, credits: action.payload };
    case 'SET_STAKING_POSITIONS':
      return { ...state, stakingPositions: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'UPDATE_CREDIT':
      return {
        ...state,
        credits: state.credits.map(credit =>
          credit.id === action.payload.id ? action.payload : credit
        ),
      };
    case 'ADD_STAKING_POSITION':
      return {
        ...state,
        stakingPositions: [...state.stakingPositions, action.payload],
      };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  setUser: (user: User | null) => void;
  setCredits: (credits: CarbonCredit[]) => void;
  setStakingPositions: (positions: StakingPosition[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'en' | 'es' | 'hi') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setUser = (user: User | null) => dispatch({ type: 'SET_USER', payload: user });
  const setCredits = (credits: CarbonCredit[]) => dispatch({ type: 'SET_CREDITS', payload: credits });
  const setStakingPositions = (positions: StakingPosition[]) =>
    dispatch({ type: 'SET_STAKING_POSITIONS', payload: positions });
  const setLoading = (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading });
  const setError = (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error });
  const setTheme = (theme: 'light' | 'dark') => dispatch({ type: 'SET_THEME', payload: theme });
  const setLanguage = (language: 'en' | 'es' | 'hi') =>
    dispatch({ type: 'SET_LANGUAGE', payload: language });

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        setUser,
        setCredits,
        setStakingPositions,
        setLoading,
        setError,
        setTheme,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};