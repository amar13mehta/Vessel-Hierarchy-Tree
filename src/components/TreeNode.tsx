"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import {
  TreeNode as TreeNodeType,
  TreeNodeType as NodeType,
} from "@/types/tree";
import { useTreeStore } from "@/store/useTreeStore";
import { Plus, Trash2, ChevronRight, ChevronDown, Circle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface TreeNodeProps {
  node: TreeNodeType;
  level: number;
}

const getNodeColor = (type: NodeType) => {
  switch (type) {
    case "EQUIPMENT_TYPE":
      return "bg-blue-600 text-white border-blue-700";
    case "EQUIPMENT":
      return "bg-cyan-500 text-white border-cyan-600";
    case "ASSEMBLY":
      return "bg-gray-500 text-white border-gray-600";
    case "COMPONENT":
      return "bg-emerald-500 text-white border-emerald-600";
    default:
      return "bg-gray-500 text-white";
  }
};

export const TreeNode: React.FC<TreeNodeProps> = memo(({ node, level }) => {
  const expandedNodeIds = useTreeStore((state) => state.expandedNodeIds);
  const selectedNodeId = useTreeStore((state) => state.selectedNodeId);
  const editingNodeId = useTreeStore((state) => state.editingNodeId);

  const toggleNode = useTreeStore((state) => state.toggleNode);
  const removeNode = useTreeStore((state) => state.removeNode);
  const addNode = useTreeStore((state) => state.addNode);
  const setSelectedNode = useTreeStore((state) => state.setSelectedNode);
  const setEditingNodeId = useTreeStore((state) => state.setEditingNodeId);
  const updateNodeName = useTreeStore((state) => state.updateNodeName);

  const isExpanded = expandedNodeIds.has(node.id);
  const isSelected = selectedNodeId === node.id;
  const isEditing = editingNodeId === node.id;
  const hasChildren = node.children.length > 0;

  // Root node is typically at level 0 (assuming TreeBranch passes level correctly)
  // Actually level comes from props.
  const isRoot = level === 0;

  const [editValue, setEditValue] = useState(node.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditValue(node.name);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isEditing, node.name]);

  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newChild: TreeNodeType = {
      id: crypto.randomUUID(),
      name: "",
      type: "ASSEMBLY",
      children: [],
    };
    addNode(node.id, newChild);
  };

  const handleRemoveConfirm = () => {
    removeNode(node.id);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNode(node.id);
  };

  const handleSaveEdit = (e?: React.FormEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (editValue.trim()) {
      updateNodeName(node.id, editValue);
    } else {
      if (!node.name) updateNodeName(node.id, "New Node");
    }
    setEditingNodeId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setEditingNodeId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={twMerge(
        "relative flex items-center p-2 rounded-lg border shadow-sm transition-all duration-200 min-w-[180px] max-w-[240px] justify-between group z-10",
        getNodeColor(node.type),
        isSelected
          ? "ring-2 ring-offset-2 ring-yellow-400 scale-105"
          : "hover:scale-105",
        isEditing ? "scale-110 ring-2 ring-offset-2 ring-blue-400 z-20" : "",
      )}
      onClick={() => {
        if (!isEditing) {
          setSelectedNode(node.id);
        }
      }}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2 overflow-hidden flex-1">
        {hasChildren && !isEditing && (
          <div className="p-0.5 opacity-80">
            <Circle size={8} fill="currentColor" className="text-white/70" />
          </div>
        )}

        {isEditing ? (
          <div className="flex items-center gap-1 w-full">
            <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => handleSaveEdit()}
              className="w-full bg-white/20 text-white placeholder-white/70 px-1 py-0.5 rounded outline-none border border-white/30 text-sm"
              placeholder="Node Name"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ) : (
          <span
            className="text-sm font-medium truncate select-none cursor-pointer w-full"
            title={node.name}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNode(node.id);
              setEditingNodeId(node.id);
            }}
          >
            {node.name || "Untitled"}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 ml-2">
        {isEditing ? null : (
          <>
            <button
              onClick={handleAddChild}
              onDoubleClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-white/20 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              title="Add Child"
            >
              <Plus size={14} />
            </button>

            {
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    onDoubleClick={(e) => e.stopPropagation()}
                    className="p-1 hover:bg-red-500/20 rounded-full transition-colors opacity-0 group-hover:opacity-100 text-white"
                    title="Remove Node"
                  >
                    <Trash2 size={14} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Node?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{node.name}" and all its
                      children? This action can be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveConfirm();
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            }
          </>
        )}
      </div>

      {hasChildren && !isEditing && (
        <div
          onClick={handleToggle}
          onDoubleClick={(e) => e.stopPropagation()}
          className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 z-20 shadow-sm transition-transform hover:scale-110"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {/* {isExpanded ? (
            <ChevronDown size={14} className="" />
          ) : (
            <ChevronRight size={14} />
          )} */}

          <ChevronDown
            size={12}
            className={cn(
              "transition-transform transform ",
              isExpanded && "-rotate-90",
            )}
          />
        </div>
      )}
    </motion.div>
  );
});

TreeNode.displayName = "TreeNode";
