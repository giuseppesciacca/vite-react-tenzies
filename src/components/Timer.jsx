export default function Timer({ timer, lastTimer }) {
    return (
        <div className="timer die rounded-2 bg-danger fs-5 d-flex justify-content-center align-items-center fw-semibold">
            {lastTimer ? lastTimer : timer}
        </div>
    )
}