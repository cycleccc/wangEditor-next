export type Store<T> = readonly [(onStoreChange: () => void) => () => void, () => T]
