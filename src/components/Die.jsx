export default function Die({ value, holdDice, isHeld }) {

    /**
     * 
     * @param {number} value 
     */
    function nDot(value) {
        const nDice = Array.from({ length: value });

        return nDice.map(() => <span className="dot"></span>)
    }

    return (
        <>
            <div className={`die rounded-2 ${isHeld && "die__active"} `} onClick={holdDice}>

                {nDot(value)}

            </div>
        </>
        /* /.die */
    )
}