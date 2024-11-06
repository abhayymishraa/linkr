export function parse(
    text: string,
    values: any,
    startDelimiter = "{",
    endDelimiter = "}"
): string {
    let result = "";
    let startIndex = 0;

    try {
        while (startIndex < text.length) {
            const openIndex = text.indexOf(startDelimiter, startIndex);
            if (openIndex === -1) {
                result += text.slice(startIndex); // Add remaining text
                break;
            }

            result += text.slice(startIndex, openIndex);
            const closeIndex = text.indexOf(endDelimiter, openIndex + 1);

            if (closeIndex === -1) {
                throw new Error("Mismatched delimiters");
            }

            const path = text.slice(openIndex + 1, closeIndex).split(".");
            let currentValue = values;

            for (const key of path) {
                if (currentValue == null) {
                    throw new Error(`Path not found: ${path.join(".")}`);
                }
                currentValue = currentValue[key];
            }

            result += currentValue !== undefined ? currentValue : "";
            startIndex = closeIndex + 1;
        }
    } catch (error) {
        console.error("Parse error:", (error as Error)?.message );
        return ""; // or return text if you want to keep the original text in case of error
    }

    return result;
}
