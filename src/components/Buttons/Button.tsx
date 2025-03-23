interface ButtonProps {
    text: string;
    onClick: () => void;
  }
  
  const Button = ({ text, onClick }: ButtonProps) => {
    return (
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={onClick}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  