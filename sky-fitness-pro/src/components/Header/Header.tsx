'use client';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../../../public/img/logo.svg';
import SVG from '../SVG/SVG';
import { useEffect, useState } from 'react';
import DropDown from '../DropDown/DropDown';
import { User, getAuth } from 'firebase/auth';
import { app } from '@/app/firebase';
import ButtonHeader from '../ButtonHeader.tsx/ButtonHeader';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  useEffect(() => {
    const auth = getAuth(app);
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(user);
      }
    });
  }, []);


  return (
    <>
      <div className="flex justify-between mx-auto py-10 md:pt-[50px] md:pb-14  lg:max-w-[1440px] px-4 md:px-8 main:px-[140px]">
        <div>
          <Link href={'/'}>
            <div>
              <Image
                src={logoImg}
                className="w-[220px] h-[35px]"
                alt="logo"
                width={220}
                height={35}
              />
            </div>
          </Link>
          <p className="font-roboto-400 text-lg hidden md:block pt-3.5 text-[#585959]">
            Онлайн-тренировки для занятий дома
          </p>
        </div>
        {user ? (
          <>
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="relative top-0 left-0 flex flex-row justify-end gap-4 md:justify-between items-center h-[35px] md:h-[50px]"
              >
                <div className=" w-[36px] h-[36px] lg:w-[42px] lg:h-[42px] bg-user-icon bg-cover  bg-no-repeat bg-center" />
                {/* <SVG icon="icon-user" className=" w-[36px] h-[36px] lg:w-[42px] lg:h-[42px] " /> */}
                <div className="flex items-center">
                  <p className="hidden md:block text-2xl font-roboto-400 pr-[11px]">
                    {user.email}
                  </p>
                  <SVG
                    icon="icon-arrow"
                    className={
                      isOpen
                        ? 'w-[14px] h-[9px] rotate-180 cursor-pointer'
                        : 'w-[14px] h-[9px] cursor-pointer'
                    }
                  />
                </div>
              </div>
              {isOpen && (
                <DropDown
                  toggleDropdown={toggleDropdown}
                  user={user}
                  email={user.email}
                />
              )}
            </div>
          </>
        ) : (
          <div className="w-[83px] md:w-[103px]">
            <Link href="/signin">
              <ButtonHeader title="Войти" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
