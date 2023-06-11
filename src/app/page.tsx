import Nav from '@/app/components/home_nav';

export default function Home() {
  return (
      <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='fixed top-0 flex justify-end'>
        <Nav />
      </div>
    </main>
      </>
  )
}
