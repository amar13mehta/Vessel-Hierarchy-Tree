import { TreeNode } from "../types/tree";

export const initialTreeData: TreeNode[] = [
    {
        id: "root-1",
        name: "Equipments",
        type: "EQUIPMENT_TYPE",
        children: [
            {
                id: "cat-1",
                name: "Engine",
                type: "EQUIPMENT_TYPE",
                children: [
                    {
                        id: "eq-1",
                        name: "Main Engine & Propulsion",
                        type: "EQUIPMENT",
                        children: [
                            {
                                id: "sub-eq-1",
                                name: "Main Engine",
                                type: "EQUIPMENT",
                                children: [
                                    {
                                        id: "asm-1",
                                        name: "Air & Exhaust System",
                                        type: "ASSEMBLY",
                                        children: [
                                            {
                                                id: "comp-1",
                                                name: "ME Turbocharger",
                                                type: "COMPONENT",
                                                children: [],
                                            },
                                            {
                                                id: "comp-2",
                                                name: "Exhaust Valve",
                                                type: "COMPONENT",
                                                children: [],
                                            }
                                        ],
                                    },
                                    {
                                        id: "asm-2",
                                        name: "Fuel System",
                                        type: "ASSEMBLY",
                                        children: [],
                                    }
                                ],
                            },
                            {
                                id: "sub-eq-2",
                                name: "Propeller",
                                type: "EQUIPMENT",
                                children: [],
                            }
                        ],
                    },
                    {
                        id: "eq-2",
                        name: "Power Generation",
                        type: "EQUIPMENT",
                        children: [],
                    },
                    {
                        id: "eq-3",
                        name: "Aux Boiler",
                        type: "EQUIPMENT",
                        children: [],
                    }
                ],
            },
            {
                id: "cat-2",
                name: "Deck",
                type: "EQUIPMENT_TYPE",
                children: [],
            }
        ],
    },
];
