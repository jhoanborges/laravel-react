import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface Activity {
    user: string;
    action: string;
    value: string;
    time: string;
    status: 'success' | 'info' | 'warning';
}

export function ActivityFeed() {
    const recentActivity: Activity[] = [
        {
            user: 'Sarah Johnson',
            action: 'Purchased Enterprise Plan',
            value: '$2,499',
            time: '2m ago',
            status: 'success',
        },
        {
            user: 'Mike Chen',
            action: 'Started Free Trial',
            value: '$0',
            time: '14m ago',
            status: 'info',
        },
        {
            user: 'Emma Davis',
            action: 'Upgraded to Professional',
            value: '$599',
            time: '28m ago',
            status: 'success',
        },
        {
            user: 'James Wilson',
            action: 'Cancelled Subscription',
            value: '-$299',
            time: '1h ago',
            status: 'warning',
        },
        {
            user: 'Lisa Anderson',
            action: 'Renewed Annual Plan',
            value: '$1,299',
            time: '2h ago',
            status: 'success',
        },
    ];

    return (
        <Card className="border-border/50 md:col-span-2">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                    Latest customer transactions and events
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`h-2 w-2 rounded-full ${
                                        activity.status === 'success'
                                            ? 'bg-chart-1'
                                            : activity.status === 'warning'
                                              ? 'bg-chart-4'
                                              : 'bg-chart-2'
                                    }`}
                                />
                                <div>
                                    <p className="text-sm font-medium">
                                        {activity.user}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {activity.action}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p
                                    className={`text-sm font-semibold ${
                                        activity.value.startsWith('-')
                                            ? 'text-destructive'
                                            : 'text-chart-1'
                                    }`}
                                >
                                    {activity.value}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
