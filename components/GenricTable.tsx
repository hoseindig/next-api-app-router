interface GenericTableProps<T> {
  items: T[];
  getKey: (item: T) => React.Key;
  renderRow: (item: T) => React.ReactNode;
  headers: string[];
}

function GenericTable<T>({
  items,
  renderRow,
  getKey,
  headers,
}: GenericTableProps<T>) {
  return (
    <table className="w-full border border-gray-300 mt-4">
      <thead>
        <tr className="bg-gray-950 text-white">
          {headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {items.map((item, index) => (
          <tr key={getKey(item)} className="odd:bg-gray-100 even:bg-white">
            {renderRow(item)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GenericTable;
