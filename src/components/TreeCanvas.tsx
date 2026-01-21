"use client";

import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { TreeBranch } from "./TreeBranch";
import { useTreeStore } from "../store/useTreeStore";
import { Minus, Plus, Maximize, RotateCcw } from "lucide-react";
import { AddRootButton } from "./AddRootButton";
import { UndoButton } from "./UndoButton";
import { cn } from "@/lib/utils";

export const TreeCanvas: React.FC = () => {
  const tree = useTreeStore((state) => state.tree);

  return (
    <div className="w-full h-full bg-transparent relative overflow-hidden rounded-xl border border-gray-200 ">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:16px_16px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
          "h-full w-full",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <TransformWrapper
        initialScale={1}
        minScale={0.1}
        maxScale={4}
        centerOnInit={true}
        limitToBounds={false}
        wheel={{ step: 0.05 }}
      >
        {({ zoomIn, zoomOut, resetTransform, centerView }) => (
          <>
            <div className="fixed bottom-8 right-6 flex flex-row gap-2 z-50">
              <button
                onClick={() => zoomIn()}
                className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
                title="Zoom In"
              >
                <Plus size={12} />
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
                title="Zoom Out"
              >
                <Minus size={12} />
              </button>

              <button
                onClick={() => centerView()}
                className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
                title="Center View"
              >
                <Maximize size={12} />
              </button>
              {/* <button
                onClick={() => resetTransform()}
                className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
                title="Reset"
              >
                <RotateCcw size={12} />
              </button> */}
            </div>

            <TransformComponent
              wrapperClass="w-full h-full"
              contentClass="w-full h-full"
            >
              <div className="min-w-[2000px] min-h-[1000px] p-20 flex items-center justify-start ml-20">
                <div className="flex flex-col gap-10">
                  {tree.map((rootNode) => (
                    <TreeBranch key={rootNode.id} node={rootNode} level={0} />
                  ))}
                </div>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      <AddRootButton />
      <UndoButton />
    </div>
  );
};
