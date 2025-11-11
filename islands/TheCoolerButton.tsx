import type Signal from "@preact/signals";

interface TheCoolerButtonProps {
    coolerLink: string;
}

export default function TheCoolerButton(props: TheCoolerButtonProps) {
    return (
        <a href={props.coolerLink}>{props.coolerLink}</a>
    );
}