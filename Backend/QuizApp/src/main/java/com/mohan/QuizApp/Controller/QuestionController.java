package com.mohan.QuizApp.Controller;

import com.mohan.QuizApp.Model.TestQuestions;
import com.mohan.QuizApp.Service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/quiz")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // ✅ Fetch questions based on category & optional count
    @GetMapping("/{category}/{subCategory}")
    public ResponseEntity<?> getQuestionsByCategory(
            @PathVariable String category,
            @PathVariable String subCategory,
            @RequestParam(defaultValue = "0") String count) {
        try {
            List<TestQuestions> questions;

            int questionCount = count.equals("all") ? 0 : Integer.parseInt(count);

            // ✅ Fetch all questions if count is 0
            if (questionCount == 0) {
                questions = questionService.getAllQuestionsByCategory(subCategory);
            } else {
                questions = questionService.getLimitedQuestionsByCategory(subCategory, questionCount);
            }

            if (questions.isEmpty()) {
                return ResponseEntity.status(404).body("No questions found for " + category + " - " + subCategory);
            }
            return ResponseEntity.ok(questions);

        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid count value: " + count);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching questions: " + e.getMessage());
        }
    }
}
