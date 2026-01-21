import { create } from 'zustand';
import { TreeNode, TreeState } from '../types/tree';
import { initialTreeData } from '../data/initialTreeData';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the store interface + new fields
interface ExtendedTreeState extends TreeState {
    editingNodeId: string | null;
    setEditingNodeId: (id: string | null) => void;
    updateNodeName: (id: string, newName: string) => void;
}

// Helper to find nodes matching query
const findMatchingNodes = (nodes: TreeNode[], query: string): string[] => {
    let matches: string[] = [];
    nodes.forEach(node => {
        if (node.name.toLowerCase().includes(query.toLowerCase())) {
            matches.push(node.id);
        }
        if (node.children.length > 0) {
            matches = [...matches, ...findMatchingNodes(node.children, query)];
        }
    });
    return matches;
};

// Helper to find path to a target node
const findPathToNode = (nodes: TreeNode[], targetId: string, path: string[] = []): string[] | null => {
    for (const node of nodes) {
        if (node.id === targetId) return [...path, node.id];
        if (node.children.length > 0) {
            const result = findPathToNode(node.children, targetId, [...path, node.id]);
            if (result) return result;
        }
    }
    return null;
};

// Helper to find matches and their paths
const calculateVisibleNodes = (nodes: TreeNode[], query: string): Set<string> | null => {
    if (!query.trim()) return null;

    const matches = findMatchingNodes(nodes, query);
    const visibleIds = new Set<string>();

    matches.forEach(matchId => {
        // Add the match itself
        visibleIds.add(matchId);

        // Add its path (ancestors)
        const path = findPathToNode(nodes, matchId);
        if (path) {
            path.forEach(pId => visibleIds.add(pId));
        }

        // Optional: Add direct children of matches to give context?
        // For now, strict filtering as requested "filters visible nodes".
    });

    return visibleIds;
}

