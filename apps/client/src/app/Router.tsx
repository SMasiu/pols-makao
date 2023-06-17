import { useQuery } from '@apollo/client';
import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IS_IN_GAME_QUERY } from './api';
import { CreateGamePage, GamesPage, JoinGamePage, PlayGamePage } from './pages';

export const Router = () => {
  const { data, loading } = useQuery(IS_IN_GAME_QUERY);

  if (loading) return <p>loading</p>;

  return (
    <Routes>
      {data ? (
        <Fragment>
          <Route path="/play" element={<PlayGamePage />} />
          <Route path="*" element={<Navigate to="/play" />} />
        </Fragment>
      ) : (
        <Fragment>
          <Route path="/" element={<GamesPage />} />
          <Route path="/create" element={<CreateGamePage />} />
          <Route path="/join" element={<JoinGamePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Fragment>
      )}
    </Routes>
  );
};
