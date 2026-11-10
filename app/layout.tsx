import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'The Teacher Community',description:'Sua comunidade gamer: publicações, comentários e vídeos do The Teacher.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>;}
