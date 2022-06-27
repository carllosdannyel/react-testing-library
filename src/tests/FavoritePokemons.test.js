import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Teste o componente FavoritePokemons', () => {
  it(`Teste se é exibida na tela a mensagem "No favorite pokemon found",
  caso a pessoa não tenha pokémons favoritos`, () => {
    render(<FavoritePokemons />);

    const title = screen.getByText(/No favorite pokemon found/i);

    expect(title).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    pokemons.forEach((pokemon) => {
      const name = screen.getByText(pokemon.name);
      expect(name).toBeInTheDocument();
    });
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    renderWithRouter(<FavoritePokemons />);
    const queryIdName = screen.queryByTestId('pokemon-name');
    expect(queryIdName).not.toBeInTheDocument();
  });
});
