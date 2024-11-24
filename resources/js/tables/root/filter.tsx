import { Input } from "@/components/ui/input";
import { Column, ColumnMeta } from "@tanstack/react-table";
import { useEffect, useState } from "react";

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 300,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value, debounce, onChange]);

    return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

type Props = {
    column: Column<unknown, unknown>;
};

interface CustomColumnMeta extends ColumnMeta<unknown, unknown> {
    filterVariant?: string;
}

function Filter({ column }: Props) {
    const columnFilterValue = column.getFilterValue();
    const { filterVariant } = (column.columnDef.meta as CustomColumnMeta) ?? {};

    // TODO: Add date filter
    const filterMap: { [key: string]: JSX.Element } = {
        text: (
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? "") as string}
                placeholder="Search..."
                onChange={(value) => column.setFilterValue(value)}
            />
        ),
    };

    return filterMap[filterVariant ?? "text"];
}

export default Filter;
