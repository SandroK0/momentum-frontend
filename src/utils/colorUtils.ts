  export function getBorerColorViaStatus(status: string) {
    switch (status) {
      case "დასაწყები":
        return "#F7BC30";
      case "პროგრესში":
        return "#FB5607";
      case "მზად ტესტირებისთვის":
        return "#FF006E";
      case "დასრულებული":
        return "#3A86FF";
      default:
        break;
    }
  }

  export function getPriorityColor(priority : string) {
    switch (priority) {
      case "დაბალი":
        return "#08A508";
      case "საშუალო":
        return "#FFBE0B";
      case "მაღალი":
        return "#FA4D4D";
      default:
        break;
    }
  }

 export function getDepartmentColor(department: string) {
    switch (department) {
      case "ადმინისტრაციის დეპარტამენტი":
        return "#08A508";
      case "ადამიანური რესურსების დეპარტამენტი":
        return "#FFBE0B";
      case "ფინანსების დეპარტამენტი":
        return "#FA4D4D";
      case "გაყიდვები და მარკეტინგის დეპარტამენტი":
        return "#FD9A6A";
      case "ლოჯოსტიკის დეპარტამენტი":
        return "#89B6FF";
      case "ტექნოლოგიების დეპარტამენტი":
        return "#FFD86D";
      case "მედიის დეპარტამენტი":
        return "#8338EC";
      default:
        break;
    }
  }


