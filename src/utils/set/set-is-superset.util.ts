export function  setIsSuperset<T = any>(a: Set<T>, subset: Set<T>): boolean {
    for (const el of subset) {
        if (!a.has(el)) {
            return false;
        }
    }
    return true;
}
