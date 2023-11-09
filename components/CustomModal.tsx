import React, { useEffect, useRef } from "react";

interface CustomModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    };
  }, [onClose]);
  return (
    <div className="custom-modal">
      <div ref={modalRef} className="modal-content">
        <button className="close-button hover:scale-105" onClick={onClose}>
          ❌
        </button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
