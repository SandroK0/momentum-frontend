interface DateConverterProps {
  dateString: string;
}

export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

// Get today's date for min attribute
export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export const DateConverter: React.FC<DateConverterProps> = ({ dateString }) => {
  const formatDateToEnglish = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }

      return date
        .toLocaleDateString("ka-GE", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .replace(/(\d+) (\w+), (\d+)/, "$1 $2, $3");
    } catch (error) {
      return "Error formatting date";
    }
  };

  const formattedDate = formatDateToEnglish(dateString);

  return <div>{formattedDate}</div>;
};
