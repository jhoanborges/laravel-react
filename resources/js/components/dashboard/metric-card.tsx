import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: LucideIcon;
    description: string;
}

export function MetricCard({
    title,
    value,
    change,
    trend,
    icon: Icon,
    description,
}: MetricCardProps) {
    return (
        <Card className="border-border/50 transition-colors hover:border-border">
            <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge
                        variant={trend === 'up' ? 'default' : 'destructive'}
                        className="gap-1 font-medium"
                    >
                        {trend === 'up' ? (
                            <ArrowUpRight className="h-3 w-3" />
                        ) : (
                            <ArrowDownRight className="h-3 w-3" />
                        )}
                        {change}
                    </Badge>
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                        {title}
                    </p>
                    <p className="text-3xl font-bold tracking-tight">{value}</p>
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
