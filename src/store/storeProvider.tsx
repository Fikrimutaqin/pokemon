'use client';
// React
import { useState } from 'react';
// Redux
import { Provider } from 'react-redux';
// Store
import { makeStore, persistor } from './store';
// Persist Gate
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // Initialize Store
    const [store] = useState(() => makeStore());
    // Initialize Persistor
    const [persistorObj] = useState(() => persistor(store));

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistorObj}>
                {children}
            </PersistGate>
        </Provider>
    );
}