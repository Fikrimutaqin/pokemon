import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicInput from '../BasicInput';
import React from 'react';

describe('BasicInput Component', () => {
  // check if the input actually renders and shows our placeholder
  it('should render the input field with correct placeholder', () => {
    render(<BasicInput placeholder="Type a name..." value="" onChange={() => { }} type={''} />);

    // try to find the element by looking for its placeholder text
    const inputElement = screen.getByPlaceholderText('Type a name...');
    expect(inputElement).toBeDefined();
  });

  // make sure it responds when a user starts typing
  it('should call onChange handler when user types', () => {
    const handleChange = vi.fn();

    render(<BasicInput placeholder="Search" value="" onChange={handleChange} type={''} />);
    const inputElement = screen.getByPlaceholderText('Search');

    // simulate the user typing "pikachu" into the search bar
    fireEvent.change(inputElement, { target: { value: 'pikachu' } });

    // ensure our onChange callback actually caught the event
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
