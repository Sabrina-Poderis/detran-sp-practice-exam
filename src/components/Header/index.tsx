interface HeaderProps {
  title: string;
  size?: 'lg' | 'md'
  description?: string;
}

const Header: React.FC<HeaderProps> = ({ title, size='lg',description }) => {
  const titleSize = size === 'lg' ? 'text-4xl' : 'text-2xl'

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
      <h1 className={`${titleSize} font-bold mb-6 text-gray-800 dark:text-white`}>
        {renderTitleWithMarks(title)}
      </h1>
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {description}
        </p>
      )}
    </header>
  );
};

export default Header;
