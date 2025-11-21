import { cn } from '@/lib/utils';
import { type LucideProps } from 'lucide-react';
import {
    type ComponentType,
    type ReactElement,
    cloneElement,
    isValidElement,
} from 'react';

interface IconProps extends Omit<LucideProps, 'ref'> {
    iconNode: ComponentType<LucideProps> | ReactElement;
}

export function Icon({ iconNode, className, ...props }: IconProps) {
    // If iconNode is already a React element (JSX), clone it with the className
    if (isValidElement(iconNode)) {
        return cloneElement(iconNode, {
            className: cn('h-4 w-4', className, iconNode.props.className),
            ...props,
        } as any);
    }

    // Otherwise, treat it as a component and render it
    const IconComponent = iconNode as ComponentType<LucideProps>;
    return <IconComponent className={cn('h-4 w-4', className)} {...props} />;
}
