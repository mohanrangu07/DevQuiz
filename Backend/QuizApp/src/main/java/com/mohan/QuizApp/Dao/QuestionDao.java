package com.mohan.QuizApp.Dao;

import com.mohan.QuizApp.Model.TestQuestions;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface QuestionDao extends JpaRepository<TestQuestions, Long> {

    // ✅ Fetch all questions for a given category
    List<TestQuestions> findByCategory(String category);

    // ✅ Fetch a limited number of questions using Pageable
    @Query("SELECT q FROM TestQuestions q WHERE q.category = :category ORDER BY FUNCTION('RAND')")
    List<TestQuestions> findLimitedQuestionsByCategory(@Param("category") String category, Pageable pageable);
}
