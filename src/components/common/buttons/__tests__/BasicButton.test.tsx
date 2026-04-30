import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicButton from '../BasicButton';
import React from 'react';

describe('BasicButton Component', () => {
  // standard render test to make sure the button actually shows up in the DOM
  it('should render the button with children correctly', () => {
    render(<BasicButton>Test Button</BasicButton>);
    
    // look for a button with the text "Test Button"
    const buttonElement = screen.getByRole('button', { name: /Test Button/i });
    expect(buttonElement).toBeDefined();
  });

  // verify that clicking the button actually fires our onClick handler
  it('should call onClick handler when clicked', () => {
    // create a mock function so we can spy on how many times it gets called
    const handleClick = vi.fn();
    
    render(<BasicButton onClick={handleClick}>Click Me</BasicButton>);
    const buttonElement = screen.getByRole('button', { name: /Click Me/i });
    
    // simulate a user clicking this button
    fireEvent.click(buttonElement);
    
    // it should have been fired exactly once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // make sure nobody can click the button if we've disabled it
  it('should not trigger onClick when disabled', () => {
    const handleClick = vi.fn();
    
    render(<BasicButton onClick={handleClick} disabled>Disabled Button</BasicButton>);
    const buttonElement = screen.getByRole('button', { name: /Disabled Button/i });
    
    // try to force a click anyway
    fireEvent.click(buttonElement);
    
    // nope, the click handler should never have been called
    expect(handleClick).not.toHaveBeenCalled();
    // double check that the HTML disabled attribute is actually set
    expect((buttonElement as HTMLButtonElement).disabled).toBeTruthy();
  });
});
