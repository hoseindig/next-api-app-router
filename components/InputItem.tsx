type InputItemProps<T, K extends keyof T> = {
  value: T;
  seter: React.Dispatch<React.SetStateAction<T>>;
  name: K;
  placeholder?: string;
  type?: T[K] extends number ? "number" : "text";
};

const InputItem = <T, K extends keyof T>({
  value,
  seter,
  name,
  placeholder,
  type,
}: InputItemProps<T, K>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: T[K];

    if (type === "number") {
      newValue = Number(e.target.value) as T[K];
    } else {
      newValue = e.target.value as T[K];
    }

    seter({
      ...value,
      [name]: newValue,
    });
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={String(value[name] ?? "")}
      onChange={handleChange}
      className="
        w-full px-4 py-2 rounded-lg border border-gray-300
        focus:outline-none focus:ring-1 focus:ring-blue-500
        focus:border-blue-500 transition text-sm m-2
      "
    />
  );
};

export default InputItem;
