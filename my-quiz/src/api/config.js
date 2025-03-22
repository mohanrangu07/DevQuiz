const API_BASE_URL = 'http://localhost:8081'; // Backend URL

export const fetchQuizQuestions = async (category, subCategory, count = "all") => {
    try {
        if (!category || !subCategory) {
            throw new Error(`Missing category or subCategory: ${category}, ${subCategory}`);
        }

        const questionCount = count === "all" ? "0" : count.toString();
        const endpoint = `/quiz/${category}/${subCategory}?count=${questionCount}`;

        console.log(`Fetching from: ${API_BASE_URL}${endpoint}`);

        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error fetching questions: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
};
