package com.mohan.QuizApp.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "TestQuestions") // Make sure this matches your database table name
public class TestQuestions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Integer id;

    private String category;
    private String question;
    private String option1;
    private String option2;
    private String option3;
    private String option4;

    @Column(name = "right_answer") // Explicit mapping since column name has an underscore
    private String rightAnswer;
}
