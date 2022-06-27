import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo pokémon da lista quando
  o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);

    const button = screen.getByTestId('next-pokemon');
    const pokemon = screen.getByTestId('pokemon-name');

    fireEvent.click(button);
    expect(pokemon.textContent).toBe('Charmander');

    fireEvent.click(button);
    expect(pokemon.textContent).toBe('Caterpie');
  });

  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');

    expect(pokemon.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const buttonsType = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    buttons.forEach(
      (types, index) => expect(types.textContent).toBe(buttonsType[index]),
    );
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });

    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    expect(allButton.textContent).toBe('All');
  });

  it(`Teste seé criado, dinamicamente,um botão de filtro
  para cada tipo de Pokémon.`, () => {
    renderWithRouter(<App />);

    pokemons.forEach(({ type }) => {
      const typeButton = screen.getByRole('button', { name: type });

      expect(typeButton).toBeInTheDocument();
    });
  });

  it(`O botão de Próximo pokémon deve ser desabilitado quando
  tiver um só pokémon`, () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: 'Próximo pokémon' });

    pokemons.forEach(({ type }) => {
      if (type.type === pokemons.type) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });
});
