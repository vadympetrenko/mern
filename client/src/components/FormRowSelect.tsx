
type FormRowSelectType = {
    defaultValue?: string,
    list: string[],
    labelText?: string,
    name: string,
    onChange?: (event:React.FormEvent<HTMLSelectElement>) => void;
}

const FormRowSelect:React.FC<FormRowSelectType> = ({defaultValue, list, name, labelText, onChange}) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <select
            onChange={onChange}
                name={name}
                id={name}
                className="form-select"
                defaultValue={defaultValue}
            >
                {list.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default FormRowSelect;
