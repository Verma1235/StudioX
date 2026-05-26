function extractJson(text) {

    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    return cleaned.slice(start, end + 1);
}
export default extractJson;