export function setEquality<T = any>(a: Set<T>, b: Set<T>): boolean {
    if (a.size !== b.size) {
        return false;
    }

    for (const el of a) {
        if (!b.has(el)) {
            return false;
        }
    }

    return true;
}
