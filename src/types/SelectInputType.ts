export type SelectInputProps = {
    label: string;
    options: SelectOption[];
    value: string | number;
    onChange: (value: string | number) => void;
    error?: string;
    requiredIndicator?: boolean;
    className?: string;
}

export type SelectOption = {
    label: string;
    value: string | number;
}