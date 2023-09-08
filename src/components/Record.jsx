export default function Record(props) {

    function recordTimer(arrayResult) {
        let recordTimer = Infinity;

        arrayResult.forEach(thisResult => {
            if (thisResult.timer < recordTimer) {
                recordTimer = thisResult.timer;
            }
        });

        if (recordTimer != Infinity) {
            return recordTimer
        } else {
            return 0
        }
    }

    function recordCount(arrayResult) {
        let recordCount = Infinity;

        arrayResult.forEach(thisResult => {
            if (thisResult.count < recordCount) {
                recordCount = thisResult.count;
            }
        });

        if (recordCount != Infinity) {
            return recordCount
        } else {
            return 0
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center mb-3 fw-semibold">

            <div className="d-flex flex-column justify-content-center align-items-center me-5">
                <p className="m-0">Record Timer:</p>
                <div className="record_timer die rounded-2 bg-success fs-5 d-flex justify-content-center align-items-center fw-semibold me-3 text-white">
                    {recordTimer(props.result)}
                </div>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
                <p className="m-0">Record Count:</p>
                <div className="record_timer die rounded-2 bg-success fs-5 d-flex justify-content-center align-items-center fw-semibold me-3 text-white">
                    {recordCount(props.result)}
                </div>
            </div>

        </div>
    )
}