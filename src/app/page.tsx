import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect the root domain to the mock login portal for demo purposes
  redirect('/login');
}