export interface DashboardMetrics {
    activeQuotes: number;
    pipelineValue: number;
    conversionRate: number;
    avgTicketSize: number;
    monthlyGrowth: number;
    pendingApprovals: number;
}

export interface RevenueProjection {
    month: string;
    projected: number;
    actual: number;
}

export interface ProductMix {
    product: string;
    value: number;
    count: number;
    percentage: number;
}

export interface ConversionStage {
    stage: string;
    count: number;
    value: number;
    dropOffRate: number;
}

export interface Activity {
    id: string;
    type: 'quote' | 'approval' | 'contract' | 'payment';
    title: string;
    client: string;
    amount: number;
    timestamp: string;
    status: 'completed' | 'pending' | 'rejected';
}

export interface Alert {
    id: string;
    type: 'warning' | 'info' | 'urgent';
    title: string;
    message: string;
    timestamp: string;
}

export interface DashboardData {
    metrics: DashboardMetrics;
    revenueProjections: RevenueProjection[];
    productMix: ProductMix[];
    conversionFunnel: ConversionStage[];
    recentActivity: Activity[];
    alerts: Alert[];
    lastUpdated: string;
}

export const mockDashboardData: DashboardData = {
    metrics: {
        activeQuotes: 24,
        pipelineValue: 8450000,
        conversionRate: 32.5,
        avgTicketSize: 385000,
        monthlyGrowth: 12.3,
        pendingApprovals: 7,
    },
    revenueProjections: [
        { month: 'Ene', projected: 2100000, actual: 2250000 },
        { month: 'Feb', projected: 2200000, actual: 2180000 },
        { month: 'Mar', projected: 2300000, actual: 2450000 },
        { month: 'Abr', projected: 2400000, actual: 2520000 },
        { month: 'May', projected: 2500000, actual: 2680000 },
        { month: 'Jun', projected: 2600000, actual: 2590000 },
        { month: 'Jul', projected: 2700000, actual: 2820000 },
        { month: 'Ago', projected: 2800000, actual: 2750000 },
        { month: 'Sep', projected: 2900000, actual: 2950000 },
        { month: 'Oct', projected: 3000000, actual: 3100000 },
        { month: 'Nov', projected: 3100000, actual: 0 },
        { month: 'Dic', projected: 3200000, actual: 0 },
    ],
    productMix: [
        {
            product: 'Equipo de Transporte',
            value: 12500000,
            count: 45,
            percentage: 42,
        },
        {
            product: 'Maquinaria Industrial',
            value: 8200000,
            count: 28,
            percentage: 28,
        },
        {
            product: 'Equipo de Cómputo',
            value: 4800000,
            count: 52,
            percentage: 16,
        },
        {
            product: 'Mobiliario y Equipo',
            value: 2900000,
            count: 38,
            percentage: 10,
        },
        {
            product: 'Inmuebles',
            value: 1200000,
            count: 4,
            percentage: 4,
        },
    ],
    conversionFunnel: [
        {
            stage: 'Prospectos',
            count: 156,
            value: 42500000,
            dropOffRate: 0,
        },
        {
            stage: 'Cotizaciones',
            count: 89,
            value: 28400000,
            dropOffRate: 43,
        },
        {
            stage: 'Negociación',
            count: 47,
            value: 18200000,
            dropOffRate: 47,
        },
        {
            stage: 'Contratos',
            count: 24,
            value: 9800000,
            dropOffRate: 49,
        },
    ],
    recentActivity: [
        {
            id: '1',
            type: 'contract',
            title: 'Contrato Firmado',
            client: 'Transportes del Norte SA',
            amount: 1250000,
            timestamp: '2025-11-21T10:30:00',
            status: 'completed',
        },
        {
            id: '2',
            type: 'approval',
            title: 'Aprobación Pendiente',
            client: 'Industrias Monterrey',
            amount: 850000,
            timestamp: '2025-11-21T09:15:00',
            status: 'pending',
        },
        {
            id: '3',
            type: 'quote',
            title: 'Cotización Enviada',
            client: 'Comercializadora del Bajío',
            amount: 420000,
            timestamp: '2025-11-21T08:45:00',
            status: 'completed',
        },
        {
            id: '4',
            type: 'payment',
            title: 'Pago Recibido',
            client: 'Construcciones García',
            amount: 325000,
            timestamp: '2025-11-20T16:20:00',
            status: 'completed',
        },
        {
            id: '5',
            type: 'quote',
            title: 'Cotización en Revisión',
            client: 'Tecnología Avanzada SA',
            amount: 680000,
            timestamp: '2025-11-20T14:30:00',
            status: 'pending',
        },
        {
            id: '6',
            type: 'approval',
            title: 'Solicitud Rechazada',
            client: 'Logística Express',
            amount: 290000,
            timestamp: '2025-11-20T11:00:00',
            status: 'rejected',
        },
        {
            id: '7',
            type: 'contract',
            title: 'Contrato en Proceso',
            client: 'Manufacturas del Centro',
            amount: 1580000,
            timestamp: '2025-11-20T09:30:00',
            status: 'pending',
        },
        {
            id: '8',
            type: 'quote',
            title: 'Cotización Enviada',
            client: 'Servicios Integrales MX',
            amount: 520000,
            timestamp: '2025-11-19T15:45:00',
            status: 'completed',
        },
        {
            id: '9',
            type: 'payment',
            title: 'Pago Procesado',
            client: 'Autopartes del Norte',
            amount: 195000,
            timestamp: '2025-11-19T13:20:00',
            status: 'completed',
        },
        {
            id: '10',
            type: 'approval',
            title: 'Aprobación Crediticia',
            client: 'Distribuidora Nacional',
            amount: 920000,
            timestamp: '2025-11-19T10:00:00',
            status: 'completed',
        },
    ],
    alerts: [
        {
            id: '1',
            type: 'urgent',
            title: '7 Aprobaciones Pendientes',
            message: 'Requieren atención inmediata para cumplir con SLA',
            timestamp: '2025-11-21T08:00:00',
        },
        {
            id: '2',
            type: 'warning',
            title: 'Meta Mensual al 68%',
            message: 'Faltan $2.1M para alcanzar objetivo de noviembre',
            timestamp: '2025-11-21T07:00:00',
        },
        {
            id: '3',
            type: 'info',
            title: 'Reunión de Comité',
            message: 'Presentación de pipeline - Viernes 10:00 AM',
            timestamp: '2025-11-20T18:00:00',
        },
    ],
    lastUpdated: '2025-11-21T10:45:00',
};
