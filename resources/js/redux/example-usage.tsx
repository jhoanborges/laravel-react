/**
 * Example Usage of Redux in Your Laravel + Inertia App
 *
 * This file demonstrates how to use Redux Toolkit in your components.
 * You can delete this file once you understand the patterns.
 */

import { useAppDispatch, useAppSelector } from './hooks';
import {
    addNotification,
    closeModal,
    openModal,
    setSidebarOpen,
    toggleSidebar,
} from './slices';

// Example Component: Using UI State
export function ExampleSidebarToggle() {
    const dispatch = useAppDispatch();
    const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

    return (
        <div>
            <p>Sidebar is {sidebarOpen ? 'open' : 'closed'}</p>
            <button onClick={() => dispatch(toggleSidebar())}>
                Toggle Sidebar
            </button>
            <button onClick={() => dispatch(setSidebarOpen(true))}>
                Open Sidebar
            </button>
            <button onClick={() => dispatch(setSidebarOpen(false))}>
                Close Sidebar
            </button>
        </div>
    );
}

// Example Component: Using Modal State
export function ExampleModalControl() {
    const dispatch = useAppDispatch();
    const { modalOpen, currentModal } = useAppSelector((state) => state.ui);

    const handleOpenUserModal = () => {
        dispatch(openModal('user-settings'));
    };

    const handleOpenDeleteModal = () => {
        dispatch(openModal('delete-confirmation'));
    };

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    return (
        <div>
            <p>Modal: {modalOpen ? `Open (${currentModal})` : 'Closed'}</p>
            <button onClick={handleOpenUserModal}>Open User Settings</button>
            <button onClick={handleOpenDeleteModal}>Open Delete Modal</button>
            <button onClick={handleCloseModal}>Close Modal</button>
        </div>
    );
}

// Example Component: Using Notifications
export function ExampleNotifications() {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(
        (state) => state.notification.notifications,
    );

    const showSuccessNotification = () => {
        dispatch(
            addNotification({
                message: 'Operation completed successfully!',
                type: 'success',
                duration: 5000,
            }),
        );
    };

    const showErrorNotification = () => {
        dispatch(
            addNotification({
                message: 'Something went wrong!',
                type: 'error',
                duration: 8000,
            }),
        );
    };

    return (
        <div>
            <h3>Notifications ({notifications.length})</h3>
            <button onClick={showSuccessNotification}>
                Show Success Notification
            </button>
            <button onClick={showErrorNotification}>
                Show Error Notification
            </button>

            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>
                        [{notification.type}] {notification.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Example: Using Redux in Inertia Page Components
export default function ExamplePage() {
    return (
        <div className="p-8">
            <h1 className="mb-4 text-2xl font-bold">Redux Usage Examples</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="mb-2 text-xl font-semibold">
                        Sidebar State
                    </h2>
                    <ExampleSidebarToggle />
                </section>

                <section>
                    <h2 className="mb-2 text-xl font-semibold">Modal State</h2>
                    <ExampleModalControl />
                </section>

                <section>
                    <h2 className="mb-2 text-xl font-semibold">
                        Notifications
                    </h2>
                    <ExampleNotifications />
                </section>
            </div>
        </div>
    );
}
