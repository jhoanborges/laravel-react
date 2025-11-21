import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LoadingComponent() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [loading]);

    if (!loading) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
}
