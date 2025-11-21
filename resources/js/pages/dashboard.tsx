import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { ConversionFunnelChart } from '@/components/dashboard/conversion-funnel-chart';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ProductMixChart } from '@/components/dashboard/product-mix-chart';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { TrafficSourcesChart } from '@/components/dashboard/traffic-sources-chart';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Activity,
    DollarSign,
    RefreshCw,
    ShoppingCart,
    Users,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>(
        '7d',
    );

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 800);
    };

    const metrics = [
        {
            title: 'Total Revenue',
            value: '$384,482',
            change: '+12.5%',
            trend: 'up' as const,
            icon: DollarSign,
            description: 'vs last month',
        },
        {
            title: 'Active Users',
            value: '12,482',
            change: '+8.3%',
            trend: 'up' as const,
            icon: Users,
            description: 'vs last month',
        },
        {
            title: 'Conversion Rate',
            value: '18.2%',
            change: '-2.1%',
            trend: 'down' as const,
            icon: Activity,
            description: 'vs last month',
        },
        {
            title: 'Avg Order Value',
            value: '$128',
            change: '+5.7%',
            trend: 'up' as const,
            icon: ShoppingCart,
            description: 'vs last month',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden bg-background md:min-h-min">
                    <div className="flex flex-col gap-6 p-2 lg:p-4">
                        {/* Header */}
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-pretty">
                                    Analytics Dashboard
                                </h1>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Monitor your business performance and key
                                    metrics
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1 rounded-lg border border-border bg-muted/50 p-1">
                                    {(['24h', '7d', '30d', '90d'] as const).map(
                                        (range) => (
                                            <Button
                                                key={range}
                                                variant={
                                                    timeRange === range
                                                        ? 'secondary'
                                                        : 'ghost'
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    setTimeRange(range)
                                                }
                                                className="h-7 px-3 text-xs font-medium"
                                            >
                                                {range}
                                            </Button>
                                        ),
                                    )}
                                </div>
                                <Button
                                    onClick={handleRefresh}
                                    disabled={isRefreshing}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 bg-transparent"
                                >
                                    <RefreshCw
                                        className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                                    />
                                    Refresh
                                </Button>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {metrics.map((metric) => (
                                <MetricCard key={metric.title} {...metric} />
                            ))}
                        </div>

                        {/* Revenue Chart - Full Width */}
                        <RevenueChart />

                        {/* Charts Grid - 2 Columns */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <ProductMixChart />
                            <ConversionFunnelChart />
                        </div>

                        {/* Bottom Section - Activity & Traffic */}
                        <div className="grid gap-4 md:grid-cols-3">
                            <ActivityFeed />
                            <TrafficSourcesChart />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
