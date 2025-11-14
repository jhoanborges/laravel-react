# Redux Toolkit Implementation

Modern Redux Toolkit setup for Laravel + Inertia.js with TypeScript support and state persistence across page navigations.

## 📁 Structure

```
redux/
├── store.ts              # Redux store configuration with redux-persist
├── hooks.ts              # Typed hooks (useAppDispatch, useAppSelector)
├── slices/
│   ├── uiSlice.ts       # Global UI state (modals, sidebars, drawers)
│   ├── notificationSlice.ts  # Toast notification system
│   └── index.ts         # Centralized exports
├── example-usage.tsx    # Usage examples (delete after reading)
└── README.md            # This file
```

## 🚀 Features

- ✅ Redux Toolkit with best practices
- ✅ Full TypeScript support with typed hooks
- ✅ Redux Persist (state survives Inertia page navigations)
- ✅ SSR-compatible (works with Inertia SSR)
- ✅ Pre-configured slices for UI state and notifications

## 📖 Usage

### 1. Import Typed Hooks

```tsx
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
```

### 2. Use in Components

```tsx
export function MyComponent() {
    const dispatch = useAppDispatch();
    const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

    const handleToggle = () => {
        dispatch(toggleSidebar());
    };

    return (
        <button onClick={handleToggle}>
            {sidebarOpen ? 'Close' : 'Open'} Sidebar
        </button>
    );
}
```

### 3. Dispatch Actions

```tsx
import { openModal, addNotification } from '@/redux/slices';

// Open a modal
dispatch(openModal('user-settings'));

// Show notification
dispatch(addNotification({
    message: 'Saved successfully!',
    type: 'success',
    duration: 5000,
}));
```

## 🎯 Available Slices

### UI Slice (`state.ui`)

Manages global UI state like modals, sidebars, and drawers.

**State:**
- `sidebarOpen: boolean`
- `modalOpen: boolean`
- `currentModal: string | null`
- `drawerOpen: boolean`

**Actions:**
- `toggleSidebar()` - Toggle sidebar
- `setSidebarOpen(boolean)` - Set sidebar state
- `openModal(string)` - Open modal with ID
- `closeModal()` - Close current modal
- `toggleDrawer()` - Toggle drawer
- `setDrawerOpen(boolean)` - Set drawer state

### Notification Slice (`state.notification`)

Manages toast notifications.

**State:**
- `notifications: Notification[]`

**Actions:**
- `addNotification({ message, type, duration? })` - Add notification
- `removeNotification(id)` - Remove notification by ID
- `clearNotifications()` - Clear all notifications

## 🔧 Creating New Slices

1. Create a new file in `redux/slices/`:

```tsx
// redux/slices/cartSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    items: CartItem[];
    total: number;
}

const initialState: CartState = {
    items: [],
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
            state.total += action.payload.price;
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) {
                state.total -= item.price;
                state.items = state.items.filter(i => i.id !== action.payload);
            }
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
```

2. Add to `redux/slices/index.ts`:

```tsx
export { default as cartReducer } from './cartSlice';
export * from './cartSlice';
```

3. Add to `redux/store.ts`:

```tsx
import { cartReducer, notificationReducer, uiReducer } from './slices';

const rootReducer = combineReducers({
    ui: uiReducer,
    notification: notificationReducer,
    cart: cartReducer, // Add here
});
```

## 💾 Persistence Configuration

By default, **all state is persisted** to localStorage. To customize:

```tsx
// redux/store.ts
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['ui', 'cart'], // Only persist these slices
    // OR
    blacklist: ['notification'], // Don't persist these slices
};
```

## 🔍 TypeScript Support

Types are automatically inferred:

```tsx
// RootState gives you full autocomplete
const value = useAppSelector((state) => state.ui.sidebarOpen);
                                    // ^ Full type safety

// AppDispatch ensures type-safe actions
const dispatch = useAppDispatch();
dispatch(unknownAction()); // TypeScript error!
```

## 🌐 SSR Compatibility

The setup automatically handles SSR:
- **Client (`app.tsx`)**: Uses redux-persist with localStorage
- **Server (`ssr.tsx`)**: Fresh store per request (no persistence)

No additional configuration needed!

## 📝 Best Practices

1. **Always use typed hooks** (`useAppDispatch`, `useAppSelector`) instead of plain Redux hooks
2. **Keep slices focused** - One slice per domain (UI, cart, user, etc.)
3. **Use immer syntax** - Redux Toolkit uses Immer, so you can "mutate" state directly
4. **Avoid storing large data** - Persist only what's needed (localStorage has ~5MB limit)
5. **Keep computed values out** - Store raw data, derive computed values in selectors

## 🎓 Learn More

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Redux Persist Docs](https://github.com/rt2zz/redux-persist)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)

## 🗑️ Cleanup

After understanding the setup, you can safely delete:
- `redux/example-usage.tsx`
- `redux/README.md` (this file)
