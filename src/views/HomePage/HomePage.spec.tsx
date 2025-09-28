import * as React from 'react'
import { describe, it, vi } from 'vitest'

import HomePage from './HomePage'

import {
  render,
  screen,
} from '../../tests'

vi.mock('./util', () => {
  return {
    usePersons: vi.fn()
  }
})

import { usePersons } from './util'

describe('HomePage', () => {

  afterEach(() => {
    (usePersons as any).mockReset()
  })

  it('renders home page', () => {
    (usePersons as any).mockImplementation(() => ({
      data: {
        count: 0,
        results: []
      }
    }))

    render(<HomePage / >)
  })

  it('shows error message when error exists', () => {
    (usePersons as any).mockImplementation(() => ({
      data: {},
      error: { message: 'Error!' },
      isPending: false,
    }))

    render(<HomePage / >)

    expect(screen.getByText('Error!')).toBeInTheDocument()
  })

  it('shows no persons found when data is empty', () => {
    (usePersons as any).mockImplementation(() => ({
      data: { results: [], count: 0 },
      isPending: false,
    }))

    render(<HomePage / >)

    expect(screen.getByText('No persons found')).toBeInTheDocument()
  })


  it('renders list items when data has results', () => {
    (usePersons as any).mockImplementation(() => ({
      data: {
        results: [
          {
            name: 'John Doe',
            gender: 'male',
            birth_year: '1800',
            url: '/people/1',
          }
        ],
        count: 1,
      },
      error: null,
      isPending: false
    }))

    render(<HomePage / >)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
