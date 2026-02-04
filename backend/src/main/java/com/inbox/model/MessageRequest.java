package com.inbox.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class MessageRequest {

    @NotBlank(message = "Subject is required")
    @Size(max = 40, message = "Subject cannot exceed 40 characters")
    private String subject;

    @NotBlank(message = "Text is required")
    private String text;

    // Constructors
    public MessageRequest() {
    }

    public MessageRequest(String subject, String text) {
        this.subject = subject;
        this.text = text;
    }

    // Getters and Setters
    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
