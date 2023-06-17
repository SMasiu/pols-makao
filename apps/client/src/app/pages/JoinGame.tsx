import { useMutation } from '@apollo/client';
import { Form, Input, Typography, Button } from 'antd';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { apiClient, IS_IN_GAME_QUERY, JOIN_TO_GAME_MUTATION } from '../api';
import { CardContent, FormFooter, FormLayout } from '../components';

const { Title } = Typography;

export interface JoinToGamePayload {
  playerName: string;
}

export const JoinGamePage = () => {
  const { state } = useLocation() as { state: { gameId: string } | null };
  const [joinToGame] = useMutation(JOIN_TO_GAME_MUTATION);

  if (!state) {
    return <Navigate to="/" />;
  }

  const onFinish = async (values: JoinToGamePayload) => {
    const { playerName } = values;

    await joinToGame({
      variables: {
        gameId: state.gameId,
        player: {
          name: playerName,
        },
      },
    });

    await apiClient.refetchQueries({
      include: [IS_IN_GAME_QUERY],
    });
  };

  return (
    <FormLayout>
      <CardContent>
        <Title>Join to game</Title>
        <Form onFinish={onFinish}>
          <Form.Item
            label="Player name"
            name="playerName"
            rules={[{ required: true, message: 'Please input player name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <FormFooter>
              <Link to="/">
                <Button
                  type="primary"
                  danger
                  size="large"
                  style={{ width: '150px' }}
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: '150px' }}
              >
                Join
              </Button>
            </FormFooter>
          </Form.Item>
        </Form>
      </CardContent>
    </FormLayout>
  );
};
