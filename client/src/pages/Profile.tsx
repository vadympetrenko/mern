import { ActionFunctionArgs, Form, redirect, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { UserType } from "../../../models/UserModel";
import { FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { QueryClient } from "@tanstack/react-query";

export const action =
    (queryClient: QueryClient) =>
    async ({ request }: ActionFunctionArgs) => {
        const formData = await request.formData();
        const file = formData.get("avatar") as File | null;

        if (file && file.size > 500000) {
            toast.error("Image size too large");
            return null;
        }
        try {
            await customFetch.patch("/users/update-user", formData);
            queryClient.invalidateQueries(["user"]);
            toast.success("Profile updated successfully");
            return redirect('/dashboard')
        } catch (error) {
            toast.error((error as AxiosError).response?.data as string);
            return null;
        }
    };

const Profile = () => {
    const {
        user: { name, email, lastName, location },
    } = useOutletContext() as { user: UserType };

    return (
        <Wrapper>
            <Form method="post" className="form" encType="multipart/form-data">
                <h4 className="form-title">Profile</h4>
                <div className="form-center">
                    <div className="form-row">
                        <label htmlFor="avatar" className="form-label">
                            Select an image file (max 0.5 MB)
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            className="form-input"
                            accept="image/*"
                        />
                    </div>
                    <FormRow type="text" name="name" defaultValue={name} />
                    <FormRow
                        type="text"
                        name="lastName"
                        labelText="last name"
                        defaultValue={lastName}
                    />
                    <FormRow type="email" name="email" defaultValue={email} />
                    <FormRow
                        type="text"
                        name="location"
                        defaultValue={location}
                    />
                    <SubmitBtn formBtn />
                </div>
            </Form>
        </Wrapper>
    );
};
export default Profile;
