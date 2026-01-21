export type TreeNodeType = "EQUIPMENT_TYPE" | "EQUIPMENT" | "ASSEMBLY" | "COMPONENT";

export interface TreeNode {
    id: string;
    name: string;
    type: TreeNodeType;
    children: TreeNode[];
    collapsed?: boolean; // Optional, can be used if we store expanded state in the node itself, but plan is to use Store. 
    // Actually plan says "Expanded state must be: Stored in Zustand". 
    // So we might not need this here, but useful for initial recursion if we want per-node default.
    // Let's keep it clean: state in store.
}

// Helper to define what's in the store
export interface TreeState {
    tree: TreeNode[]; // Supporting multiple root nodes just in case, though usually one.
    expandedNodeIds: Set<string>; // Set is better for O(1) lookup
    selectedNodeId: string | null;
    visibleNodeIds: Set<string> | null;
    searchQuery: string;
    deletedNodes: Array<{ node: TreeNode; parentId: string | null; timestamp: number }>; // Track last deleted for undo

    // Actions
    setTree: (tree: TreeNode[]) => void;
    toggleNode: (nodeId: string) => void;
    expandNode: (nodeId: string) => void;
    collapseNode: (nodeId: string) => void;
    expandAll: (nodeIds: string[]) => void; // Helper for search
    addNode: (parentId: string, node: TreeNode) => void;
    addRootNode: (node: TreeNode) => void;
    removeNode: (nodeId: string) => void;
    undoDelete: () => void;
    updateNodeName: (nodeId: string, newName: string) => void;
    setSearchQuery: (query: string) => void;
    setSelectedNode: (nodeId: string | null) => void;
    setEditingNodeId: (id: string | null) => void;
}
