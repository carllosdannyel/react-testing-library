import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Teste o componente App.', () => {
  describe('Teste se os links contém os respectivos nomes', () => {
    test('O primeiro link deve possuir o texto Home', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const homeLink = screen.getByRole('link', { name: /Home/i });
      expect(homeLink).toBeInTheDocument();
    });

    test('O segundo link deve possuir o texto About', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const aboutLink = screen.getByRole('link', { name: /About/i });
      expect(aboutLink).toBeInTheDocument();
    });

    test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const favoritePokemonsLink = screen.getByRole('link', {
        name: /Favorite Pokémons/i,
      });
      expect(favoritePokemonsLink).toBeInTheDocument();
    });
  });
});
