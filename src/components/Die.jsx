import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceOne } from "@fortawesome/free-solid-svg-icons";
import { faDiceTwo } from "@fortawesome/free-solid-svg-icons";
import { faDiceThree } from "@fortawesome/free-solid-svg-icons";
import { faDiceFour } from "@fortawesome/free-solid-svg-icons";
import { faDiceFive } from "@fortawesome/free-solid-svg-icons";
import { faDiceSix } from "@fortawesome/free-solid-svg-icons";

export default function Die({ value, holdDice, isHeld }) {

    /**
     * 
     * @param {number} value 
     */
    function nDot(value) {

        let icon = null;

        switch (value) {
            case 1:
                icon = faDiceOne;
                break;
            case 2:
                icon = faDiceTwo;
                break;
            case 3:
                icon = faDiceThree;
                break;
            case 4:
                icon = faDiceFour;
                break;
            case 5:
                icon = faDiceFive;
                break;
            case 6:
                icon = faDiceSix;
                break;
        }

        return <FontAwesomeIcon icon={icon} size="2xl" style={{ color: "#000000" }} />;
    }

    return (
        <>
            <div className={`d-flex align-items-center justify-content-center die die_icon rounded-2 ${isHeld && "die__active"} `} onClick={holdDice}>

                {nDot(value)}
            </div>
        </>
        /* /.die */
    )
}