"use client";

import React, { useState } from "react";
import { Undo2 } from "lucide-react";
import { useTreeStore } from "@/store/useTreeStore";
import { AnimatePresence, motion } from "framer-motion";

export const UndoButton = () => {
  const deletedNodes = useTreeStore((state) => state.deletedNodes);
  const undoDelete = useTreeStore((state) => state.undoDelete);
  const [isHovered, setIsHovered] = useState(false);

  const hasDeletedNodes = deletedNodes.length > 0;

  if (!hasDeletedNodes) return null;

  return (
    <AnimatePresence>
      <motion.button
        animate={{ opacity: 1, y: 0, width: isHovered ? "90px" : "36px" }}
        exit={{ opacity: 0, y: 20 }}
        initial={{ opacity: 0, y: 20, width: "36px" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={undoDelete}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed top-36 cursor-pointer right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white h-9 rounded-full shadow-lg flex items-center justify-center overflow-hidden"
      >
        <div className="flex items-center px-2.5 justify-center">
          <Undo2 size={16} className="shrink-0" />
          <motion.span
            animate={{
              width: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
              marginLeft: isHovered ? 8 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="whitespace-nowrap font-medium text-sm overflow-hidden"
          >
            Undo
          </motion.span>
        </div>
      </motion.button>
    </AnimatePresence>
  );
};
