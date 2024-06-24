import React, { useState, useCallback } from "react";
import { BaseMovieProps } from "../types/interfaces";


interface MovieContextInterface {
    favourites: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addToPlaylist: (movie) => { movie.id }
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);;

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
}, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [playlist, setPlaylist] = useState<number[]>([]);  // NEW

    const addToPlaylist = useCallback((movie: BaseMovieProps) => {  // NEW
        setPlaylist((prevPlaylist) => {
            if (!prevPlaylist.includes(movie.id)) {
                return [...prevPlaylist, movie.id];
            }
            return prevPlaylist;
        });
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addToPlaylist,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;