import create from 'zustand';
import { getUserPaths } from '../api/userApi';

interface UserState {
  avatar: string | null;
  fetchAvatar: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  avatar: null,
  fetchAvatar: async () => {
    // ... logic fetch avatar ...
  }
})); 