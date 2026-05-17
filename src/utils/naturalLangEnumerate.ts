/**
 * Enumerates items of a list as a string in natural language.
 * Would turn ["a", "b", "c"] into "a, b & c"
 * @param list array of items to enumerate
 * @param getter optional function to modify the item or retrieve a sub-property just in time
 * @returns
 */
export default function naturalLangEnumerate<T>(
    list: T[],
    getter = (item: T) => `${item}`
): string {
    let enumerated = ''
    let itemIndex = 0

    for (const item of list) {
        const actualItem = getter(item)

        if (itemIndex === 0) {
            // First item, do not append comma
            enumerated += actualItem
        } else if (itemIndex !== list.length - 1) {
            // If not last item
            enumerated += ', ' + actualItem
        } else {
            // Last item
            enumerated += ' & ' + actualItem
        }

        itemIndex += 1
    }

    return enumerated
}
