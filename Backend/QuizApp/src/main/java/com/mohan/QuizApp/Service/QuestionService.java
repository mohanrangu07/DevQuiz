package com.mohan.QuizApp.Service;

import com.mohan.QuizApp.Dao.QuestionDao;
import com.mohan.QuizApp.Model.TestQuestions;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionDao questionDao;

    public QuestionService(QuestionDao questionDao) {
        this.questionDao = questionDao;
    }

    // ✅ Get all questions for a category
    public List<TestQuestions> getAllQuestionsByCategory(String category) {
        return questionDao.findByCategory(category);
    }

    // ✅ Get a limited number of questions for a category
    public List<TestQuestions> getLimitedQuestionsByCategory(String category, int count) {
        return questionDao.findLimitedQuestionsByCategory(category, PageRequest.of(0, count));
    }
}
