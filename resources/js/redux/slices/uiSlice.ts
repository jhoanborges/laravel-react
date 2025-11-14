import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    sidebarOpen: boolean;
    modalOpen: boolean;
    currentModal: string | null;
    drawerOpen: boolean;
}

const initialState: UiState = {
    sidebarOpen: false,
    modalOpen: false,
    currentModal: null,
    drawerOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },
        openModal: (state, action: PayloadAction<string>) => {
            state.modalOpen = true;
            state.currentModal = action.payload;
        },
        closeModal: (state) => {
            state.modalOpen = false;
            state.currentModal = null;
        },
        toggleDrawer: (state) => {
            state.drawerOpen = !state.drawerOpen;
        },
        setDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.drawerOpen = action.payload;
        },
    },
});

export const {
    toggleSidebar,
    setSidebarOpen,
    openModal,
    closeModal,
    toggleDrawer,
    setDrawerOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
