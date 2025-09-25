package hoangtugio.org.springaigeminirag.controller;

import hoangtugio.org.springaigeminirag.model.ChatRequest;
import hoangtugio.org.springaigeminirag.model.ChatResponse;
import hoangtugio.org.springaigeminirag.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite dev server
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {
        try {
            String response = chatService.generatePhilosophicalResponse(request.getMessage());
            return new ChatResponse(response);
        } catch (Exception e) {
            // Fallback response if AI service fails
            return new ChatResponse("I apologize, but I'm having trouble connecting to my philosophical knowledge base right now. " +
                "However, I can tell you that your question about '" + request.getMessage() + "' touches on fundamental philosophical themes. " +
                "Philosophy has always been about examining such profound questions. Would you like to explore this topic further when my connection is restored?");
        }
    }
}