export const useTreeStore = create<ExtendedTreeState>()(
    persist(
        (set, get) => ({
            tree: initialTreeData,
            expandedNodeIds: new Set<string>(['root-1']),
            selectedNodeId: null,
            searchQuery: '',
            editingNodeId: null,
            visibleNodeIds: null, // New: Track which nodes are visible due to search
            deletedNodes: [], // Track deleted nodes for undo

            setTree: (tree) => set({ tree }),

            toggleNode: (nodeId) =>
                set((state) => {
                    const newExpanded = new Set(state.expandedNodeIds);
                    if (newExpanded.has(nodeId)) {
                        newExpanded.delete(nodeId);
                    } else {
                        newExpanded.add(nodeId);
                    }
                    return { expandedNodeIds: newExpanded };
                }),

            expandNode: (nodeId) =>
                set((state) => {
                    const newExpanded = new Set(state.expandedNodeIds);
                    newExpanded.add(nodeId);
                    return { expandedNodeIds: newExpanded };
                }),

            collapseNode: (nodeId) =>
                set((state) => {
                    const newExpanded = new Set(state.expandedNodeIds);
                    newExpanded.delete(nodeId);
                    return { expandedNodeIds: newExpanded };
                }),

            expandAll: (nodeIds) =>
                set((state) => {
                    const newExpanded = new Set(state.expandedNodeIds);
                    nodeIds.forEach(id => newExpanded.add(id));
                    return { expandedNodeIds: newExpanded };
                }),

            addNode: (parentId, newNode) =>
                set((state) => {
                    const addNodeRecursive = (nodes: TreeNode[]): TreeNode[] => {
                        return nodes.map((node) => {
                            if (node.id === parentId) {
                                return { ...node, children: [...node.children, newNode] };
                            }
                            if (node.children.length > 0) {
                                return { ...node, children: addNodeRecursive(node.children) };
                            }
                            return node;
                        });
                    };

                    const newExpanded = new Set(state.expandedNodeIds);
                    newExpanded.add(parentId);

                    // Re-calculate visibility if search is active
                    let newVisibleIds = state.visibleNodeIds;
                    const newTree = addNodeRecursive(state.tree); // Calculate new tree first
                    if (state.searchQuery.trim()) {
                        newVisibleIds = calculateVisibleNodes(newTree, state.searchQuery);
                    }

                    return {
                        tree: newTree,
                        expandedNodeIds: newExpanded,
                        editingNodeId: newNode.id,
                        visibleNodeIds: newVisibleIds
                    };
                }),

            addRootNode: (newNode) =>
                set((state) => {
                    const newTree = [...state.tree, newNode];
                    const newExpanded = new Set(state.expandedNodeIds);
                    newExpanded.add(newNode.id);

                    let newVisibleIds = state.visibleNodeIds;
                    if (state.searchQuery.trim()) {
                        newVisibleIds = calculateVisibleNodes(newTree, state.searchQuery);
                    }

                    return {
                        tree: newTree,
                        expandedNodeIds: newExpanded,
                        editingNodeId: newNode.id,
                        visibleNodeIds: newVisibleIds
                    };
                }),

            removeNode: (nodeId) =>
                set((state) => {
                    let deletedNode: TreeNode | null = null;
                    let parentId: string | null = null;

                    // Find the node and its parent before deleting
                    const findNodeAndParent = (nodes: TreeNode[], targetId: string, pId: string | null = null): { node: TreeNode | null; parent: string | null } => {
                        for (const node of nodes) {
                            if (node.id === targetId) {
                                return { node, parent: pId };
                            }
                            if (node.children.length > 0) {
                                const result = findNodeAndParent(node.children, targetId, node.id);
                                if (result.node) return result;
                            }
                        }
                        return { node: null, parent: null };
                    };

                    const found = findNodeAndParent(state.tree, nodeId);
                    deletedNode = found.node;
                    parentId = found.parent;

                    const removeNodeRecursive = (nodes: TreeNode[]): TreeNode[] => {
                        return nodes
                            .filter((node) => node.id !== nodeId)
                            .map((node) => ({
                                ...node,
                                children: removeNodeRecursive(node.children),
                            }));
                    };

                    const newTree = removeNodeRecursive(state.tree);
                    // Re-calculate visibility if search is active
                    let newVisibleIds = state.visibleNodeIds;
                    if (state.searchQuery.trim()) {
                        newVisibleIds = calculateVisibleNodes(newTree, state.searchQuery);
                    }

                    // Store deleted node for undo (keep only last 10)
                    const newDeletedNodes = deletedNode
                        ? [...state.deletedNodes, { node: deletedNode, parentId, timestamp: Date.now() }].slice(-10)
                        : state.deletedNodes;

                    return {
                        tree: newTree,
                        visibleNodeIds: newVisibleIds,
                        deletedNodes: newDeletedNodes
                    };
                }),

            undoDelete: () =>
                set((state) => {
                    if (state.deletedNodes.length === 0) return state;

                    const lastDeleted = state.deletedNodes[state.deletedNodes.length - 1];
                    const { node, parentId } = lastDeleted;

                    let newTree: TreeNode[];

                    if (parentId === null) {
                        // Was a root node
                        newTree = [...state.tree, node];
                    } else {
                        // Was a child node - restore to parent
                        const addNodeRecursive = (nodes: TreeNode[]): TreeNode[] => {
                            return nodes.map((n) => {
                                if (n.id === parentId) {
                                    return { ...n, children: [...n.children, node] };
                                }
                                if (n.children.length > 0) {
                                    return { ...n, children: addNodeRecursive(n.children) };
                                }
                                return n;
                            });
                        };
                        newTree = addNodeRecursive(state.tree);
                    }

                    // Expand the restored node
                    const newExpanded = new Set(state.expandedNodeIds);
                    newExpanded.add(node.id);
                    if (parentId) newExpanded.add(parentId);

                    // Re-calculate visibility
                    let newVisibleIds = state.visibleNodeIds;
                    if (state.searchQuery.trim()) {
                        newVisibleIds = calculateVisibleNodes(newTree, state.searchQuery);
                    }

                    return {
                        tree: newTree,
                        expandedNodeIds: newExpanded,
                        visibleNodeIds: newVisibleIds,
                        deletedNodes: state.deletedNodes.slice(0, -1) // Remove the undone deletion
                    };
                }),

            updateNodeName: (nodeId, newName) =>
                set((state) => {
                    const updateRecursive = (nodes: TreeNode[]): TreeNode[] => {
                        return nodes.map((node) => {
                            if (node.id === nodeId) {
                                return { ...node, name: newName };
                            }
                            if (node.children.length > 0) {
                                return { ...node, children: updateRecursive(node.children) };
                            }
                            return node;
                        });
                    };

                    const newTree = updateRecursive(state.tree);
                    // Re-calculate visibility if search is active (name changed!)
                    let newVisibleIds = state.visibleNodeIds;
                    if (state.searchQuery.trim()) {
                        newVisibleIds = calculateVisibleNodes(newTree, state.searchQuery);
                    }

                    return { tree: newTree, visibleNodeIds: newVisibleIds };
                }),

            setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),

            setEditingNodeId: (id) => set({ editingNodeId: id }),

            setSearchQuery: (query) => {
                const state = get();
                const visibleIds = calculateVisibleNodes(state.tree, query);

                let newExpanded = state.expandedNodeIds;
                if (visibleIds) {
                    newExpanded = new Set(state.expandedNodeIds); // Clone
                    visibleIds.forEach(id => newExpanded.add(id));
                }

                set({
                    searchQuery: query,
                    visibleNodeIds: visibleIds,
                    expandedNodeIds: newExpanded
                });
            },
        }),
        {
            name: 'vessel-tree-storage',
            partialize: (state) => ({
                tree: state.tree,
                expandedNodeIds: Array.from(state.expandedNodeIds),
                searchQuery: state.searchQuery,
            }),
            merge: (persistedState: any, currentState) => ({
                ...currentState,
                ...persistedState,
                expandedNodeIds: new Set(persistedState.expandedNodeIds || []),
                tree: persistedState.tree && persistedState.tree.length > 0 ? persistedState.tree : initialTreeData,
                // For simplicity: We won't persist search query to avoid complexity.
                searchQuery: '',
                visibleNodeIds: null
            }),
        }
    )
);
