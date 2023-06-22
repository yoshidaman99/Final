import Nav from '@/app/components/nav';

export default function templateLogin(props: {
    children: React.ReactNode;
}) {

  return (
    <>
        <div className='h-screen'>
        <div className=''>
            <Nav />
        </div>
        <div>
          {props.children} 
        </div>
        </div>
    </>
  );
};
