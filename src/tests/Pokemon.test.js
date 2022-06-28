import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokemon', () => {
  beforeEach(() => {
    render(
      <Pokemon pokemon={ pokemons[0] } showDetailsLink={ false } isFavorite />,
    );
  });

  it(`Teste se é renderizado um card com
  as informações de determinado pokémon`, () => {
    const pokemonName = screen.getByText(/Pikachu/i);
    const pokemonType = screen.getByText(/Electric/i);
    const pokemonWeight = screen.getByText(/Average weight: 6\.0 kg/i);
    const pokemonImage = screen.getByRole('img', { name: /Pikachu sprite/i });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    );
  });

  it(`Teste se o card do pokémon indicado na Pokédex contém
  um link de navegação para exibir detalhes deste pokémon.`, () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[0]] }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    const linkDetails = screen.getByRole('link', { name: /More details/i });

    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it(`Teste se a URL exibida no navegador muda para
  /pokemon/<id>`, () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokedex
          pokemons={ [pokemons[0]] }
          isPokemonFavoriteById={ { 25: false } }
        />
      </Router>,
    );

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const favorite = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });

    expect(favorite).toBeInTheDocument();
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
