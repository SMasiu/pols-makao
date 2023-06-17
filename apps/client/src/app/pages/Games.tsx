import { useQuery } from '@apollo/client';
import { List, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { GET_GAMES_QUERY } from '../api';
import { CardContent, FormLayout } from '../components';
import { GameListItem } from '../types';

const { Title } = Typography;

export const GamesPage = () => {
  const { data } = useQuery<{ getGames: GameListItem[] }>(GET_GAMES_QUERY);

  return (
    <FormLayout>
      <CardContent>
        <Title>Games</Title>
        <List
          itemLayout="horizontal"
          dataSource={data?.getGames || []}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link
                  to="/join"
                  state={{
                    gameId: item.id,
                  }}
                >
                  Join
                </Link>,
              ]}
            >
              <List.Item.Meta
                title={<span>{item.name}</span>}
                description={`Players ${item.players.length} (${item.players
                  .map((player) => player.name)
                  .join(', ')})`}
              />
            </List.Item>
          )}
        />
        <Link to="/create">
          <Button type="ghost" style={{ width: '100%' }} size="large">
            Create game
          </Button>
        </Link>
      </CardContent>
    </FormLayout>
  );
};
