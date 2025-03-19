import { useEffect, useRef, ReactNode } from "react";

export default function ModalWrapper({
  closeModal,
  children,
}: {
  closeModal: () => void;
  children: ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: 20,
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        top: 0,
        left: 0,
      }}
    >
      <div ref={modalRef} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
