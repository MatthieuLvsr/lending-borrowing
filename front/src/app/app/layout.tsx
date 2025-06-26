import { Header } from '@/components/dashboard/header';
import { Footer } from '@/components/footer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center px-4 py-10 md:px-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
