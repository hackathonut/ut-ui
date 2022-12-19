import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createTheme, globalCss, NextUIProvider } from '@nextui-org/react'
import { UserContext, UserContextProvider, Web3ContextProvider } from '../context';

const darkTheme = createTheme({
  type: 'dark'
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            value={{
              light: darkTheme.className,
              dark: darkTheme.className
            }}
          >
            <UserContextProvider>
              <NextUIProvider>
                <Component {...pageProps} />
              </NextUIProvider>
            </UserContextProvider>
      </NextThemesProvider>
    </Web3ContextProvider>

    
  )
}
