interface GenericTableProps<T> {
  items: T[];
  getKey: (item: T) => React.Key;
  renderRow: (item: T) => React.ReactNode;
}

function GenericTable<T>({ items, renderRow, getKey }: GenericTableProps<T>) {
  return (
    <table className="w-full border border-gray-300 mt-4">
      <thead>
        <tr className="bg-gray-950 text-white">
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
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
