import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function ImageLightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {item ? (
        <motion.div
          key={item.slug}
          data-testid="image-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="image-lightbox-backdrop"
          onClick={onClose}
        >
          <div className="smoke-burst" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => (
              <span key={index} style={{ "--smoke-index": index }} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 210, damping: 22 }}
            className="image-lightbox-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="image-lightbox-header">
              <div>
                <p className="image-lightbox-category">{item.category}</p>
                <h3 className="image-lightbox-title">{item.title}</h3>
              </div>
              <button type="button" data-testid="btn-close-image" className="image-lightbox-close" onClick={onClose} aria-label="关闭">
                ×
              </button>
            </div>
            <div className="image-lightbox-frame">
              <img src={item.src} alt={item.title} className="image-lightbox-image" />
            </div>
            <p className="image-lightbox-description">{item.description}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
