import coolcar from "../assets/coolcar.gif"
import arabic from "../assets/arabic.mp3"
import bowomp from "../assets/bowomp.mp3"
import { useRef, useEffect, useState } from "preact/hooks";


interface TheCoolerButtonProps {
    coolerLink: string;
}
export default function TheCoolerButton(props: TheCoolerButtonProps) {
    const arabicRef = useRef<HTMLAudioElement>(null);
    const bowompRef = useRef<HTMLAudioElement>(null);
    const [needsUserGesture, setNeedsUserGesture] = useState(false);

    useEffect(() => {
        if (arabicRef.current) {
            const p = arabicRef.current.play();
            if (p && typeof (p as Promise<void>).catch === "function") {
                (p as Promise<void>).catch(() => {
                    setNeedsUserGesture(true);
                });
            }
        }
    }, []);
    
    const handleEnableSound = async () => {
        try {
            await arabicRef.current?.play();
            setNeedsUserGesture(false);
        } catch {
            // still blocked — keep the prompt visible
            setNeedsUserGesture(true);
        }
    };

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
            <audio ref={arabicRef} src={arabic} loop />
            <audio ref={bowompRef} src={bowomp} />
            <button onClick={handleClick}>
                <img src={coolcar} alt="autito" />
            </button>

            {needsUserGesture && (
                <div style={{ position: "fixed", right: 12, bottom: 12, zIndex: 999 }}>
                    <button onClick={handleEnableSound}>Enable sound</button>
                </div>
            )}
        </>
    );
}