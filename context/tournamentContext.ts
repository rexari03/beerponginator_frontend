import {createContext} from 'react';

interface TournamentContextProps {
    tournamentId: string | null;
    setTournamentId: (id: string) => void;
}

export const TournamentContext = createContext<TournamentContextProps>({
    tournamentId: null,
    setTournamentId: () => {
    },
});