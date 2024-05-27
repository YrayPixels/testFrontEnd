import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='h-screen w-full bg-[#20251A] flex flex-row justify-center items-center m-auto'>
            <div className='text-[#EDF9D0] text-center space-y-4  w-10/12 md:w-6/12'>
                {/* <Image
                    style={{ zIndex: 2 }}
                    className="m-auto max-h-[391px]"
                    src='/images/error.png'
                    width={391}
                    height={261}
                    alt=""
                    priority /> */}
                <h2 className='text-[36px]'>Opps... This page was not found</h2>
                <p className='text-[14px]' >The page you are looking for does not exist or an other error occurred.</p>
                <Link className='component_btn w-10/12 md:w-10/12 m-auto' href="/">Return back to home page</Link>
            </div>

        </div>
    )
}