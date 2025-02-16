type TranslatorGroup = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  avatar: string;
  members: TranslatorGroupMember[];
};

type TranslatorGroupMember = ShortUserInfo & {
  role: "manager" | "member" | "sub_manager";
};

type TranslatorGroupPost = {
  id: string;
  content: string;
  thumbnail: string;
  updatedAt: Date;
};

type TranslatorGroupRecruit = {
  id: number;
  position: string;
  requirements: string[];
  policies: string[];
  quantity: number;
};
