import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente PokemonDetails', () => {
  beforeEach(() => renderWithRouter(<App />));

  it(`Teste se as informações detalhadas do pokémon selecionado
  são mostradas na tela`, () => {
    const link = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(link).toBeInTheDocument();
    userEvent.click(link);

    const pokemonName = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });

    expect(pokemonName).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });

    expect(summary).toBeInTheDocument();

    const details = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them/i,
    );
    expect(details).toBeInTheDocument();
  });

  it(`Teste se existe na página uma seção com os mapas contendo
  as localizações do pokémon`, () => {
    const link = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(link).toBeInTheDocument();
    userEvent.click(link);

    const gameLocations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });

    expect(gameLocations).toBeInTheDocument();

    const firstLocation = screen.getByText(/kanto viridian forest/i);
    const secondLocation = screen.getByText(/kanto power plant/i);

    expect(firstLocation).toBeInTheDocument();
    expect(secondLocation).toBeInTheDocument();

    const srcUrl = screen.getAllByAltText('Pikachu location');

    expect(srcUrl[0]).toHaveAttribute(
      'src',
      'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif',
    );
    expect(srcUrl[1]).toHaveAttribute(
      'src',
      'https://pwo-wiki.info/images/5/5b/Pp.gif',
    );
  });

  it(`Teste se existe na página uma seção com os mapas contendo
  as localizações do pokémon`, () => {
    const link = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(link).toBeInTheDocument();
    userEvent.click(link);

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
      checked: false,
    });

    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const checkboxTrue = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
      checked: true,
    });

    expect(checkboxTrue).toBeInTheDocument();
    userEvent.click(checkboxTrue);

    const checkboxFalse = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
      checked: false,
    });

    expect(checkboxFalse).toBeInTheDocument();

    const labelCheckbox = screen.getByText(/pokémon favoritado\?/i);
    expect(labelCheckbox).toBeInTheDocument();
  });
});
