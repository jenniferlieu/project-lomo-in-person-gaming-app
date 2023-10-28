import { render, screen } from '@testing-library/react';
import App from './App';
import nock from 'nock';
import BeaconCreation from './BeaconCreation';
import { Button } from '@mui/material';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

/*

test('confirm beacon creation', () =>{
  const input = nock('http://localhost')
    .post('/api/beacons')
    .once()
    .reply(201, {
      data: {
        host_id,
        title,
        game_title,
        game_image,
        descirption,
        date_time,
        address,
        latitude,
        longtitude,
        players_needed,
        players_attending,
        comments,
        updated_at,
        created_at,
        _id
      }
    })
    render(<BeaconCreation/>);
    BeaconCreation.click(Button.BeaconCreation)
});
*/