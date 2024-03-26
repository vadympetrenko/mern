type FormRowType = {
    type: string;
    name: string;
    labelText?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const FormRow: React.FC<FormRowType> = ({
    type,
    name,
    labelText,
    defaultValue,
    onChange,
}) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <input
                onChange={onChange}
                type={type}
                id={name}
                name={name}
                className="form-input"
                defaultValue={defaultValue}
                required
            />
        </div>
    );
};
export default FormRow;
