import { useState, useCallback, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { Message } from './models/Message';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const MessageBox = () => {
  const [connection, setConnection] = useState<signalR.HubConnection>();
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const onMessageReceived = useCallback((username: string, message: string) => {
    setMessages((_messages) => [..._messages, { username, message, date: new Date() }]);
  }, []);

  const onSend = (message: string) => {
    // eslint-disable-next-line no-restricted-globals
    connection?.send('message', currentUser?.name, message);
  };

  useEffect(() => {
    const _connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44384/hub')
      .build();
    _connection.on('message', onMessageReceived);
    _connection
      .start()
      .then(() => setConnection(_connection))
      .catch((err) => {
        alert('There was an error connecting to server');
        console.error(err);
      });
  }, [onMessageReceived]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let input = event.currentTarget['message'] as any as HTMLInputElement;
    onSend(input.value);
    event.currentTarget.reset();
  };

  if (!connection) return <div>Loading...</div>;

  return (
    <>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.username} <br />
            {message.message} <br />
            {message.date.toString()}
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={onSubmit} autoComplete="off">
          <input name="message" placeholder="Message" required />
          <button>Send</button>
        </form>
      </div>
    </>
  );
};
