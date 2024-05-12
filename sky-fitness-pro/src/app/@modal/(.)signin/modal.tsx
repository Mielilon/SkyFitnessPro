"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import WrapperModal from "@/components/WrapperModal/WrapperModal";
import Link from "next/link";
import SVG from "@/components/SVG/SVG";

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
      <dialog ref={dialogRef} className="fixed rounded-[30px] left-[calc(50%-(366px/2))] top-[calc(50%-(439px/2))]" onClose={onDismiss}>
        <div className="mx-auto max-w-[100%] bg-[rgba(0, 0, 0, 0.157)]">
          <form
            className="w-[366px] bg-[#FFFFFF] rounded-[30px] px-[31px] md:px-[40px] py-[40px]"
            action="#"
          >
            <Link href="/">
              <SVG
                className="w-[222px] h-[35px] mb-12 mx-auto"
                icon="icon-form-logo"
              />
            </Link>
            {children}
          </form>
        </div>
        {/* кнопка для закрытия модального окна, без стилей, думаю не будет никакой кнопки, а будет закрываться при нажатии на свободный фон */}
        <button onClick={onDismiss} className="close-button">Закрыть</button>
      </dialog>,
    document.getElementById("modal-root")!
  );
}
