import './Select.scss';

export default function Select({options, value, onChange}){
    return (
        <select className='select-reuseble-component' value={value} onChange={onChange}>
            {options.map((option) => (
                <option value={option.value} key={option.label}>{option.label}</option>
            ))}
        </select>
    );
}