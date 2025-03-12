const QuizSkeleton: React.FC = () => {
  return (
    <div className="mx-auto w-[400px] max-w-3xl rounded-md border border-[#444444] bg-[#1e293b] px-[60px] py-[30px]">
      <div className="animate-pulse space-y-4">
        <div className="h-12 w-full bg-gray-600 rounded"></div>
        <div className="h-12 w-full bg-gray-600 rounded"></div>
        <div className="h-12 w-full bg-gray-600 rounded"></div>
        <div className="h-12 w-full bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export default QuizSkeleton;
