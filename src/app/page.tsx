import Nav from '@/app/components/home_nav';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between px-24">
      
        <div className='w-full'>
          <Image
          src="/images/covernew.png" // Specify the path to your image file
          alt="Banner"
          layout="responsive" // Set the layout to "responsive"
          width={1200} // Set the desired width of the image
          height={400} // Set the desired height of the image
          />
        </div>
        <div className='flex justify-center bg-[#FCFEFF]'>
          <div className='w-1/2 py-8 flex-col'>
            <Image
              src="/images/COLLEGE23.jpg" // Specify the path to your image file
              alt="Banner"
              layout="responsive" // Set the layout to "responsive"
              width={590} // Set the desired width of the image
              height={271} // Set the desired height of the image          
            />
          </div>

          <div className='w-1/2 py-8 flex-col'>
            <Image
              src="/images/higschool231.png" // Specify the path to your image file
              alt="Banner"
              layout="responsive" // Set the layout to "responsive"
              width={590} // Set the desired width of the image
              height={271} // Set the desired height of the image          
            />
          </div>
        </div>

        <div className='w-full py-5'>
          <Image
          src="/images/3rd.jpg" // Specify the path to your image file
          alt="Banner"
          layout="responsive" // Set the layout to "responsive"
          width={1200} // Set the desired width of the image
          height={400} // Set the desired height of the image
          />
        </div>

      </main>
    </>
  );
}