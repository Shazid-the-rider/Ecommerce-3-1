import head1 from './../assets/head1.png'

export default function Banner1() {
    return (
        <div className='sm: rounded-[30px] w-full h-[300px] md:h-[450px] lg:h-[400px] flex bg-gray-100 px-6 md:px-16 lg:px-40 '>
            
            {/* Left Content */}
            <div className='w-full lg:w-[50%] flex flex-col gap-6 justify-center items-start'>
                
                <div className='flex flex-col gap-0 lg:gap-3'>
                    <h1 className='text-lg md:text-4xl font-bold font-[poppins]'>Fresh Vegetables <span className='text-red-500'>Big</span> Discount</h1>
                    <h1 className='text-lg md:text-2xl font-bold font-[poppins]'><span className='text-green-500'>Healthy</span> Food for <span className='text-red-500'>Every</span> Home</h1>
                </div>

                <div>
                    <h1 className='text-[14px] md:text-[16px] font-medium font-[poppins] opacity-60'>
                       Save up to 50% off on your first order
                    </h1>
                    <h1 className='text-[14px] md:text-[16px] font-medium font-[poppins] opacity-60'>
                       Fresh quality products delivered fast
                    </h1>
                </div>

                <button className='py-1.5 lg:py-3 px-10 bg-black rounded-lg animate-pulse'>
                    <h1 className='text-sm md:text-lg text-white font-[poppins] font-medium'>
                        Shop Now
                    </h1>
                </button>
            </div>

            {/* Right Image */}
            <div className='hidden lg:flex w-[50%] justify-start items-center'>
                <img src={head1} alt="" className='h-full w-[80%] object-contain' />
            </div>

        </div>
    )
}