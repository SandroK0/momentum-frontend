
interface DateConverterProps {
    dateString: string;
  }

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