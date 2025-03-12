import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

 
export default NextAuth(authConfig).auth;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET!});
  
  
  // Verifica si el usuario está autenticado
  if (!token) {
    // Si no está autenticado, redirige a la página de inicio de sesión
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Si está autenticado, permite el acceso a la ruta
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/'], // Rutas que quieres proteger  
};
