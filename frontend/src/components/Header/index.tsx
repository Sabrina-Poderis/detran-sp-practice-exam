interface HeaderProps {
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  const renderTitleWithMarks = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g); // Divide o texto preservando os `**`

    return parts.map((part, index) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <mark
          key={index}
          className="px-2 text-white bg-blue-600 rounded-sm dark:bg-blue-500"
        >
          {part.slice(2, -2)}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <header className="text-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {renderTitleWithMarks(title)}
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        {description}
      </p>
    </header>
  );
};

export default Header;
