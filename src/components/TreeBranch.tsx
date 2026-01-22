"use client";

import React, { memo } from "react";
import { TreeNode as TreeNodeType } from "../types/tree";
import { TreeNode } from "./TreeNode";
import { useTreeStore } from "../store/useTreeStore";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

interface TreeBranchProps {
  node: TreeNodeType;
  level: number;
}

export const TreeBranch: React.FC<TreeBranchProps> = memo(({ node, level }) => {
  const expandedNodeIds = useTreeStore((state) => state.expandedNodeIds);
  const visibleNodeIds = useTreeStore((state) => state.visibleNodeIds);

  if (visibleNodeIds && !visibleNodeIds.has(node.id)) {
    return null;
  }

  const isExpanded = expandedNodeIds.has(node.id);

  const visibleChildren = node.children.filter(
    (child) => !visibleNodeIds || visibleNodeIds.has(child.id),
  );
  const hasChildren = visibleChildren.length > 0;

  return (
    <div className="flex items-center">
      <TreeNode node={node} level={level} />

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col justify-center ml-8 relative origin-left"
          >
            <div className="absolute top-1/2 -left-6 w-6 h-px bg-gray-300 -translate-y-1/2" />

            <div className="flex flex-col relative">
              {visibleChildren.map((child, index) => {
                const isFirst = index === 0;
                const isLast = visibleChildren.length - 1 === index;
                const isSingle = visibleChildren.length === 1;

                return (
                  <div key={child.id} className="flex relative py-1 pl-6">
                    <div
                      className={clsx(
                        "absolute left-0 w-px bg-gray-300",
                        isFirst ? "top-1/2 h-1/2" : "top-0",
                        isLast ? "h-1/2" : "h-full",
                        isSingle && "hidden",
                      )}
                    />

                    <div
                      className={clsx(
                        "absolute top-1/2 left-0 h-px bg-gray-300 -translate-y-1/2",
                        isSingle ? "-left-6 w-12" : "w-6",
                      )}
                    />

                    <TreeBranch node={child} level={level + 1} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

TreeBranch.displayName = "TreeBranch";
