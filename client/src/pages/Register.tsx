import {
    ActionFunctionArgs,
    Form,
    Link,
    redirect,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post("/auth/register", data);
        toast.success("registration successful");
        return redirect("/login");
    } catch (error) {
        toast.error((error as AxiosError).response?.data as string);
        return error;
    }
};

const Register = () => {

    return (
        <Wrapper>
            <Form method="post" className="form">
                <Logo />
                <h4>Register</h4>
                <FormRow type="text" name="name" defaultValue="John" />
                <FormRow
                    type="text"
                    name="lastName"
                    labelText="last name"
                />
                <FormRow type="text" name="location" defaultValue="earth" />
                <FormRow
                    type="email"
                    name="email"
                />
                <FormRow
                    type="password"
                    name="password"
                />
                <SubmitBtn />
                <p>
                    Already a member?
                    <Link to="/login" className="member-btn">
                        Login
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Register;
