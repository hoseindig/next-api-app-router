interface ButtonProps {
  isLoading: boolean;
  label: string;
  handleClick: () => void;
}

const ActionButton = ({ isLoading, handleClick, label }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {isLoading ? (
        <span className="flex items-center">
          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
          درحال ارسال...
        </span>
      ) : (
        label
      )}
    </button>
  );
};

export default ActionButton;
