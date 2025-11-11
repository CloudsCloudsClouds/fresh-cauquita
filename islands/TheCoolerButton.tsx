import coolcar from "../assets/coolcar.gif"
import arabic from "../assets/arabic.mp3"


interface TheCoolerButtonProps {
    coolerLink: string;
}

export default function TheCoolerButton(props: TheCoolerButtonProps) {
    return (
        <a href={props.coolerLink}>
            <img src={coolcar} alt="autito" />
        </a>
    );
}