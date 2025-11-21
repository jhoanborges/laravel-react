import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (
            state,
            action: PayloadAction<Omit<Notification, 'id'>>,
        ) => {
            const id = Date.now().toString();
            state.notifications.push({
                id,
                ...action.payload,
                duration: action.payload.duration ?? 5000,
            });
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload,
            );
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
    },
});

export const { addNotification, removeNotification, clearNotifications } =
    notificationSlice.actions;

export default notificationSlice.reducer;
