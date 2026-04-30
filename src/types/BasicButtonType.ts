import { HTMLMotionProps } from "framer-motion";

export type BasicButtonProps = HTMLMotionProps<"button"> & {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}