# Build Checklist - Pre-Build Verification

## Files Check

### Required Config Files
- [x] `package.json` - Dependencies defined
- [x] `astro.config.mjs` - Astro configuration
- [x] `tailwind.config.mjs` - Tailwind config
- [x] `tsconfig.json` - TypeScript config
- [x] `postcss.config.mjs` - PostCSS config
- [x] `components.json` - shadcn config

### Source Files
- [x] `src/styles/globals.css` - Global styles with CSS variables
- [x] `src/lib/utils.ts` - Utility functions (cn)
- [x] `src/env.d.ts` - TypeScript declarations

### Data
- [x] `src/data/mockData.ts` - All mock data and types

### UI Components (`src/components/ui/`)
- [x] `Button.vue` - Button component
- [x] `Card.vue` - Card container
- [x] `Badge.vue` - Badge component
- [x] `Progress.vue` - Progress bar
- [x] `Avatar.vue` - Avatar component (FIXED: removed className prop)

### Layout Components (`src/components/layout/`)
- [x] `Sidebar.vue` - Navigation sidebar (FIXED: removed className)
- [x] `Header.vue` - Header with Role Switcher (FIXED: window event listener)

### Dashboard Components (`src/components/dashboard/`)
- [x] `KPICard.vue` - KPI display
- [x] `ProjectCard.vue` - Project card
- [x] `AgentCard.vue` - Agent card
- [x] `ValidationItem.vue` - Validation item
- [x] `ActivityFeed.vue` - Activity feed
- [x] `PipelineStep.vue` - Pipeline step

### Pages (`src/pages/`)
- [x] `index.astro` - Admin Dashboard
- [x] `superadmin.astro` - SuperAdmin Dashboard
- [x] `manager.astro` - Manager Dashboard
- [x] `executif.astro` - Exécutif Dashboard
- [x] `projects.astro` - Projects page
- [x] `agents.astro` - Agent Hub
- [x] `validation.astro` - Validation Center

### Layouts
- [x] `src/layouts/Layout.astro` - Base layout

### Public Assets
- [x] `public/favicon.svg` - Favicon

## Fixes Applied

### 1. Avatar Component
**Issue**: Using `className` prop (React style) instead of `$attrs.class` (Vue style)
**Fix**: Changed to use Vue's `$attrs.class` for class binding

### 2. Sidebar Component
**Issue**: Using `className` prop for Avatar
**Fix**: Changed to `class` attribute

### 3. Header Component
**Issue**: Window event listener in script setup (SSR error)
**Fix**: Wrapped in `onMounted`/`onUnmounted` lifecycle hooks

### 4. KPICard Component
**Issue**: Icon imports may have unused icons
**Status**: Working - imports are used in iconMap

## Build Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Common Build Issues & Solutions

### Issue: "Cannot find module '@/lib/utils'"
**Solution**: Check tsconfig.json paths configuration
```json
"paths": {
  "@/*": ["./src/*"]
}
```

### Issue: "window is not defined" (SSR)
**Solution**: Wrap browser APIs in `onMounted` hook
```vue
<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  // window access here
});
</script>
```

### Issue: "className is not defined" (Vue)
**Solution**: Use `class` attribute or `$attrs.class` instead of `className`

### Issue: Icons not showing
**Solution**: Ensure `lucide-vue-next` is installed and imported correctly

## Pre-Build Checklist

1. [ ] Run `npm install` to ensure all dependencies are installed
2. [ ] Check that no files have syntax errors
3. [ ] Verify all imports are correct
4. [ ] Run `npm run build`
5. [ ] Check `dist/` folder is created
6. [ ] Run `npm run preview` to test locally
7. [ ] Deploy to Vercel

## Expected Build Output

After successful build:
```
dist/
├── _astro/           # Static assets
├── index.html        # Admin dashboard
├── superadmin.html   # SuperAdmin
├── manager.html      # Manager
├── executif.html     # Exécutif
├── projects.html     # Projects
├── agents.html       # Agent Hub
├── validation.html   # Validation
└── favicon.svg       # Favicon
```

## Testing URLs

After `npm run preview`:
- http://localhost:4321/ - Admin
- http://localhost:4321/superadmin - SuperAdmin
- http://localhost:4321/manager - Manager
- http://localhost:4321/executif - Exécutif
- http://localhost:4321/projects - Projects
- http://localhost:4321/agents - Agents
- http://localhost:4321/validation - Validation
