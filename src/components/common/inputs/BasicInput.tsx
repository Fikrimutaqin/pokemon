// Types
import { BasicInputType } from "@/types/BasicInputType";

export default function BasicInput({ placeholder, type, value, className, onChange }: BasicInputType) {
    return (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={className} />
    );
}