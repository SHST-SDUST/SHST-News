export type EmptyObject<T> = Record<string, T>;

export type User = { nick_name: string; avatar_url: string };

export const EmptyObject: EmptyObject<unknown> = {};
