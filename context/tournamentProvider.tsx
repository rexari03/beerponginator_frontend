"use client"

import React, {ReactNode, useState} from 'react';
import {TournamentContext} from './tournamentContext';

interface TournamentProviderProps {
    children: ReactNode;
}

export const TournamentProvider = ({children}: TournamentProviderProps) => {
    const [tournamentId, setTournamentId] = useState<string | null>(null);

    return (
        <TournamentContext.Provider value={{tournamentId, setTournamentId}}>
            {children}
        </TournamentContext.Provider>
    );
};