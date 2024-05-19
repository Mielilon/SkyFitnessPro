"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../../public/logo.svg"

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
      <dialog  ref={dialogRef} className="fixed rounded-[30px] left-[calc(50%-(340px/2))] md:left-[calc(50%-(370px/2))] top-[calc(50%-(439px/2))]" onClose={onDismiss}>
        <div className="mx-auto max-w-[100%] bg-[rgba(0, 0, 0, 0.157)]">
          <form
            className="max-w-[366px] bg-[#FFFFFF] rounded-[30px] px-[31px] md:px-[40px] py-[40px]"
            action="#"
          >
            <Link href="/">
            <Image src={logoImg} alt="logo" width={222} height={35} className="mb-12 mx-auto w-auto h-auto" />
            </Link>
            {children}
          </form>
        </div>
      </dialog>,
    document.getElementById("modal-root")!
  );
}