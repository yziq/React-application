import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import Navbar from "../Navbar"
import UserContext from "../UserContext"
import { MemoryRouter } from 'react-router-dom'
import Cookies from 'js-cookie';
jest.mock('js-cookie')


describe('Navbar test', () => {

    it('should render login given user not login ', async () => {

        const { findByText } = render(<MemoryRouter initialEntries={['/']}>
            <UserContext.Provider value={{ userName: undefined }}>
                <Navbar />
            </UserContext.Provider></MemoryRouter>)

        expect(await findByText('Log In')).toBeInTheDocument();
    })

    it('should render username given user already logged in', async () => {

        const { queryByText, findByText } = render(<MemoryRouter initialEntries={['/']}>
            <UserContext.Provider value={{ userName: 'testUser' }}>
                <Navbar />
            </UserContext.Provider></MemoryRouter>)

        expect(await findByText('testUser')).toBeInTheDocument();
    })
})