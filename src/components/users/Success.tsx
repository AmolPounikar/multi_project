import success from "../../assets/success.svg";

interface Props {
    count: any;
}

const Success = ({ count }: Props) => {
    return (
        <div className=" success-block">
            <img src={success} alt="Success" />
            <h3>Successfully ..!</h3>
            <p>We have sent {count} invitation</p>
            <button
                className="send-invite-btn"
                onClick={() => window.location.reload()}
            >
                Go Back
            </button>
        </div>
    );
};

export default Success;
