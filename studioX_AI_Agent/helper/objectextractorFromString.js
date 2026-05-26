function parseInput(input) {

    // Already object
    if (typeof input === "object" && input !== null) {
        return input;
    }

    // Invalid input
    if (typeof input !== "string") {
        return {};
    }

    try {

        // Convert JSON string to object
        return JSON.parse(input);

    } catch (error) {

        console.error("Invalid JSON input:", error.message);

        return {};
    }
}
export default parseInput;