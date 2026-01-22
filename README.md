# 🚢 Vessel Hierarchy Tree

A modern, interactive hierarchical tree visualization application built with Next.js, designed for managing and exploring complex vessel equipment structures with an intuitive drag-and-drop interface.

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38bdf8)
![Zustand](https://img.shields.io/badge/Zustand-5.0.10-purple)

## ✨ Features

- **🌳 Interactive Tree Visualization** - Expandable/collapsible hierarchical node structure
- **🔍 Real-time Search** - Filter nodes with debounced search functionality
- **🎯 Zoom & Pan Controls** - Navigate large hierarchies with smooth zoom and pan
- **✏️ CRUD Operations** - Add, edit, and delete nodes with confirmation dialogs
- **↩️ Undo Delete** - Revert accidental deletions with a single click
- **💾 Persistent State** - Automatic state persistence using localStorage
- **🎨 Modern UI** - Clean, responsive design with smooth animations
- **🔄 Multiple Root Nodes** - Support for independent tree hierarchies
- **📱 Responsive Layout** - Works seamlessly across desktop and tablet devices

## 🛠️ Tech Stack

### Core

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[React 19](https://react.dev/)** - UI library

### State Management

- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management with persistence

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn UI](https://ui.shadcn.com/)** - High-quality React components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations

### Interaction

- **[react-zoom-pan-pinch](https://github.com/BetterTyped/react-zoom-pan-pinch)** - Zoom and pan functionality
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/amar13mehta/Vessel-Hierarchy-Tree.git
cd Vessel-Hierarchy-Tree
```

2. Install dependencies

```bash
pnpm install
# or
npm install
```

3. Run the development server

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 📂 Project Structure

```
vessel-hierarchy/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn UI components
│   │   ├── AddRootButton.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   ├── TreeBranch.tsx    # Recursive tree renderer
│   │   ├── TreeCanvas.tsx    # Zoom/pan container
│   │   ├── TreeNode.tsx      # Individual node component
│   │   └── UndoButton.tsx
│   ├── data/                 # Mock data
│   │   └── initialTreeData.ts
│   ├── store/                # State management
│   │   └── useTreeStore.ts   # Zustand store
│   ├── types/                # TypeScript types
│   │   └── tree.ts
│   └── lib/                  # Utilities
│       └── utils.ts
├── public/                   # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── components.json          # Shadcn config
└── package.json
```

## 🎮 Usage

### Basic Operations

- **Expand/Collapse**: Click the chevron icon on nodes with children
- **Add Child Node**: Hover over a node and click the `+` button
- **Delete Node**: Hover over a node and click the trash icon
- **Edit Node**: Click on the node name to edit inline
- **Search**: Use the search bar to filter nodes
- **Zoom**: Use the zoom controls (bottom-right) or mouse wheel
- **Pan**: Click and drag on the canvas
- **Undo Delete**: Click the undo button (top-right) after deleting

### Adding Multiple Root Nodes

Click the "Add New Tree" button in the top-right of the canvas to create independent tree hierarchies.

## 🎨 Customization

### Node Types

The application supports four node types with distinct colors:

- **Equipment Type** - Blue
- **Equipment** - Cyan
- **Assembly** - Gray
- **Component** - Emerald

Edit these in `src/components/TreeNode.tsx`:

```typescript
const getNodeColor = (type: NodeType) => {
  switch (type) {
    case "EQUIPMENT_TYPE":
      return "bg-blue-600 text-white border-blue-700";
    case "EQUIPMENT":
      return "bg-cyan-500 text-white border-cyan-600";
    // ...
  }
};
```

## 🧪 Testing

The application includes:

- Type safety via TypeScript
- Component memoization for performance
- Persistent state testing
- Search and filter validation

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Amar Mehta**

- GitHub: [@amar13mehta](https://github.com/amar13mehta)

---

**Note**: This project was developed as part of a company technical assessment to demonstrate proficiency in React, TypeScript, and modern web development practices.
