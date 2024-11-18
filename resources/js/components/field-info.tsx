import { FieldApi } from "@tanstack/react-form";

// eslint-disable-next-line
export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em className="text-red-500 text-xs">{field.state.meta.errors.join(",")}</em>
            ) : null}
            {field.state.meta.isValidating ? "Validating..." : null}
        </>
    );
}
