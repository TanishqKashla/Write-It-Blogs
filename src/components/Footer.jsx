import Image from 'next/image'
import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Link from 'next/link';

const Footer = () => {
    return (
        <div className='w-[100vw] h-[350px] md:h-[300px] bg-blue-700 mt-20 text-white px-[8%] flex flex-col'>
            <div className='flex  justify-between pt-10 text-sm md:text-xl underline font-bold'>

                <div className='relative w-auto h-[20px] md:h-[40px]'>
                    <Image src="/logo-white.png" alt='website logo' height={500} width={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                </div>

                <div className='flex flex-col items-end md:items-start md:flex-row gap-5 md:gap-20 justify-between'>
                    <div >
                        <Link href={'/view/tanishq-kashla-the-developer'} className='flex flex-col items-end'>

                            <h3>About the Developer</h3>
                            <div className='relative w-auto h-[40px] md:h-[60px] overflow-hidden rounded-full aspect-square mt-3'>
                                <Image src="/developer.jpeg" alt='Dev Pfp' height={500} width={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col items-end'>
                        <h3>Get in touch</h3>
                        <div className='flex text-2xl md:text-3xl gap-3 md:gap-6 mt-3'>
                            <Link href="https://github.com/TanishqKashla" legacyBehavior>
                                <a target="_blank" rel="noopener noreferrer">
                                    <FaGithub />
                                </a>
                            </Link>

                            <Link href="https://www.linkedin.com/in/tanishqkashla/" legacyBehavior>
                                <a target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin />
                                </a>
                            </Link>

                            <Link href="https://x.com/tanishqKashla" legacyBehavior>
                                <a target="_blank" rel="noopener noreferrer">
                                    <FaXTwitter />
                                </a>
                            </Link>

                            <Link href="mailto:tanishqkashla11@gmail.com" legacyBehavior>
                                <a>
                                    <MdEmail />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='m-auto border-t-2 border-gray-400 w-[100%] py-2 flex justify-center items-center'>
                <h3>© 2024 Write It, All right reserved.</h3>
            </div>
        </div>
    )
}

export default Footer