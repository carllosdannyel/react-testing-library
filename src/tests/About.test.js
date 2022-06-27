import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';

describe('Teste o componente About', () => {
  it('A página deve conter as informações sobre a Pokédex.', () => {
    render(<About />);

    const paragraph1 = screen.getByText(
      /This application simulates a Pokédex/i,
    );
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const headingH2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(headingH2).toBeInTheDocument();
  });

  it('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const paragraphs = screen.getAllByText(/pokémons/i);

    expect(paragraphs.length).toBe(2);
  });

  it('Teste se a página contém a imagem de uma Pokédex com src correta', () => {
    render(<About />);

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
