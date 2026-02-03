import type { UserData } from "../types";

const USERS_KEY = "streamfy_users";
const CURRENT_USER_KEY = "streamfy_session";


const getUser = (): UserData[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
}

export const findUserByEmail = (email: string): UserData | undefined => {
    const users = getUser();
    return users.find((u) => u.email === email);
}

export const createUser = (user: UserData): void => {
    const users = getUser();
    if(findUserByEmail(user.email)) {
        throw new Error("Email Already Registered");
    }
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const saveSession = (user: UserData) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export const clearSession = () => {
    localStorage.removeItem(CURRENT_USER_KEY)
}

export const getCurrentSession = (): UserData | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
}