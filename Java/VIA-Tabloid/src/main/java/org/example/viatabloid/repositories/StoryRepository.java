package org.example.viatabloid.repositories;

import org.example.viatabloid.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {}