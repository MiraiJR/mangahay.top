interface OptionStatus {
  name: string;
}

interface OptionSort {
  name: string;
  code: "asc" | "desc" | "updatedAt" | "view" | "follow" | "like";
}
