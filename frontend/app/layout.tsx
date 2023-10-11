import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from "@/redux/provider";
import { ChakraProvider } from "@chakra-ui/react";
import { Header, Launcher } from "@/components/Common";
import type { Metadata as RawMetadata } from "next";

interface Metadata extends RawMetadata {
    'application-name': string;
}

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
    title: 'IVBO-11-23 Hub',
    description: 'на описание фантазии не хватило, сори',
    'application-name': 'IVBO-11-23 Hub',
    manifest: '/manifest.json'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <html lang='en'>
    <body className={inter.className}>
    <Provider>
        <ChakraProvider>
            <Launcher />
            <Header />

            <main style={{ width: '100%', minHeight: '96vh', padding: '50px 0px 120px 0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </main>
        </ChakraProvider>
    </Provider>
    </body>
    </html>
}
