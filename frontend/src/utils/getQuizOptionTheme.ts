const getQuizOptionTheme = (data: {
  index: number;
  selectedAnswerIndex: number | null;
  isCorrect?: boolean | null;
}) => {
  if (data.selectedAnswerIndex === data.index) {
    switch (data.isCorrect) {
      case true:
        return {
          borderColor: '#22c55e',
          bgColor: '#14532d',
        };
      case false:
        return {
          borderColor: '#ef4444',
          bgColor: '#7f1d1d',
        };
      default:
        return {
          borderColor: '#2f459c',
          bgColor: '#2f459c',
        };
    }
  }
  return {
    borderColor: '#333',
    bgColor: '#0f172a',
  };
};

export default getQuizOptionTheme;
