export default function toDTOList<T, D>(items: T[], dtoMapper: (item: T) => D): D[] {
    return items.map(dtoMapper);
}