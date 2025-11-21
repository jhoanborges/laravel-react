import { Input } from '@/components/ui/input';
import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface NumberInputProps extends Omit<NumericFormatProps, 'customInput'> {
    className?: string;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    ({ decimalScale = 0, fixedDecimalScale, ...props }, ref) => {
        return (
            <NumericFormat
                {...props}
                getInputRef={ref}
                customInput={Input}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={decimalScale}
                fixedDecimalScale={fixedDecimalScale ?? decimalScale > 0}
                allowNegative={false}
                allowLeadingZeros={false}
            />
        );
    },
);

NumberInput.displayName = 'NumberInput';
