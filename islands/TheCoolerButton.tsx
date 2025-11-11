import coolcar from "../assets/coolcar.gif"
import arabic from "../assets/arabic.mp3"
import bowomp from "../assets/bowomp.mp3"
import { useRef } from "preact/hooks";


interface TheCoolerButtonProps {
    coolerLink: string;
}

export default function TheCoolerButton(props: TheCoolerButtonProps) {
    const arabicRef = useRef<HTMLAudioElement>(null);
    const bowompRef = useRef<HTMLAudioElement>(null);
    
    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        if (arabicRef.current) {
            arabicRef.current.pause();
        }

        if (bowompRef.current) {
            bowompRef.current.currentTime = 0;
            bowompRef.current.play();

            setTimeout(() => {
                window.location.href = props.coolerLink;
            }, 2000);
        }
    };
    
    return (
        <>
            <audio ref={arabicRef} src={arabic} loop autoplay />
            <audio ref={bowompRef} src={bowomp} />
            <button onClick={handleClick}>
                <img src={coolcar} alt="autito" />
            </button>
        </>
    );
}