import { useNavigation } from "react-router-dom";

type SubmitBtn = {
    formBtn?: boolean
}

const SubmitBtn:React.FC<SubmitBtn> = ({formBtn}) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    return (
        <button type="submit" disabled={isSubmitting} className={`btn btn-block ${formBtn && 'form-btn' }`}>
            {isSubmitting ? "submititng..." : "submit"}
        </button>
    );
};
export default SubmitBtn;
