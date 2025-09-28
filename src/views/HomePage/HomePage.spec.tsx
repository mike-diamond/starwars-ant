import * as React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import HomePage from './HomePage'

import {
  act,
  render,
  screen,
  waitFor,
  UserEvent,
  userEvent,
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

  it('renders home page', async () => {
    (usePersons as any).mockImplementation(() => ({
      data: {
        count: 0,
        results: []
      }
    }))

    render(<HomePage / >)
  })

  it('shows error alert when error exists', () => {
    (usePersons as any).mockImplementation(() => ({
      data: {},
      error: { message: 'Error!' },
      isPending: false,
    }))

    expect(screen.getByText('Error!')).toBeInTheDocument()
  })
})

