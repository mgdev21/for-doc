package org.example.viatabloid.controller;

import org.example.viatabloid.model.Story;
import org.example.viatabloid.repositories.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StoryController {

    @Autowired
    private StoryRepository storyRepository;

    @GetMapping("/api/stories")
    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    @PostMapping ("/api/stories")
    public Story createStory(@RequestBody Story story) {
        return storyRepository.save(story);
    }
}