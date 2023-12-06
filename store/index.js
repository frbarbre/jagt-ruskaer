// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

"use client";

import { createWithEqualityFn } from "zustand/traditional";

// creating store
export const useStore = createWithEqualityFn()(
  (set) => ({
    isRoleModalOpen: false,
    setIsRoleModalOpen: (isRoleModalOpen) =>
      set(() => ({ isRoleModalOpen: isRoleModalOpen })),
    selectedUserId: "",

    setSelectedUserId: (selectedUserId) =>
      set(() => ({ selectedUserId: selectedUserId })),

    selectedUserRol: "",
    setSelectedUserRole: (selectedUserRole) =>
      set(() => ({ selectedUserRole: selectedUserRole })),

    currentGuest: null,
    setCurrentGuest: (currentGuest) =>
      set(() => ({ currentGuest: currentGuest })),
  }),
  Object.is
);
