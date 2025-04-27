interface TeamMember {
  _id: string;
  fullName: string;
  position: string;
  email: string;
  phone: string;
  image?: string;
}

export interface Team {
  _id: string;
  name: string;
  tagLine: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
  leader: {
    _id: string;
    fullName: string;
    position: string;
    email: string;
    phone: string;
    image?: string;
    user: {
      _id: string;
      role: string;
    };
  };
  members: TeamMember[];
}
