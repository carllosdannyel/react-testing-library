import { render, screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../pages';

describe('Teste o componente NotFound', () => {
  it(`Teste se a página contém um heading h2
  com o texto Page requested not found 😭`, () => {
    render(<NotFound />);

    const title = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(title).toBeInTheDocument();
  });

  it(`Teste se a página mostra a imagem
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    render(<NotFound />);

    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(image).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
