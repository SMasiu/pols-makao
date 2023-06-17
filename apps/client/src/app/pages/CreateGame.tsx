import { useMutation } from '@apollo/client';
import { Form, Input, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { apiClient, CREATE_GAME_MUTATION, IS_IN_GAME_QUERY } from '../api';
import { CardContent, FormFooter, FormLayout } from '../components';

const { Title } = Typography;

export interface CreateGamePayload {
  gameName: string;
  playerName: string;
}

export const CreateGamePage = () => {
  const [createGame] = useMutation(CREATE_GAME_MUTATION);

  const onFinish = async (values: CreateGamePayload) => {
    const { gameName, playerName } = values;

    await createGame({
      variables: {
        game: {
          name: gameName,
        },
        player: {
          name: playerName,
        },
      },
    });

    await apiClient.refetchQueries({ include: [IS_IN_GAME_QUERY] });
  };

  return (
    <FormLayout>
      <CardContent>
        <Title>Create game</Title>
        <Form onFinish={onFinish}>
          <Form.Item
            label="Game name"
            name="gameName"
            rules={[{ required: true, message: 'Please input game name!' }]}
          >
            <Input />
          </Form.Item>
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
                Create
              </Button>
            </FormFooter>
          </Form.Item>
        </Form>
      </CardContent>
    </FormLayout>
  );
};
