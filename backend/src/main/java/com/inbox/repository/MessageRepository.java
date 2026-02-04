package com.inbox.repository;

import com.inbox.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    
    // Get all messages ordered by date (newest first)
    List<Message> findAllByOrderByDateDesc();
}
